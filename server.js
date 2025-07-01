const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const USERS_FILE = path.join(__dirname, 'users.json');

// Helper to read users from file
function readUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE, 'utf-8');
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Helper to write users to file
function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Sign-in endpoint
app.post('/signin', (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res.status(400).json({ success: false, message: 'Please fill in all fields.' });
  }
  const users = readUsers();
  const input = userName.toLowerCase();
  const user = users.find(
    u =>
      u.userName.toLowerCase() === input ||
      u.email.toLowerCase() === input ||
      u.phoneNo === userName
  );
  if (user && user.passWord === password) {
    res.json({ success: true, user });
  } else if (user) {
    res.status(401).json({ success: false, message: 'Incorrect Password.' });
  } else {
    res.status(404).json({ success: false, message: 'User not found.' });
  }
});

// Registration endpoint
app.post('/register', (req, res) => {
  const { firstName, lastName, userName, passWord, email, phoneNo } = req.body;
  if (!userName || !passWord || !email) {
    return res.status(400).json({ success: false, message: 'Missing required fields.' });
  }
  const users = readUsers();
  if (users.some(u => u.userName.toLowerCase() === userName.toLowerCase())) {
    return res.status(409).json({ success: false, message: 'Username already taken' });
  }
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ success: false, message: 'Email already used' });
  }
  if (users.some(u => u.phoneNo === phoneNo)) {
    return res.status(409).json({ success: false, message: 'Phone number already used' });
  }
  const newUser = { firstName, lastName, userName, passWord, email, phoneNo };
  users.push(newUser);
  writeUsers(users);
  res.json({ success: true, user: newUser });
});

// Get all users (for testing/admin)
app.get('/users', (req, res) => {
  const users = readUsers();
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});