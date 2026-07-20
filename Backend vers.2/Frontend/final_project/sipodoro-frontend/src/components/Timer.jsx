import { useState, useEffect, useRef } from 'react';
import { RotateCcw, Settings, X } from 'lucide-react';
import { startCycle, completeFocusSession, completeBreak } from "../api/pomodoroApi";

import logoImg from '../assets/image/logo.jpg';

export default function Timer({ onNavigate, onLogout, isLoggedIn, username, visible }) {
  // 1. Core Timer Configuration States
  const [durations, setDurations] = useState({
    focus: 25,
    shortBreak: 5
  });

  // 2. Active Mode Management
  const [currentMode, setCurrentMode] = useState('focus'); 
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cycleId, setCycleId] = useState(null);
  const [timerFinished, setTimerFinished] = useState(false);


  const [customFocus, setCustomFocus] = useState(25);
  const [customShort, setCustomShort] = useState(5);

  const timerRef = useRef(null);
  

  // Reset or switch mode
  const changeMode = (mode, updatedDurations = durations) => {
    setCurrentMode(mode);
    setIsRunning(false);
    setTimeLeft(updatedDurations[mode] * 60);
    setTimerFinished(false);
  };

  // Main countdown interval management
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            setTimerFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, currentMode, durations]);

  // Handle async API calls when timer finishes
  useEffect(() => {
    if (!timerFinished) return;

    const handleCompletion = async () => {
      try {
        if (currentMode === "focus") {
          const response = await completeFocusSession(cycleId);
          if (
            response.data.completed_focus_sessions >= 1 &&
            response.data.completed_break >= 1
          ) {
            alert("🎉 Pomodoro cycle completed! +1 Streak");
            setCycleId(null);
          }
          alert("Focus session completed!");
        } else {
          const response = await completeBreak(cycleId);
          if (
            response.data.completed_focus_sessions >= 1 &&
            response.data.completed_break >= 1
          ) {
            alert("🎉 Pomodoro cycle completed! +1 Streak");
            setCycleId(null);
          }
          alert("Break completed!");
        }
      } catch (error) {
        console.error(error);
      }
      setTimerFinished(false);
    };

    handleCompletion();
  }, [timerFinished, currentMode, cycleId]);

  // Format seconds to text view (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle saving customized settings
  const handleSaveSettings = (e) => {
    e.preventDefault();
    const nextDurations = {
      ...durations,
      focus: Number(customFocus),
      shortBreak: Number(customShort)
    };
    setDurations(nextDurations);
    setShowSettings(false);
    changeMode(currentMode, nextDurations);
  };

  // Reset current timer state
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(durations[currentMode] * 60);
  };

  const colors = {
    bg: '#FAF6E3',
    primaryRed: '#D32F44',
    fadedRed: '#F4DCDD',
    textDark: '#000000',
    textRed: '#D32F44',
    accentRed: '#D32F2F',
    maroon: '#80002A'
  };

  return (
    <div style={{ 
      display: visible ? 'flex' : 'none',
      flexDirection: 'column',
      fontFamily: '"Comic Sans MS", "Chalkboard SE", "Arial", sans-serif', 
      backgroundColor: colors.bg, 
      minHeight: '100vh', 
      justifyContent: 'space-between',
      position: 'relative',
      boxSizing: 'border-box'
    }}>
      
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 60px', backgroundColor: colors.bg }}>
        <div>
          <img
            src={logoImg}
            alt="Sipodoro Logo"
            style={{ height: '40px', width: 'auto', display: 'block', cursor: 'pointer' }}
            onClick={() => onNavigate && onNavigate('home')}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentNode.innerHTML = '<span style="font-size:30px;cursor:pointer;">🍅</span>';
              e.target.parentNode.onclick = () => onNavigate && onNavigate('home');
            }}
          />
        </div>

        <div style={{ fontFamily:'Poppins_Regular', display: 'flex', gap: '32px', alignItems: 'center' }}>
          <button onClick={() => onNavigate && onNavigate('home')} style={navButtonStyle}>Home</button>
          <button onClick={() => onNavigate && onNavigate('about')} style={navButtonStyle}>About us</button>
          <button onClick={() => onNavigate && onNavigate('tasks')} style={navButtonStyle}>Task</button>
          <button onClick={() => onNavigate && onNavigate('timer')} style={{ ...navButtonStyle, fontFamily:'Poppins_Bold' }}>Pomodoro</button>
          <button onClick={() => onNavigate && onNavigate('hydration')} style={navButtonStyle}>Hydration</button>
          <button onClick={() => onNavigate && onNavigate('garden')} style={navButtonStyle}>Garden</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isLoggedIn ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#FDF2B5', borderRadius: '20px', padding: '6px 14px' }}>
                <span style={{ fontSize: '20px' }}>👤</span>
                <span style={{ fontFamily:'Poppins_Bold', fontSize: '15px', color: colors.maroon }}>{username}</span>
              </div>
              <button onClick={onLogout} style={{ fontFamily:'Poppins_Bold', backgroundColor: colors.maroon, color: '#FFF', border: 'none', borderRadius: '16px', padding: '6px 18px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>Logout</button>
            </>
          ) : (
            <div onClick={() => onNavigate && onNavigate('login')} style={{ color: colors.accentRed, fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Signup / Login</div>
          )}
        </div>
      </nav>

      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, paddingBottom: '40px' }}>
        <div style={{ fontFamily: 'Hello_Notie', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <h1 style={{ fontSize: '60px', margin: 0, fontWeight: 'bold', color: colors.textDark, letterSpacing: '0.5px' }}>
            {currentMode === 'focus' ? 'Focus Timer' : 'Break Timer'}
          </h1>
          {/* here */}
          <button onClick={() => setShowSettings(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', opacity: 0.6 }} title="Configure Durations">
            <Settings size={20} color={colors.textDark} /> 
          </button>
        </div>

        <div style={{ fontFamily: 'Hello_Notie', fontSize: '250px', fontWeight: '900', lineHeight: '1', color: colors.textDark, margin: '10px 0' }}>
          {formatTime(timeLeft)}
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '50px' }}>
          <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: colors.primaryRed }} />
          <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: colors.primaryRed }} />
          <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: colors.primaryRed }} />
          <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: colors.primaryRed }} />
        </div>
        {/* set timer mode to "focus mode" */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%', maxWidth: '900px', justifyContent: 'center' }}>
          <button onClick={() => changeMode('focus')} style={{ ...cardStyle, borderColor: colors.primaryRed, borderWidth: 3.5, backgroundColor: currentMode === 'focus' ? '#FFFDF4' : 'transparent' }}>
            <span style={{ color: colors.textRed, fontSize: '16px', fontWeight: 'bold', fontStyle: 'italic' }}>Focus</span>
            <span style={{ fontSize: '28px', fontWeight: '900', color: colors.textDark }}>{durations.focus}</span>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: colors.textDark, marginTop: '-4px' }}>MIN</span>
          </button>

          {/* set timer mode to "break mode" */}
          <button onClick={() => changeMode('shortBreak')} style={{ ...cardStyle, borderColor: colors.primaryRed, borderWidth: 3.5, backgroundColor: currentMode === 'shortBreak' ? '#FFFDF4' : 'transparent' }}>
            <span style={{ color: colors.textRed, fontSize: '16px', fontWeight: 'bold', fontStyle: 'italic' }}>Break</span>
            <span style={{ fontSize: '28px', fontWeight: '900', color: colors.textDark }}>{durations.shortBreak}</span>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: colors.textDark, marginTop: '-4px' }}>MIN</span>
          </button>

          {/* toggle start or pause */}
          <button onClick={async () => {
            const token = localStorage.getItem('token');
            if (!token) {
              onNavigate('login');
              return;
            }
                try {
                    if (!cycleId) {
                        const response = await startCycle(durations);
                        setCycleId(response.data.cycle_id);
                    }
                    setIsRunning(true);
                } catch (error) {
                    console.error(error);
                }
                
            }} style={{ ...actionButtonStyle, backgroundColor: colors.primaryRed, color: '#FFFFFF', opacity: isRunning ? 0.6 : 1 }}>Start</button>
          <button onClick={() => setIsRunning(false)} style={{ ...actionButtonStyle, backgroundColor: 'transparent', color: colors.textRed, border: `2px solid ${colors.primaryRed}` }}>Pause</button>
          
          {/* toggle reset */}
          <button onClick={handleReset} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px' }} title="Reset"><RotateCcw size={24} color={colors.primaryRed} /></button>

          {currentMode === 'shortBreak' && (
            <button 
              onClick={() => onNavigate('hydration')}
              style={{ ...actionButtonStyle, width: '180px', backgroundColor: '#AED6F1', fontSize: '18px', color: colors.textDark, border: 'none' }}
            >
              Stay Hydrated 💧
            </button>
          )}
        </div>
      </main>

      <div style={{ backgroundColor: colors.primaryRed, height: '60px', width: '100%' }} />

      {showSettings && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#FFF', padding: '28px', borderRadius: '20px', width: '320px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ margin: 0 }}>Timer Intervals</h3>
              <button onClick={() => setShowSettings(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveSettings}>
              <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold' }}>Focus (Mins):</label><input type="number" value={customFocus} onChange={(e) => setCustomFocus(e.target.value)} style={{ width: '100%', padding: '10px' }} /></div>
              <div style={{ marginBottom: '24px' }}><label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold' }}>Break (Mins):</label><input type="number" value={customShort} onChange={(e) => setCustomShort(e.target.value)} style={{ width: '100%', padding: '10px' }} /></div>
              <button type="submit" style={{ width: '100%', backgroundColor: colors.primaryRed, color: 'white', border: 'none', padding: '12px', borderRadius: '10px', cursor: 'pointer' }}>Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const navButtonStyle = { background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#000000', padding: '4px 0' };
const cardStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '140px', height: '110px', borderRadius: '16px', border: '2px solid', cursor: 'pointer', fontFamily: 'Hello_Notie' };
const actionButtonStyle = { width: '240px', height: '110px', borderRadius: '16px', fontSize: '24px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Hello_Notie' };