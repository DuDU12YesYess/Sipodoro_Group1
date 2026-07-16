module.exports = (req, res, next) => {
    const userRole = req.user ? req.user.role : "NO_USER";
    
    console.log("--- ADMIN CHECK ---");
    console.log("User Object:", req.user);
    console.log("Expected: 'admin'");
    console.log("Received:", userRole);
    console.log("Matches:", userRole === 'admin');
    console.log("-------------------");

    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ 
            message: `Access denied. You are logged in as '${userRole}', but 'admin' is required.` 
        });
    }
};