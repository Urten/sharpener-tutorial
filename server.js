const express = require('express');
const app = express();

app.use(express.json());

const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const welcomeRoutes = require('./routes/welcomeRoutes');
const libraryRoutes = require('./routes/libraryRoutes');
// const errorRoutes = require('./routes/errorRoutes');

//logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} request made to ${req.url}`);
  next();
});

app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/welcome', welcomeRoutes);
app.use('/library', libraryRoutes);
// app.use('/', errorRoutes);

app.listen(4000, () => {
  console.log('Server is listening on port 4000');
});
