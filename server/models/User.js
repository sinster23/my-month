const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  phone: { type: String, default: '' },
  bio: { type: String, default: '' },
  address: {
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    pinCode: { type: String, default: '' },
    country: { type: String, default: 'India' }
  },
  
  // Health Information
  healthProfile: {
    isComplete: { type: Boolean, default: false },
    
    // Basic Health Metrics
    age: { type: Number },
    height: { type: Number }, // in cm
    weight: { type: Number }, // in kg
    bmi: { type: Number },
    
    // Lifestyle
    sleepHours: { type: Number }, // average hours per night
    mealsPerDay: { type: Number },
    waterIntake: { type: Number }, // glasses per day
    exerciseFrequency: { 
      type: String, 
      enum: ['none', 'rarely', '1-2_times_week', '3-4_times_week', '5+_times_week'] 
    },
    
    // Menstrual Health
    cycleLength: { type: Number }, // average days
    periodDuration: { type: Number }, // days
    lastPeriodDate: { type: Date },
    flowIntensity: { 
      type: String, 
      enum: ['light', 'moderate', 'heavy'] 
    },
    cycleRegularity: {
      type: String,
      enum: ['regular', 'irregular', 'very_irregular']
    },
    symptomsExperienced: [{
      type: String,
      enum: ['cramps', 'bloating', 'mood_swings', 'fatigue', 'headaches', 
             'back_pain', 'breast_tenderness', 'acne', 'nausea', 'none']
    }],
    
    // Health Conditions
    medicalConditions: [{
      type: String,
      enum: ['pcos', 'pcod', 'endometriosis', 'thyroid', 'diabetes', 
             'anemia', 'hypertension', 'none', 'other']
    }],
    otherConditions: { type: String, default: '' },
    currentMedications: { type: String, default: '' },
    allergies: { type: String, default: '' },
    
    // Hygiene Habits
    hygieneProducts: [{
      type: String,
      enum: ['pads', 'tampons', 'menstrual_cup', 'period_underwear', 'cloth_pads']
    }],
    changeFrequency: {
      type: String,
      enum: ['every_2-3_hours', 'every_4-6_hours', 'every_8_hours', 'as_needed']
    },
    
    // Stress & Mental Health
    stressLevel: {
      type: String,
      enum: ['low', 'moderate', 'high']
    },
    moodTracking: { type: Boolean, default: false },
    
    // Goals
    healthGoals: [{
      type: String,
      enum: ['track_cycle', 'manage_symptoms', 'improve_lifestyle', 
             'fertility_planning', 'manage_condition', 'general_wellness']
    }]
  },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Calculate BMI before saving
userSchema.pre('save', function(next) {
  if (this.healthProfile.height && this.healthProfile.weight) {
    const heightInMeters = this.healthProfile.height / 100;
    this.healthProfile.bmi = parseFloat(
      (this.healthProfile.weight / (heightInMeters * heightInMeters)).toFixed(1)
    );
  }
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);