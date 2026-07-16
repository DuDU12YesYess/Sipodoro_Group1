import api from "./axios";

// Start a new Pomodoro cycle
export const startCycle = (durations) => {
    return api.post("/pomodoro/start", {
        focus_duration: durations.focus,
        break_duration: durations.shortBreak
    });
};

// Complete one focus session
export const completeFocusSession = (cycleId) => {
    return api.post(`/pomodoro/focus-complete/${cycleId}`);
};

// Complete one break
export const completeBreak = (cycleId) => {
    return api.post(`/pomodoro/break-complete/${cycleId}`);
};

// Get user's Pomodoro history
export const getHistory = () => {
    return api.get("/pomodoro/history");
};