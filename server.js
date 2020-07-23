const express = require('express');
const connectDatabase = require('./config/db');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(express.json({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

connectDatabase();

app.get('/', (req, res) => res.send('SERVER STARTED'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/number', require('./routes/api/number'));
app.use('/api/inbox', require('./routes/api/inbox'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
