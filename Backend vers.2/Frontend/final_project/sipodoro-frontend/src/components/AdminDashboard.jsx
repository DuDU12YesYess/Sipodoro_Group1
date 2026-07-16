import { useState, useEffect } from 'react';
import { getAllHydrationLogs } from '../api/hydrationApi';
import { getAllSeeds } from '../api/shopApi';
import { getAllGardens } from '../api/gardenApi';

export default function AdminDashboard({ onNavigate, onLogout }) {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [apiUsers, setApiUsers] = useState([]);
  const [hydrationLogs, setHydrationLogs] = useState([]);
  const [loadingHydration, setLoadingHydration] = useState(false);

  // Shared Application States
  const [coins, setCoins] = useState(480);
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Morning workout', day: 'Mon', status: 'Pending' },
    { id: 2, text: 'Read 30 minutes', day: 'Mon', status: 'Done' },
    { id: 3, text: 'Review notes', day: 'Tue', status: 'Pending' },
  ]);

  // Pomodoro Timer States
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Store & Garden States
  const [seeds, setSeeds] = useState([]);
  const [loadingSeeds, setLoadingSeeds] = useState(false);
  const [gardens, setGardens] = useState([]);
  const [loadingGardens, setLoadingGardens] = useState(false);

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

  // API Fetch for Hydration Logs
  useEffect(() => {
    if (activeTab === 'Hydration Logs') {
      setLoadingHydration(true);
      getAllHydrationLogs()
        .then(res => setHydrationLogs(res.data))
        .catch(err => console.error("Error fetching hydration logs:", err))
        .finally(() => setLoadingHydration(false));
    }
  }, [activeTab]);

  // API Fetch for Seeds (Store)
  useEffect(() => {
    if (activeTab === 'Store') {
      setLoadingSeeds(true);
      getAllSeeds()
        .then(res => setSeeds(res.data))
        .catch(err => console.error("Error fetching seeds:", err))
        .finally(() => setLoadingSeeds(false));
    }
  }, [activeTab]);

  // API Fetch for Gardens
  useEffect(() => {
    if (activeTab === 'Garden') {
      setLoadingGardens(true);
      getAllGardens()
        .then(res => setGardens(res.data))
        .catch(err => console.error("Error fetching gardens:", err))
        .finally(() => setLoadingGardens(false));
    }
  }, [activeTab]);


  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleBackupExport = () => {
    const stateBackup = { coins, tasks };
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
        if (data.tasks !== undefined) setTasks(data.tasks);
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
              { id: 'Garden', label: 'Garden', icon: '🌱' },
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
                <tr style={{ color: '#999', borderBottom: '1px solid #EEE' }}>
                  <th style={{ padding: '12px' }}>ID</th>
                  <th style={{ padding: '12px' }}>NAME</th>
                  <th style={{ padding: '12px' }}>EMAIL</th>
                  <th style={{ padding: '12px' }}>ROLE</th>
                  <th style={{ padding: '12px' }}>STREAK</th>
                  <th style={{ padding: '12px' }}>LONGEST STREAK</th>
                  <th style={{ padding: '12px' }}>SEEDS</th>
                </tr>
              </thead>
              <tbody>
                {apiUsers.map((u) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid #F9F9F9' }}>
                    <td style={{ padding: '12px', color: '#999' }}>#{u.id}</td>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{u.username}</td>
                    <td style={{ padding: '12px' }}>{u.email}</td>
                    <td style={{ padding: '12px', color: u.role === 'admin' ? colors.accentRed : '#333' }}>{u.role}</td>
                    <td style={{ padding: '12px', color: u.current_streak > 0 ? colors.accentRed : '#999', fontWeight: 'bold' }}>{u.current_streak} 🔥</td>
                    <td style={{ padding: '12px' }}>{u.longest_streak}</td>
                    <td style={{ padding: '12px' }}>{u.total_seeds}</td>
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
            <h2 style={{ margin: '0 0 20px 0', fontSize: '20px' }}>Hydration Logs</h2>
            {loadingHydration ? (
              <p style={{ color: '#999' }}>Loading hydration logs...</p>
            ) : hydrationLogs.length === 0 ? (
              <p style={{ color: '#999' }}>No hydration logs found.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ color: '#999', borderBottom: '1px solid #EEE' }}>
                    <th style={{ padding: '12px' }}>LOG ID</th>
                    <th style={{ padding: '12px' }}>USER</th>
                    <th style={{ padding: '12px' }}>EMAIL</th>
                    <th style={{ padding: '12px' }}>CHECK-IN TIME</th>
                  </tr>
                </thead>
                <tbody>
                  {hydrationLogs.map((log) => (
                    <tr key={log.hydration_id} style={{ borderBottom: '1px solid #F9F9F9' }}>
                      <td style={{ padding: '12px', color: '#999' }}>#{log.hydration_id}</td>
                      <td style={{ padding: '12px', fontWeight: 'bold' }}>{log.User?.username || 'Unknown'}</td>
                      <td style={{ padding: '12px' }}>{log.User?.email || 'N/A'}</td>
                      <td style={{ padding: '12px' }}>
                        {log.check_in_time
                          ? new Date(log.check_in_time).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })
                          : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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
          <div>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '20px' }}>Seed Catalog</h2>
            {loadingSeeds ? (
              <div style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.borderLight}`, borderRadius: '16px', padding: '24px' }}>
                <p style={{ color: '#999' }}>Loading seeds...</p>
              </div>
            ) : seeds.length === 0 ? (
              <div style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.borderLight}`, borderRadius: '16px', padding: '24px' }}>
                <p style={{ color: '#999' }}>No seeds found.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {seeds.map(seed => (
                  <div key={seed.seed_id} style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.borderLight}`, borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
                    {seed.image_url && (
                      <img src={seed.image_url} alt={seed.seed_name} style={{ width: '80px', height: '80px', objectFit: 'contain', marginBottom: '12px' }} />
                    )}
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>{seed.seed_name}</h3>
                    <p style={{ margin: '0 0 4px 0', color: colors.accentRed, fontWeight: 'bold', fontSize: '14px' }}>{seed.cost} 🪙</p>
                    <p style={{ margin: '0 0 4px 0', color: '#666', fontSize: '13px' }}>Growth: {seed.growth_required}</p>
                    <p style={{ margin: '0', color: '#999', fontSize: '12px' }}>ID: #{seed.seed_id}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 7: GARDEN */}
        {activeTab === 'Garden' && (
          <div style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.borderLight}`, borderRadius: '16px', padding: '24px' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '20px' }}>User Gardens</h2>
            {loadingGardens ? (
              <p style={{ color: '#999' }}>Loading gardens...</p>
            ) : gardens.length === 0 ? (
              <p style={{ color: '#999' }}>No garden flowers found.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ color: '#999', borderBottom: '1px solid #EEE' }}>
                    <th style={{ padding: '12px' }}>USER</th>
                    <th style={{ padding: '12px' }}>EMAIL</th>
                    <th style={{ padding: '12px' }}>FLOWER NAME</th>
                    <th style={{ padding: '12px' }}>SEEDS OWNED</th>
                    <th style={{ padding: '12px' }}>DATE ADDED</th>
                  </tr>
                </thead>
                <tbody>
                  {gardens.map((item) => (
                    <tr key={item.garden_flower_id} style={{ borderBottom: '1px solid #F9F9F9' }}>
                      <td style={{ padding: '12px', fontWeight: 'bold' }}>{item.username || 'Unknown'}</td>
                      <td style={{ padding: '12px' }}>{item.email || 'N/A'}</td>
                      <td style={{ padding: '12px', color: colors.accentRed, fontWeight: 'bold' }}>{item.seed_name || 'N/A'}</td>
                      <td style={{ padding: '12px' }}>{item.seeds_owned ?? 0}</td>
                      <td style={{ padding: '12px' }}>
                        {item.added_at
                          ? new Date(item.added_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })
                          : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* VIEW 8: BACKUP */}
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