// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware'); // Adjust path to your auth middleware
const { 
  updatePersonalInfo, 
  updateAddress, 
  updateProfile,
  getHealthProfileStatus, 
  getHealthProfile, 
  updateHealthProfile, 
  patchHealthProfile, 
  updateCycleInfo,  
  getHealthInsights
} = require('../controllers/profileController'); // Make sure path is correct

// Protected routes - require authentication
router.put('/personal', authMiddleware, updatePersonalInfo);
router.put('/address', authMiddleware, updateAddress);
router.put('/', authMiddleware, updateProfile);
router.get('/health/status', authMiddleware, getHealthProfileStatus);

// Get user's health profile
router.get('/health', authMiddleware, getHealthProfile);

// Create or update complete health profile (onboarding)
router.post('/health', authMiddleware, updateHealthProfile);

// Update specific health profile fields
router.patch('/health', authMiddleware, patchHealthProfile);

// Update cycle information specifically
router.put('/health/cycle', authMiddleware, updateCycleInfo);

// Get health insights (next period, fertility window, recommendations)
router.get('/health/insights', authMiddleware, getHealthInsights);

module.exports = router;