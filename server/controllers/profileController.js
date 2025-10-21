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

// IMPORTANT: Export all functions
module.exports = {
  updatePersonalInfo,
  updateAddress,
  updateProfile
};