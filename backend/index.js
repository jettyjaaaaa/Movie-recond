const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); 

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const SECRET_KEY = 'your_jwt_secret';

const users = [
  { id: 1, username: 'manager', password: bcrypt.hashSync('password123', 10), role: 'MANAGER' },
  { id: 2, username: 'teamleader', password: bcrypt.hashSync('password123', 10), role: 'TEAMLEADER' },
  { id: 3, username: 'floorstaff', password: bcrypt.hashSync('password123', 10), role: 'FLOORSTAFF' }
];

const movies = [];

const authenticateJWT = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};


app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);

  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY);
      res.json({ token });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.get('/movies', authenticateJWT, (req, res) => {
  res.json(movies);
});

app.post('/movies', authenticateJWT, (req, res) => {
  if (req.user.role === 'MANAGER' || req.user.role === 'TEAMLEADER' || req.user.role === 'FLOORSTAFF') {
    const { title, year, rating } = req.body;
    const movie = { id: uuidv4(), title, year, rating }; 
    movies.push(movie);
    res.status(201).send(movie);
  } else {
    res.sendStatus(403);
  }
});

app.delete('/movies/:id', authenticateJWT, (req, res) => {
  if (req.user.role === 'MANAGER') {
    const movieIndex = movies.findIndex((movie) => movie.id === req.params.id);
    if (movieIndex !== -1) {
      movies.splice(movieIndex, 1);
      res.status(204).send('Movie deleted');
    } else {
      res.status(404).send('Movie not found');
    }
  } else {
    res.sendStatus(403);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
