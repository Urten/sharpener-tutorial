// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const backToFormBtn = document.getElementById('backToFormBtn');
const reviewForm = document.getElementById('reviewForm');

const formSection = document.getElementById('formSection');
const resultsSection = document.getElementById('resultsSection');
const reviewsList = document.getElementById('reviewsList');
const notFoundMessage = document.getElementById('notFoundMessage');
const resultsCompanyName = document.getElementById('resultsCompanyName');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    searchBtn.addEventListener('click', handleSearch);
    backToFormBtn.addEventListener('click', handleBackToForm);
    reviewForm.addEventListener('submit', handleFormSubmit);
    
    // Allow Enter key in search input
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    });
});

// Search Handler
async function handleSearch() {
    const companyName = searchInput.value.trim();
    
    if (!companyName) {
        alert('Please enter a company name');
        return;
    }
    
    try {
        const data = await getCompanyReviews(companyName);
        
        if (data.success) {
            renderReviews(data.data);
            showResults();
        }
    } catch (error) {
        if (error.message === 'Company not found') {
            showNotFound();
        } else {
            showError('Error searching for company. Please try again.');
        }
    }
}

// Back to Form Handler
function handleBackToForm() {
    showForm();
    searchInput.value = '';
}

// Form Submit Handler
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const companyName = document.getElementById('companyName').value.trim();
    const pros = document.getElementById('pros').value.trim();
    const cons = document.getElementById('cons').value.trim();
    const rating = document.getElementById('rating').value;
    
    // Validation
    if (!companyName || !rating) {
        alert('Company name and rating are required');
        return;
    }
    
    try {
        const data = await postReview(companyName, pros, cons, parseInt(rating));
        
        if (data.success) {
            alert('Review submitted successfully!');
            reviewForm.reset();
        }
    } catch (error) {
        showError('Error submitting review. Please try again.');
    }
}

// UI Helper Functions
function showResults() {
    formSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
}

function showForm() {
    resultsSection.classList.add('hidden');
    formSection.classList.remove('hidden');
    notFoundMessage.classList.add('hidden');
}

function renderReviews(data) {
    const { company, reviews } = data;
    
    resultsCompanyName.textContent = company.name;
    
    if (reviews.length === 0) {
        reviewsList.innerHTML = '<p class="text-gray-500 text-center py-4">No reviews yet for this company.</p>';
        return;
    }
    
    reviewsList.innerHTML = reviews.map(review => `
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
                <span class="text-yellow-500 font-bold">⭐ ${review.rating}/5</span>
                <span class="text-gray-400 text-sm">${formatDate(review.createdAt)}</span>
            </div>
            <div class="space-y-2">
                ${review.pros ? `
                <div>
                    <span class="text-green-600 font-medium text-sm">👍 Pros:</span>
                    <p class="text-gray-700 text-sm">${review.pros}</p>
                </div>
                ` : ''}
                ${review.cons ? `
                <div>
                    <span class="text-red-600 font-medium text-sm">👎 Cons:</span>
                    <p class="text-gray-700 text-sm">${review.cons}</p>
                </div>
                ` : ''}
            </div>
        </div>
    `).join('');
    
    notFoundMessage.classList.add('hidden');
}

function showNotFound() {
    resultsCompanyName.textContent = searchInput.value;
    reviewsList.innerHTML = '';
    notFoundMessage.classList.remove('hidden');
    showResults();
}

function showError(message) {
    alert(message);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
