
import React, { useState } from 'react';

const steps = [
    { id: 'intro', title: "Let's personalize your plan" },
    { id: 'gender', title: "What describes you best?" },
    { id: 'stats', title: "Your Body Stats" },
    { id: 'activity', title: "How active are you?" },
    { id: 'bodyType', title: "What is your body type?" }, // Added body type before goal
    { id: 'goal', title: "What is your main goal?" },
];

export default function Interview({ onComplete }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        gender: 'male',
        age: '',
        height: '',
        weight: '',
        activity: 'sedentary',
        bodyType: 'mesomorph',
        goal: 'maintain'
    });

    const updateData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const next = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            onComplete(formData);
        }
    };

    const renderStep = () => {
        switch (steps[currentStep].id) {
            case 'intro':
                return (
                    <div className="text-center max-w-2xl mx-auto">
                        <h1 className="text-5xl font-bold mb-6 tracking-tight">Welcome to MacroMaster</h1>
                        <p className="text-slate-300 mb-12 text-xl leading-relaxed">
                            We'll calculate your precise nutritional needs in just a few seconds.
                            We calculate your maintenance level first, then adjust for your goals.
                        </p>
                        <button className="btn-primary transform hover:scale-105" onClick={next}>Start Analysis ➔</button>
                    </div>
                );

            case 'gender':
                return (
                    <div className="grid grid-cols-2 gap-6 w-full">
                        <button
                            className={`btn-option flex-col items-center justify-center p-12 gap-4 ${formData.gender === 'male' ? 'selected' : ''}`}
                            onClick={() => { updateData('gender', 'male'); next(); }}
                        >
                            <span className="text-6xl">♂</span>
                            <span className="text-2xl font-bold">Male</span>
                        </button>
                        <button
                            className={`btn-option flex-col items-center justify-center p-12 gap-4 ${formData.gender === 'female' ? 'selected' : ''}`}
                            onClick={() => { updateData('gender', 'female'); next(); }}
                        >
                            <span className="text-6xl">♀</span>
                            <span className="text-2xl font-bold">Female</span>
                        </button>
                    </div>
                );

            case 'stats':
                return (
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Age</label>
                            <input
                                type="number"
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
                                value={formData.age}
                                onChange={(e) => updateData('age', e.target.value)}
                                placeholder="25"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Height (cm)</label>
                            <input
                                type="number"
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
                                value={formData.height}
                                onChange={(e) => updateData('height', e.target.value)}
                                placeholder="175"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Weight (kg)</label>
                            <input
                                type="number"
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
                                value={formData.weight}
                                onChange={(e) => updateData('weight', e.target.value)}
                                placeholder="70"
                            />
                        </div>
                        <button
                            className="btn-primary mt-4"
                            onClick={next}
                            disabled={!formData.age || !formData.height || !formData.weight}
                        >
                            Next Step
                        </button>
                    </div>
                );

            case 'activity':
                return (
                    <div className="flex flex-col gap-3">
                        {[
                            { val: 'sedentary', label: 'Sedentary (Office job, little exercise)' },
                            { val: 'light', label: 'Lightly Active (1-3 days/week)' },
                            { val: 'moderate', label: 'Moderately Active (3-5 days/week)' },
                            { val: 'active', label: 'Very Active (6-7 days/week)' },
                            { val: 'very_active', label: 'Super Active (Physical job + training)' }
                        ].map(opt => (
                            <button
                                key={opt.val}
                                className={`btn-option ${formData.activity === opt.val ? 'selected' : ''}`}
                                onClick={() => { updateData('activity', opt.val); next(); }}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                );

            case 'bodyType':
                return (
                    <div className="flex flex-col gap-3">
                        <p className="text-sm text-slate-400 mb-2">This helps us tailor food suggestions.</p>
                        {[
                            { val: 'ectomorph', label: 'Ectomorph (Lean, hard to gain weight)' },
                            { val: 'mesomorph', label: 'Mesomorph (Athletic, easily gains muscle)' },
                            { val: 'endomorph', label: 'Endomorph (Soft, easily gains fat)' },
                        ].map(opt => (
                            <button
                                key={opt.val}
                                className={`btn-option ${formData.bodyType === opt.val ? 'selected' : ''}`}
                                onClick={() => { updateData('bodyType', opt.val); next(); }}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                );

            case 'goal':
                return (
                    <div className="flex flex-col gap-3">
                        {[
                            { val: 'lose', label: 'Lose Weight (-400 kcal)' },
                            { val: 'maintain', label: 'Maintain Weight' },
                            { val: 'gain', label: 'Gain Muscle (+400 kcal)' },
                        ].map(opt => (
                            <button
                                key={opt.val}
                                className={`btn-option ${formData.goal === opt.val ? 'selected' : ''}`}
                                onClick={() => { updateData('goal', opt.val); next(); }}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto glass-panel fade-in p-8 md:p-12 flex flex-col justify-center min-h-[400px]">
            {/* Progress Bar */}
            {currentStep > 0 && (
                <div className="w-full bg-slate-800 h-1 mb-8 rounded-full overflow-hidden">
                    <div
                        className="bg-purple-500 h-full transition-all duration-500 ease-out"
                        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                    ></div>
                </div>
            )}

            <div className="flex-grow flex flex-col justify-center text-center w-full">
                {currentStep > 0 && (
                    <h2 className="text-3xl font-bold text-white mb-8">
                        {steps[currentStep].title}
                    </h2>
                )}
                {renderStep()}
            </div>
        </div>
    );
}
