
export const calculateBMR = (weight, height, age, gender) => {
  // Mifflin-St Jeor Equation
  // Weight in kg, Height in cm, Age in years
  let bmr = 10 * weight + 6.25 * height - 5 * age;
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }
  return bmr;
};

export const calculateTDEE = (bmr, activityLevel) => {
  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };
  return bmr * (multipliers[activityLevel] || 1.2);
};

export const getGoalCalories = (tdee, goal) => {
  // Always return maintenance first, then adjusted
  const adjustment = 400; // Average of 300-500
  let target = tdee;
  
  if (goal === 'lose') target -= adjustment;
  if (goal === 'gain') target += adjustment;
  
  return {
    maintenance: Math.round(tdee),
    target: Math.round(target),
    difference: goal === 'maintain' ? 0 : (goal === 'lose' ? -adjustment : adjustment)
  };
};

export const calculateBMI = (weight, heightCm) => {
  const heightM = heightCm / 100;
  return (weight / (heightM * heightM)).toFixed(1);
};
