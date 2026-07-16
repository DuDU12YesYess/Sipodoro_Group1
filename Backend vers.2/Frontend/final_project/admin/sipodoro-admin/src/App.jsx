import { useState } from 'react';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  // 'dashboard' matches your active view state matching your navigation intent
  const [view, setView] = useState('dashboard');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* ── ADMIN VIEWS ROUTER ── */}
      {view === 'dashboard' && (
        <AdminDashboard />
      )}

      {view === 'user-manage' && (
        <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
          <h2>User Management Page</h2>
          <p>This section is ready for your user lookup data arrays.</p>
          <button onClick={() => setView('dashboard')} style={{ padding: '8px 16px', cursor: 'pointer' }}>
            Back to Dashboard
          </button>
        </div>
      )}

    </div>
  );
}