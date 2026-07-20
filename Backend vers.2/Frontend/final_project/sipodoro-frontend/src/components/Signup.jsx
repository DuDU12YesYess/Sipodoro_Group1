import { useState } from 'react';
import { register } from "../api/authApi";
import home_page from '../assets/Logo/Sipodoro.png'

export default function SignUp({ onNavigate, setView }) {
  const [email,           setEmail]           = useState('');
  const [username,        setUsername]        = useState('');
  const [password,        setPassword]        = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const colors = {
    bgLight:   '#FAF6E3',
    inputBg:   '#FDF2B5',
    btnYellow: '#FFE600',
    textDark:  '#000000',
    greenText: '#2B5A24',
    tomatoRed: '#E63946',
    maroon:    '#61042E',
  };

  // Password strength rules
  const hasMinLength   = password.length >= 8;
  const hasNumber      = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_]/.test(password);
  const isPasswordStrong = hasMinLength && hasNumber && hasSpecialChar;

  const handleSignupSubmit = async (e) => {
      e.preventDefault();

      if (!email || !username || !password || !confirmPassword) {
          alert("Please fill out all fields!");
          return;
      }

      if (!isPasswordStrong) {
          alert("Please make sure your password meets all strength requirements!");
          return;
      }

      if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
      }

      try {
          await register({
              username,
              email,
              password
          });

          setShowSuccessModal(true);

      } catch (error) {

          alert(
              error.response?.data?.message ||
              "Registration failed."
          );

      }
  };
  return (
    <div style={{
      fontFamily:'Poppins_Regular',
      backgroundColor: colors.bgLight,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 20px',
      boxSizing: 'border-box',
    }}>

      {/* HEADER */}
      <header style={{ fontFamily: 'Hello_Notie',textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{
          fontSize: '80px',fontFamily: 'Hello_Notie', color: colors.textDark,
          margin: '0 0 12px 0', position: 'relative', display: 'inline-block', letterSpacing: '1px',
        }}>
          <span style={{ position: 'absolute', left: '-40px', top: '10px', fontSize: '24px', color: '#4A7c59', opacity: 0.5 }}>\ | /</span>
          SIGN UP
          <span style={{ position: 'absolute', right: '-40px', top: '10px', fontSize: '24px', color: '#4A7c59', opacity: 0.5 }}>\ | /</span>
        </h1>
        <p style={{ fontSize: '22px',fontFamily:'Poppins_Regular', margin: 0, color: colors.textDark }}>
          sign up to start your journey
        </p>
      </header>

      {/* TOMATO MASCOT */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <img src={home_page} alt="Sipodoro Mascot" style={{ width: '250px', height: 'auto', objectFit: 'contain' }} />
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSignupSubmit}
        style={{ width: '100%', maxWidth: '540px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
      >
        <div style={{ width: '100%' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ width: '100%' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Password + strength indicator */}
        <div style={{ width: '100%' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          <div style={{
            fontFamily: 'sans-serif', backgroundColor: 'rgba(255,255,255,0.7)',
            padding: '12px 20px', borderRadius: '16px', marginTop: '8px',
            fontSize: '13px', textAlign: 'left', width: '100%',
            boxSizing: 'border-box', lineHeight: '1.5',
          }}>
            <div style={{ fontWeight: 'bold', color: colors.maroon, marginBottom: '4px' }}>Password strength rules:</div>
            <div style={{ color: hasMinLength   ? '#2B5A24' : '#C33' }}>{hasMinLength   ? '✅' : '❌'} At least 8 characters long</div>
            <div style={{ color: hasNumber      ? '#2B5A24' : '#C33' }}>{hasNumber      ? '✅' : '❌'} Contains at least 1 number</div>
            <div style={{ color: hasSpecialChar ? '#2B5A24' : '#C33' }}>{hasSpecialChar ? '✅' : '❌'} Contains at least 1 special character (!@#$)</div>
          </div>
        </div>

        <div style={{ width: '100%' }}>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={inputStyle}
          />
        </div>

        <button
          type="submit"
          disabled={!isPasswordStrong}
          style={{
            backgroundColor: isPasswordStrong ? colors.btnYellow : '#DDD',
            color:           isPasswordStrong ? colors.textDark  : '#888',
            border: 'none', borderRadius: '28px', width: '220px', height: '54px',
            fontSize: '26px', fontWeight: 'bold',
            cursor: isPasswordStrong ? 'pointer' : 'not-allowed',
            fontFamily:'Poppins_Bold', marginTop: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}
        >
          sign up
        </button>
      </form>

      {/* FOOTER LINK */}
      <footer style={{ marginTop: '40px', fontSize: '18px', fontFamily: 'sans-serif', color: colors.textDark }}>
        Already have an account ?{' '}
        <span
          onClick={() => onNavigate && onNavigate('login')}
          style={{ color: colors.greenText, fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Log in
        </span>
      </footer>

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 9999, padding: '20px',
        }}>
          <div style={{
            backgroundColor: '#FFFFFF', padding: '40px 32px', borderRadius: '24px',
            textAlign: 'center', maxWidth: '400px', width: '100%',
            boxShadow: '0 12px 36px rgba(0,0,0,0.15)', fontFamily: 'sans-serif',
          }}>
            <div style={{ fontSize: '50px', marginBottom: '16px' }}>🎉</div>
            <h3 style={{ fontSize: '24px', color: colors.maroon, margin: '0 0 12px 0', fontWeight: 'bold' }}>
              You're done signing up!
            </h3>
            <p style={{ fontSize: '16px', color: '#555', margin: '0 0 28px 0', lineHeight: '1.5' }}>
              Your account is ready. Please log in now to access your dashboard.
            </p>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                setView('login');
              }}
              style={{
                backgroundColor: colors.btnYellow, color: colors.textDark,
                border: 'none', borderRadius: '20px', padding: '12px 36px',
                fontSize: '18px', fontWeight: 'bold', cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)', width: '100%',
              }}
            >
              GO TO LOGIN
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

const inputStyle = {
  width: '100%',
  height: '56px',
  borderRadius: '28px',
  border: 'none',
  backgroundColor: '#FDF2B5',
  padding: '0 36px',
  fontSize: '18px',
  color: '#000000',
  fontFamily: 'sans-serif',
  textAlign: 'left',
  outline: 'none',
  boxSizing: 'border-box',
};