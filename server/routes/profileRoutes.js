// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware'); // Adjust path to your auth middleware
const { 
  updatePersonalInfo, 
  updateAddress, 
  updateProfile 
} = require('../controllers/profileController'); // Make sure path is correct

// Protected routes - require authentication
router.put('/personal', authMiddleware, updatePersonalInfo);
router.put('/address', authMiddleware, updateAddress);
router.put('/', authMiddleware, updateProfile);

module.exports = router;