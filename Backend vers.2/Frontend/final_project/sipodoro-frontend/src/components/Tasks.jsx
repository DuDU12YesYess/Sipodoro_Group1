import { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from "../api/taskApi";
import logoImg from '../assets/image/logo.jpg';

export default function Tasks({ onNavigate, isLoggedIn = false, username = 'Guest', onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  // Set default to current time for the datetime-local input
  const [deadline, setDeadline] = useState(new Date().toISOString().slice(0, 16));
  const [status, setStatus] = useState('Critical');

  const formatDeadline = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const formattedDate = date.toLocaleDateString('en-GB'); 
    const formattedTime = date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });

    return `${formattedDate} at ${formattedTime}`;
  };

  const loadTasks = useCallback(async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      await loadTasks();
    };
    fetchTasks();
  }, [loadTasks]);

  const handleAddTask = async (e) => {
    if (e) e.preventDefault();
    if (!taskName.trim()) return;

    try {
      await createTask({ title: taskName, deadline, status });
      setTaskName("");
      await loadTasks();
    } catch (error) {
      alert(error.response?.data?.message || "Unable to create task.");
    }
  };

  const toggleTaskCompletion = async (task) => {
    try {
      await updateTask(task.task_id, {
        title: task.title,
        deadline: task.deadline,
        status: task.status,
        completed: !task.completed
      });
      await loadTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleCancel = () => setTaskName('');

  const colors = {
    bg: '#FAF6E3',
    panelBg: '#EFEBC9', 
    inputBg: '#FAF6E3',
    darkGreen: '#2D6A4F', 
    textDark: '#000000',
    white: '#FFFFFF',
    accentRed: '#D32F2F',
    maroon: '#80002A',
    status: { Urgent: '#E63946', Critical: '#F39C12', 'Low Critical': '#2A9D8F' }
  };

  return (
    <div style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", "Arial", sans-serif', backgroundColor: colors.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
      
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 60px', backgroundColor: colors.bg }}>
        <img src={logoImg} alt="Logo" style={{ height: '40px', cursor: 'pointer' }} onClick={() => onNavigate('home')} />
        
        <div style={{ fontFamily:'Poppins_Regular', display: 'flex', gap: '32px', alignItems: 'center' }}>
          <button onClick={() => onNavigate('home')} style={navButtonStyle}>Home</button>
          <button onClick={() => onNavigate('about')} style={navButtonStyle}>About us</button>
          <button onClick={() => onNavigate('tasks')} style={{ ...navButtonStyle, fontFamily:'Poppins_Bold' }}>Task</button>
          <button onClick={() => onNavigate('timer')} style={navButtonStyle}>Pomodoro</button>
          <button onClick={() => onNavigate('hydration')} style={navButtonStyle}>Hydration</button>
          <button onClick={() => onNavigate('garden')} style={navButtonStyle}>Garden</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isLoggedIn ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#FDF2B5', borderRadius: '20px', padding: '6px 14px' }}>
                <span>👤</span>
                <span style={{ fontFamily:'Poppins_Bold', color: colors.maroon }}>{username}</span>
              </div>
              <button onClick={onLogout} style={{ fontFamily:'Poppins_Bold', backgroundColor: '#B70000', color: '#FFF', border: 'none', borderRadius: '16px', padding: '6px 18px', cursor: 'pointer' }}>Logout</button>
            </>
          ) : (
            <div onClick={() => onNavigate('login')} style={{ color: colors.accentRed, fontWeight: 'bold', cursor: 'pointer' }}>Signup / Login</div>
          )}
        </div>
      </nav>

      <main style={{ fontFamily: 'Hello_Notie', display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, padding: '0px 60px 40px 60px' }}>
        <h1 style={{ fontSize: '52px', fontWeight: '900', margin: '20px 0 40px 0' }}>What do you want to do today?</h1>

        <div style={{ display: 'flex', gap: '40px', width: '100%', maxWidth: '1100px' }}>
          <div style={{ flex: 1.4, display: 'flex', flexDirection: 'column' }}>
            <div style={{ backgroundColor: colors.panelBg, borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2 style={{ fontSize: '42px', margin: '0 0 10px 0', textAlign: 'center' }}>Detail information</h2>
              <label style={labelStyle}>Name</label>
              <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} style={{ ...inputStyle, backgroundColor: colors.inputBg }} />
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Deadline</label>
                    {/* CHANGED TO datetime-local */}
                    <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} style={{ ...inputStyle, backgroundColor: colors.inputBg }} />
                </div>
                <div style={{ flex: 1 }}><label style={labelStyle}>Status</label><select value={status} onChange={(e) => setStatus(e.target.value)} style={{ ...inputStyle, backgroundColor: colors.status[status] }}>
                    <option value="Urgent">Urgent</option><option value="Critical">Critical</option><option value="Low Critical">Low Critical</option>
                </select></div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '24px', marginTop: '24px' }}>
              <button onClick={handleCancel} style={{ flex: 1, height: '52px', borderRadius: '16px', border: `2px solid ${colors.darkGreen}`, backgroundColor: colors.bg, color: colors.darkGreen, fontWeight: 'bold', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleAddTask} style={{ flex: 1, height: '52px', borderRadius: '16px', border: 'none', backgroundColor: colors.darkGreen, color: colors.white, fontWeight: 'bold', cursor: 'pointer' }}>Done</button>
            </div>
          </div>

          <div style={{ flex: 1, backgroundColor: colors.panelBg, borderRadius: '24px', padding: '32px 28px' }}>
            <h2 style={{ fontSize: '36px', textAlign: 'center' }}>To-Do</h2>
            {tasks.map(task => (
              <div key={task.task_id} onClick={() => toggleTaskCompletion(task)} style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', marginBottom: '15px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '6px', border: `3px solid ${task.completed ? '#9E9E9E' : colors.status[task.status]}` }}>
                  {task.completed && <span style={{ fontSize: '14px', color: '#9E9E9E' }}>✓</span>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '25px', color: task.completed ? '#9E9E9E' : colors.status[task.status], textDecoration: task.completed ? 'line-through' : 'none', fontWeight: 'bold' }}>{task.title}</span>
                  <span style={{ fontSize: '15px', color: '#7F7C6B' }}>Due: {formatDeadline(task.deadline)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

const navButtonStyle = { background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '4px 0' };
const labelStyle = { display: 'block', fontSize: '18px', fontWeight: 'bold', marginBottom: '6px' };
const inputStyle = { width: '100%', height: '48px', borderRadius: '20px', border: 'none', padding: '0 20px', fontSize: '16px', boxSizing: 'border-box' };