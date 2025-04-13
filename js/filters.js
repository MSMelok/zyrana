/**
 * ZYRANA Luxury Perfume Brand
 * Product Filtering Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    initializeProductFilters();
});

/**
 * Initialize product filtering system
 */
function initializeProductFilters() {
    // Get all filter buttons and product cards
    const categoryFilterBtns = document.querySelectorAll('.filter-btn[data-filter]');
    const occasionFilterBtns = document.querySelectorAll('.filter-btn[data-occasion]');
    const intensityFilterBtns = document.querySelectorAll('.filter-btn[data-intensity]');
    const productCards = document.querySelectorAll('.product-card');
    
    // Initialize filter state
    const filterState = {
        category: 'all',
        occasion: 'all',
        intensity: 'all'
    };
    
    // Add click events to category filter buttons
    categoryFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button state
            categoryFilterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update filter state
            filterState.category = this.getAttribute('data-filter');
            
            // Apply filters
            applyFilters();
        });
    });
    
    // Add click events to occasion filter buttons
    occasionFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button state
            occasionFilterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update filter state
            filterState.occasion = this.getAttribute('data-occasion');
            
            // Apply filters
            applyFilters();
        });
    });
    
    // Add click events to intensity filter buttons
    intensityFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button state
            intensityFilterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update filter state
            filterState.intensity = this.getAttribute('data-intensity');
            
            // Apply filters
            applyFilters();
        });
    });
    
    /**
     * Apply all active filters to product cards
     */
    function applyFilters() {
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardOccasion = card.getAttribute('data-occasion');
            const cardIntensity = card.getAttribute('data-intensity');
            
            // Check if card matches all active filters
            const categoryMatch = filterState.category === 'all' || cardCategory === filterState.category;
            const occasionMatch = filterState.occasion === 'all' || cardOccasion === filterState.occasion;
            const intensityMatch = filterState.intensity === 'all' || cardIntensity === filterState.intensity;
            
            // Show/hide card based on filter matches
            if (categoryMatch && occasionMatch && intensityMatch) {
                // Show the card with animation
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                // Hide the card with animation
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Update message when no results are found
        checkNoResults();
    }
    
    /**
     * Check if there are no results and display a message
     */
    function checkNoResults() {
        // Count visible products
        let visibleCount = 0;
        productCards.forEach(card => {
            if (card.style.display !== 'none') {
                visibleCount++;
            }
        });
        
        // Get or create the no-results message element
        let noResultsMsg = document.querySelector('.no-results-message');
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results-message';
            noResultsMsg.style.textAlign = 'center';
            noResultsMsg.style.padding = 'var(--spacing-lg)';
            noResultsMsg.style.width = '100%';
            noResultsMsg.style.opacity = '0';
            noResultsMsg.style.transition = 'opacity 0.3s ease';
            
            // Insert after the product grid
            const productGrid = document.querySelector('.product-grid');
            if (productGrid) {
                productGrid.parentNode.insertBefore(noResultsMsg, productGrid.nextSibling);
            }
        }
        
        // Show/hide message based on results
        if (visibleCount === 0) {
            noResultsMsg.innerHTML = `
                <h3>No fragrances match your filters</h3>
                <p>Try adjusting your filter criteria to see more options.</p>
                <button class="btn btn-primary reset-filters" style="margin-top: var(--spacing-sm);">Reset Filters</button>
            `;
            noResultsMsg.style.display = 'block';
            setTimeout(() => {
                noResultsMsg.style.opacity = '1';
            }, 10);
            
            // Add event listener to reset button
            const resetBtn = noResultsMsg.querySelector('.reset-filters');
            if (resetBtn) {
                resetBtn.addEventListener('click', resetAllFilters);
            }
        } else {
            noResultsMsg.style.opacity = '0';
            setTimeout(() => {
                noResultsMsg.style.display = 'none';
            }, 300);
        }
    }
    
    /**
     * Reset all filters to their default state
     */
    function resetAllFilters() {
        // Reset filter state
        filterState.category = 'all';
        filterState.occasion = 'all';
        filterState.intensity = 'all';
        
        // Reset active buttons
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
        document.querySelector('.filter-btn[data-occasion="all"]').classList.add('active');
        document.querySelector('.filter-btn[data-intensity="all"]').classList.add('active');
        
        categoryFilterBtns.forEach(btn => {
            if (btn.getAttribute('data-filter') !== 'all') {
                btn.classList.remove('active');
            }
        });
        
        occasionFilterBtns.forEach(btn => {
            if (btn.getAttribute('data-occasion') !== 'all') {
                btn.classList.remove('active');
            }
        });
        
        intensityFilterBtns.forEach(btn => {
            if (btn.getAttribute('data-intensity') !== 'all') {
                btn.classList.remove('active');
            }
        });
        
        // Show all products
        productCards.forEach(card => {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 10);
        });
        
        // Hide no results message
        const noResultsMsg = document.querySelector('.no-results-message');
        if (noResultsMsg) {
            noResultsMsg.style.opacity = '0';
            setTimeout(() => {
                noResultsMsg.style.display = 'none';
            }, 300);
        }
    }
    
    // Initial filter application
    applyFilters();
}
