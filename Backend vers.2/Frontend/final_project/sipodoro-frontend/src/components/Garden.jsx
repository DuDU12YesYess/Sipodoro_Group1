import logoImg from '../assets/image/logo.jpg';

export default function Garden({ onNavigate, flowers = [], isLoggedIn = false, username = '', onLogout }) {
  const colors = {
    bgLight: '#FAF6E3',
    woodBorder: '#8B5A2B',
    dirtSoil: '#CD853F',
    accentRed: '#D32F2F',
    maroon: '#800000' // Added for consistency with your header
  };

  return (
    <div style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif', backgroundColor: colors.bgLight, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* ── NAV BAR ── */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '24px 60px', backgroundColor: colors.bgLight,
      }}>
        <div>
          <img
            src={logoImg}
            alt="Sipodoro Logo"
            style={{ height: '40px', width: 'auto', display: 'block', cursor: 'pointer' }}
            onClick={() => onNavigate && onNavigate('home')}
          />
        </div>

        <div style={{fontFamily:'Poppins_Regular', display: 'flex', gap: '32px', alignItems: 'center' }}>
          <button onClick={() => onNavigate && onNavigate('home')} style={navButtonStyle}>Home</button>
          <button onClick={() => onNavigate && onNavigate('about')} style={navButtonStyle}>About us</button>
          <button onClick={() => onNavigate && onNavigate('tasks')} style={navButtonStyle}>Task</button>
          <button onClick={() => onNavigate && onNavigate('timer')} style={navButtonStyle}>Pomodoro</button>
          <button onClick={() => onNavigate && onNavigate('hydration')} style={navButtonStyle}>Hydration</button>
          <button onClick={() => onNavigate && onNavigate('garden')} style={{ ...navButtonStyle, fontFamily:'Poppins_Bold' }}>Garden</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isLoggedIn ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#FDF2B5', borderRadius: '20px', padding: '6px 14px' }}>
                <span style={{ fontSize: '20px' }}>👤</span>
                <span style={{ fontSize: '15px', fontWeight: 'bold', color: colors.maroon }}>{username}</span>
              </div>
              <button onClick={onLogout} style={{ backgroundColor: colors.maroon, color: '#FFF', border: 'none', borderRadius: '16px', padding: '6px 18px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>Logout</button>
            </>
          ) : (
            <div onClick={() => onNavigate && onNavigate('login')} style={{ color: colors.accentRed, fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Signup / Login</div>
          )}
        </div>
      </nav>

      {/* CORE PLOT GRAPHIC VIRTUAL CANVAS */}
      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 40px' }}>
        
        <div style={{
          width: '100%', maxWidth: '1000px', height: '520px', backgroundColor: colors.dirtSoil,
          border: `18px solid ${colors.woodBorder}`, borderRadius: '24px',
          boxShadow: 'inset 0 10px 30px rgba(0,0,0,0.3), 0 12px 24px rgba(0,0,0,0.15)',
          position: 'relative', overflow: 'hidden', marginTop: '20px'
        }}>
          
          {flowers.map((flower) => (
            <div
              key={flower.id}
              style={{
                position: 'absolute',
                left: flower.left,
                top: flower.top,
                transform: 'translate(-50%, -50%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
              }}
            >
              {/* FIXED: Using flower.img which is passed from App.jsx */}
              <img 
                src={flower.img} 
                alt="Planted Flower" 
                style={{ width: '65px', height: '65px', objectFit: 'contain', filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.15))' }} 
              />
            </div>
          ))}

          {flowers.length === 0 && (
            <div style={{ color: '#FFF', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '20px', fontWeight: 'bold', opacity: 0.6 }}>
              Your Garden Plot is Empty. Bloom a flower in Hydration! 🌱
            </div>
          )}
        </div>
      </main>

      <footer style={{ backgroundColor: '#244D26', padding: '16px 60px', color: '#FFF', fontSize: '13px', marginTop: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <b style={{ fontSize: '16px' }}>🍅 Sipodoro</b>
            <span style={{ opacity: 0.7, fontStyle: 'italic' }}>| Keep Track On What You Want To Do So You Won't Miss A Thing!</span>
          </div>
          <div style={{ opacity: 0.8 }}>© 2026 Sipodoro. All rights reserved.</div>
        </div>
      </footer>

      <style>{`
        @keyframes popIn {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

const navButtonStyle = { 
  background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', 
  fontSize: '16px', color: '#000000', padding: '4px 0', outline: 'none'
};