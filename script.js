document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.btn-filter');
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Initialize - show all FAQs
    showAllFaqs();
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter FAQs
            if (filterValue === 'all') {
                showAllFaqs();
            } else {
                filterFaqs(filterValue);
            }
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('faq-search');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // If search is empty, respect the current filter
            const activeFilter = document.querySelector('.btn-filter.active').getAttribute('data-filter');
            if (activeFilter === 'all') {
                showAllFaqs();
            } else {
                filterFaqs(activeFilter);
            }
        } else {
            // Search within FAQs
            searchFaqs(searchTerm);
        }
    });
    
    // Feedback functionality
    const feedbackButtons = document.querySelectorAll('.feedback-btn');
    
    feedbackButtons.forEach(button => {
        button.addEventListener('click', function() {
            const feedbackType = this.getAttribute('data-feedback');
            const feedbackSection = this.closest('.feedback-section');
            
            // Remove active class from all buttons in this section
            feedbackSection.querySelectorAll('.feedback-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show thank you message
            const thankYouMessage = document.createElement('p');
            thankYouMessage.className = 'text-success mt-2';
            thankYouMessage.textContent = 'Thank you for your feedback!';
            
            // Remove any existing thank you message
            const existingMessage = feedbackSection.querySelector('.text-success');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            // Add new thank you message
            feedbackSection.appendChild(thankYouMessage);
            
            // You could send this feedback to your server here
            console.log(`Feedback for question: ${feedbackType}`);
        });
    });
    
    // Helper functions
    function showAllFaqs() {
        faqItems.forEach(item => {
            item.style.display = 'block';
        });
    }
    
    function filterFaqs(category) {
        faqItems.forEach(item => {
            if (item.getAttribute('data-category') === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    function searchFaqs(searchTerm) {
        faqItems.forEach(item => {
            const questionText = item.querySelector('.accordion-button').textContent.toLowerCase();
            const answerText = item.querySelector('.accordion-body').textContent.toLowerCase();
            
            if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
});