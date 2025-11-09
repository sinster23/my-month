import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Edit2, Save, X, Heart, Activity, Droplet, Moon, 
  Apple, Dumbbell, Brain, AlertCircle, Pill, Shield,
  Calendar, TrendingUp, Award, Info
} from 'lucide-react';

export default function HealthProfileTab() {
  const [healthProfile, setHealthProfile] = useState(null);
  const [insights, setInsights] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    sleepHours: '',
    mealsPerDay: '',
    waterIntake: '',
    exerciseFrequency: '',
    cycleLength: '',
    periodDuration: '',
    lastPeriodDate: '',
    flowIntensity: '',
    cycleRegularity: '',
    symptomsExperienced: [],
    medicalConditions: [],
    otherConditions: '',
    currentMedications: '',
    allergies: '',
    hygieneProducts: [],
    changeFrequency: '',
    stressLevel: '',
    moodTracking: false,
    healthGoals: []
  });

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchHealthProfile();
    fetchHealthInsights();
  }, []);

  const fetchHealthProfile = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/profile/health`, {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        if (data.healthProfile) {
          setHealthProfile(data.healthProfile);
          setFormData({
            age: data.healthProfile.age || '',
            height: data.healthProfile.height || '',
            weight: data.healthProfile.weight || '',
            sleepHours: data.healthProfile.sleepHours || '',
            mealsPerDay: data.healthProfile.mealsPerDay || '',
            waterIntake: data.healthProfile.waterIntake || '',
            exerciseFrequency: data.healthProfile.exerciseFrequency || '',
            cycleLength: data.healthProfile.cycleLength || '',
            periodDuration: data.healthProfile.periodDuration || '',
            lastPeriodDate: data.healthProfile.lastPeriodDate?.split('T')[0] || '',
            flowIntensity: data.healthProfile.flowIntensity || '',
            cycleRegularity: data.healthProfile.cycleRegularity || '',
            symptomsExperienced: data.healthProfile.symptomsExperienced || [],
            medicalConditions: data.healthProfile.medicalConditions || [],
            otherConditions: data.healthProfile.otherConditions || '',
            currentMedications: data.healthProfile.currentMedications || '',
            allergies: data.healthProfile.allergies || '',
            hygieneProducts: data.healthProfile.hygieneProducts || [],
            changeFrequency: data.healthProfile.changeFrequency || '',
            stressLevel: data.healthProfile.stressLevel || '',
            moodTracking: data.healthProfile.moodTracking || false,
            healthGoals: data.healthProfile.healthGoals || []
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch health profile:', error);
    }
  };

  const fetchHealthInsights = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/profile/health/insights`, {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setInsights(data.insights);
      }
    } catch (error) {
      console.error('Failed to fetch insights:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/profile/health`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setHealthProfile(data.healthProfile);
        setIsEditing(false);
        showMessage('success', 'Health profile updated successfully!');
        fetchHealthInsights(); // Refresh insights
      } else {
        showMessage('error', data.message || 'Failed to update profile');
      }
    } catch (error) {
      showMessage('error', 'An error occurred while updating');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const toggleArrayField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const getBMICategory = (bmi) => {
    if (!bmi) return { text: 'N/A', color: 'gray' };
    if (bmi < 18.5) return { text: 'Underweight', color: 'blue' };
    if (bmi < 25) return { text: 'Normal', color: 'green' };
    if (bmi < 30) return { text: 'Overweight', color: 'yellow' };
    return { text: 'Obese', color: 'red' };
  };

  const getHealthScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  if (!healthProfile || !healthProfile.isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16"
      >
        <div className="w-20 h-20 rounded-full bg-red-600/10 flex items-center justify-center mb-6">
          <Heart className="w-10 h-10 text-red-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Complete Your Health Profile</h3>
        <p className="text-gray-400 text-center max-w-md mb-6">
          Set up your health profile to get personalized insights and track your wellness journey.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all"
        >
          Complete Profile
        </button>
      </motion.div>
    );
  }

  const bmiCategory = getBMICategory(healthProfile.bmi);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Success/Error Message */}
      <AnimatePresence>
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-500/10 border border-green-500/30 text-green-500'
                : 'bg-red-500/10 border border-red-500/30 text-red-500'
            }`}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Health Profile</h2>
          <p className="text-gray-400">Track and manage your wellness journey</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
        >
          {isEditing ? (
            <>
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4" />
              <span>Edit</span>
            </>
          )}
        </button>
      </div>

      {/* Health Score & Insights */}
      {insights && !isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-red-600/20 to-red-700/20 border border-red-600/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-8 h-8 text-red-500" />
              <span className={`text-3xl font-bold ${getHealthScoreColor(insights.healthScore)}`}>
                {insights.healthScore}%
              </span>
            </div>
            <p className="text-gray-300 text-sm">Health Score</p>
          </div>

          {insights.nextPeriodDate && (
            <div className="bg-gradient-to-br from-pink-600/20 to-pink-700/20 border border-pink-600/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="w-8 h-8 text-pink-500" />
                <span className="text-lg font-bold text-white">
                  {insights.daysUntilNextPeriod > 0 ? `${insights.daysUntilNextPeriod} days` : 'Today'}
                </span>
              </div>
              <p className="text-gray-300 text-sm">Until Next Period</p>
            </div>
          )}

          {healthProfile.bmi && (
            <div className={`bg-gradient-to-br from-${bmiCategory.color}-600/20 to-${bmiCategory.color}-700/20 border border-${bmiCategory.color}-600/30 rounded-xl p-6`}>
              <div className="flex items-center justify-between mb-2">
                <Activity className="w-8 h-8 text-white" />
                <span className="text-lg font-bold text-white">{healthProfile.bmi}</span>
              </div>
              <p className="text-gray-300 text-sm">BMI - {bmiCategory.text}</p>
            </div>
          )}
        </div>
      )}

      {/* Recommendations */}
      {insights?.recommendations && insights.recommendations.length > 0 && !isEditing && (
        <div className="bg-blue-600/10 border border-blue-600/30 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-white font-semibold mb-2">Personalized Recommendations</h3>
              <ul className="space-y-2">
                {insights.recommendations.map((rec, index) => (
                  <li key={index} className="text-gray-300 text-sm">• {rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Basic Health Metrics */}
      <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-semibold text-white">Basic Health Metrics</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Age</label>
            {isEditing ? (
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600"
              />
            ) : (
              <p className="text-white">{healthProfile.age} years</p>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Height</label>
            {isEditing ? (
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600"
              />
            ) : (
              <p className="text-white">{healthProfile.height} cm</p>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Weight</label>
            {isEditing ? (
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600"
              />
            ) : (
              <p className="text-white">{healthProfile.weight} kg</p>
            )}
          </div>
        </div>
      </div>

      {/* Lifestyle */}
      <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Dumbbell className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-semibold text-white">Lifestyle</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
              <Moon className="w-4 h-4" /> Sleep Hours/Night
            </label>
            {isEditing ? (
              <input
                type="number"
                step="0.5"
                value={formData.sleepHours}
                onChange={(e) => setFormData({ ...formData, sleepHours: e.target.value })}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600"
              />
            ) : (
              <p className="text-white">{healthProfile.sleepHours || 'Not set'} hours</p>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
              <Apple className="w-4 h-4" /> Meals Per Day
            </label>
            {isEditing ? (
              <input
                type="number"
                value={formData.mealsPerDay}
                onChange={(e) => setFormData({ ...formData, mealsPerDay: e.target.value })}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600"
              />
            ) : (
              <p className="text-white">{healthProfile.mealsPerDay || 'Not set'} meals</p>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
              <Droplet className="w-4 h-4" /> Water Intake (glasses/day)
            </label>
            {isEditing ? (
              <input
                type="number"
                value={formData.waterIntake}
                onChange={(e) => setFormData({ ...formData, waterIntake: e.target.value })}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600"
              />
            ) : (
              <p className="text-white">{healthProfile.waterIntake || 'Not set'} glasses</p>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Exercise Frequency</label>
            {isEditing ? (
              <select
                value={formData.exerciseFrequency}
                onChange={(e) => setFormData({ ...formData, exerciseFrequency: e.target.value })}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600"
              >
                <option value="">Select...</option>
                <option value="none">None</option>
                <option value="rarely">Rarely</option>
                <option value="1-2_times_week">1-2 times/week</option>
                <option value="3-4_times_week">3-4 times/week</option>
                <option value="5+_times_week">5+ times/week</option>
              </select>
            ) : (
              <p className="text-white">{healthProfile.exerciseFrequency?.replace(/_/g, ' ') || 'Not set'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Menstrual Health */}
      <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-semibold text-white">Menstrual Health</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Cycle Length</label>
            {isEditing ? (
              <input
                type="number"
                value={formData.cycleLength}
                onChange={(e) => setFormData({ ...formData, cycleLength: e.target.value })}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600"
                placeholder="28"
              />
            ) : (
              <p className="text-white">{healthProfile.cycleLength || 'Not set'} days</p>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Period Duration</label>
            {isEditing ? (
              <input
                type="number"
                value={formData.periodDuration}
                onChange={(e) => setFormData({ ...formData, periodDuration: e.target.value })}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600"
                placeholder="5"
              />
            ) : (
              <p className="text-white">{healthProfile.periodDuration || 'Not set'} days</p>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Last Period Date</label>
            {isEditing ? (
              <input
                type="date"
                value={formData.lastPeriodDate}
                onChange={(e) => setFormData({ ...formData, lastPeriodDate: e.target.value })}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600"
              />
            ) : (
              <p className="text-white">
                {healthProfile.lastPeriodDate
                  ? new Date(healthProfile.lastPeriodDate).toLocaleDateString()
                  : 'Not set'}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Flow Intensity</label>
            {isEditing ? (
              <select
                value={formData.flowIntensity}
                onChange={(e) => setFormData({ ...formData, flowIntensity: e.target.value })}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600"
              >
                <option value="">Select...</option>
                <option value="light">Light</option>
                <option value="moderate">Moderate</option>
                <option value="heavy">Heavy</option>
              </select>
            ) : (
              <p className="text-white capitalize">{healthProfile.flowIntensity || 'Not set'}</p>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Cycle Regularity</label>
            {isEditing ? (
              <select
                value={formData.cycleRegularity}
                onChange={(e) => setFormData({ ...formData, cycleRegularity: e.target.value })}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600"
              >
                <option value="">Select...</option>
                <option value="regular">Regular</option>
                <option value="irregular">Irregular</option>
                <option value="very_irregular">Very Irregular</option>
              </select>
            ) : (
              <p className="text-white capitalize">{healthProfile.cycleRegularity?.replace('_', ' ') || 'Not set'}</p>
            )}
          </div>
        </div>

        {/* Symptoms */}
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Common Symptoms</label>
          {isEditing ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {['cramps', 'bloating', 'mood_swings', 'fatigue', 'headaches', 'back_pain', 'breast_tenderness', 'acne', 'nausea'].map(symptom => (
                <label key={symptom} className="flex items-center space-x-2 text-gray-300 cursor-pointer p-2 rounded hover:bg-zinc-800/50">
                  <input
                    type="checkbox"
                    checked={formData.symptomsExperienced.includes(symptom)}
                    onChange={() => toggleArrayField('symptomsExperienced', symptom)}
                    className="w-4 h-4 rounded border-zinc-700 text-red-600 focus:ring-red-600"
                  />
                  <span className="text-sm">{symptom.replace('_', ' ')}</span>
                </label>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {healthProfile.symptomsExperienced?.length > 0 ? (
                healthProfile.symptomsExperienced.map(symptom => (
                  <span key={symptom} className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm">
                    {symptom.replace('_', ' ')}
                  </span>
                ))
              ) : (
                <p className="text-white">None reported</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Medical Conditions */}
      <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-semibold text-white">Medical Conditions</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Diagnosed Conditions</label>
            {isEditing ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['pcos', 'pcod', 'endometriosis', 'thyroid', 'diabetes', 'anemia', 'hypertension'].map(condition => (
                  <label key={condition} className="flex items-center space-x-2 text-gray-300 cursor-pointer p-2 rounded hover:bg-zinc-800/50">
                    <input
                      type="checkbox"
                      checked={formData.medicalConditions.includes(condition)}
                      onChange={() => toggleArrayField('medicalConditions', condition)}
                      className="w-4 h-4 rounded border-zinc-700 text-red-600 focus:ring-red-600"
                    />
                    <span className="text-sm uppercase">{condition}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {healthProfile.medicalConditions?.length > 0 ? (
                  healthProfile.medicalConditions.map(condition => (
                    <span key={condition} className="px-3 py-1 bg-orange-600/20 text-orange-400 rounded-full text-sm uppercase">
                      {condition}
                    </span>
                  ))
                ) : (
                  <p className="text-white">None</p>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
              <Pill className="w-4 h-4" /> Current Medications
            </label>
            {isEditing ? (
              <textarea
                value={formData.currentMedications}
                onChange={(e) => setFormData({ ...formData, currentMedications: e.target.value })}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600 resize-none"
                rows="2"
                placeholder="List medications..."
              />
            ) : (
              <p className="text-white">{healthProfile.currentMedications || 'None'}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Allergies
            </label>
            {isEditing ? (
              <textarea
                value={formData.allergies}
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600 resize-none"
                rows="2"
                placeholder="List allergies..."
              />
            ) : (
              <p className="text-white">{healthProfile.allergies || 'None'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Mental Wellbeing */}
      <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-semibold text-white">Mental Wellbeing</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Stress Level</label>
            {isEditing ? (
              <div className="grid grid-cols-3 gap-2">
                {['low', 'moderate', 'high'].map(level => (
                  <button
                    key={level}
                    onClick={() => setFormData({ ...formData, stressLevel: level })}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      formData.stressLevel === level
                        ? 'bg-red-600 border-red-600 text-white'
                        : 'bg-zinc-800/50 border-zinc-700 text-gray-300 hover:border-red-600'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-white capitalize">{healthProfile.stressLevel || 'Not set'}</p>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Mood Tracking</label>
            {isEditing ? (
              <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.moodTracking}
                  onChange={(e) => setFormData({ ...formData, moodTracking: e.target.checked })}
                  className="w-5 h-5 rounded border-zinc-700 text-red-600 focus:ring-red-600"
                />
                <span>Enable mood tracking</span>
              </label>
            ) : (
              <p className="text-white">{healthProfile.moodTracking ? 'Enabled' : 'Disabled'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Health Goals */}
      <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-semibold text-white">Health Goals</h3>
        </div>
        {isEditing ? (
          <div className="space-y-2">
            {[
              { value: 'track_cycle', label: 'Track menstrual cycle accurately' },
              { value: 'manage_symptoms', label: 'Better manage period symptoms' },
              { value: 'improve_lifestyle', label: 'Improve overall lifestyle & wellness' },
              { value: 'fertility_planning', label: 'Fertility planning & tracking' },
              { value: 'manage_condition', label: 'Manage health conditions (PCOS, etc.)' },
              { value: 'general_wellness', label: 'General health & wellness' }
            ].map(goal => (
              <label key={goal.value} className="flex items-start space-x-3 text-gray-300 cursor-pointer p-3 rounded-lg hover:bg-zinc-800/50">
                <input
                  type="checkbox"
                  checked={formData.healthGoals.includes(goal.value)}
                  onChange={() => toggleArrayField('healthGoals', goal.value)}
                  className="w-5 h-5 rounded border-zinc-700 text-red-600 focus:ring-red-600 mt-0.5"
                />
                <span>{goal.label}</span>
              </label>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {healthProfile.healthGoals?.length > 0 ? (
              healthProfile.healthGoals.map(goal => (
                <span key={goal} className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm">
                  {goal.replace(/_/g, ' ')}
                </span>
              ))
            ) : (
              <p className="text-white">No goals set</p>
            )}
          </div>
        )}
      </div>

      {/* Hygiene Practices */}
      <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-semibold text-white">Hygiene Practices</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Menstrual Products Used</label>
            {isEditing ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['pads', 'tampons', 'menstrual_cup', 'period_underwear', 'cloth_pads'].map(product => (
                  <label key={product} className="flex items-center space-x-2 text-gray-300 cursor-pointer p-2 rounded hover:bg-zinc-800/50">
                    <input
                      type="checkbox"
                      checked={formData.hygieneProducts.includes(product)}
                      onChange={() => toggleArrayField('hygieneProducts', product)}
                      className="w-4 h-4 rounded border-zinc-700 text-red-600 focus:ring-red-600"
                    />
                    <span className="text-sm">{product.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {healthProfile.hygieneProducts?.length > 0 ? (
                  healthProfile.hygieneProducts.map(product => (
                    <span key={product} className="px-3 py-1 bg-teal-600/20 text-teal-400 rounded-full text-sm">
                      {product.replace('_', ' ')}
                    </span>
                  ))
                ) : (
                  <p className="text-white">Not specified</p>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Change Frequency</label>
            {isEditing ? (
              <select
                value={formData.changeFrequency}
                onChange={(e) => setFormData({ ...formData, changeFrequency: e.target.value })}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600"
              >
                <option value="">Select...</option>
                <option value="every_2-3_hours">Every 2-3 hours</option>
                <option value="every_4-6_hours">Every 4-6 hours</option>
                <option value="every_8_hours">Every 8 hours</option>
                <option value="as_needed">As needed</option>
              </select>
            ) : (
              <p className="text-white">{healthProfile.changeFrequency?.replace(/_/g, ' ') || 'Not set'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex gap-3"
          >
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                fetchHealthProfile(); // Reset form
              }}
              disabled={loading}
              className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
            >
              Cancel
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}