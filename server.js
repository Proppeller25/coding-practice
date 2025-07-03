const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app = express();
// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'images'));
  },
  filename: function (req, file, cb) {
    // Use username + timestamp + ext for uniqueness
    const ext = path.extname(file.originalname);
    const username = req.params.username || 'user';
    cb(null, username + '-' + Date.now() + ext);
  }
});
const upload = multer({ storage });
// Serve static files from the images folder at /images
app.use('/images', express.static(path.join(__dirname, 'images')));
// Optionally serve other static files from a public folder if needed
// app.use(express.static('public'));
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

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Profile page route (GET /profile/:username)
app.get('/profile/:username', (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.userName === req.params.username);
  if (user) {
    res.render('profile', { user });
  } else {
    res.status(404).send('User not found');
  }
});

// Settings page route (GET /settings)
app.get('/settings', (req, res) => {
  // For demo, get user by query or default to first user
  const users = readUsers();
  let user;
  if (req.query.username) {
    user = users.find(u => u.userName === req.query.username);
  } else {
    user = users[0];
  }
  if (user) {
    res.render('settings', { user });
  } else {
    res.status(404).send('User not found');
  }
});

// Settings update route (POST /settings/:username) with image upload
app.post('/settings/:username', upload.single('ProfilePicture'), (req, res) => {
  // If multipart, fields are in req.body, file in req.file
  const { firstName, lastName, userName, passWord, email, phoneNo } = req.body;
  const users = readUsers();
  const userIndex = users.findIndex(u => u.userName === req.params.username);
  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }
  // Check for email/phone conflicts (except for self)
  if (users.some((u, i) => i !== userIndex && u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ success: false, message: 'Email already used.' });
  }
  if (users.some((u, i) => i !== userIndex && u.phoneNo === phoneNo)) {
    return res.status(409).json({ success: false, message: 'Phone number already used.' });
  }
  // Update user
  let updatedUser = { ...users[userIndex], firstName, lastName, passWord, email, phoneNo };
  if (req.file) {
    updatedUser.profilePicture = req.file.filename;
  }
  users[userIndex] = updatedUser;
  writeUsers(users);
  res.json({ success: true, user: users[userIndex] });
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