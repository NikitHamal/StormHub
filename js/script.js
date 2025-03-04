// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;
    
    // Check for saved theme preference or use prefer-color-scheme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
    } else {
        // Check if user prefers dark mode
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        body.className = prefersDarkMode ? 'dark-theme' : 'light-theme';
    }
    
    // Toggle theme when button is clicked
    themeToggleBtn.addEventListener('click', () => {
        // Add a rotation animation to the theme toggle button
        themeToggleBtn.style.transition = 'transform 0.5s ease';
        themeToggleBtn.style.transform = 'rotate(360deg)';
        
        setTimeout(() => {
            themeToggleBtn.style.transform = 'rotate(0deg)';
        }, 500);
        
        if (body.classList.contains('light-theme')) {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
        }
    });
    
    // Add animation for visual elements
    animateVisualElements();
    
    // Make the page and pen element interactive
    makePenPageInteractive();
    
    // Make cards and buttons interactive
    makeElementsInteractive();
    
    // We'll disable the typing effect as it's causing issues with HTML content
    // addTypingEffect();
});

// Animation functions for visual elements
function animateVisualElements() {
    // Add subtle animations to the hero visual shapes
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach(shape => {
        // Random movement for the shapes
        setInterval(() => {
            const xMove = Math.random() * 10 - 5; // -5 to 5px
            const yMove = Math.random() * 10 - 5; // -5 to 5px
            const rotate = Math.random() * 5 - 2.5; // -2.5 to 2.5 degrees
            
            shape.style.transform = `translate(${xMove}px, ${yMove}px) rotate(${shape.classList.contains('shape-1') ? 45 + rotate : 30 + rotate}deg)`;
        }, 3000);
    });
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // For now, prevent default as we don't have actual pages to navigate to
            e.preventDefault();
            
            // Add a ripple effect on click
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            link.appendChild(ripple);
            
            // Remove the ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add hover effects to buttons and cards
    addHoverEffects();
}

// Add hover effects to interactive elements
function addHoverEffects() {
    const buttons = document.querySelectorAll('.btn');
    const cards = document.querySelectorAll('.feature-card, .testimonial');
    
    // Subtle scale effect on buttons
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
        
        // Add click effect
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'scale(1.05)';
        });
    });
    
    // Enhanced card hover effects
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px var(--shadow)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 12px var(--shadow)';
        });
    });
    
    // Add parallax effect to hero section on mouse move
    const hero = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (hero && heroVisual) {
        hero.addEventListener('mousemove', (e) => {
            // Parallax effect values
            const xValue = (e.clientX - window.innerWidth / 2) / 30;
            const yValue = (e.clientY - window.innerHeight / 2) / 30;
            
            heroVisual.style.transform = `translate(${xValue}px, ${yValue}px)`;
        });
        
        hero.addEventListener('mouseleave', () => {
            heroVisual.style.transform = 'translate(0, 0)';
        });
    }
}

// Add fade-in animation for elements when they enter viewport
function addScrollAnimations() {
    const elements = document.querySelectorAll('.feature-card, .testimonial, .call-to-action, .hero-content, .hero-visual');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Make the pen and page interactive
function makePenPageInteractive() {
    const pen = document.querySelector('.pen');
    const page = document.querySelector('.page');
    const pageLines = document.querySelectorAll('.page-line');
    
    if (pen && page) {
        // Make the pen write on the page when hovering over the page
        page.addEventListener('mousemove', (e) => {
            // Calculate pen position relative to the page
            const rect = page.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Update pen position with a slight delay for a more natural effect
            setTimeout(() => {
                pen.style.transition = 'transform 0.2s ease';
                pen.style.transform = `translate(${x - 100}px, ${y - 100}px) rotate(-30deg)`;
            }, 50);
            
            // Make the page lines react to pen movement
            pageLines.forEach((line, index) => {
                const lineRect = line.getBoundingClientRect();
                const distance = Math.abs(y - (lineRect.top - rect.top + lineRect.height / 2));
                
                // If pen is close to this line, make it "active"
                if (distance < 30) {
                    line.style.backgroundColor = 'var(--primary)';
                    line.style.width = `${Math.min(100, 50 + (x / rect.width) * 50)}%`;
                } else {
                    line.style.backgroundColor = 'var(--border)';
                    line.style.width = line.dataset.originalWidth || (line.style.width && line.style.width !== 'auto' ? line.style.width : null);
                }
                
                // Store original width if not already stored
                if (!line.dataset.originalWidth) {
                    // Get the computed width percentage
                    const computedStyle = window.getComputedStyle(line);
                    const width = computedStyle.width;
                    line.dataset.originalWidth = width;
                }
            });
        });
        
        // Return pen to original position when not hovering over the page
        page.addEventListener('mouseleave', () => {
            pen.style.transition = 'transform 0.5s ease';
            pen.style.transform = 'rotate(-30deg)';
            
            // Reset page lines
            pageLines.forEach(line => {
                line.style.backgroundColor = 'var(--border)';
                line.style.width = line.dataset.originalWidth || null;
            });
        });
        
        // Make pen reactive to click
        pen.addEventListener('click', () => {
            pen.style.transform = 'rotate(-45deg) scale(1.2)';
            setTimeout(() => {
                pen.style.transform = 'rotate(-30deg) scale(1)';
            }, 300);
        });
    }
}

// Make various elements on the page interactive
function makeElementsInteractive() {
    // Make testimonials interactive
    const testimonials = document.querySelectorAll('.testimonial');
    
    testimonials.forEach(testimonial => {
        testimonial.addEventListener('click', () => {
            // Toggle an 'active' state for testimonials
            testimonials.forEach(t => t.classList.remove('active'));
            testimonial.classList.add('active');
            
            // Add a subtle bounce animation
            testimonial.style.animation = 'bounce 0.5s ease';
            setTimeout(() => {
                testimonial.style.animation = '';
            }, 500);
        });
    });
    
    // Make the CTA button pulse periodically to draw attention
    const ctaButton = document.querySelector('.call-to-action .btn-primary');
    
    if (ctaButton) {
        // Pulse animation every 5 seconds
        setInterval(() => {
            ctaButton.classList.add('pulse');
            setTimeout(() => {
                ctaButton.classList.remove('pulse');
            }, 1000);
        }, 5000);
    }
    
    // Make logo interactive
    const logo = document.querySelector('.logo h1');
    
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            logo.style.transform = 'scale(1.05)';
            logo.style.color = 'var(--accent)';
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = 'scale(1)';
            logo.style.color = '';
        });
    }
}

// Call scroll animations on load
window.addEventListener('load', () => {
    addScrollAnimations();
    
    // Add animation to keyframes for bounce effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(var(--primary-rgb), 0.4); }
            70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(var(--primary-rgb), 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(var(--primary-rgb), 0); }
        }
        
        .testimonial.active {
            border-left: 4px solid var(--primary);
        }
        
        .pulse {
            animation: pulse 1s ease-in-out;
        }
    `;
    document.head.appendChild(style);
}); 