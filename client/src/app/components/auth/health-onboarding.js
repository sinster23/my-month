import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HealthOnboarding({ isOpen = true, onComplete, onSkip }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Health
    age: '',
    height: '',
    weight: '',
    
    // Lifestyle
    sleepHours: '',
    mealsPerDay: '',
    waterIntake: '',
    exerciseFrequency: '',
    
    // Menstrual Health
    cycleLength: '',
    periodDuration: '',
    lastPeriodDate: '',
    flowIntensity: '',
    cycleRegularity: '',
    symptomsExperienced: [],
    
    // Health Conditions
    medicalConditions: [],
    otherConditions: '',
    currentMedications: '',
    allergies: '',
    
    // Hygiene
    hygieneProducts: [],
    changeFrequency: '',
    
    // Mental Health
    stressLevel: '',
    moodTracking: false,
    
    // Goals
    healthGoals: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const toggleArrayField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const calculateBMI = () => {
    if (formData.height && formData.weight) {
      const heightInMeters = formData.height / 100;
      return (formData.weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return null;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${BACKEND_URL}/api/profile/health`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save profile');
      }

      if (onComplete) {
        onComplete();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (!isOpen) return null;

  const bmi = calculateBMI();

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-red-950/20 rounded-2xl shadow-2xl border border-red-900/30 my-8">
        <button
          onClick={onSkip}
          className="absolute top-4 right-4 z-50 p-2 hover:bg-red-600/20 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-red-500" />
        </button>

        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Complete Your Health Profile</h2>
            <p className="text-gray-400">Help us personalize your experience</p>
            <div className="flex gap-2 mt-4">
              {[1, 2, 3, 4, 5].map(step => (
                <div
                  key={step}
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    step <= currentStep ? 'bg-red-600' : 'bg-zinc-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Step 1: Basic Health */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Basic Health Information</h3>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleChange('age', e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-white"
                    placeholder="25"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Height (cm)</label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => handleChange('height', e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-white"
                    placeholder="165"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleChange('weight', e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-white"
                    placeholder="60"
                  />
                </div>
              </div>

              {bmi && (
                <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-lg">
                  <p className="text-sm text-gray-400">Your BMI: <span className="text-white font-semibold text-lg">{bmi}</span></p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Sleep Hours/Night</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.sleepHours}
                    onChange={(e) => handleChange('sleepHours', e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-white"
                    placeholder="7-8"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Meals Per Day</label>
                  <input
                    type="number"
                    value={formData.mealsPerDay}
                    onChange={(e) => handleChange('mealsPerDay', e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-white"
                    placeholder="3"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Water Intake (glasses/day)</label>
                  <input
                    type="number"
                    value={formData.waterIntake}
                    onChange={(e) => handleChange('waterIntake', e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-white"
                    placeholder="8"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Exercise Frequency</label>
                  <select
                    value={formData.exerciseFrequency}
                    onChange={(e) => handleChange('exerciseFrequency', e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-white"
                  >
                    <option value="">Select...</option>
                    <option value="none">None</option>
                    <option value="rarely">Rarely</option>
                    <option value="1-2_times_week">1-2 times/week</option>
                    <option value="3-4_times_week">3-4 times/week</option>
                    <option value="5+_times_week">5+ times/week</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Menstrual Health */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Menstrual Health</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Average Cycle Length (days)</label>
                  <input
                    type="number"
                    value={formData.cycleLength}
                    onChange={(e) => handleChange('cycleLength', e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-white"
                    placeholder="28"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Period Duration (days)</label>
                  <input
                    type="number"
                    value={formData.periodDuration}
                    onChange={(e) => handleChange('periodDuration', e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-white"
                    placeholder="5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Last Period Start Date</label>
                <input
                  type="date"
                  value={formData.lastPeriodDate}
                  onChange={(e) => handleChange('lastPeriodDate', e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Flow Intensity</label>
                  <select
                    value={formData.flowIntensity}
                    onChange={(e) => handleChange('flowIntensity', e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-white"
                  >
                    <option value="">Select...</option>
                    <option value="light">Light</option>
                    <option value="moderate">Moderate</option>
                    <option value="heavy">Heavy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Cycle Regularity</label>
                  <select
                    value={formData.cycleRegularity}
                    onChange={(e) => handleChange('cycleRegularity', e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-white"
                  >
                    <option value="">Select...</option>
                    <option value="regular">Regular</option>
                    <option value="irregular">Irregular</option>
                    <option value="very_irregular">Very Irregular</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">Common Symptoms (select all that apply)</label>
                <div className="grid grid-cols-2 gap-3">
                  {['cramps', 'bloating', 'mood_swings', 'fatigue', 'headaches', 'back_pain', 'breast_tenderness', 'acne', 'nausea', 'none'].map(symptom => (
                    <label key={symptom} className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.symptomsExperienced.includes(symptom)}
                        onChange={() => toggleArrayField('symptomsExperienced', symptom)}
                        className="w-4 h-4 rounded border-zinc-700 text-red-600 focus:ring-red-600 focus:ring-offset-0 bg-black/40"
                      />
                      <span className="text-sm">{symptom.replace('_', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Health Conditions */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Health Conditions</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">Medical Conditions (select all that apply)</label>
                <div className="grid grid-cols-2 gap-3">
                  {['pcos', 'pcod', 'endometriosis', 'thyroid', 'diabetes', 'anemia', 'hypertension', 'none', 'other'].map(condition => (
                    <label key={condition} className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.medicalConditions.includes(condition)}
                        onChange={() => toggleArrayField('medicalConditions', condition)}
                        className="w-4 h-4 rounded border-zinc-700 text-red-600 focus:ring-red-600 focus:ring-offset-0 bg-black/40"
                      />
                      <span className="text-sm uppercase">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.medicalConditions.includes('other') && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Please specify other conditions</label>
                  <input
                    type="text"
                    value={formData.otherConditions}
                    onChange={(e) => handleChange('otherConditions', e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-white"
                    placeholder="Enter condition name"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Current Medications</label>
                <textarea
                  value={formData.currentMedications}
                  onChange={(e) => handleChange('currentMedications', e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-white resize-none"
                  rows="3"
                  placeholder="List any medications you're currently taking..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Allergies</label>
                <textarea
                  value={formData.allergies}
                  onChange={(e) => handleChange('allergies', e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-white resize-none"
                  rows="2"
                  placeholder="List any known allergies..."
                />
              </div>
            </div>
          )}

          {/* Step 4: Hygiene & Stress */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Hygiene & Mental Wellbeing</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">Menstrual Products Used (select all that apply)</label>
                <div className="grid grid-cols-2 gap-3">
                  {['pads', 'tampons', 'menstrual_cup', 'period_underwear', 'cloth_pads'].map(product => (
                    <label key={product} className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hygieneProducts.includes(product)}
                        onChange={() => toggleArrayField('hygieneProducts', product)}
                        className="w-4 h-4 rounded border-zinc-700 text-red-600 focus:ring-red-600 focus:ring-offset-0 bg-black/40"
                      />
                      <span className="text-sm">{product.replace('_', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Product Change Frequency</label>
                <select
                  value={formData.changeFrequency}
                  onChange={(e) => handleChange('changeFrequency', e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-white"
                >
                  <option value="">Select...</option>
                  <option value="every_2-3_hours">Every 2-3 hours</option>
                  <option value="every_4-6_hours">Every 4-6 hours</option>
                  <option value="every_8_hours">Every 8 hours</option>
                  <option value="as_needed">As needed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Current Stress Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {['low', 'moderate', 'high'].map(level => (
                    <button
                      key={level}
                      onClick={() => handleChange('stressLevel', level)}
                      className={`px-4 py-3 rounded-lg border transition-all ${
                        formData.stressLevel === level
                          ? 'bg-red-600 border-red-600 text-white'
                          : 'bg-black/40 border-zinc-700 text-gray-300 hover:border-red-600'
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-3 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.moodTracking}
                    onChange={(e) => handleChange('moodTracking', e.target.checked)}
                    className="w-5 h-5 rounded border-zinc-700 text-red-600 focus:ring-red-600 focus:ring-offset-0 bg-black/40"
                  />
                  <span>I want to track my mood and emotions</span>
                </label>
              </div>
            </div>
          )}

          {/* Step 5: Goals */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Your Health Goals</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">What would you like to achieve? (select all that apply)</label>
                <div className="space-y-3">
                  {[
                    { value: 'track_cycle', label: 'Track my menstrual cycle accurately' },
                    { value: 'manage_symptoms', label: 'Better manage period symptoms' },
                    { value: 'improve_lifestyle', label: 'Improve overall lifestyle & wellness' },
                    { value: 'fertility_planning', label: 'Fertility planning & tracking' },
                    { value: 'manage_condition', label: 'Manage health conditions (PCOS, etc.)' },
                    { value: 'general_wellness', label: 'General health & wellness' }
                  ].map(goal => (
                    <label key={goal.value} className="flex items-start space-x-3 text-gray-300 cursor-pointer p-3 rounded-lg hover:bg-black/20 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.healthGoals.includes(goal.value)}
                        onChange={() => toggleArrayField('healthGoals', goal.value)}
                        className="w-5 h-5 rounded border-zinc-700 text-red-600 focus:ring-red-600 focus:ring-offset-0 bg-black/40 mt-0.5"
                      />
                      <span>{goal.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-red-900/20 to-pink-900/20 border border-red-800/50 rounded-lg">
                <p className="text-sm text-gray-300">
                  🌸 Based on your profile, we'll provide personalized insights, track your cycle, and offer guidance for your wellness journey.
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-zinc-800">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>

            <div className="text-sm text-gray-400">
              Step {currentStep} of 5
            </div>

            {currentStep < 5 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Complete Profile'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}