/**
 * ZYRANA Luxury Perfume Brand
 * Modal Functionality (Product Details, Shipping & Returns)
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeProductModals();
    initializeShippingModal();
    initializeWhatsAppOrdering();
});

/**
 * Initialize product detail modals
 */
function initializeProductModals() {
    const modal = document.getElementById('product-modal');
    const modalOverlay = modal;
    const closeBtn = modal.querySelector('.modal-close');
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    
    // Modal elements
    const modalImage = document.getElementById('modal-product-image');
    const modalTitle = document.getElementById('modal-product-title');
    const modalDescription = document.getElementById('modal-product-description');
    const modalCategory = document.getElementById('modal-product-category');
    const modalOccasion = document.getElementById('modal-product-occasion');
    const modalIntensity = document.getElementById('modal-product-intensity');
    const modalTopNotes = document.getElementById('modal-product-top-notes');
    const modalHeartNotes = document.getElementById('modal-product-heart-notes');
    const modalBaseNotes = document.getElementById('modal-product-base-notes');
    const modalPrice = document.getElementById('modal-product-price');
    
    // Add click event to each "View Details" button
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            
            // Get product data from data attributes
            const productName = productCard.querySelector('h3').textContent;
            const productDescription = productCard.querySelector('.product-description').textContent;
            const productImage = productCard.querySelector('img').src;
            const productCategory = productCard.dataset.category;
            const productOccasion = productCard.dataset.occasion;
            const productIntensity = productCard.dataset.intensity;
            const productTopNotes = productCard.dataset.topNotes;
            const productHeartNotes = productCard.dataset.heartNotes;
            const productBaseNotes = productCard.dataset.baseNotes;
            const productPrice = productCard.dataset.price || '195';
            
            // Populate modal with product data
            modalImage.src = productImage;
            modalTitle.textContent = productName;
            modalDescription.textContent = productDescription;
            modalCategory.textContent = capitalizeFirstLetter(productCategory);
            modalOccasion.textContent = capitalizeFirstLetter(productOccasion);
            modalIntensity.textContent = capitalizeFirstLetter(productIntensity);
            modalTopNotes.textContent = productTopNotes;
            modalHeartNotes.textContent = productHeartNotes;
            modalBaseNotes.textContent = productBaseNotes;
            modalPrice.textContent = '$' + productPrice;
            
            // Store current product data on the order button for WhatsApp integration
            const orderNowBtn = document.getElementById('order-now-btn');
            orderNowBtn.dataset.productName = productName;
            orderNowBtn.dataset.productCategory = productCategory;
            orderNowBtn.dataset.productPrice = productPrice;
            
            // Show modal
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    });
    
    // Close modal when clicking close button
    closeBtn.addEventListener('click', function() {
        closeModal(modalOverlay);
    });
    
    // Close modal when clicking outside the modal content
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal(modalOverlay);
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal(modalOverlay);
        }
    });
}

/**
 * Initialize Shipping & Returns policy modal
 */
function initializeShippingModal() {
    const shippingModal = document.getElementById('shipping-modal');
    const shippingLink = document.getElementById('shipping-returns-link');
    const closeBtn = shippingModal.querySelector('.modal-close');
    
    // Open shipping modal when clicking on the link
    shippingLink.addEventListener('click', function(e) {
        e.preventDefault();
        shippingModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
    
    // Close modal when clicking close button
    closeBtn.addEventListener('click', function() {
        closeModal(shippingModal);
    });
    
    // Close modal when clicking outside the modal content
    shippingModal.addEventListener('click', function(e) {
        if (e.target === shippingModal) {
            closeModal(shippingModal);
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && shippingModal.classList.contains('active')) {
            closeModal(shippingModal);
        }
    });
}

/**
 * Initialize WhatsApp ordering functionality
 */
function initializeWhatsAppOrdering() {
    const orderNowBtn = document.getElementById('order-now-btn');
    
    orderNowBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get product information
        const productName = this.dataset.productName;
        const productCategory = this.dataset.productCategory;
        const productPrice = this.dataset.productPrice;
        
        // Create WhatsApp message
        const message = `Hello ZYRANA Team! I would like to order:\n\n*${productName}*\nCategory: ${capitalizeFirstLetter(productCategory)}\nPrice: $${productPrice}\n\nPlease let me know how to proceed with my order.`;
        
        // Encode the message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // Open WhatsApp with pre-filled message (you would replace this phone number with your actual business number)
        window.open(`https://wa.me/1234567890?text=${encodedMessage}`, '_blank');
    });
}

/**
 * Utility function to close any modal
 */
function closeModal(modalElement) {
    modalElement.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

/**
 * Utility function to capitalize first letter
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}