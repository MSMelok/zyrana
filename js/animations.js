/**
 * ZYRANA Luxury Perfume Brand
 * Animation Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    initializeScrollAnimations();
    initializeParallaxEffects();
    enhanceGradientCircles();
});

/**
 * Initialize scroll-based animations using Intersection Observer
 */
function initializeScrollAnimations() {
    // Select all elements with the fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Create intersection observer options
    const options = {
        root: null, // Use viewport as root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of element is visible
    };
    
    // Create observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Observe all fade elements
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Initialize parallax scrolling effects
 */
function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-image, .about-image, .step-image');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(element => {
            // Calculate position based on scroll
            // Different elements have different parallax speeds
            let speed = 0.05; // Default parallax speed
            
            // Adjust speed for specific sections
            if (element.closest('.hero-section')) {
                speed = 0.08;
            } else if (element.closest('.about-section')) {
                speed = 0.06;
            } else if (element.closest('.process-section')) {
                speed = 0.04;
            }
            
            // Get element position relative to viewport
            const rect = element.getBoundingClientRect();
            const elementY = rect.top + scrollY;
            
            // Only apply parallax when element is in view
            if (scrollY + window.innerHeight > elementY && scrollY < elementY + rect.height) {
                const offset = (scrollY - elementY) * speed;
                
                // Apply transform to create parallax effect
                // Use CSS transform for better performance
                element.style.transform = `translateY(${offset}px)`;
            }
        });
    });
}

/**
 * Enhance gradient circles with subtle mouse movement effects
 */
function enhanceGradientCircles() {
    const circles = document.querySelectorAll('.gradient-circle');
    
    // Add mouse movement effect
    document.addEventListener('mousemove', e => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        circles.forEach((circle, index) => {
            // Different movement factor for each circle
            const moveFactor = (index + 1) * 10;
            
            // Calculate new position based on mouse coordinates
            const moveX = (mouseX - 0.5) * moveFactor;
            const moveY = (mouseY - 0.5) * moveFactor;
            
            // Apply subtle transform
            circle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

/**
 * Add smooth scroll-to-top functionality
 */
window.addEventListener('scroll', function() {
    // Show scroll-to-top button after scrolling down
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    
    // Style the button
    scrollToTopBtn.style.position = 'fixed';
    scrollToTopBtn.style.bottom = '20px';
    scrollToTopBtn.style.right = '20px';
    scrollToTopBtn.style.width = '50px';
    scrollToTopBtn.style.height = '50px';
    scrollToTopBtn.style.borderRadius = '50%';
    scrollToTopBtn.style.backgroundColor = 'var(--accent-primary)';
    scrollToTopBtn.style.color = 'white';
    scrollToTopBtn.style.border = 'none';
    scrollToTopBtn.style.boxShadow = 'var(--shadow-md)';
    scrollToTopBtn.style.cursor = 'pointer';
    scrollToTopBtn.style.display = 'flex';
    scrollToTopBtn.style.alignItems = 'center';
    scrollToTopBtn.style.justifyContent = 'center';
    scrollToTopBtn.style.zIndex = '99';
    scrollToTopBtn.style.opacity = '0';
    scrollToTopBtn.style.transform = 'translateY(20px)';
    scrollToTopBtn.style.transition = 'opacity 0.3s, transform 0.3s';
    
    // Add button to the DOM if it doesn't exist yet
    if (!document.getElementById('scroll-to-top')) {
        document.body.appendChild(scrollToTopBtn);
    }
    
    // Show/hide based on scroll position
    if (window.scrollY > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.transform = 'translateY(20px)';
    }
    
    // Add click event
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
