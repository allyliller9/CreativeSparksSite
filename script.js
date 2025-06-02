
document.addEventListener('DOMContentLoaded', function() {
    // Add click animations to nav items
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Add form submission handling
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            
            // Simple validation
            if (!name || !email) {
                alert('Please fill in all required fields!');
                return;
            }
            
            // Show success message with animation
            const button = form.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Submitted! ✓';
            button.style.backgroundColor = '#28a745';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
                form.reset();
            }, 3000);
        });
    }

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('main section, main h2, main p, main ul, .gallery img');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add typing effect for the main heading
    const mainHeading = document.querySelector('main h2');
    if (mainHeading && mainHeading.textContent.includes('Welcome')) {
        const text = mainHeading.textContent;
        mainHeading.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                mainHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // Add image click functionality for gallery
    const galleryImages = document.querySelectorAll('.gallery img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            // Create modal effect
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                cursor: pointer;
                animation: fadeIn 0.3s ease;
            `;
            
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 10px;
                animation: bounceIn 0.5s ease;
            `;
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            modal.addEventListener('click', () => {
                modal.remove();
            });
        });
    });
});

// Slideshow functionality
let currentSlideIndex = 1;

function changeSlide(direction) {
    showSlide(currentSlideIndex += direction);
}

function currentSlide(n) {
    showSlide(currentSlideIndex = n);
}

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (n > slides.length) {
        currentSlideIndex = 1;
    }
    if (n < 1) {
        currentSlideIndex = slides.length;
    }
    
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active from all indicators
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // Show current slide and activate indicator
    if (slides[currentSlideIndex - 1]) {
        slides[currentSlideIndex - 1].classList.add('active');
    }
    if (indicators[currentSlideIndex - 1]) {
        indicators[currentSlideIndex - 1].classList.add('active');
    }
}

// Auto-advance slides every 8 seconds (optional)
setInterval(() => {
    if (document.querySelector('.slideshow-container')) {
        changeSlide(1);
    }
}, 8000);
