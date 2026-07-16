import { useState, useEffect } from 'react';


export default function AdminDashboard({ onNavigate, onLogout }) {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [apiUsers, setApiUsers] = useState([]);

  // Shared Application States
  const [coins, setCoins] = useState(480);
  const [waterIntake, setWaterIntake] = useState(750);
  const [waterLogs, setWaterLogs] = useState([
    { id: 1, amount: 300, time: 'Tue 13:00' },
    { id: 2, amount: 500, time: 'Mon 10:30' },
    { id: 3, amount: 250, time: 'Mon 08:00' },
  ]);
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Morning workout', day: 'Mon', status: 'Pending' },
    { id: 2, text: 'Read 30 minutes', day: 'Mon', status: 'Done' },
    { id: 3, text: 'Review notes', day: 'Tue', status: 'Pending' },
  ]);

  // Pomodoro Timer States
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Store Items Data
  const [storeItems, setStoreItems] = useState([
    { id: 1, name: 'Focus Music Pack', desc: 'Curated lo-fi tracks for deep focus sessions.', price: 200, owned: false },
    { id: 2, name: 'Dark Theme', desc: 'Sleek dark mode for late-night productivity.', price: 150, owned: false },
    { id: 3, name: 'Custom Avatars', desc: 'Unlock 20 exclusive profile avatars.', price: 100, owned: true },
    { id: 4, name: 'Analytics Pro', desc: 'Advanced charts and weekly PDF reports.', price: 350, owned: false },
  ]);

  // Timer Logic
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) setIsTimerRunning(false);
          return Math.max(prev - 1, 0);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // API Fetch for User Management
  useEffect(() => {
    if (activeTab === 'User manage') {
      fetch('http://localhost:5000/api/admin/users', {
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json' 
        }
      })
      .then(res => res.json())
      .then(data => setApiUsers(data))
      .catch(err => console.error("Error fetching users:", err));
    }
  }, [activeTab]);


  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const addWater = (amount) => {
    setWaterIntake((prev) => Math.min(prev + amount, 2500));
    const now = new Date();
    const timeStr = `${now.toLocaleDateString('en-US', { weekday: 'short' })} ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}`;
    setWaterLogs([{ id: Date.now(), amount, time: timeStr }, ...waterLogs]);
  };

  const buyItem = (id, price) => {
    if (coins >= price) {
      setCoins(coins - price);
      setStoreItems(storeItems.map(item => item.id === id ? { ...item, owned: true } : item));
    } else {
      alert("Not enough coins!");
    }
  };

  const handleBackupExport = () => {
    const stateBackup = { coins, waterIntake, waterLogs, tasks, storeItems };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(stateBackup, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'sipodoro_app_backup.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleBackupImport = (event) => {
    const fileReader = new FileReader();
    const file = event.target.files[0];
    if (!file) return;
    fileReader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.coins !== undefined) setCoins(data.coins);
        if (data.waterIntake !== undefined) setWaterIntake(data.waterIntake);
        if (data.waterLogs !== undefined) setWaterLogs(data.waterLogs);
        if (data.tasks !== undefined) setTasks(data.tasks);
        if (data.storeItems !== undefined) setStoreItems(data.storeItems);
        alert("Data successfully restored!");
      } catch {
        alert("Invalid file structure format.");
      }
    };
    fileReader.readAsText(file);
  };

  const colors = {
    sidebarBg: '#C3392D', activeTabBg: '#FFFFFF', activeTabText: '#C3392D',
    inactiveTabText: '#FFFFFF', contentBg: '#F5F2F0', cardBg: '#FFFFFF',
    accentRed: '#E15241', borderLight: '#E8E5E2'
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: colors.contentBg }}>
      
      {/* SIDEBAR */}
      <aside style={{ width: '240px', backgroundColor: colors.sidebarBg, padding: '24px 16px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
        <div style={{ fontSize: '14px', letterSpacing: '2px', fontWeight: 'bold', color: '#FFF', marginBottom: '32px', paddingLeft: '12px' }}>FOCUSAPP</div>
        <nav style={{ flex: 1 }}>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            {[
              { id: 'Dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'User manage', label: 'User manage', icon: '👥' },
              { id: 'Pomodoro Sessions', label: 'Pomodoro Sessions', icon: '⏱️' },
              { id: 'Hydration Logs', label: 'Hydration Logs', icon: '💧' },
              { id: 'Tasks', label: 'Tasks', icon: '✅' },
              { id: 'Store', label: 'Store', icon: '🛒' },
              { id: 'Backup & Recovery', label: 'Backup & Recovery', icon: '💾' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <li key={tab.id} style={{ marginBottom: '8px' }}>
                  <button onClick={() => setActiveTab(tab.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', fontSize: '15px', fontWeight: '500', border: 'none', borderRadius: isActive ? '12px' : '0px', backgroundColor: isActive ? colors.activeTabBg : 'transparent', color: isActive ? colors.activeTabText : colors.inactiveTabText, cursor: 'pointer', textAlign: 'left' }}>
                    <span>{tab.icon}</span> {tab.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
          <button onClick={() => onNavigate('home')} style={{ width: '100%', padding: '12px', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '12px', backgroundColor: 'transparent', color: '#FFF', fontSize: '13px', cursor: 'pointer' }}>❮ Go back to main App</button>
          <button onClick={onLogout} style={{ width: '100%', padding: '12px', border: 'none', borderRadius: '12px', backgroundColor: '#FFF', color: colors.sidebarBg, fontWeight: 'bold', cursor: 'pointer' }}>🚪 Logout</button>
        </div>
      </aside>

      {/* WORKSPACE AREA */}
      <main style={{ flex: 1, padding: '40px', boxSizing: 'border-box', overflowY: 'auto' }}>
        
        {/* VIEW 1: DASHBOARD */}
        {activeTab === 'Dashboard' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', maxWidth: '1100px' }}>
            <div style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.borderLight}`, borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}><span style={{ fontWeight: 'bold' }}><span style={{ color: colors.accentRed }}>01</span> User</span><span>👥</span></div>
              <p>Admin Control Active</p>
            </div>
            <div style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.borderLight}`, borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ fontWeight: 'bold' }}><span style={{ color: colors.accentRed }}>02</span> Tasks</span><span>☑️</span></div>
              <div style={{ height: '70px', width: '8px', backgroundColor: '#EAA49E', borderRadius: '4px', margin: '0 auto' }} />
            </div>
          </div>
        )}

        {/* VIEW 2: USER MANAGEMENT */}
        {activeTab === 'User manage' && (
          <div style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.borderLight}`, borderRadius: '16px', padding: '24px' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '20px' }}>User Management</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ color: '#999', borderBottom: '1px solid #EEE' }}><th style={{ padding: '12px' }}>NAME</th><th style={{ padding: '12px' }}>EMAIL</th><th style={{ padding: '12px' }}>ROLE</th></tr>
              </thead>
              <tbody>
                {apiUsers.map((u) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid #F9F9F9' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{u.username}</td>
                    <td style={{ padding: '12px' }}>{u.email}</td>
                    <td style={{ padding: '12px', color: u.role === 'admin' ? colors.accentRed : '#333' }}>{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* VIEW 3: POMODORO */}
        {activeTab === 'Pomodoro Sessions' && (
          <div style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.borderLight}`, borderRadius: '16px', padding: '32px' }}>
            <h3>Pomodoro Timer</h3>
            <div style={{ fontSize: '48px', margin: '20px 0' }}>{formatTime(timeLeft)}</div>
            <button onClick={() => setIsTimerRunning(!isTimerRunning)} style={{ padding: '12px 32px', borderRadius: '24px', backgroundColor: colors.sidebarBg, color: '#FFF', border: 'none' }}>
              {isTimerRunning ? 'Pause' : 'Start'}
            </button>
          </div>
        )}

        {/* VIEW 4: HYDRATION */}
        {activeTab === 'Hydration Logs' && (
          <div style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.borderLight}`, borderRadius: '16px', padding: '24px' }}>
            <h3>Hydration Logs</h3>
            <p>Current Intake: {waterIntake}ml</p>
            <button onClick={() => addWater(250)} style={{ padding: '10px', borderRadius: '8px' }}>Add 250ml</button>
          </div>
        )}

        {/* VIEW 5: TASKS */}
        {activeTab === 'Tasks' && (
          <div style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.borderLight}`, borderRadius: '16px', padding: '24px' }}>
            <h3>Tasks List</h3>
            {tasks.map(t => <div key={t.id}>{t.text} - {t.status}</div>)}
          </div>
        )}

        {/* VIEW 6: STORE */}
        {activeTab === 'Store' && (
          <div style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.borderLight}`, borderRadius: '16px', padding: '24px' }}>
            <h3>Reward Store</h3>
            <p>Coins: {coins}</p>
            {storeItems.map(item => (
              <div key={item.id} style={{ marginBottom: '10px' }}>{item.name} - <button onClick={() => buyItem(item.id, item.price)}>Buy</button></div>
            ))}
          </div>
        )}

        {/* VIEW 7: BACKUP */}
        {activeTab === 'Backup & Recovery' && (
          <div style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.borderLight}`, borderRadius: '16px', padding: '24px' }}>
            <h3>Backup & Recovery</h3>
            <button onClick={handleBackupExport} style={{ marginRight: '10px' }}>Backup Now</button>
            <input type="file" onChange={handleBackupImport} />
          </div>
        )}

      </main>
    </div>
  );
}