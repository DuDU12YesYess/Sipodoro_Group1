import logoImg from '../assets/image/logo.jpg';
import home_page from '../assets/Logo/home_page.png'
import pomodoro_card from '../assets/Cards/pomodoro_card.svg'
import tasks_card from '../assets/Cards/tasks_card.svg'
import hydration_card from '../assets/Cards/hydration_card.svg'
import what_can_we_help from '../assets/Cards/what_can_we_help.svg'
import try_out_now from '../assets/Cards/try_out_now.svg'

export default function Home({ onNavigate, isLoggedIn, username, onLogout }) {
  const colors = {
    bg:        '#FAF6E3',
    darkGreen: '#2D6A4F',
    textDark:  '#000000',
    maroon:    '#61042E',
    accentRed: '#D32F2F',
  };

  return (
    <div style={{ backgroundColor: colors.bg, fontFamily: 'sans-serif', margin: 0, padding: 0 }}>

      {/* ── NAV BAR ── */}
      <nav style={{
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

        {/* Center links */}
        <div style={{ fontFamily:'Poppins_Regular',display: 'flex', gap: '32px', alignItems: 'center' , color: 'black'}}>
          <button onClick={() => onNavigate && onNavigate('home')}     style={{ ...navButtonStyle, fontFamily: 'Poppins_Bold' }}>Home</button>
          <button onClick={() => onNavigate && onNavigate('about')}    style={navButtonStyle}>About us</button>
          <button onClick={() => onNavigate && onNavigate('tasks')}    style={navButtonStyle}>Task</button>
          <button onClick={() => onNavigate && onNavigate('timer')}    style={navButtonStyle}>Pomodoro</button>
          <button onClick={() => onNavigate && onNavigate('hydration')}   style={navButtonStyle}>Hydration</button>
          <button onClick={() => onNavigate && onNavigate('garden')}   style={navButtonStyle}>Garden</button>
         
        </div>

        {/* Right side — changes based on login state */}
        <div style={{ fontFamily:'Poppins_Bold',display: 'flex', alignItems: 'center', gap: '12px' }}>
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

      {/* ── HERO ── */}
      <section style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '60px 10%', maxWidth: '1200px', margin: '0 auto',
      }}>
        <div style={{ flex: 1, paddingRight: '40px' }}>
          <h1 style={{
            fontFamily: 'Hello_Notie', fontSize: '80px', color: '#1C1A12',
            margin: '0 0 16px 0', fontWeight: 'bold', letterSpacing: '1px',
          }}>
            SIPODORO
          </h1>
          <p style={{fontFamily:'Poppins_Regular', fontSize: '15px', color: '#333', lineHeight: '1.6', margin: '0 0 24px 0', maxWidth: '480px' }}>
            Sipodoro empowers students and professionals to stay focused, manage tasks effectively,
            and maintain healthy hydration habits through Pomodoro-based productivity and wellness tools.
          </p>
          <button
            onClick={() => onNavigate && onNavigate('timer')}
            style={{
              fontFamily:'Poppins_Bold',
              backgroundColor: '#61042E', color: '#FFFDF4', border: 'none',
              padding: '12px 28px', borderRadius: '20px', fontWeight: 'bold',
              cursor: 'pointer', fontSize: '12px',
            }}
          >
            GET STARTED
          </button>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <img src={home_page} alt="Sipodoro Mascot" style={{ width: '400px', height: 'auto', objectFit: 'contain' }} />
        </div>
      </section>

      {/* ── FOCUS. SIP. BLOOM. ── */}
      <section style={{ backgroundColor: '#61042E', color: '#FFFDF4', textAlign: 'center', padding: '60px 20px' }}>
        <h2 style={{ fontFamily:'Hello_Notie',fontSize: '68px', margin: '0 0 16px 0', letterSpacing: '1px', fontWeight: 'bold' }}>
          FOCUS. SIP. BLOOM.
        </h2>
        <p style={{ fontFamily:'Poppins_Regular',fontSize: '14px', maxWidth: '720px', margin: '0 auto 48px auto', opacity: 0.9, lineHeight: '1.6' }}>
          Sipodoro combines Pomodoro focus sessions, task management, and hydration tracking in one simple platform.
          Stay on top of your tasks, maintain healthy hydration habits, and build a more productive daily routine
          while working toward your goals.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto' }}>

          {/* Pomodoro card */}
          <div onClick={() => onNavigate && onNavigate('pomodoro')} style={{cursor: 'pointer'}}>
            <img src={pomodoro_card} alt="pomodoro_card" style={{ width: '200px', height: 'auto', objectFit: 'contain' }} />
          </div>

          {/* Tasks card */}
          <div onClick={() => onNavigate && onNavigate('tasks')} style={{cursor: 'pointer'}}>
            <img src={tasks_card} alt="tasks_card" style={{ width: '200px', height: 'auto', objectFit: 'contain' }} />
          </div>

          {/* Hydration card */}
          <div onClick={() => onNavigate && onNavigate('hydration')} style={{cursor: 'pointer'}}>
            <img src={hydration_card} alt="hydration_card" style={{ width: '200px', height: 'auto', objectFit: 'contain' }} />
          </div>

        </div>
      </section>

      {/* ── WHAT CAN WE HELP ── */}
      <section style={{ fontFamily:'Poppins_Regular',padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ fontFamily:'Hello_Notie',color: '#61042E', fontSize: '68px', margin: '0 0 40px 0', fontWeight: 'bold' }}>
          WHAT CAN WE HELP?
        </h2>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', maxWidth: '1000px', margin: '0 auto', flexWrap: 'wrap' }}>
          <img src={what_can_we_help} alt="what_can_we_help" style={{ width: '800px', height: 'auto', objectFit: 'contain' }} />
        </div>

        <p style={{ textAlign: 'center', fontSize: '14px', color: '#555', maxWidth: '800px', margin: '40px auto 0 auto', lineHeight: '1.6' }}>
          Sipodoro combines task management, Pomodoro focus sessions, and hydration reminders to help users
          stay productive, healthy, and balanced throughout the day.
        </p>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ backgroundColor:'#E7E1B1',textAlign: 'center', padding: '60px 20px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontFamily:'Hello_Notie',color: '#1C1A12', fontSize: '65px', margin: '0 0 32px 0', fontWeight: 'bold' }}>
          ACHIEVE MORE WITHOUT BURNING OUT
        </h2>
        <div style={{ margin: '0 auto 32px auto', width: '220px' }}>
          <img src={try_out_now} alt="try_out_now" style={{ width: '800px', height: 'auto', objectFit: 'contain' }} />
        </div>
        <button
          onClick={() => onNavigate && onNavigate('timer')}
          style={{
            fontFamily:'Hello_Notie',
            backgroundColor: '#61042E', color: '#FFFDF4', border: 'none',
            padding: '16px 40px', borderRadius: '30px',
            fontSize: '20px', cursor: 'pointer',
          }}
        >
          TRY US NOW!
        </button>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: '#244D26', padding: '16px 60px', color: '#FFF', fontSize: '13px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          maxWidth: '1200px', margin: '0 auto', flexWrap: 'wrap', gap: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <b style={{ fontSize: '16px' }}>🍅 Sipodoro</b>
            <span style={{ opacity: 0.7, fontStyle: 'italic' }}>
              | Keep Track On What You Want To Do So You Won't Miss A Thing!
            </span>
          </div>
          <div style={{ opacity: 0.8 }}>© 2026 Sipodoro. All rights reserved.</div>
        </div>
      </footer>

    </div>
  );
}

const navButtonStyle = {
  background:  'none',
  border:      'none',
  cursor:      'pointer',
  fontFamily:  'inherit',
  fontSize:    '16px',
  color:       '#000000',
  padding:     '4px 0',
  outline:     'none',
};