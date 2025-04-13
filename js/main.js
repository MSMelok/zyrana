/**
 * ZYRANA Luxury Perfume Brand
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Initialize components
    initializeNavigation();
    initializeContactForm();
    initializeNewsletterForm();
    initializeTestimonialSlider();
    setupMobileMenu();
});

/**
 * Handle smooth scrolling and navigation highlighting
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('.site-header');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            const mobileMenu = document.querySelector('.nav-links');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - header.offsetHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle active navigation state based on scroll position
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + header.offsetHeight + 50;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Update header style on scroll
    function updateHeaderStyle() {
        if (window.scrollY > 50) {
            header.style.padding = '0.6rem 0';
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.padding = 'var(--spacing-sm) 0';
            header.style.boxShadow = 'var(--shadow-sm)';
        }
    }

    // Add event listeners
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        updateHeaderStyle();
    });
    
    // Initial call to set correct state
    updateActiveNavLink();
    updateHeaderStyle();
}

/**
 * Handle contact form submission
 */
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real implementation, you would send this data to a server
            // For demo purposes, we'll just show a success message
            alert(`Thank you for your message, ${name}! We'll get back to you shortly.`);
            contactForm.reset();
        });
    }
}

/**
 * Handle newsletter form submission
 */
function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Basic validation
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            // In a real implementation, you would send this data to a server
            // For demo purposes, we'll just show a success message
            alert(`Thank you for subscribing! We've sent a confirmation to ${email}.`);
            newsletterForm.reset();
        });
    }
}

/**
 * Initialize testimonial slider
 */
function initializeTestimonialSlider() {
    const track = document.querySelector('.testimonial-track');
    const nextBtn = document.querySelector('.slider-arrow.next');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const dots = document.querySelectorAll('.slider-dots .dot');
    
    if (!track || !nextBtn || !prevBtn) return;
    
    let currentSlide = 0;
    const slideCount = document.querySelectorAll('.testimonial-card').length;
    
    // Pause automatic animation when manually controlling
    track.style.animationPlayState = 'paused';
    track.style.transform = 'translateX(0)';
    
    // Function to update the current slide
    function updateSlide() {
        track.style.transition = 'transform 0.5s ease';
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Event listeners for next and previous buttons
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlide();
    });
    
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlide();
    });
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlide();
        });
    });
    
    // Auto-advance the slider every 5 seconds if not manually controlled
    let autoSlide = setInterval(() => {
        if (track.style.animationPlayState === 'paused') {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlide();
        }
    }, 5000);
    
    // Clear interval when user interacts with slider
    [nextBtn, prevBtn, ...dots].forEach(control => {
        control.addEventListener('click', () => {
            clearInterval(autoSlide);
            autoSlide = setInterval(() => {
                currentSlide = (currentSlide + 1) % slideCount;
                updateSlide();
            }, 5000);
        });
    });
}

/**
 * Set up mobile menu toggle functionality
 */
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
}
