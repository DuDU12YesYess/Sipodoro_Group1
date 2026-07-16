import React, { useState } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  // --- BRAND MANAGEMENT STATES (READY FOR BACKEND CONNECTION) ---
  const [users, setUsers] = useState([
    { id: 1, name: 'HONG', email: 'hong.1@gmail.com', streak: '40day', status: 'Active' },
    { id: 2, name: 'SREYPICH', email: 'pich.dev@gmail.com', streak: '12day', status: 'Active' },
    { id: 3, name: 'SOKHA', email: 'sokha.study@gmail.com', streak: '0day', status: 'Suspended' }
  ]);

  const [pomodoroSessions, setPomodoroSessions] = useState([
    { id: 101, user: 'HONG', duration: '25 min', tag: 'Coding', timestamp: '10:42 AM' },
    { id: 102, user: 'SREYPICH', duration: '50 min', tag: 'UI Design', timestamp: '02:15 PM' },
    { id: 103, user: 'HONG', duration: '25 min', tag: 'Database Optimization', timestamp: '04:10 PM' }
  ]);

  const [hydrationRecords, setHydrationRecords] = useState([
    { id: 201, user: 'SREYPICH', amount: '500ml', type: 'Pure Water', time: '09:15 AM' },
    { id: 202, user: 'HONG', amount: '350ml', type: 'Green Tea', time: '11:30 AM' },
    { id: 203, user: 'SREYPICH', amount: '600ml', type: 'Electrolytes', time: '03:45 PM' }
  ]);

  const [tasksList, setTasksList] = useState([
    { id: 301, name: 'task 1', assignee: 'HONG', priority: 'High', status: 'Completed' },
    { id: 302, name: 'task 2', assignee: 'SREYPICH', priority: 'Medium', status: 'In Progress' },
    { id: 303, name: 'task 3', assignee: 'HONG', priority: 'Low', status: 'Pending' }
  ]);

  const [storeItems, setStoreItems] = useState([
    { id: 401, title: 'Golden Tomato Profile Badge', price: '150 Points', stock: 45, category: 'Badges' },
    { id: 402, title: 'Deep Crimson Premium Theme', price: '400 Points', stock: 12, category: 'Themes' },
    { id: 403, title: 'Extra Hydration Reminder Pack', price: '80 Points', stock: 99, category: 'Utilities' }
  ]);

  // --- FORM INPUT STATES ---
  const [newUser, setNewUser] = useState({ name: '', email: '', streak: '0day' });
  const [newTask, setNewTask] = useState({ name: '', assignee: 'HONG', priority: 'Medium' });
  const [newStoreItem, setNewStoreItem] = useState({ title: '', price: '', stock: '', category: 'Badges' });

  // --- COMPONENT BUTTON EVENT HANDLING ---
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    setUsers([...users, { id: Date.now(), ...newUser, status: 'Active' }]);
    setNewUser({ name: '', email: '', streak: '0day' });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.name) return;
    setTasksList([...tasksList, { id: Date.now(), ...newTask, status: 'Pending' }]);
    setNewTask({ name: '', assignee: 'HONG', priority: 'Medium' });
  };

  const handleAddStoreItem = (e) => {
    e.preventDefault();
    if (!newStoreItem.title || !newStoreItem.price) return;
    setStoreItems([...storeItems, { id: Date.now(), ...newStoreItem, stock: Number(newStoreItem.stock) || 0 }]);
    setNewStoreItem({ title: '', price: '', stock: '', category: 'Badges' });
  };

  const toggleUserStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
  };

  const navItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'User manage', label: 'User manage', icon: '👥' },
    { id: 'Pomodoro Sessions', label: 'Pomodoro Sessions', icon: '⏱️' },
    { id: 'Hydration Logs', label: 'Hydration Logs', icon: '💧' },
    { id: 'Tasks', label: 'Tasks', icon: '📋' },
    { id: 'Store', label: 'Store', icon: '🛒' }
  ];

  return (
    <div className="sipodoro-admin-container">
      {/* 🎨 GLOBAL BRANDED SCOPED CSS */}
      <style>{`
        .sipodoro-admin-container {
          display: flex;
          height: 100vh;
          width: 100vw;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background-color: #FDFBF0; /* Warm Cream */
          overflow: hidden;
          margin: 0;
          box-sizing: border-box;
        }
        .sipo-sidebar {
          width: 280px;
          background-color: #E5E5E5;
          border-right: 1px solid #D1D1D1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 24px 16px;
          box-sizing: border-box;
        }
        .sipo-brand-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px;
          margin-bottom: 32px;
        }
        .sipo-brand-text {
          font-size: 20px;
          font-weight: 900;
          color: #5F0F1A; /* Deep Maroon */
          margin: 0;
        }
        .sipo-nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .sipo-nav-item {
          width: 100%;
          text-align: left;
          padding: 14px 20px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          font-size: 15px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 14px;
          background-color: transparent;
          color: #333333;
          transition: all 0.2s ease;
        }
        .sipo-nav-item:hover { background-color: rgba(0, 0, 0, 0.05); }
        .sipo-nav-item.active {
          background-color: #FA9399; /* Selection Pink */
          color: #5F0F1A;
          font-weight: bold;
        }
        .sipo-main-content {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
          box-sizing: border-box;
        }
        .sipo-header {
          margin-bottom: 32px;
          border-b: 1px solid #E5E5E5;
          padding-bottom: 16px;
        }
        .sipo-header h2 { margin: 0; font-size: 26px; font-weight: 800; color: #5F0F1A; }
        
        /* GENERAL UI PANELS & GRID STRUCTURE */
        .sipo-grid-dashboard {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
          gap: 28px;
        }
        .sipo-card {
          background-color: #D6D6D6;
          padding: 20px;
          border-radius: 16px;
          box-sizing: border-box;
        }
        .sipo-card-title { margin: 0 0 14px 0; font-size: 16px; font-weight: bold; color: #111; }
        .sipo-inner-container {
          background-color: #FCEAEB; /* Accent Pink */
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.05);
        }
        
        /* DATA REPOSITORIES STYLING */
        .sipo-table { width: 100%; border-collapse: collapse; font-size: 13px; text-align: left; }
        .sipo-table th { background-color: #C8B1B3; color: #5F0F1A; padding: 12px 16px; font-weight: 600; }
        .sipo-table td { padding: 14px 16px; border-bottom: 1px solid rgba(0,0,0,0.05); color: #5F0F1A; }
        .sipo-btn-action {
          border: none; padding: 6px 12px; font-size: 11px; font-weight: bold; border-radius: 6px; cursor: pointer;
        }
        .sipo-btn-tomato { background-color: #C1121F; color: white; }
        .sipo-btn-maroon { background-color: #5F0F1A; color: white; }
        
        /* FORMS LAYOUT CONFIGURATIONS */
        .sipo-form-inline {
          display: flex; gap: 12px; padding: 16px; background-color: rgba(255,255,255,0.4); border-bottom: 2px solid #C8B1B3; flex-wrap: wrap;
        }
        .sipo-input {
          padding: 8px 12px; font-size: 13px; border: 1px solid #ccc; border-radius: 6px; background-color: #FFF; color: #333; flex: 1; min-width: 120px;
        }
        .sipo-select { padding: 8px 12px; font-size: 13px; border: 1px solid #ccc; border-radius: 6px; background-color: #FFF; }
        
        /* SPECIFIC WIDGETS */
        .sipo-task-layout { display: flex; gap: 16px; padding: 16px; }
        .sipo-bar-chart-container { display: flex; align-items: flex-end; justify-content: space-between; height: 120px; background-color: rgba(255, 255, 255, 0.4); border-radius: 8px; padding: 12px; box-sizing: border-box; }
        .sipo-line-chart-canvas { display: flex; align-items: flex-end; justify-content: space-between; height: 130px; border-left: 2px solid #666; border-bottom: 2px solid #666; padding: 0 16px 6px 16px; position: relative; }
        .sipo-y-axis-labels { position: absolute; left: -32px; top: 0; bottom: 0; display: flex; flex-direction: column; justify-content: space-between; font-size: 9px; font-weight: bold; color: #888; text-align: right; width: 24px; }
      `}</style>

      {/* --- SIDEBAR COMPONENT --- */}
      <aside className="sipo-sidebar">
        <div>
          <div className="sipo-brand-wrapper">
            <span style={{ fontSize: '28px' }}>🍅</span>
            <h1 className="sipo-brand-text">SIPODORO</h1>
          </div>
          <nav className="sipo-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`sipo-nav-item ${activeTab === item.id ? 'active' : ''}`}
              >
                <span>{item.icon}</span> {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div style={{ fontSize: '11px', color: '#888', paddingLeft: '8px' }}>v1.2.0 Stable Admin Node</div>
      </aside>

      {/* --- MAIN PAGE GRAPHICS CANVAS --- */}
      <main className="sipo-main-content">
        <header className="sipo-header">
          <h2>{activeTab} Management Module</h2>
        </header>

        {/* ==================== 0. MAIN DASHBOARD VIEW ==================== */}
        {activeTab === 'Dashboard' && (
          <div className="sipo-grid-dashboard">
            <div className="sipo-card">
              <h3 className="sipo-card-title">1. User</h3>
              <div className="sipo-inner-container">
                <table className="sipo-table">
                  <thead><tr><th>User Identity</th><th>Current streak</th><th>Status</th></tr></thead>
                  <tbody>
                    {users.slice(0, 2).map((user, idx) => (
                      <tr key={idx}>
                        <td><b>{user.name}</b><div style={{ fontSize: '11px', color: '#666' }}>{user.email}</div></td>
                        <td>{user.streak}</td>
                        <td><span style={{ backgroundColor: user.status === 'Active' ? '#2D6A4F' : '#C1121F', color: 'white', fontSize: '9px', padding: '2px 6px', borderRadius: '10px' }}>✔</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="sipo-card">
              <h3 className="sipo-card-title">2. Task</h3>
              <div className="sipo-inner-container sipo-task-layout">
                <div style={{ flex: 2 }}>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#555' }}>Tasks complete</span>
                  <div className="sipo-bar-chart-container">
                    {[{ d: 'M', h: '45%' }, { d: 'T', h: '75%' }, { d: 'W', h: '25%' }, { d: 'T', h: '50%' }, { d: 'F', h: '35%' }, { d: 'S', h: '65%' }, { d: 'S', h: '85%' }].map((b, i) => (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '14px' }}>
                        <div style={{ width: '100%', height: '100px', backgroundColor: '#B8B8B8', position: 'relative', borderRadius: '4px' }}>
                          <div style={{ width: '100%', height: b.h, backgroundColor: '#C1121F', position: 'absolute', bottom: 0, borderRadius: '4px' }}></div>
                        </div>
                        <span style={{ fontSize: '9px', marginTop: '4px' }}>{b.d}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.6)', padding: '10px', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '11px' }}>
                    <div style={{ fontWeight: 'bold', borderBottom: '1px solid #ccc', paddingBottom: '4px' }}>Tasks</div>
                    {tasksList.slice(0, 3).map((t, idx) => <div key={idx} style={{ margin: '4px 0' }}>▪ {t.name}</div>)}
                  </div>
                  <button onClick={() => setActiveTab('Tasks')} style={{ fontSize: '10px', padding: '4px', border: 'none', backgroundColor: '#B5B5B5', borderRadius: '4px', cursor: 'pointer' }}>Manage</button>
                </div>
              </div>
            </div>

            <div className="sipo-card">
              <h3 className="sipo-card-title">3. Pomodoro Sessions</h3>
              <div className="sipo-inner-container" style={{ padding: '20px' }}>
                <div className="sipo-line-chart-canvas">
                  <div className="sipo-y-axis-labels"><span>1k</span><span>800</span><span>600</span><span>400</span><span>100</span></div>
                  {[{ d: 'Mon', h: '25%' }, { d: 'Tue', h: '45%' }, { d: 'Wed', h: '35%' }, { d: 'Thu', h: '55%' }, { d: 'Fri', h: '18%' }, { d: 'Sat', h: '40%' }, { d: 'Sun', h: '22%' }].map((item, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                      <div style={{ width: '24px', height: item.h, backgroundColor: '#F2A5A9', borderRadius: '2px 2px 0 0' }}></div>
                      <span style={{ fontSize: '10px', mt: '4px' }}>{item.d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="sipo-card">
              <h3 className="sipo-card-title">4. Hydration Logs</h3>
              <div className="sipo-inner-container" style={{ padding: '20px' }}>
                <div className="sipo-line-chart-canvas">
                  <div className="sipo-y-axis-labels"><span>2k</span><span>1.5k</span><span>1.2k</span><span>1k</span><span>500</span></div>
                  {[{ d: 'Mon', h: '55%' }, { d: 'Tue', h: '70%' }, { d: 'Wed', h: '78%' }, { d: 'Thu', h: '48%' }, { d: 'Fri', h: '72%' }, { d: 'Sat', h: '55%' }, { d: 'Sun', h: '92%' }].map((item, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                      <div style={{ width: '24px', height: item.h, backgroundColor: '#FA9399', borderRadius: '2px 2px 0 0' }}></div>
                      <span style={{ fontSize: '10px', mt: '4px' }}>{item.d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 1. USER MANAGEMENT PAGE ==================== */}
        {activeTab === 'User manage' && (
          <div className="sipo-inner-container">
            <form onSubmit={handleAddUser} className="sipo-form-inline">
              <input type="text" placeholder="Username (e.g. DARITH)" className="sipo-input" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value.toUpperCase()})} />
              <input type="email" placeholder="User Email address" className="sipo-input" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} />
              <input type="text" placeholder="Streak (e.g. 5day)" className="sipo-input" value={newUser.streak} onChange={e => setNewUser({...newUser, streak: e.target.value})} />
              <button type="submit" className="sipo-btn-action sipo-btn-tomato">+ Create User Profile Node</button>
            </form>
            <table className="sipo-table">
              <thead><tr><th>Account Name</th><th>Email Context</th><th>Streak Count</th><th>Activity Token Status</th><th>Action Toggle</th></tr></thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td><b>{u.name}</b></td><td>{u.email}</td><td><code>{u.streak}</code></td>
                    <td><span style={{ backgroundColor: u.status === 'Active' ? '#2D6A4F' : '#C1121F', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '11px' }}>{u.status}</span></td>
                    <td><button onClick={() => toggleUserStatus(u.id)} className="sipo-btn-action sipo-btn-maroon">Toggle Node Status</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ==================== 2. POMODORO SESSIONS PAGE ==================== */}
        {activeTab === 'Pomodoro Sessions' && (
          <div className="sipo-inner-container">
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.3)', borderBottom: '1px solid #ccc', fontSize: '14px', fontWeight: 'bold', color: '#5F0F1A' }}>
              ⏱️ Real-time Telemetry Monitor Focus Streams
            </div>
            <table className="sipo-table">
              <thead><tr><th>Session ID</th><th>Target User Context</th><th>Total Focus Length</th><th>Assigned Task Block Tag</th><th>Completion Timestamp</th></tr></thead>
              <tbody>
                {pomodoroSessions.map(p => (
                  <tr key={p.id}>
                    <td><code>#{p.id}</code></td><td><b>{p.user}</b></td><td>⏱️ {p.duration}</td>
                    <td><span style={{ background: '#D3B5B7', padding: '3px 8px', borderRadius: '6px' }}>{p.tag}</span></td>
                    <td>{p.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ==================== 3. HYDRATION LOGS PAGE ==================== */}
        {activeTab === 'Hydration Logs' && (
          <div className="sipo-inner-container">
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.3)', borderBottom: '1px solid #ccc', fontSize: '14px', fontWeight: 'bold', color: '#5F0F1A' }}>
              💧 Fluid Absorption Tracker Matrix Logs
            </div>
            <table className="sipo-table">
              <thead><tr><th>Log Stream ID</th><th>User Identity Node</th><th>Volumetric Amount</th><th>Beverage Type Category</th><th>Local Sync Clock</th></tr></thead>
              <tbody>
                {hydrationRecords.map(h => (
                  <tr key={h.id}>
                    <td><code>#{h.id}</code></td><td><b>{h.user}</b></td><td style={{ color: '#C1121F', fontWeight: 'bold' }}>{h.amount}</td>
                    <td>{h.type}</td><td>{h.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ==================== 4. TASKS MANAGEMENT PAGE ==================== */}
        {activeTab === 'Tasks' && (
          <div className="sipo-inner-container">
            <form onSubmit={handleAddTask} className="sipo-form-inline">
              <input type="text" placeholder="Task Name description..." className="sipo-input" value={newTask.name} onChange={e => setNewTask({...newTask, name: e.target.value})} />
              <select className="sipo-select" value={newTask.assignee} onChange={e => setNewTask({...newTask, assignee: e.target.value})}>
                {users.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
              </select>
              <select className="sipo-select" value={newTask.priority} onChange={e => setNewTask({...newTask, priority: e.target.value})}>
                <option value="High">High Priority</option><option value="Medium">Medium Priority</option><option value="Low">Low Priority</option>
              </select>
              <button type="submit" className="sipo-btn-action sipo-btn-tomato">+ Push Dynamic Task</button>
            </form>
            <table className="sipo-table">
              <thead><tr><th>Task Name String</th><th>Assignee Destination</th><th>Priority Node</th><th>Processing Stage</th></tr></thead>
              <tbody>
                {tasksList.map(t => (
                  <tr key={t.id}>
                    <td><b>{t.name}</b></td><td><code>{t.assignee}</code></td>
                    <td><span style={{ color: t.priority === 'High' ? '#C1121F' : '#333', fontWeight: 'bold' }}>{t.priority}</span></td>
                    <td><span style={{ background: '#FFF', border: '1px solid #ccc', padding: '4px 8px', borderRadius: '4px' }}>{t.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ==================== 5. STORE MANAGEMENT PAGE ==================== */}
        {activeTab === 'Store' && (
          <div className="sipo-inner-container">
            <form onSubmit={handleAddStoreItem} className="sipo-form-inline">
              <input type="text" placeholder="Item Name / Title" className="sipo-input" value={newStoreItem.title} onChange={e => setNewStoreItem({...newStoreItem, title: e.target.value})} />
              <input type="text" placeholder="Price (e.g. 100 Points)" className="sipo-input" value={newStoreItem.price} onChange={e => setNewStoreItem({...newStoreItem, price: e.target.value})} />
              <input type="number" placeholder="Stock Quantities" className="sipo-input" value={newStoreItem.stock} onChange={e => setNewStoreItem({...newStoreItem, stock: e.target.value})} />
              <select className="sipo-select" value={newStoreItem.category} onChange={e => setNewStoreItem({...newStoreItem, category: e.target.value})}>
                <option value="Badges">Badges Portfolio</option><option value="Themes">Themes Canvas</option><option value="Utilities">Utilities Modules</option>
              </select>
              <button type="submit" className="sipo-btn-action sipo-btn-tomato">+ Deploy Store Asset</button>
            </form>
            <table className="sipo-table">
              <thead><tr><th>Asset Item Title</th><th>Point Pricing Token</th><th>Remaining Stock Allocation</th><th>Catalog Category</th></tr></thead>
              <tbody>
                {storeItems.map(item => (
                  <tr key={item.id}>
                    <td>🛍️ <b>{item.title}</b></td><td style={{ color: '#2D6A4F', fontWeight: 'bold' }}>{item.price}</td>
                    <td><code>{item.stock} items left</code></td>
                    <td><span style={{ fontSize: '11px', background: 'rgba(0,0,0,0.06)', padding: '3px 6px', borderRadius: '4px' }}>{item.category}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}