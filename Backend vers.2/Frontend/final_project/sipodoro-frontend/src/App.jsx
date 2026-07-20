import { useState, useEffect, useRef } from 'react';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Timer from './components/Timer';
import Tasks from './components/Tasks';
import Hydration from './components/Hydration';
import Garden from './components/Garden';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AdminDashboard from './components/AdminDashboard';
import { getGarden } from './api/gardenApi';
import './App.css';

import yellowFlowerImg from './assets/image/yellow_3.svg';
import pinkFlowerImg from './assets/image/pink_3.svg';
import purpleFlowerImg from './assets/image/purple_3.svg';
import navyFlowerImg from './assets/image/baby_purple_3.svg';
import blueFlowerImg from './assets/image/teal_3.svg';
import redFlowerImg from './assets/image/red_3.svg';


const seedImageMap = {
  'Yellow': yellowFlowerImg,
  'Pink': pinkFlowerImg,
  'Purple': purpleFlowerImg,
  'Navy': navyFlowerImg,
  'Blue': blueFlowerImg,
  'Red': redFlowerImg,
};

export default function App() {
  // Fixed state initialization to load from localStorage immediately
  const [view, setView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username") || '');
  const [role, setRole] = useState(localStorage.getItem("role") || '');

  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [durations, setDurations] = useState({ focus: 25, shortBreak: 5, longBreak: 15 });
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            alert("Time's up!");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const [gardenFlowers, setGardenFlowers] = useState([]);

  const loadGarden = async () => {
    try {
      const res = await getGarden();
      const flowers = (res.data || []).map((gf, i) => ({
        id: gf.garden_flower_id || i,
        img: seedImageMap[gf.seed_name] || yellowFlowerImg,
        left: `${12 + (i * 15) % 75}%`,
        top: `${18 + (i * 20) % 65}%`,
      }));
      setGardenFlowers(flowers);
    } catch (err) {
      console.log("Failed to load garden:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) loadGarden();
  }, [isLoggedIn]);

  const handleNavigate = (targetView) => {
    if (targetView === view) return;

    const token = localStorage.getItem("token");
    const isAuthenticated = !!token;

    console.log("Navigating to:", targetView);
    const protectedViews = ['tasks', 'timer', 'pomodoro', 'garden', 'hydration', 'admindashboard'];

    if (protectedViews.includes(targetView) && !isAuthenticated) {
      alert("Please log in or sign up first!");
      setView('login');
      return;
    }

    const storedRole = localStorage.getItem("role");
    if (targetView === 'admindashboard' && storedRole !== 'admin') {
      alert("You don't have access to that page.");
      setView('home');
      return;
    }

    setView(targetView);
    if (targetView === 'garden' && isAuthenticated) loadGarden();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUsername('');
    setRole('');
    setView('home');
  };

  const authProps = { isLoggedIn, username, onLogout: handleLogout };
  const timerProps = { timeLeft, setTimeLeft, isRunning, setIsRunning, durations, setDurations };

  const handleAddFlowerToGarden = (flowerImg) => {
    const newFlower = {
      id: Date.now(),
      img: flowerImg,
      left: `${Math.floor(Math.random() * 75) + 12}%`,
      top:  `${Math.floor(Math.random() * 65) + 18}%`,
    };
    setGardenFlowers([...gardenFlowers, newFlower]);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {view === 'home' && <Home onNavigate={handleNavigate} {...authProps} />}
      {view === 'about' && <AboutUs onNavigate={handleNavigate} {...authProps} />}
      {view === 'login' && (
        <Login
          onNavigate={handleNavigate}
          setView={setView}
          setIsLoggedIn={setIsLoggedIn}
          setUsername={setUsername}
          setRole={setRole}
        />
      )}
      {view === 'signup' && <SignUp onNavigate={handleNavigate} setView={setView} />}

      {view === 'admindashboard' && role === 'admin' && (
        <AdminDashboard onNavigate={handleNavigate} {...authProps} />
      )}

      <Timer
        onNavigate={handleNavigate}
        {...authProps}
        {...timerProps}
        visible={view === 'pomodoro' || view === 'timer'}
      />

      {view === 'tasks' && <Tasks onNavigate={handleNavigate} {...authProps} />}

      {view === 'hydration' && (
        <Hydration onNavigate={handleNavigate} onAddFlower={handleAddFlowerToGarden} {...authProps} />
      )}

      {view === 'garden' && (
        <Garden onNavigate={handleNavigate} flowers={gardenFlowers} {...authProps} />
      )}

    </div>
  );
}