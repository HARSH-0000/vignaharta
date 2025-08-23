// Ganpati Bappa Website - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeParticles();
    initializeNavigation();
    initializeScrollAnimations();
    initializeTimelineAnimation();
    initializeAartiPlayer();
    initializeFloatingElements();
    
    // Add loading animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// Floating Particles System
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
    
    // Continuously create new particles
    setInterval(() => {
        if (particlesContainer.children.length < particleCount) {
            createParticle(particlesContainer);
        }
    }, 2000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random positioning
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation duration
    particle.style.animationDuration = (Math.random() * 4 + 3) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    // Random colors for festive effect
    const colors = ['#FFD700', '#FF6B35', '#F7931E', '#C1272D'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 8000);
}

// Navigation System
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(255, 107, 53, 0.4)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(255, 107, 53, 0.3)';
        }
    });
    
    // Active navigation highlighting
    window.addEventListener('scroll', updateActiveNavigation);
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Smooth Scrolling Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('about-card')) {
                    animateCards(entry.target.parentElement);
                }
                
                if (entry.target.classList.contains('gallery-item')) {
                    animateGalleryItems(entry.target.parentElement);
                }
                
                if (entry.target.classList.contains('prayer-card')) {
                    animatePrayerCards(entry.target.parentElement);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.about-card, .gallery-item, .prayer-card, .tradition-card, .timeline-item'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
}

function animateCards(container) {
    const cards = container.querySelectorAll('.about-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('loaded');
            card.style.animationDelay = `${index * 0.2}s`;
        }, index * 200);
    });
}

function animateGalleryItems(container) {
    const items = container.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('loaded');
            item.style.transform = 'translateY(0) scale(1)';
        }, index * 150);
    });
}

function animatePrayerCards(container) {
    const cards = container.querySelectorAll('.prayer-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('loaded');
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 300);
    });
}

// Timeline Animation
function initializeTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                
                // Animate timeline marker
                const marker = entry.target.querySelector('.timeline-marker');
                if (marker) {
                    marker.style.animation = 'pulse 1s ease-in-out';
                }
            }
        });
    }, { threshold: 0.5 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'all 0.6s ease';
        timelineObserver.observe(item);
    });
}

