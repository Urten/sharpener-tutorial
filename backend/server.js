const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const reviewRoutes = require('./routes/review.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/reviews', reviewRoutes);

// Sync database and start server
sequelize.sync()
    .then(() => {
        console.log('Database synced successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });
