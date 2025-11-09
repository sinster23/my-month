// controllers/profileController.js
const User = require('../models/User');

// UPDATE PERSONAL INFO (name, phone, bio)
const updatePersonalInfo = async (req, res) => {
  try {
    const { name, phone, bio } = req.body;
    
    // Validation
    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Name is required' });
    }

    // Find user and update (req.user.id comes from auth middleware)
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    user.name = name.trim();
    if (phone !== undefined) user.phone = phone.trim();
    if (bio !== undefined) user.bio = bio.trim();

    await user.save();

    // Return updated user without password
    const updatedUser = await User.findById(user._id).select('-password');
    res.json({ 
      message: 'Personal information updated successfully', 
      user: updatedUser 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE ADDRESS
const updateAddress = async (req, res) => {
  try {
    const { street, city, state, pinCode, country } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update address fields
    user.address = {
      street: street?.trim() || user.address?.street || '',
      city: city?.trim() || user.address?.city || '',
      state: state?.trim() || user.address?.state || '',
      pinCode: pinCode?.trim() || user.address?.pinCode || '',
      country: country?.trim() || user.address?.country || ''
    };

    await user.save();

    const updatedUser = await User.findById(user._id).select('-password');
    res.json({ 
      message: 'Address updated successfully', 
      user: updatedUser 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE PROFILE (Combined - optional)
const updateProfile = async (req, res) => {
  try {
    const { name, phone, bio, address } = req.body;
    
    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Name is required' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update personal info
    user.name = name.trim();
    if (phone !== undefined) user.phone = phone.trim();
    if (bio !== undefined) user.bio = bio.trim();

    // Update address if provided
    if (address) {
      user.address = {
        street: address.street?.trim() || user.address?.street || '',
        city: address.city?.trim() || user.address?.city || '',
        state: address.state?.trim() || user.address?.state || '',
        pinCode: address.pinCode?.trim() || user.address?.pinCode || '',
        country: address.country?.trim() || user.address?.country || ''
      };
    }

    await user.save();

    const updatedUser = await User.findById(user._id).select('-password');
    res.json({ 
      message: 'Profile updated successfully', 
      user: updatedUser 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ========== HEALTH PROFILE CONTROLLERS ==========

// GET HEALTH PROFILE STATUS
const getHealthProfileStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('healthProfile');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ 
      isComplete: user.healthProfile?.isComplete || false,
      hasProfile: !!user.healthProfile
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET HEALTH PROFILE
const getHealthProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('healthProfile');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ healthProfile: user.healthProfile || {} });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// CREATE OR UPDATE HEALTH PROFILE (Complete Onboarding)
const updateHealthProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const {
      age, height, weight,
      sleepHours, mealsPerDay, waterIntake, exerciseFrequency,
      cycleLength, periodDuration, lastPeriodDate, flowIntensity, cycleRegularity,
      symptomsExperienced, medicalConditions, otherConditions,
      currentMedications, allergies, hygieneProducts, changeFrequency,
      stressLevel, moodTracking, healthGoals
    } = req.body;

    // Validate required fields
    const errors = [];
    if (!age || age < 10 || age > 100) errors.push('Valid age is required (10-100)');
    if (!height || height < 100 || height > 250) errors.push('Valid height is required (100-250 cm)');
    if (!weight || weight < 30 || weight > 300) errors.push('Valid weight is required (30-300 kg)');
    
    if (errors.length > 0) {
      return res.status(400).json({ message: errors.join(', ') });
    }

    // Update health profile
    user.healthProfile = {
      isComplete: true,
      age: parseInt(age),
      height: parseFloat(height),
      weight: parseFloat(weight),
      sleepHours: sleepHours ? parseFloat(sleepHours) : undefined,
      mealsPerDay: mealsPerDay ? parseInt(mealsPerDay) : undefined,
      waterIntake: waterIntake ? parseInt(waterIntake) : undefined,
      exerciseFrequency: exerciseFrequency || undefined,
      cycleLength: cycleLength ? parseInt(cycleLength) : undefined,
      periodDuration: periodDuration ? parseInt(periodDuration) : undefined,
      lastPeriodDate: lastPeriodDate || undefined,
      flowIntensity: flowIntensity || undefined,
      cycleRegularity: cycleRegularity || undefined,
      symptomsExperienced: symptomsExperienced || [],
      medicalConditions: medicalConditions || [],
      otherConditions: otherConditions?.trim() || '',
      currentMedications: currentMedications?.trim() || '',
      allergies: allergies?.trim() || '',
      hygieneProducts: hygieneProducts || [],
      changeFrequency: changeFrequency || undefined,
      stressLevel: stressLevel || undefined,
      moodTracking: !!moodTracking,
      healthGoals: healthGoals || []
    };

    await user.save(); // BMI will be calculated automatically by the pre-save hook

    res.json({ 
      message: 'Health profile updated successfully',
      healthProfile: user.healthProfile 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PATCH HEALTH PROFILE (Update specific fields)
const patchHealthProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Initialize healthProfile if it doesn't exist
    if (!user.healthProfile) {
      user.healthProfile = {};
    }

    // Merge updates into existing health profile
    const allowedUpdates = [
      'age', 'height', 'weight', 'sleepHours', 'mealsPerDay', 'waterIntake',
      'exerciseFrequency', 'cycleLength', 'periodDuration', 'lastPeriodDate',
      'flowIntensity', 'cycleRegularity', 'symptomsExperienced', 'medicalConditions',
      'otherConditions', 'currentMedications', 'allergies', 'hygieneProducts',
      'changeFrequency', 'stressLevel', 'moodTracking', 'healthGoals'
    ];

    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        user.healthProfile[key] = req.body[key];
      }
    });

    await user.save();

    res.json({ 
      message: 'Health profile updated successfully',
      healthProfile: user.healthProfile 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// UPDATE CYCLE INFO (Quick update for cycle tracking)
const updateCycleInfo = async (req, res) => {
  try {
    const { lastPeriodDate, cycleLength, periodDuration, flowIntensity, symptomsExperienced } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Initialize healthProfile if it doesn't exist
    if (!user.healthProfile) {
      user.healthProfile = {};
    }

    // Update cycle-specific fields
    if (lastPeriodDate) user.healthProfile.lastPeriodDate = lastPeriodDate;
    if (cycleLength) user.healthProfile.cycleLength = parseInt(cycleLength);
    if (periodDuration) user.healthProfile.periodDuration = parseInt(periodDuration);
    if (flowIntensity) user.healthProfile.flowIntensity = flowIntensity;
    if (symptomsExperienced) user.healthProfile.symptomsExperienced = symptomsExperienced;

    await user.save();

    res.json({ 
      message: 'Cycle information updated successfully',
      cycleInfo: {
        lastPeriodDate: user.healthProfile.lastPeriodDate,
        cycleLength: user.healthProfile.cycleLength,
        periodDuration: user.healthProfile.periodDuration,
        flowIntensity: user.healthProfile.flowIntensity,
        symptomsExperienced: user.healthProfile.symptomsExperienced
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET HEALTH INSIGHTS (Calculate next period, fertility window, etc.)
const getHealthInsights = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('healthProfile');
    if (!user || !user.healthProfile) {
      return res.status(404).json({ message: 'Health profile not found' });
    }

    const hp = user.healthProfile;
    const insights = {};

    // Calculate BMI category
    if (hp.bmi) {
      if (hp.bmi < 18.5) insights.bmiCategory = 'Underweight';
      else if (hp.bmi < 25) insights.bmiCategory = 'Normal';
      else if (hp.bmi < 30) insights.bmiCategory = 'Overweight';
      else insights.bmiCategory = 'Obese';
    }

    // Calculate next period date
    if (hp.lastPeriodDate && hp.cycleLength) {
      const lastPeriod = new Date(hp.lastPeriodDate);
      const nextPeriod = new Date(lastPeriod);
      nextPeriod.setDate(nextPeriod.getDate() + hp.cycleLength);
      insights.nextPeriodDate = nextPeriod.toISOString().split('T')[0];

      // Days until next period
      const today = new Date();
      const daysUntil = Math.ceil((nextPeriod - today) / (1000 * 60 * 60 * 24));
      insights.daysUntilNextPeriod = daysUntil;

      // Fertility window (ovulation typically 14 days before next period)
      const ovulationDate = new Date(nextPeriod);
      ovulationDate.setDate(ovulationDate.getDate() - 14);
      const fertilityStart = new Date(ovulationDate);
      fertilityStart.setDate(fertilityStart.getDate() - 5);
      const fertilityEnd = new Date(ovulationDate);
      fertilityEnd.setDate(fertilityEnd.getDate() + 1);

      insights.fertilityWindow = {
        start: fertilityStart.toISOString().split('T')[0],
        end: fertilityEnd.toISOString().split('T')[0],
        ovulationDate: ovulationDate.toISOString().split('T')[0]
      };
    }

    // Health recommendations based on profile
    const recommendations = [];
    
    if (hp.sleepHours && hp.sleepHours < 7) {
      recommendations.push('Consider increasing sleep to 7-9 hours for better hormonal balance');
    }
    if (hp.waterIntake && hp.waterIntake < 8) {
      recommendations.push('Aim for 8-10 glasses of water daily to help reduce bloating');
    }
    if (hp.exerciseFrequency === 'none' || hp.exerciseFrequency === 'rarely') {
      recommendations.push('Regular exercise can help manage period symptoms and stress');
    }
    if (hp.stressLevel === 'high') {
      recommendations.push('High stress can affect your cycle - consider meditation or yoga');
    }
    if (hp.medicalConditions?.includes('pcos') || hp.medicalConditions?.includes('pcod')) {
      recommendations.push('PCOS management: Focus on balanced diet and regular exercise');
    }

    insights.recommendations = recommendations;
    insights.healthScore = calculateHealthScore(hp);

    res.json({ insights });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper function to calculate health score
function calculateHealthScore(healthProfile) {
  let score = 0;
  let maxScore = 0;

  // BMI check (20 points)
  maxScore += 20;
  if (healthProfile.bmi >= 18.5 && healthProfile.bmi < 25) score += 20;
  else if (healthProfile.bmi >= 17 && healthProfile.bmi < 30) score += 10;

  // Sleep (15 points)
  maxScore += 15;
  if (healthProfile.sleepHours >= 7 && healthProfile.sleepHours <= 9) score += 15;
  else if (healthProfile.sleepHours >= 6 && healthProfile.sleepHours <= 10) score += 8;

  // Water intake (10 points)
  maxScore += 10;
  if (healthProfile.waterIntake >= 8) score += 10;
  else if (healthProfile.waterIntake >= 6) score += 5;

  // Exercise (15 points)
  maxScore += 15;
  if (healthProfile.exerciseFrequency === '5+_times_week') score += 15;
  else if (healthProfile.exerciseFrequency === '3-4_times_week') score += 12;
  else if (healthProfile.exerciseFrequency === '1-2_times_week') score += 6;

  // Stress level (15 points)
  maxScore += 15;
  if (healthProfile.stressLevel === 'low') score += 15;
  else if (healthProfile.stressLevel === 'moderate') score += 8;

  // Regular cycle (15 points)
  maxScore += 15;
  if (healthProfile.cycleRegularity === 'regular') score += 15;
  else if (healthProfile.cycleRegularity === 'irregular') score += 8;

  // Hygiene habits (10 points)
  maxScore += 10;
  if (healthProfile.changeFrequency === 'every_2-3_hours' || 
      healthProfile.changeFrequency === 'every_4-6_hours') score += 10;

  return Math.round((score / maxScore) * 100);
}

// IMPORTANT: Export all functions
module.exports = {
  updatePersonalInfo,
  updateAddress,
  updateProfile,
  getHealthProfileStatus,
  getHealthProfile,
  updateHealthProfile,
  patchHealthProfile,
  updateCycleInfo,
  getHealthInsights
};