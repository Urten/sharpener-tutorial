const express = require('express');
const app = express();

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

// logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} request made to ${req.url}`);
  next();
});

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API!');
});

// Routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(4000, () => {
  console.log('Server is listening on port 4000');
});
