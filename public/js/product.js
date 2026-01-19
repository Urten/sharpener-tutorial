// Product form submission handler using Axios
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('productForm');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Get form data
            const formData = new FormData(form);
            const productName = e.target.productName.value;
            
            // Validate form data
            if (!productName || productName.trim() === '') {
                alert('Please enter a product name');
                return;
            }
            
            // Create product data object
            const productData = {
                name: productName.trim()
            };
            
            try {
                // Send POST request using Axios
                const response = await axios.post('/products', productData);
                
                // Handle successful response
                if (response.data && response.data.success) {
                    const product = response.data.data.product;
                    alert(`Product created successfully!\n\nName: ${product.name}\nID: ${product.id}`);
                    
                    // Clear the form
                    form.reset();
                    
                    // Log success to console
                    console.log('Product created:', product);
                }
            } catch (error) {
                // Handle error
                console.error('Error creating product:', error);
                
                if (error.response && error.response.data) {
                    alert('Error: ' + error.response.data.message);
                } else {
                    alert('An error occurred while creating the product. Please try again.');
                }
            }
        });
    }
});
