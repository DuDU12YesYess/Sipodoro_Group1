import { useState, useEffect, useRef } from 'react';
import { checkInWater } from '../api/hydrationApi';
import { getStreak } from '../api/streakApi';
import { getWallet, getInventory } from '../api/inventoryApi';
import { addFlowerToGarden as addFlowerToGardenApi } from '../api/gardenApi';
import { buySeed as buySeedApi } from '../api/shopApi';
import { plantSeed as plantSeedApi, getCurrentFlower, storeInInventory as storeInInventoryApi } from '../api/flowerApi';

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

const COOLDOWN_SECONDS = 3;

const seedIdMap = { 'Pink': 1, 'Purple': 2, 'Navy': 3, 'Blue': 4, 'Yellow': 5, 'Red': 6 };

export default function Hydration({ onNavigate, onAddFlower, isLoggedIn = false, onLogout }) {
  const [streak, setStreak] = useState(0);
  const [coins, setCoins] = useState(0);
  const [inventory, setInventory] = useState({});
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const cooldownRef = useRef(null);
  const [currentFlower, setCurrentFlower] = useState(null);

  const [selectedFlowerImg, setSelectedFlowerImg] = useState(yellowFlowerImg);
  const [selectedFlowerName, setSelectedFlowerName] = useState('Yellow');

  const shopItems = [
    { id: 1, name: 'Pink', price: 1, img: pinkFlowerImg, sprout: pinkSproutImg, bud: pinkBudImg },
    { id: 2, name: 'Purple', price: 1, img: purpleFlowerImg, sprout: purpleSproutImg, bud: purpleBudImg },
    { id: 3, name: 'Navy', price: 1, img: navyFlowerImg, sprout: navySproutImg, bud: navyBudImg },
    { id: 4, name: 'Blue', price: 1, img: blueFlowerImg, sprout: blueSproutImg, bud: blueBudImg },
    { id: 5, name: 'Yellow', price: 1, img: yellowFlowerImg, sprout: yellowSproutImg, bud: yellowBudImg },
    { id: 6, name: 'Red', price: 1, img: redFlowerImg, sprout: redSproutImg, bud: redBudImg },
  ];

  const seedIdToShop = {};
  shopItems.forEach(item => { seedIdToShop[item.id] = item; });

  const activeShopItem = shopItems.find(item => item.name === selectedFlowerName) || shopItems[4];

  const colors = {
    bgLight: '#FAF6E3', shopPanel: '#EFEFCE', shopCard: '#FFFFA7',
    shopCardActive: '#E2E29B', pillBg: '#2E662F', darkGreenBtn: '#0E4D14',
    textDark: '#123D15', white: '#FFFFFF', accentRed: '#D32F2F', maroon: '#800000'
  };

  const ownedSeeds = shopItems.filter(item => inventory[item.id] > 0);

  let stageName = "No flower planted";
  let currentPlantAsset = activeShopItem.sprout;
  let showGardenButton = false;

  if (currentFlower) {
    const flowerShop = seedIdToShop[currentFlower.seed_id] || activeShopItem;
    if (currentFlower.status === 'Bloomed') {
      stageName = `Stage 3: Bloom!`;
      currentPlantAsset = flowerShop.img;
      showGardenButton = true;
    } else if (currentFlower.growth_stage >= 2) {
      stageName = "Stage 2: Bud";
      currentPlantAsset = flowerShop.bud;
    } else {
      stageName = "Stage 1: Sprout";
      currentPlantAsset = flowerShop.sprout;
    }
  }

  const loadUserData = async () => {
    try {
      const [streakRes, walletRes, flowerRes, inventoryRes] = await Promise.all([
        getStreak(), getWallet(), getCurrentFlower(), getInventory()
      ]);
      setStreak(streakRes.data.current_streak || 0);
      setCoins(walletRes.data.total_coins || 0);
      setCurrentFlower(flowerRes.data);
      const invMap = {};
      if (Array.isArray(inventoryRes.data)) {
        inventoryRes.data.forEach(item => {
          invMap[item.seed_id] = item.quantity || 0;
        });
      }
      setInventory(invMap);
    } catch (err) {
      console.log("Failed to load user data:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) loadUserData();
  }, [isLoggedIn]);

  useEffect(() => {
    if (cooldownLeft <= 0) {
      if (cooldownRef.current) clearInterval(cooldownRef.current);
      return;
    }
    cooldownRef.current = setInterval(() => {
      setCooldownLeft(prev => {
        if (prev <= 1) {
          clearInterval(cooldownRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(cooldownRef.current);
  }, [cooldownLeft > 0]);

  const refreshAfterChange = async () => {
    const [walletRes, flowerRes, inventoryRes] = await Promise.all([
      getWallet(), getCurrentFlower(), getInventory()
    ]);
    setCoins(walletRes.data.total_coins || 0);
    setCurrentFlower(flowerRes.data);
    const invMap = {};
    if (Array.isArray(inventoryRes.data)) {
      inventoryRes.data.forEach(item => {
        invMap[item.seed_id] = item.quantity || 0;
      });
    }
    setInventory(invMap);
  };

  const handleBuySeed = async (price, flowerName) => {
    if (coins < price) {
      alert("Not enough coins! Check in to earn more.");
      return;
    }
    try {
      const seedId = seedIdMap[flowerName];
      await buySeedApi(seedId, 1);
      await refreshAfterChange();
      setSelectedFlowerName(flowerName);
      setSelectedFlowerImg(shopItems.find(i => i.name === flowerName)?.img);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to buy seed.");
    }
  };

  const handlePlantFromInventory = async (flowerName) => {
    const seedId = seedIdMap[flowerName];
    if (!inventory[seedId] || inventory[seedId] <= 0) {
      alert("No seeds of this color in inventory!");
      return;
    }
    try {
      await plantSeedApi(seedId);
      await refreshAfterChange();
      setSelectedFlowerName(flowerName);
      setSelectedFlowerImg(shopItems.find(i => i.name === flowerName)?.img);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to plant seed.");
    }
  };

  const handleCheckIn = async () => {
    if (cooldownLeft > 0) return;
    try {
      await checkInWater();
      setCooldownLeft(COOLDOWN_SECONDS);
      const [streakRes, walletRes, flowerRes] = await Promise.all([
        getStreak(), getWallet(), getCurrentFlower()
      ]);
      setStreak(streakRes.data.current_streak || 0);
      setCoins(walletRes.data.total_coins || 0);
      setCurrentFlower(flowerRes.data);
    } catch (err) {
      const msg = err.response?.data?.message || "Check-in failed. Please try again.";
      alert(msg);
    }
  };

  const handleSendToPlot = async () => {
    try {
      await addFlowerToGardenApi();
      setStreak(0);
      setCooldownLeft(0);
      setCurrentFlower(null);
      if (onNavigate) onNavigate('garden');
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add flower to garden.");
    }
  };

  const handleStoreInInventory = async () => {
    try {
      await storeInInventoryApi();
      await refreshAfterChange();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to store flower.");
    }
  };

  const formatCooldown = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const isInCooldown = cooldownLeft > 0;

  return (
    <div style={{ fontFamily: 'Hello_Notie', backgroundColor: colors.bgLight, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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
        {/* Center links */}
        <div style={{ fontFamily:'Poppins_Regular',display: 'flex', gap: '32px', alignItems: 'center' }}>
          <button onClick={() => onNavigate && onNavigate('home')}     style={navButtonStyle}>Home</button>
          <button onClick={() => onNavigate && onNavigate('about')}    style={navButtonStyle}>About us</button>
          <button onClick={() => onNavigate && onNavigate('tasks')}    style={navButtonStyle}>Task</button>
          <button onClick={() => onNavigate && onNavigate('timer')}    style={navButtonStyle}>Pomodoro</button>
          <button onClick={() => onNavigate && onNavigate('hydration')}   style={{ ...navButtonStyle, fontFamily: 'Poppins_Bold' }}>Hydration</button>
          <button onClick={() => onNavigate && onNavigate('garden')}   style={navButtonStyle}>Garden</button>
        
        </div>
        <div>{isLoggedIn ? <button onClick={onLogout}>Logout</button> : <span onClick={() => onNavigate('login')} style={{cursor:'pointer', fontWeight:'bold', color:colors.accentRed}}>Signup / Login</span>}</div>
      </nav>

      <main style={{ display: 'flex', padding: '40px 60px', maxWidth: '1400px', width: '100%', margin: '0 auto', gap: '50px' }}>
        <section style={{ backgroundColor: colors.shopPanel, borderRadius: '24px', width: '480px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h2 style={{ fontSize: '36px', fontFamily: 'Hello_Notie', color: colors.textDark, textAlign: 'center', marginBottom: '16px' }}>Flora Shop</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {shopItems.map((item) => {
                const owned = inventory[item.id] || 0;
                return (
                  <div key={item.id} className="shop-card-hover" style={{ backgroundColor: colors.shopCard, borderRadius: '16px', padding: '12px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <img src={item.img} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                    <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{item.name}</div>
                    {owned > 0 && <div style={{ fontSize: '11px', color: '#2E662F', fontWeight: 'bold' }}>Owned: {owned}</div>}
                    <button
                      onClick={() => handleBuySeed(item.price, item.name)}
                      disabled={coins < item.price}
                      style={{ backgroundColor: coins < item.price ? '#999' : colors.pillBg, color: '#fff', borderRadius: '20px', border: 'none', cursor: coins < item.price ? 'not-allowed' : 'pointer', padding: '4px 12px', fontSize: '11px', marginTop: '4px' }}
                    >
                      Buy {item.price}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ borderTop: '2px dashed #C8C87A', paddingTop: '20px' }}>
            <h2 style={{ fontSize: '24px', fontFamily: 'Hello_Notie', color: colors.textDark, textAlign: 'center', marginBottom: '12px' }}>My Seeds</h2>
            {ownedSeeds.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#888', fontSize: '14px', fontStyle: 'italic' }}>No seeds yet. Buy some from the shop!</p>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                {ownedSeeds.map((item) => (
                  <div key={item.id} className="shop-card-hover" onClick={() => { setSelectedFlowerName(item.name); setSelectedFlowerImg(item.img); }} style={{ backgroundColor: '#FFFFF0', borderRadius: '16px', padding: '12px', textAlign: 'center', cursor: 'pointer', border: selectedFlowerName === item.name ? `3px solid ${colors.pillBg}` : '3px solid transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <img src={item.img} style={{ width: '55px', height: '55px', objectFit: 'contain' }} />
                    <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{item.name}</div>
                    <div style={{ fontSize: '12px', color: '#2E662F', fontWeight: 'bold' }}>x{inventory[item.id]}</div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handlePlantFromInventory(item.name); }}
                      style={{ backgroundColor: colors.darkGreenBtn, color: '#fff', borderRadius: '20px', border: 'none', cursor: 'pointer', padding: '5px 14px', fontSize: '12px', fontWeight: 'bold' }}
                    >
                      Plant
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ textAlign: 'right', width: '100%' }}>
            <div>{streak} streak | {coins} coins</div>
            {ownedSeeds.length > 0 && <div style={{ color: '#BD6B2A', fontWeight: 'bold' }}>Seeds: {ownedSeeds.reduce((sum, item) => sum + inventory[item.id], 0)}</div>}
          </div>
          <h1 style={{ fontSize: '38px', fontWeight: '900', margin: '20px 0' }}>{stageName}</h1>
          <div className="swaying-plant" style={{ height: '260px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
            <img src={currentPlantAsset} className={showGardenButton ? "blooming-head" : ""} style={{ width: showGardenButton ? '80px' : '50px' }} />
            <div style={{ width: '8px', height: '60px', backgroundColor: '#0C4B11', marginTop: '4px' }} />
            <div style={{ width: '160px', height: '14px', backgroundColor: '#BD6B2A' }} />
          </div>
          {showGardenButton ? (
            <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
              <button
                onClick={handleSendToPlot}
                style={{
                  backgroundColor: '#BD6B2A', color: 'white', borderRadius: '28px',
                  padding: '16px 32px', fontSize: '20px', cursor: 'pointer', border: 'none', fontWeight: 'bold'
                }}
              >
                Add to Garden
              </button>
              <button
                onClick={handleStoreInInventory}
                style={{
                  backgroundColor: colors.pillBg, color: 'white', borderRadius: '28px',
                  padding: '16px 32px', fontSize: '20px', cursor: 'pointer', border: 'none', fontWeight: 'bold'
                }}
              >
                Store in Inventory
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={handleCheckIn}
                disabled={isInCooldown}
                style={{
                  backgroundColor: isInCooldown ? '#557A58' : colors.darkGreenBtn,
                  color: 'white', borderRadius: '28px', padding: '20px 40px', fontSize: '24px',
                  cursor: isInCooldown ? 'not-allowed' : 'pointer', border: 'none', opacity: isInCooldown ? 0.7 : 1
                }}
              >
                {isInCooldown ? `Wait ${formatCooldown(cooldownLeft)}` : "Check in +1"}
              </button>
              {isInCooldown && (
                <p style={{ fontFamily: 'Hello_Notie', marginTop: '10px', fontSize: '14px', color: '#888' }}>Next check-in in {formatCooldown(cooldownLeft)}</p>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
}

const navButtonStyle = { background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' };
