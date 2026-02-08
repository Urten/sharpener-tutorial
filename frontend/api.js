const API_BASE_URL = 'http://localhost:3000';

const postReview = async (companyName, pros, cons, rating) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                companyName,
                pros,
                cons,
                rating
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to post review');
        }
        
        return data;
    } catch (error) {
        console.error('Error posting review:', error);
        throw error;
    }
};

const getCompanyReviews = async (companyName) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/reviews/${encodeURIComponent(companyName)}`);
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch reviews');
        }
        
        return data;
    } catch (error) {
        console.error('Error fetching company reviews:', error);
        throw error;
    }
};
