// Performance optimization: Debounce function for scroll events
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(function() {
        preloader.classList.add('fade-out');
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 800);
    }, 1500);
});

// Mobile Navigation Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Add micro-interactions to various elements
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
    
    // Add hover effects to service items
    const serviceItems = document.querySelectorAll('.services-list li');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });
    
    // Add animation to contact info items
    const contactItems = document.querySelectorAll('.contact-info a');
    contactItems.forEach((item, index) => {
        item.style.transitionDelay = (index * 0.1) + 's';
    });
    
    // Initialize persistent hover effect for partner logos
    const partnerLogos = document.querySelectorAll('.partner-logo');
    
    partnerLogos.forEach(logo => {
        // Add persistent active state on hover
        logo.addEventListener('mouseenter', function() {
            // Only add active class if not already interacted
            if (!this.hasAttribute('data-interacted')) {
                this.classList.add('active');
                // Add a data attribute to track user interaction
                this.setAttribute('data-interacted', 'true');
            }
        });
        
        // Handle mouse leave to ensure hover effects work properly
        logo.addEventListener('mouseleave', function() {
            // Remove hover effect but keep active class for persistent effect
            // The CSS will handle the transition between states
        });
    });
    
    // Duplicate logos for seamless infinite scrolling
    const partnersTrack = document.querySelector('.partners-track');
    if (partnersTrack) {
        // Clone the existing logos to create a seamless loop
        const logos = partnersTrack.innerHTML;
        partnersTrack.innerHTML = logos + logos; // Duplicate for seamless looping
    }
    
    // Create floating shapes for contact section
    createFloatingShapes();
});



// Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // Get form inputs
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    // Add real-time validation
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateSimpleField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear validation state when user starts typing
            clearSimpleValidation(this);
        });
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        formInputs.forEach(input => {
            if (!validateSimpleField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            return;
        }
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('.btn-submit');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // In a real implementation, you would send the form data to a server here
            // For now, we'll just show a success message
            alert('Thank you for your message! We will contact you soon.');
            contactForm.reset();
            
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// Simple validation for form fields
function validateSimpleField(field) {
    const value = field.value.trim();
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        field.style.borderColor = '#dc3545';
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.style.borderColor = '#dc3545';
            return false;
        }
    }
    
    // If field is filled and passes validation
    if (value) {
        field.style.borderColor = '#28a745';
        return true;
    }
    
    // Reset border color for optional fields with no value
    field.style.borderColor = '#eaeaea';
    return true;
}

// Clear validation state
function clearSimpleValidation(field) {
    field.style.borderColor = '#eaeaea';
}

// Validate individual form field
function validateField(field) {
    const value = field.value.trim();
    const formGroup = field.closest('.form-group');
    
    // Clear previous validation
    formGroup.classList.remove('valid', 'invalid');
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        formGroup.classList.add('invalid');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            formGroup.classList.add('invalid');
            return false;
        }
    }
    
    // If field is filled and passes validation
    if (value) {
        formGroup.classList.add('valid');
        return true;
    }
    
    // For optional fields with no value
    return true;
}

// Clear validation state
function clearValidation(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('valid', 'invalid');
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Add visual feedback when clicking a link
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky Header Shadow with debounce for performance
const handleScroll = debounce(() => {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', handleScroll);

// Intersection Observer for scroll animations
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay for animation
            setTimeout(() => {
                entry.target.classList.add('animated');
            }, index * 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-category, .branch-card, .partner-logo, .testimonial-card');
    
    animateElements.forEach(element => {
        animateOnScroll.observe(element);
    });
});

// Scroll to Top Button with debounce for performance
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

const handleScrollToTop = debounce(() => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
}, 10);

window.addEventListener('scroll', handleScrollToTop);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Create floating shapes for contact section background
function createFloatingShapes() {
    const contactSection = document.querySelector('.contact-section .background-animation');
    if (!contactSection) return;
    
    // Create 15 floating shapes
    for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div');
        shape.classList.add('floating-shape');
        
        // Random shape type
        const shapes = ['circle', 'triangle', 'hexagon'];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        shape.classList.add(randomShape);
        
        // Random size
        const size = Math.random() * 100 + 20;
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        
        // Random position
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;
        
        // Random color with brand colors
        const colors = [
            'rgba(0, 51, 102, 0.1)',  // Primary color with opacity
            'rgba(255, 215, 0, 0.1)', // Secondary color with opacity
            'rgba(0, 34, 68, 0.1)'    // Dark bg color with opacity
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        shape.style.backgroundColor = randomColor;
        
        // Random animation delay and duration
        const delay = Math.random() * 5;
        const duration = 15 + Math.random() * 15;
        shape.style.animationDelay = `${delay}s`;
        shape.style.animationDuration = `${duration}s`;
        
        contactSection.appendChild(shape);
    }
}