
import React from 'react';
import { calculateBMI, calculateBMR, calculateTDEE, getGoalCalories } from '../utils/logic';
import { FOOD_SUGGESTIONS } from '../utils/data';

export default function Dashboard({ userData, onReset }) {
    const { weight, height, age, gender, activity, goal, bodyType } = userData;

    const bmr = calculateBMR(weight, height, age, gender);
    const tdee = calculateTDEE(bmr, activity);
    const calories = getGoalCalories(tdee, goal);
    const bmi = calculateBMI(weight, height);

    const getBMICategory = (bmi) => {
        if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-400' };
        if (bmi < 25) return { label: 'Normal', color: 'text-green-400' };
        if (bmi < 30) return { label: 'Overweight', color: 'text-orange-400' };
        return { label: 'Obese', color: 'text-red-400' };
    };

    const bmiCat = getBMICategory(bmi);

    return (
        <div className="w-full max-w-5xl fade-in mx-auto flex flex-col items-center justify-center min-h-[60vh]">

            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">Your Personal Blueprint</h1>
                <button
                    onClick={onReset}
                    className="text-slate-400 hover:text-white underline text-sm mt-2 transition-colors"
                >
                    ↻ Retake Analysis
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* Square 1: BMI */}
                <div className="glass-panel p-8 flex flex-col items-center justify-center text-center aspect-square md:aspect-auto md:h-96 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                    <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest mb-4">Body Mass Index</h3>
                    <div className="text-8xl font-black text-white mb-2 tracking-tighter group-hover:scale-105 transition-transform">{bmi}</div>
                    <div className={`text-2xl font-bold px-4 py-1 rounded-full bg-white/5 ${bmiCat.color}`}>{bmiCat.label}</div>
                </div>

                {/* Square 2: Calories */}
                <div className="glass-panel p-8 flex flex-col items-center justify-center text-center aspect-square md:aspect-auto md:h-96 relative overflow-hidden group hover:border-pink-500/30 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest mb-6">Daily Target</h3>

                    <div className="mb-4">
                        <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-200 to-pink-400 group-hover:scale-105 transition-transform inline-block">
                            {calories.target}
                        </span>
                        <span className="text-xl text-slate-400 ml-2">kcal</span>
                    </div>

                    <div className="flex flex-col gap-1 text-sm text-slate-400 bg-white/5 p-4 rounded-xl w-full max-w-xs">
                        <div className="flex justify-between">
                            <span>Maintenance:</span>
                            <span className="text-white font-mono">{calories.maintenance}</span>
                        </div>
                        <div className="flex justify-between border-t border-white/10 pt-1 mt-1">
                            <span>Goal ({goal}):</span>
                            <span className="text-purple-300 font-mono">{calories.difference > 0 ? '+' : ''}{calories.difference}</span>
                        </div>
                    </div>
                </div>

                {/* Square 3: Eat */}
                <div className="glass-panel p-8 flex flex-col relative overflow-hidden md:h-96 hover:border-green-500/30 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-400"></div>
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <span className="text-2xl">✅</span>
                        <h3 className="text-xl font-bold text-green-400 uppercase tracking-widest">Prioritize</h3>
                    </div>
                    <div className="overflow-y-auto custom-scrollbar flex-grow pr-2 space-y-4 text-center">
                        {FOOD_SUGGESTIONS.eat.map((group, idx) => (
                            <div key={idx}>
                                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">{group.category}</h4>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {group.items.map(item => (
                                        <span key={item} className="px-3 py-1 bg-green-500/5 text-green-300 rounded-md text-sm border border-green-500/10">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Square 4: Avoid */}
                <div className="glass-panel p-8 flex flex-col relative overflow-hidden md:h-96 hover:border-red-500/30 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-400"></div>
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <span className="text-2xl">❌</span>
                        <h3 className="text-xl font-bold text-red-400 uppercase tracking-widest">Minimize</h3>
                    </div>
                    <div className="overflow-y-auto custom-scrollbar flex-grow pr-2 space-y-4 text-center">
                        {FOOD_SUGGESTIONS.avoid.map((group, idx) => (
                            <div key={idx}>
                                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">{group.category}</h4>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {group.items.map(item => (
                                        <span key={item} className="px-3 py-1 bg-red-500/5 text-red-300 rounded-md text-sm border border-red-500/10">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
