const sequelize = require('../config/database');
const Company = require('./company.model');
const Review = require('./review.model');

// Define associations
Company.hasMany(Review, {
    foreignKey: 'companyId',
    as: 'reviews',
    onDelete: 'CASCADE'
});

Review.belongsTo(Company, {
    foreignKey: 'companyId',
    as: 'company'
});

module.exports = {
    sequelize,
    Company,
    Review
};
