import logoImg from '../assets/Logo/Sipodoro.png'; 
import flower_pot from '../assets/Cards/flower_pot.svg'
import cards from '../assets/Cards/3cards.svg'

export default function AboutUs({ onNavigate, onLogout, username, isLoggedIn }) {
  const colors = {
    bgLight: '#FAF6E3',       // Cream background
    bgDarkGreen: '#1A4314',   // Dark forest green panel
    bgMidGreen: '#2B5A24',    // Mid green section for quote
    bgFooter: '#E4DEB4',      // Soft tan footer panel
    textDark: '#000000',
    white: '#FFFFFF',
    btnMaroon: '#6B0024',     // "Start Now" button color
    accentRed: '#D32F2F'      // Signup/Login red accent matching the image
  };

  return (
    <div style={{ 
      fontFamily: '"Comic Sans MS", "Chalkboard SE", "Arial", sans-serif', 
      backgroundColor: colors.bgLight, 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      boxSizing: 'border-box'
    }}>
      
      {/* 1. VISUAL NAVIGATION BAR */}
     {/* ── NAV BAR ── */}
           <nav style={{
            fontFamily: 'Poppins_Regular',
             display: 'flex', justifyContent: 'space-between', alignItems: 'center',
             padding: '24px 60px', backgroundColor: colors.bg,
           }}>
     
             {/* Logo */}
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
     
             <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                 <button onClick={() => onNavigate && onNavigate('home')}    style={navButtonStyle}>Home</button>
                <button onClick={() => onNavigate && onNavigate('about')}     style={{ ...navButtonStyle, fontFamily: 'Poppins_Bold' }}>About us </button>
                <button onClick={() => onNavigate && onNavigate('tasks')}    style={navButtonStyle}>Task</button>
                <button onClick={() => onNavigate && onNavigate('timer')}    style={navButtonStyle}>Pomodoro</button>
                <button onClick={() => onNavigate && onNavigate('hydration')}   style={navButtonStyle}>Hydration</button>
                <button onClick={() => onNavigate && onNavigate('garden')}   style={navButtonStyle}>Garden</button>
              
            </div>
     
             {/* Right side — changes based on login state */}
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
               {isLoggedIn ? (
                 <>
                   {/* Profile badge */}
                   <div style={{
                     display: 'flex', alignItems: 'center', gap: '8px',
                     backgroundColor: '#FDF2B5', borderRadius: '20px',
                     padding: '6px 14px',
                   }}>
                     <span style={{ fontSize: '20px' }}>👤</span>
                     <span style={{ fontSize: '15px', fontWeight: 'bold', color: colors.maroon }}>
                       {username}
                     </span>
                   </div>
     
                   {/* Logout button */}
                   <button
                     onClick={onLogout}
                     style={{
                       backgroundColor: colors.maroon, color: '#FFF',
                       border: 'none', borderRadius: '16px',
                       padding: '6px 18px', fontWeight: 'bold',
                       cursor: 'pointer', fontSize: '14px',
                       fontFamily: 'inherit',
                     }}
                   >
                     Logout
                   </button>
                 </>
               ) : (
                 <div
                   onClick={() => onNavigate && onNavigate('login')}
                   style={{ color: colors.accentRed, fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
                 >
                   Signup / Login
                 </div>
               )}
             </div>
           </nav>

      {/* 2. HERO SECTION: ABOUT US */}
      <section style={{ 
        
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '40px', 
        padding: '60px 100px 80px 100px',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <h1 style={{fontFamily: 'Hello_Notie', fontSize: '130px', fontWeight: '900', color: 'black', margin: 0, letterSpacing: '2px' }}>
          ABOUT US
        </h1>
        {/* Playful Tomato Character */}
        <img src={logoImg} alt="logoImg" style={{ width: '300px', height: 'auto', objectFit: 'contain' }} />
      </section>

      {/* 3. MISSION SECTION */}
      <section style={{ backgroundColor: colors.bgDarkGreen, color: colors.white, padding: '100px 120px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '50px' }}>
          <div style={{ flex: 1.2 }}>
            <h2 style={{ fontFamily: 'Hello_Notie', fontSize: '89px', fontWeight: '900', margin: '0 0 24px 0', letterSpacing: '1px' }}>
              OUR MISSION
            </h2>
            <p style={{ fontFamily:'Poppins_Regular',fontSize: '15px', lineHeight: '1.6', opacity: 0.9, maxWidth: '500px' }}>
              We help people stay productive without stress. Through focused work sessions, honest feedback, and meaningful rewards, Sipodoro makes building good habits simple and sustainable.
            </p>
          </div>
          
          {/* Decorative Card Stack mockup */}
          <div style={{ flex: 1, position: 'relative', height: '220px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={cards} alt="3cards" style={{ width: '600px', height: 'auto', objectFit: 'contain' }} />
          </div>
        </div>
      </section>

      {/* 4. QUOTE SECTION */}
      <section style={{ backgroundColor: colors.bgMidGreen, color: colors.white, padding: '50px 40px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Hello_Notie', fontSize: '28px', fontWeight: 'bold', margin: '0 auto', maxWidth: '900px', lineHeight: '1.5' }}>
          "Calm, honest tools for people who want to do meaningful work without sacrificing their wellbeing."
        </p>
      </section>

      {/* 5. CALL TO ACTION (CTA) SECTION */}
      <section style={{  padding: '80px 40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontFamily: 'Hello_Notie', fontSize: '68px', fontWeight: '900', color: colors.textDark, margin: '0 0 16px 0' }}>
          READY TO GROW YOUR FOCUS?
        </h2>
        <p style={{ fontFamily:'Poppins_Regular',fontSize: '18px', color: colors.textDark, margin: '0 0 50px 0', maxWidth: '700px' }}>
          Join thousands of people building better work habits without the guilt, the gimmicks, or the dark patterns.
        </p>

        {/* Potted Flower Graphic */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
          <img src={flower_pot} alt="flower_pot" style={{ width: '150px', height: 'auto', objectFit: 'contain' }} />
        </div>

        {/* Start Now Button */}
        <button 
          onClick={() => onNavigate && onNavigate('timer')}
          style={{ 
            fontFamily: 'Hello_Notie', 
            backgroundColor: colors.btnMaroon, 
            color: colors.white, 
            border: 'none', 
            borderRadius: '30px', 
            padding: '16px 50px', 
            fontSize: '26px', 
            fontWeight: 'bold', 
            cursor: 'pointer',
            boxShadow: '0 6px 16px rgba(0,0,0,0.15)'
          }}
        >
          START NOW
        </button>
      </section>

      {/* 6. COMPACT FOOTER STRIP */}
      <footer style={{ backgroundColor: '#244D26', padding: '16px 60px', color: '#FFF', fontSize: '13px', marginTop: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'sans-serif' }}>
            <b style={{ fontSize: '16px' }}>🍅 Sipodoro</b>
            <span style={{ opacity: 0.7, fontStyle: 'italic' }}>| Keep Track On What You Want To Do So You Won't Miss A Thing!</span>
          </div>
          <div style={{ opacity: 0.8, fontFamily: 'sans-serif' }}>
            © 2026 Sipodoro. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}

// Navigation element styles
const navButtonStyle = { 
  background: 'none', 
  border: 'none', 
  cursor: 'pointer', 
  fontFamily: 'inherit', 
  fontSize: '16px', 
  color: '#000000', 
  padding: '4px 0',
  outline: 'none'
};

const cardStyle = {
  position: 'absolute',
  width: '110px',
  height: '150px',
  borderRadius: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'bold',
  fontSize: '18px',
  color: '#FFF'
};