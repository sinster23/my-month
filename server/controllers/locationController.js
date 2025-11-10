const express = require("express");
const axios = require("axios");
const NodeCache = require("node-cache");

// Cache results for 10 minutes
const cache = new NodeCache({ stdTTL: 600 });

// Alternative Overpass API endpoints
const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter'
];

exports.getLocation = async (req, res) => {
  const { lat, lon } = req.query;
  
  if (!lat || !lon) {
    return res.status(400).json({ 
      success: false,
      message: "Latitude and longitude are required" 
    });
  }

  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);
  
  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ 
      success: false,
      message: "Invalid coordinates provided" 
    });
  }

  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return res.status(400).json({ 
      success: false,
      message: "Coordinates out of valid range" 
    });
  }

  // Check cache first (round to ~1km precision)
  const cacheKey = `loc_${Math.round(latitude * 100)}_${Math.round(longitude * 100)}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    console.log('Returning cached results');
    return res.json(cached);
  }

  try {
    // Simplified and optimized query with reduced radius
    const query = `
      [out:json][timeout:25];
      (
        nwr["amenity"="hospital"](around:3000,${latitude},${longitude});
        nwr["amenity"="clinic"](around:3000,${latitude},${longitude});
        nwr["amenity"="doctors"](around:3000,${latitude},${longitude});
        nwr["amenity"="pharmacy"](around:3000,${latitude},${longitude});
        nwr["healthcare"~"clinic|doctor|pharmacy"](around:3000,${latitude},${longitude});
      );
      out center;
    `;

    // Try multiple endpoints with retry logic
    const data = await queryOverpassWithRetry(query);

    // Process results
    const results = data.elements
      .filter((e) => e.tags && (e.tags.name || e.tags.brand))
      .map((e) => {
        let facilityType = "Medical Facility";
        let category = "other";
        
        if (e.tags.amenity === "hospital") {
          facilityType = "Hospital";
          category = "hospital";
        } else if (e.tags.amenity === "clinic" || e.tags.healthcare === "clinic") {
          facilityType = "Clinic";
          category = "clinic";
        } else if (e.tags.amenity === "doctors" || e.tags.healthcare === "doctor") {
          facilityType = "Doctor";
          category = "doctor";
        } else if (
          e.tags.amenity === "pharmacy" || 
          e.tags.shop === "pharmacy" || 
          e.tags.shop === "chemist" ||
          e.tags.healthcare === "pharmacy"
        ) {
          facilityType = "Pharmacy";
          category = "pharmacy";
        } else if (e.tags.shop === "medical_supply") {
          facilityType = "Medical Supply Store";
          category = "pharmacy";
        }

        const lat = e.lat || (e.center && e.center.lat);
        const lon = e.lon || (e.center && e.center.lon);

        const addressParts = [];
        if (e.tags["addr:housenumber"]) addressParts.push(e.tags["addr:housenumber"]);
        if (e.tags["addr:street"]) addressParts.push(e.tags["addr:street"]);
        if (e.tags["addr:suburb"]) addressParts.push(e.tags["addr:suburb"]);
        if (e.tags["addr:city"]) addressParts.push(e.tags["addr:city"]);
        if (e.tags["addr:postcode"]) addressParts.push(e.tags["addr:postcode"]);
        
        const address = e.tags["addr:full"] || 
                       (addressParts.length > 0 ? addressParts.join(", ") : "Address not available");

        const distance = calculateDistance(latitude, longitude, lat, lon);

        return {
          id: e.id,
          name: e.tags.name || e.tags.brand || facilityType,
          type: facilityType,
          category: category,
          lat: lat,
          lon: lon,
          address: address,
          phone: e.tags.phone || e.tags["contact:phone"] || null,
          website: e.tags.website || e.tags["contact:website"] || null,
          email: e.tags.email || e.tags["contact:email"] || null,
          openingHours: e.tags.opening_hours || null,
          emergency: e.tags.emergency === "yes",
          wheelchair: e.tags.wheelchair === "yes" || e.tags.wheelchair === "limited",
          distance: distance,
        };
      })
      .filter(place => place.lat && place.lon)
      .sort((a, b) => a.distance - b.distance);

    // Remove duplicates
    const uniqueResults = [];
    const seen = new Set();
    
    for (const place of results) {
      const key = `${place.name}-${Math.round(place.lat * 1000)}-${Math.round(place.lon * 1000)}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueResults.push(place);
      }
    }

    const response = {
      success: true,
      count: uniqueResults.length,
      userLocation: {
        lat: latitude,
        lon: longitude
      },
      places: uniqueResults
    };

    // Cache the response
    cache.set(cacheKey, response);

    res.json(response);

  } catch (err) {
    console.error("Overpass API error:", err.message);
    
    if (err.code === 'ECONNABORTED' || err.code === 'ETIMEDOUT') {
      return res.status(504).json({ 
        success: false,
        message: "Request timeout. The service is currently busy. Please try again in a moment." 
      });
    }
    
    if (err.response && err.response.status === 504) {
      return res.status(504).json({ 
        success: false,
        message: "The map service is temporarily overloaded. Please try again in a few seconds." 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch nearby places. Please try again later.",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Query Overpass API with multiple endpoints and retry logic
async function queryOverpassWithRetry(query) {
  let lastError;
  
  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      console.log(`Trying endpoint: ${endpoint}`);
      const url = `${endpoint}?data=${encodeURIComponent(query)}`;
      
      const { data } = await axios.get(url, {
        timeout: 25000,
        headers: {
          'User-Agent': 'MenstrualHealthApp/1.0'
        }
      });
      
      console.log(`Success with endpoint: ${endpoint}`);
      return data;
      
    } catch (err) {
      console.log(`Failed with ${endpoint}: ${err.message}`);
      lastError = err;
      
      // If not the last endpoint, wait a bit before trying next
      if (endpoint !== OVERPASS_ENDPOINTS[OVERPASS_ENDPOINTS.length - 1]) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
  
  // All endpoints failed
  throw lastError;
}

// Haversine formula to calculate distance between two coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 100) / 100;
}

function toRad(degrees) {
  return degrees * (Math.PI / 180);
}