// Aarti Player System
function initializeAartiPlayer() {
    let isPlaying = false;
    let aartiInterval;
    
    window.toggleAarti = function() {
        const button = document.querySelector('.play-aarti');
        
        if (!isPlaying) {
            startAarti(button);
        } else {
            stopAarti(button);
        }
    };
    
    function startAarti(button) {
        isPlaying = true;
        button.innerHTML = '⏸️ Stop Aarti';
        button.style.background = 'linear-gradient(135deg, #C1272D, #FF6B35)';
        button.style.color = 'white';
        
        // Create visual aarti effect
        createAartiEffect();
        
        // Simulate aarti playing with visual feedback
        aartiInterval = setInterval(() => {
            createAartiFlame();
        }, 1000);
        
        // Show aarti message
        showAartiMessage();
    }
    
    
    function stopAarti(button) {
        isPlaying = false;
        button.innerHTML = '🎵 Play Aarti';
        button.style.background = 'linear-gradient(135deg, #FFD700, #FFA500)';
        button.style.color = '#8B4513';
        
        if (aartiInterval) {
            clearInterval(aartiInterval);
        }
        
        // Remove aarti effects
        removeAartiEffects();
    }
    
    function createAartiEffect() {
        const prayersSection = document.getElementById('prayers');
        prayersSection.style.background = 'linear-gradient(135deg, #FF6B35, #F7931E, #FFD700)';
        prayersSection.style.backgroundSize = '400% 400%';
        prayersSection.style.animation = 'aarti-glow 2s ease-in-out infinite';
        
        // Add CSS for aarti glow animation
        if (!document.getElementById('aarti-styles')) {
            const style = document.createElement('style');
            style.id = 'aarti-styles';
            style.textContent = `
                @keyframes aarti-glow {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .aarti-flame {
                    position: fixed;
                    width: 20px;
                    height: 20px;
                    background: radial-gradient(circle, #FFD700, #FF6B35);
                    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                    animation: flame-dance 1s ease-in-out infinite;
                    pointer-events: none;
                    z-index: 1000;
                }
                @keyframes flame-dance {
                    0%, 100% { transform: scale(1) rotate(0deg); }
                    50% { transform: scale(1.2) rotate(10deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function createAartiFlame() {
        const flame = document.createElement('div');
        flame.className = 'aarti-flame';
        flame.style.left = Math.random() * window.innerWidth + 'px';
        flame.style.top = Math.random() * window.innerHeight + 'px';
        
        document.body.appendChild(flame);
        
        setTimeout(() => {
            if (flame.parentNode) {
                flame.parentNode.removeChild(flame);
            }
        }, 2000);
    }
    
    function showAartiMessage() {
        const message = document.createElement('div');
        message.innerHTML = '🙏 Aarti is playing... Feel the divine presence 🙏';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 215, 0, 0.95);
            color: #8B4513;
            padding: 20px 40px;
            border-radius: 25px;
            font-family: 'Kalam', cursive;
            font-size: 1.2rem;
            font-weight: 700;
            z-index: 10000;
            box-shadow: 0 8px 30px rgba(193, 39, 45, 0.4);
            animation: message-fade 0.5s ease-in-out;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.style.animation = 'message-fade 0.5s ease-in-out reverse';
                setTimeout(() => {
                    if (message.parentNode) {
                        message.parentNode.removeChild(message);
                    }
                }, 500);
            }
        }, 3000);
    }
    
    function removeAartiEffects() {
        const prayersSection = document.getElementById('prayers');
        prayersSection.style.background = 'linear-gradient(135deg, #FF6B35, #F7931E)';
        prayersSection.style.animation = '';
        
        // Remove any remaining flames
        const flames = document.querySelectorAll('.aarti-flame');
        flames.forEach(flame => {
            if (flame.parentNode) {
                flame.parentNode.removeChild(flame);
            }
        });
    }
}

// Floating Elements Animation
function initializeFloatingElements() {
    // Create floating flower petals
    setInterval(createFloatingPetal, 3000);
    
    // Animate CSS art elements on hover
    initializeArtAnimations();
}

function createFloatingPetal() {
    const petal = document.createElement('div');
    petal.innerHTML = '🌸';
    petal.style.cssText = `
        position: fixed;
        font-size: 1.5rem;
        left: ${Math.random() * 100}%;
        top: -50px;
        animation: float-down 8s linear;
        pointer-events: none;
        z-index: 100;
        opacity: 0.7;
    `;
    
    // Add floating animation if not exists
    if (!document.getElementById('petal-styles')) {
        const style = document.createElement('style');
        style.id = 'petal-styles';
        style.textContent = `
            @keyframes float-down {
                0% {
                    transform: translateY(-50px) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.7;
                }
                90% {
                    opacity: 0.7;
                }
                100% {
                    transform: translateY(${window.innerHeight + 50}px) rotate(360deg);
                    opacity: 0;
                }
            }
            @keyframes message-fade {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(petal);
    
    setTimeout(() => {
        if (petal.parentNode) {
            petal.parentNode.removeChild(petal);
        }
    }, 8000);
}

function initializeArtAnimations() {
    const artElements = document.querySelectorAll('.css-art');
    
    artElements.forEach(art => {
        art.addEventListener('mouseenter', () => {
            art.style.transform = 'scale(1.1) rotate(5deg)';
            art.style.transition = 'all 0.3s ease';
        });
        
        art.addEventListener('mouseleave', () => {
            art.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Special animations for Ganesh illustration
    const ganeshFace = document.querySelector('.ganesh-face');
    if (ganeshFace) {
        ganeshFace.addEventListener('click', () => {
            ganeshFace.style.animation = 'none';
            setTimeout(() => {
                ganeshFace.style.animation = 'gentle-bounce 3s ease-in-out infinite';
            }, 100);
            
            // Create blessing effect
            createBlessingEffect();
        });
    }
}

function createBlessingEffect() {
    const blessings = ['🙏', '🕉️', '🌺', '✨', '💫'];
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const blessing = document.createElement('div');
            blessing.innerHTML = blessings[Math.floor(Math.random() * blessings.length)];
            blessing.style.cssText = `
                position: fixed;
                font-size: 2rem;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                animation: blessing-burst 2s ease-out forwards;
                pointer-events: none;
                z-index: 1000;
            `;
            
            // Add blessing animation
            if (!document.getElementById('blessing-styles')) {
                const style = document.createElement('style');
                style.id = 'blessing-styles';
                style.textContent = `
                    @keyframes blessing-burst {
                        0% {
                            opacity: 1;
                            transform: translate(-50%, -50%) scale(0);
                        }
                        50% {
                            opacity: 1;
                            transform: translate(-50%, -50%) scale(1.2);
                        }
                        100% {
                            opacity: 0;
                            transform: translate(-50%, -50%) scale(0.8) 
                                      translateX(${(Math.random() - 0.5) * 200}px) 
                                      translateY(${(Math.random() - 0.5) * 200}px);
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            document.body.appendChild(blessing);
            
            setTimeout(() => {
                if (blessing.parentNode) {
                    blessing.parentNode.removeChild(blessing);
                }
            }, 2000);
        }, i * 200);
    }
    
    // Show blessing message
    showBlessingMessage();
}

function showBlessingMessage() {
    const messages = [
        'गणपति बाप्पा मोरया! 🙏',
        'May Ganesha bless you! ✨',
        'मंगलमूर्ति मोरया! 🕉️',
        'Vighna Harta ki Jai! 🌺'
    ];
    
    const message = document.createElement('div');
    message.innerHTML = messages[Math.floor(Math.random() * messages.length)];
    message.style.cssText = `
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #FFD700, #FFA500);
        color: #8B4513;
        padding: 15px 30px;
        border-radius: 25px;
        font-family: 'Kalam', cursive;
        font-size: 1.3rem;
        font-weight: 700;
        z-index: 10000;
        box-shadow: 0 8px 30px rgba(255, 215, 0, 0.5);
        animation: blessing-message 3s ease-in-out;
    `;
    
    // Add blessing message animation
    if (!document.getElementById('blessing-message-styles')) {
        const style = document.createElement('style');
        style.id = 'blessing-message-styles';
        style.textContent = `
            @keyframes blessing-message {
                0% { opacity: 0; transform: translateX(-50%) translateY(-20px) scale(0.8); }
                20% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
                80% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-20px) scale(0.8); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 3000);
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Performance Optimization
let ticking = false;

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

function updateAnimations() {
    // Update any performance-intensive animations here
    ticking = false;
}

// Scroll performance optimization
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
        requestTick();
    }, 10);
});

// Resize handler for responsive animations
window.addEventListener('resize', () => {
    // Recalculate positions for floating elements
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        particle.style.left = Math.random() * 100 + '%';
    });
});

// Initialize special effects on page load
window.addEventListener('load', () => {
    // Create initial blessing effect
    setTimeout(() => {
        createFloatingPetal();
    }, 2000);
    
    // Add welcome message
    setTimeout(() => {
        showWelcomeMessage();
    }, 1000);
});

function showWelcomeMessage() {
    const welcome = document.createElement('div');
    welcome.innerHTML = '🙏 Welcome to Ganpati Celebration! 🙏';
    welcome.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #FF6B35, #F7931E);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-family: 'Kalam', cursive;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 20px rgba(255, 107, 53, 0.4);
        animation: welcome-slide 4s ease-in-out;
        cursor: pointer;
    `;
    
    // Add welcome animation
    if (!document.getElementById('welcome-styles')) {
        const style = document.createElement('style');
        style.id = 'welcome-styles';
        style.textContent = `
            @keyframes welcome-slide {
                0% { opacity: 0; transform: translateX(100px); }
                20% { opacity: 1; transform: translateX(0); }
                80% { opacity: 1; transform: translateX(0); }
                100% { opacity: 0; transform: translateX(100px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    welcome.addEventListener('click', () => {
        welcome.style.animation = 'welcome-slide 0.5s ease-in-out reverse';
        setTimeout(() => {
            if (welcome.parentNode) {
                welcome.parentNode.removeChild(welcome);
            }
        }, 500);
    });
    
    document.body.appendChild(welcome);
    
    setTimeout(() => {
        if (welcome.parentNode) {
            welcome.parentNode.removeChild(welcome);
        }
    }, 4000);
}

// Export functions for global access
window.scrollToSection = scrollToSection;
