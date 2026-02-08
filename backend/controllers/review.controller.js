const { Company, Review } = require('../models');

exports.getCompanyReviews = async (req, res) => {
    try {
        const { companyName } = req.params;

        // Find company with associated reviews
        const company = await Company.findOne({
            where: { name: companyName },
            include: {
                model: Review,
                as: 'reviews'
            }
        });

        // If company doesn't exist
        if (!company) {
            return res.status(404).json({
                success: false,
                message: 'Company not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                company: {
                    id: company.id,
                    name: company.name,
                    createdAt: company.createdAt,
                    updatedAt: company.updatedAt
                },
                reviews: company.reviews
            }
        });

    } catch (error) {
        console.error('Error fetching company reviews:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

exports.addReview = async (req, res) => {
    try {
        const { companyName, pros, cons, rating } = req.body;

        // Validate required fields
        if (!companyName || !rating) {
            return res.status(400).json({
                success: false,
                message: 'Company name and rating are required'
            });
        }

        // Validate rating range
        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5'
            });
        }

        // Find or create company
        let company = await Company.findOne({
            where: { name: companyName }
        });

        if (!company) {
            company = await Company.create({ name: companyName });
        }

        // Create review
        const review = await Review.create({
            pros: pros || null,
            cons: cons || null,
            rating,
            companyId: company.id
        });

        return res.status(201).json({
            success: true,
            message: 'Review added successfully',
            data: {
                company,
                review
            }
        });

    } catch (error) {
        console.error('Error adding review:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};
