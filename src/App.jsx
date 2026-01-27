
import React, { useState } from 'react';
import Interview from './components/Interview';
import Dashboard from './components/Dashboard';

function App() {
    const [view, setView] = useState('interview'); // interview, dashboard
    const [userData, setUserData] = useState(null);

    const handleInterviewComplete = (data) => {
        // Convert string inputs to numbers
        const processedData = {
            ...data,
            age: parseInt(data.age),
            height: parseInt(data.height),
            weight: parseFloat(data.weight),
        };
        setUserData(processedData);
        setView('dashboard');
    };

    const handleReset = () => {
        setUserData(null);
        setView('interview');
    };

    return (
        <div className="app-wrapper min-h-screen flex flex-col font-outfit text-white">
            <nav className="fixed top-0 left-0 w-full p-8 flex justify-center z-10 bg-gradient-to-b from-slate-900/90 to-transparent">
                <div className="flex flex-col items-center animate-pulse-slow">
                    <span className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-white tracking-widest drop-shadow-2xl">
                        MACRO<span className="font-light text-white opacity-90">MASTER</span>
                    </span>
                    <div className="h-1 w-24 bg-gradient-to-r from-transparent via-purple-500 to-transparent mt-2 rounded-full"></div>
                </div>
            </nav>

            <main className="flex-grow flex flex-col items-center justify-center px-4 py-32 w-full">
                <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
                    {view === 'interview' && (
                        <Interview onComplete={handleInterviewComplete} />
                    )}

                    {view === 'dashboard' && userData && (
                        <Dashboard userData={userData} onReset={handleReset} />
                    )}
                </div>
            </main>
        </div>
    );
}

export default App;
