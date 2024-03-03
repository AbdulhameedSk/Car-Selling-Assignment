const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// Function to generate JWT
function generateToken(user) {
  return jwt.sign({ userId: user._id, email: user.email }, 'secret', { expiresIn: '1h' });
}

// Function to verify JWT
function verifyToken(token) {
  return jwt.verify(token, 'secret');
}

// Middleware to protect routes
function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
  try {
    const decodedToken = verifyToken(token);
    req.userData = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
}

// Route for user login


// Example protected route
app.get('/protected', authenticate, (req, res) => {
  return res.status(200).json({ message: 'Access granted' });
});
