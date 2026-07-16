import { useState } from 'react';

// ==========================================
// CORRECTED IMAGE IMPORTS
// ==========================================
import yellowSproutImg from '../assets/image/yellow_1.svg';       
import yellowBudImg from '../assets/image/yellow_2.svg';             
import yellowFlowerImg from '../assets/image/yellow_3.svg'; 
import pinkSproutImg from '../assets/image/pink_1.svg'; 
import pinkBudImg from '../assets/image/pink_2.svg';       
import pinkFlowerImg from '../assets/image/pink_3.svg';
import purpleSproutImg from '../assets/image/purple_1.svg';
import purpleBudImg from '../assets/image/purple_2.svg';
import purpleFlowerImg from '../assets/image/purple_3.svg';
import navySproutImg from '../assets/image/baby_purple_1.svg';
import navyBudImg from '../assets/image/baby_purple_2.svg'; 
import navyFlowerImg from '../assets/image/baby_purple_3.svg';
import blueSproutImg from '../assets/image/teal_1.svg';
import blueBudImg from '../assets/image/teal_2.svg';
import blueFlowerImg from '../assets/image/teal_3.svg'; 
import redSproutImg from '../assets/image/red_1.svg';
import redBudImg from '../assets/image/red_2.svg'; 
import redFlowerImg from '../assets/image/red_3.svg';
import logoImg from '../assets/image/logo.jpg';

