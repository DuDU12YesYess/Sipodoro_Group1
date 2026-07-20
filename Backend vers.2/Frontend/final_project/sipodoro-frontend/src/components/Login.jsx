import { useState } from 'react';
import { login } from "../api/authApi";
import home_page from '../assets/Logo/Sipodoro.png'

export default function Login({ onNavigate, setIsLoggedIn, setUsername, setRole }) {
  const [emailOrUser, setEmailOrUser] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const colors = {
    bgLight:    '#FAF6E3',
    inputBg:    '#FDF2B5',
    btnYellow:  '#FFE600',
    textDark:   '#000000',
    maroonText: '#80002A',
    greenText:  '#2B5A24',
    tomatoRed:  '#E63946',
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!emailOrUser || !password) {
        alert("Please fill out all fields!");
        return;
    }

    try {
        const response = await login({
            email: emailOrUser, // Ensure your backend login expects 'email'
            password: password
        });

        // 1. Save session data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.user.username);
        // Important: Save the role if you need it later
        localStorage.setItem("role", response.data.user.role); 

        // 2. Update global App state
        setIsLoggedIn(true);
        setUsername(response.data.user.username);
        setRole(response.data.user.role);

        // 3. Precise Navigation Logic
        // Check both the email and the role returned by the server
        if (response.data.user.email === 'admin@sipodoro.com' || response.data.user.role === 'admin') {
            onNavigate("admindashboard");
        } else {
            onNavigate("home");
        }
    } catch (error) {
        console.error("Login failed:", error);
        alert(error.response?.data?.message || "Invalid credentials.");
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

      <header style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{
          fontSize: '80px',fontFamily: 'Hello_Notie',color: colors.textDark,
          margin: '0 0 12px 0', position: 'relative', display: 'inline-block',
        }}>
          WELCOME BACK
        </h1>
        <p style={{ fontSize: '22px', fontFamily: 'sans-serif', margin: 0, color: colors.textDark }}>
          Login to continue your journey
        </p>
      </header>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <img src={home_page} alt="Sipodoro Mascot" style={{ width: '300px', height: 'auto', objectFit: 'contain' }} />
      </div>

      <form
        onSubmit={handleLoginSubmit}
        style={{ width: '100%', maxWidth: '440px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
      >
        <div style={{ width: '100%' }}>
          <input
            type="text"
            placeholder="Email or Username"
            value={emailOrUser}
            onChange={(e) => setEmailOrUser(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ width: '100%', position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ ...inputStyle, paddingRight: '60px' }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute', right: '24px', top: '50%',
              transform: 'translateY(-50%)', background: 'none',
              border: 'none', cursor: 'pointer', fontSize: '22px',
            }}
          >
            {showPassword ? '👁️' : '🙈'}
          </button>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: colors.btnYellow, color: colors.textDark,
            border: 'none', borderRadius: '28px', width: '220px', height: '54px',
            fontSize: '26px', fontWeight: 'bold', cursor: 'pointer',
            fontFamily:'Poppins_Bold', marginTop: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}
        >
          Login
        </button>
      </form>

      <footer style={{ marginTop: '60px', fontSize: '18px', fontFamily: 'sans-serif', color: colors.textDark }}>
        Don't have an account ?{' '}
        <span
          onClick={() => onNavigate('signup')}
          style={{ color: colors.greenText, fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
        >
          sign up
        </span>
      </footer>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  height: '56px',
  borderRadius: '28px',
  border: 'none',
  backgroundColor: '#FDF2B5',
  padding: '0 24px',
  fontSize: '18px',
  color: '#000000',
  fontFamily: 'sans-serif',
  textAlign: 'center',
  outline: 'none',
  boxSizing: 'border-box',
};