export default function Hydration({ onNavigate, onAddFlower, isLoggedIn = false, onLogout }) {
  // 1. Core State Engine
  const [streak, setStreak] = useState(0); 
  const [coins, setCoins] = useState(23);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [seedTokens, setSeedTokens] = useState(1); 

  const [selectedFlowerImg, setSelectedFlowerImg] = useState(yellowFlowerImg);
  const [selectedFlowerName, setSelectedFlowerName] = useState('Yellow');

  // 2. Flora Shop Matrix
  const shopItems = [
    { id: 1, name: 'Pink', price: 3, img: pinkFlowerImg, sprout: pinkSproutImg, bud: pinkBudImg },
    { id: 2, name: 'Purple', price: 3, img: purpleFlowerImg, sprout: purpleSproutImg, bud: purpleBudImg },
    { id: 3, name: 'Navy', price: 3, img: navyFlowerImg, sprout: navySproutImg, bud: navyBudImg },
    { id: 4, name: 'Blue', price: 3, img: blueFlowerImg, sprout: blueSproutImg, bud: blueBudImg },
    { id: 5, name: 'Yellow', price: 3, img: yellowFlowerImg, sprout: yellowSproutImg, bud: yellowBudImg }, 
    { id: 6, name: 'Red', price: 3, img: redFlowerImg, sprout: redSproutImg, bud: redBudImg },
  ];

  const activeShopItem = shopItems.find(item => item.name === selectedFlowerName) || shopItems[4];

  const colors = {
    bgLight: '#FAF6E3', shopPanel: '#EFEFCE', shopCard: '#FFFFA7', 
    shopCardActive: '#E2E29B', pillBg: '#2E662F', darkGreenBtn: '#0E4D14',
    textDark: '#123D15', white: '#FFFFFF', accentRed: '#D32F2F', maroon: '#800000'
  };

  // 3. Automated Growth Logic
  let stageName = "Stage 1: Sprout";
  let currentPlantAsset = activeShopItem.sprout; 
  let showGardenButton = false;

  if (streak >= 1 && streak <= 3) {
    stageName = "Stage 2: Bud";
    currentPlantAsset = activeShopItem.bud;    
  } else if (streak >= 4) {
    stageName = `Stage 3: ${selectedFlowerName} Bloom! 🌼`;
    currentPlantAsset = selectedFlowerImg;     
    showGardenButton = true;
  }

  const handleBuySeed = (price) => {
    if (coins >= price) {
      setCoins(prev => prev - price);
      setSeedTokens(prev => prev + 1);
    } else {
      alert("Not enough coins! Check in more to earn.");
    }
  };

  const handleCheckIn = () => {
    if (!hasCheckedIn) {
      setStreak(prev => prev + 1);
      setCoins(prev => prev + 5);
      setHasCheckedIn(true);
    }
  };

  const handleSendToPlot = () => {
    if (seedTokens > 0) {
      if (onAddFlower) onAddFlower(selectedFlowerImg);
      setSeedTokens(prev => prev - 1);
      setStreak(0);
      setHasCheckedIn(false);
      if (onNavigate) onNavigate('garden');
    } else {
      alert("No seeds left! Buy more in the shop.");
    }
  };

  return (
    <div style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif', backgroundColor: colors.bgLight, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @keyframes windSway { 0% { transform: rotate(0deg); } 50% { transform: rotate(2.5deg) translateX(1px); } 100% { transform: rotate(0deg); } }
        @keyframes bloomExpansion { 0% { transform: scale(0.6); opacity: 0; } 70% { transform: scale(1.08); } 100% { transform: scale(1); opacity: 1; } }
        .swaying-plant { animation: windSway 4s ease-in-out infinite; transform-origin: bottom center; }
        .blooming-head { animation: bloomExpansion 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .shop-card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .shop-card-hover:hover { transform: translateY(-4px); box-shadow: 0 6px 12px rgba(0,0,0,0.06); }
      `}</style>

      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 60px' }}>
        <img src={logoImg} alt="Logo" style={{ height: '40px', cursor: 'pointer' }} onClick={() => onNavigate('home')} />
        <div style={{ display: 'flex', gap: '32px' }}>
          {['Home', 'About', 'Tasks', 'Timer', 'Hydration', 'Garden'].map(label => (
            <button key={label} onClick={() => onNavigate(label.toLowerCase())} style={navButtonStyle}>{label}</button>
          ))}
        </div>
        <div>{isLoggedIn ? <button onClick={onLogout}>Logout</button> : <span onClick={() => onNavigate('login')} style={{cursor:'pointer', fontWeight:'bold', color:colors.accentRed}}>Signup / Login</span>}</div>
      </nav>

      <main style={{ display: 'flex', padding: '40px 60px', maxWidth: '1400px', width: '100%', margin: '0 auto', gap: '50px' }}>
        <section style={{ backgroundColor: colors.shopPanel, borderRadius: '24px', width: '480px', padding: '32px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: '900', color: colors.textDark, textAlign: 'center' }}>Flora Shop</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {shopItems.map((item) => (
              <div key={item.id} className="shop-card-hover" style={{ backgroundColor: selectedFlowerName === item.name ? colors.shopCardActive : colors.shopCard, borderRadius: '16px', padding: '16px', textAlign: 'center' }}>
                <div onClick={() => { setSelectedFlowerImg(item.img); setSelectedFlowerName(item.name); }} style={{ cursor: 'pointer' }}>
                  <img src={item.img} style={{ width: '55px', height: '55px', objectFit: 'contain' }} />
                  <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.name}</div>
                </div>
                <button 
                  onClick={() => handleBuySeed(item.price)}
                  style={{ marginTop: '8px', backgroundColor: colors.pillBg, color: '#fff', borderRadius: '20px', border: 'none', cursor: 'pointer', padding: '4px 10px', fontSize: '12px' }}
                >
                  Buy {item.price} 🪙
                </button>
              </div>
            ))}
          </div>
        </section>

        <section style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ textAlign: 'right', width: '100%' }}>
            <div>{streak} 🔥 | {coins} 🪙</div>
            <div style={{ color: '#BD6B2A' }}>🎒 Seeds: {seedTokens}</div>
          </div>
          <h1 style={{ fontSize: '38px', fontWeight: '900', margin: '20px 0' }}>{stageName}</h1>
          <div className="swaying-plant" style={{ height: '260px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
            <img src={currentPlantAsset} className={showGardenButton ? "blooming-head" : ""} style={{ width: streak >= 4 ? '80px' : '50px' }} />
            <div style={{ width: '8px', height: '60px', backgroundColor: '#0C4B11', marginTop: '4px' }} />
            <div style={{ width: '160px', height: '14px', backgroundColor: '#BD6B2A' }} />
          </div>
          <button 
            onClick={showGardenButton ? handleSendToPlot : handleCheckIn}
            disabled={!showGardenButton && hasCheckedIn}
            style={{ backgroundColor: showGardenButton ? '#BD6B2A' : (hasCheckedIn ? '#557A58' : colors.darkGreenBtn), color: 'white', borderRadius: '28px', padding: '20px 40px', fontSize: '24px', cursor: 'pointer', border: 'none' }}
          >
            {showGardenButton ? "Add to Garden 🏡" : (hasCheckedIn ? "Checked In!" : "Check in")}
          </button>
        </section>
      </main>
    </div>
  );
}

const navButtonStyle = { background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' };