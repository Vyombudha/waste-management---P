// Load API and other modules
const script1 = document.createElement('script');
script1.src = 'js/api.js';
document.head.appendChild(script1);

const script2 = document.createElement('script');
script2.src = 'js/auth.js';
document.head.appendChild(script2);

const script3 = document.createElement('script');
script3.src = 'js/items.js';
document.head.appendChild(script3);

document.addEventListener('DOMContentLoaded', function() {
    // Initialize UI components
    initNavigation();
    initCategorySelection();
    initViewToggle();
    initAuthModal();
    initItemModal();
    initPhotoUpload();
    initFormSubmission();
    initAnimations();
    initDistanceSlider();
    initDynamicNumbers();
    initLoadMoreButton();
    initHeroSlider();
    
    // Initialize backend integration
    initBackendIntegration();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    
    // Sticky header on scroll for new navbar
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Mobile menu toggle for new navbar
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Prevent body scroll when menu is open
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });
            
            // Close mobile menu when clicking on a link
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!navbar.contains(e.target)) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }
    
    // Legacy navigation support
    if (header) {
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
        if (hamburger) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        authButtons.classList.toggle('active');
        
        // Animate hamburger icon
        const lines = hamburger.querySelectorAll('.line');
        lines.forEach(line => line.classList.toggle('active'));
    });
        }
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navToggle && navToggle.classList.contains('active')) {
                navToggle.click();
            }
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.click();
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = navbar ? navbar.offsetHeight : (header ? header.offsetHeight : 0);
                window.scrollTo({
                    top: targetElement.offsetTop - offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Hero button navigation
    const browseBtn = document.querySelector('.browse-btn');
    const postBtn = document.querySelector('.post-btn');
    
    if (browseBtn) {
        browseBtn.addEventListener('click', function() {
            const browseSection = document.querySelector('#browse');
            if (browseSection) {
                browseSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
            }
        });
    }
    
    if (postBtn) {
        postBtn.addEventListener('click', function() {
            const postSection = document.querySelector('#post');
            if (postSection) {
                postSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
            }
    });
    }
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const offsetTop = navbar ? navbar.offsetHeight : (header ? header.offsetHeight : 0);
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - offsetTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active state for new navbar
        if (navMenu) {
            navMenu.querySelectorAll('a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
        
        // Update active state for legacy navbar
        if (navLinks) {
            navLinks.querySelectorAll('a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        }
    });
}






// Category selection functionality
function initCategorySelection() {
    const categoryItems = document.querySelectorAll('.category-item');
    const itemCards = document.querySelectorAll('.item-card');
    
    if (categoryItems.length > 0) {
        categoryItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all items
                categoryItems.forEach(cat => cat.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Get selected category value
                const selectedCategory = this.getAttribute('data-category');
                
                // Filter items
                if (selectedCategory === 'all') {
                    // Show all items
                    itemCards.forEach(card => {
                        card.style.display = 'block';
                        // Add animation
                        card.style.animation = 'none';
                        setTimeout(() => {
                            card.style.animation = 'fadeInUp 0.6s ease forwards';
                        }, 10);
                    });
                } else {
                    // Show only items with matching category
                    itemCards.forEach(card => {
                        const cardCategory = card.getAttribute('data-category');
                        if (cardCategory === selectedCategory) {
                            card.style.display = 'block';
                            // Add animation
                            card.style.animation = 'none';
                            setTimeout(() => {
                                card.style.animation = 'fadeInUp 0.6s ease forwards';
                            }, 10);
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }
                
                // Update item count
                updateItemCount(selectedCategory);
            });
        });
    }
}

// Update item count based on selected category
function updateItemCount(selectedCategory) {
    const itemCards = document.querySelectorAll('.item-card');
    let visibleCount = 0;
    
    itemCards.forEach(card => {
        if (selectedCategory === 'all' || card.getAttribute('data-category') === selectedCategory) {
            if (card.style.display !== 'none') {
                visibleCount++;
            }
        }
    });
    
    // You can add a counter element to show the number of items
    const counterElement = document.querySelector('.item-count');
    if (counterElement) {
        counterElement.textContent = `${visibleCount} items found`;
    }
}

// View toggle functionality
function initViewToggle() {
    // View toggle functionality can be added here if needed
}

// Auth modal functionality - Now handled by auth.js
// The AuthModal class in js/auth.js handles all authentication modal functionality
function initAuthModal() {
    // This function is now handled by the AuthModal class in js/auth.js
    // The modal is automatically initialized when DOMContentLoaded fires
}

// Item modal functionality
function initItemModal() {
    const itemCards = document.querySelectorAll('.item-card');
    const itemModal = document.getElementById('item-modal');
    const closeModal = itemModal?.querySelector('.close-modal');
    const modalBody = itemModal?.querySelector('.modal-body');
    
    // Open modal when clicking on an item card
    itemCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't open modal if clicking on the request button
            if (e.target.classList.contains('request-btn')) {
                return;
            }
            
            if (itemModal && modalBody) {
                // Get item details
                const itemImage = this.querySelector('.item-image').style.backgroundImage;
                const itemCategory = this.querySelector('.item-category').textContent;
                const itemTitle = this.querySelector('h3').textContent;
                const itemDescription = this.querySelector('p').textContent;
                const itemMeta = this.querySelector('.item-meta').innerHTML;
                const userInfo = this.querySelector('.user-info').innerHTML;
                
                // Create modal content
                modalBody.innerHTML = `
                    <div class="modal-item-details">
                        <div class="modal-item-image" style="${itemImage}; height: 300px; background-size: cover; background-position: center; border-radius: 8px;"></div>
                        <div class="modal-item-info">
                            <div class="modal-item-category">${itemCategory}</div>
                            <h2>${itemTitle}</h2>
                            <p>${itemDescription}</p>
                            <div class="modal-item-meta">${itemMeta}</div>
                            <div class="modal-user-info">${userInfo}</div>
                            <div class="modal-actions">
                                <button class="request-btn">Request Item</button>
                                <button class="message-btn"><i class="fas fa-comment"></i> Message Owner</button>
                                <button class="share-btn"><i class="fas fa-share-alt"></i> Share</button>
                            </div>
                        </div>
                    </div>
                `;
                
                // Show modal
                itemModal.style.display = 'block';
                
                // Add event listener to request button in modal
                modalBody.querySelector('.request-btn').addEventListener('click', function() {
                    alert('Request sent! The owner will be notified of your interest.');
                    itemModal.style.display = 'none';
                });
                
                // Add event listener to message button in modal
                modalBody.querySelector('.message-btn').addEventListener('click', function() {
                    alert('Messaging functionality would be implemented in a real application.');
                });
                
                // Add event listener to share button in modal
                modalBody.querySelector('.share-btn').addEventListener('click', function() {
                    alert('Sharing functionality would be implemented in a real application.');
                });
            }
        });
    });
    
    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            itemModal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === itemModal) {
            itemModal.style.display = 'none';
        }
    });
}

// Photo upload preview functionality
function initPhotoUpload() {
    const photoInput = document.getElementById('item-photos');
    const previewContainer = document.querySelector('.photo-preview-container');
    
    if (photoInput && previewContainer) {
        photoInput.addEventListener('change', function() {
            previewContainer.innerHTML = ''; // Clear existing previews
            
            if (this.files) {
                Array.from(this.files).forEach(file => {
                    if (!file.type.match('image.*')) {
                        return;
                    }
                    
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        const preview = document.createElement('div');
                        preview.className = 'photo-preview';
                        preview.style.width = '120px';
                        preview.style.height = '120px';
                        preview.style.backgroundImage = `url(${e.target.result})`;
                        preview.style.backgroundSize = 'cover';
                        preview.style.backgroundPosition = 'center';
                        preview.style.borderRadius = '8px';
                        preview.style.position = 'relative';
                        
                        const removeBtn = document.createElement('button');
                        removeBtn.className = 'remove-photo';
                        removeBtn.innerHTML = '&times;';
                        removeBtn.style.position = 'absolute';
                        removeBtn.style.top = '5px';
                        removeBtn.style.right = '5px';
                        removeBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                        removeBtn.style.color = 'white';
                        removeBtn.style.border = 'none';
                        removeBtn.style.borderRadius = '50%';
                        removeBtn.style.width = '25px';
                        removeBtn.style.height = '25px';
                        removeBtn.style.cursor = 'pointer';
                        removeBtn.style.display = 'flex';
                        removeBtn.style.alignItems = 'center';
                        removeBtn.style.justifyContent = 'center';
                        
                        removeBtn.addEventListener('click', function() {
                            preview.remove();
                        });
                        
                        preview.appendChild(removeBtn);
                        previewContainer.appendChild(preview);
                    };
                    
                    reader.readAsDataURL(file);
                });
            }
        });
    }
}

// Form submission handling
function initFormSubmission() {
    const postForm = document.getElementById('post-form');
    const useLocationBtn = document.querySelector('.use-location-btn');
    const successMessage = document.getElementById('success-message');
    
    if (postForm) {
        postForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real app, you would handle form submission to your backend here
            
            // Hide the form section
            const postSection = document.querySelector('.post-section');
            if (postSection) {
                postSection.style.display = 'none';
            }
            
            // Show success message
            if (successMessage) {
                successMessage.style.display = 'block';
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth' });
            } else {
                alert('Your item has been posted successfully! It will now be visible to others in your area.');
            }
            
            // Reset form
            this.reset();
            document.querySelector('.photo-preview-container').innerHTML = '';
            
            // Scroll to browse section if no success message
            if (!successMessage) {
                document.querySelector('#browse').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
            }
        });
    }
    
    // Use current location button
    if (useLocationBtn) {
        useLocationBtn.addEventListener('click', function() {
            const locationInput = document.getElementById('item-location');
            
            if (locationInput && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    // In a real app, you would use a geocoding service to get the address
                    locationInput.value = `Latitude: ${position.coords.latitude.toFixed(6)}, Longitude: ${position.coords.longitude.toFixed(6)}`;
                }, function() {
                    alert('Unable to retrieve your location. Please enter it manually.');
                });
            } else {
                alert('Geolocation is not supported by your browser. Please enter your location manually.');
            }
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real app, you would handle newsletter subscription here
            alert('Thank you for subscribing to our newsletter!');
            
            // Reset form
            this.reset();
        });
    }
    
    // Request buttons
    document.querySelectorAll('.request-btn').forEach(btn => {
        if (!btn.closest('.modal')) { // Don't add listeners to modal buttons here
            btn.addEventListener('click', function() {
                alert('Request sent! The owner will be notified of your interest.');
            });
        }
    });
}

// Animations on scroll
function initAnimations() {
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.step, .category, .item-card, .testimonial, .impact-stat');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Add initial animation class
    document.querySelectorAll('.step, .category, .item-card, .testimonial, .impact-stat').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Add animated class when in view
    document.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('resize', animateOnScroll);
    
    // Define the animated class effect
    const style = document.createElement('style');
    style.textContent = `
        .animated {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Distance slider functionality
function initDistanceSlider() {
    const distanceSlider = document.getElementById('distance-slider');
    const distanceValue = document.getElementById('distance-value');
    
    if (distanceSlider && distanceValue) {
        distanceSlider.addEventListener('input', function() {
            distanceValue.textContent = this.value;
        });
    }
}

// Dynamic numbers functionality
function initDynamicNumbers() {
    // Function to animate counting up to a target number with a slower, more engaging animation
    function animateCounter(element, target, duration) {
        const start = 0;
        // Slower animation with fewer updates per second
        const increment = Math.ceil(target / (duration / 50)); // Update less frequently for slower animation
        let current = start;
        
        // Add a small random delay before starting to make multiple counters look more natural
        setTimeout(() => {
            const timer = setInterval(() => {
                // Add a small random factor to make the counting look more natural
                const step = Math.max(1, Math.floor(increment * (0.8 + Math.random() * 0.4)));
                current += step;
                
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                    // Add a subtle pulse animation when reaching the target
                    element.classList.add('pulse-animation');
                    setTimeout(() => element.classList.remove('pulse-animation'), 1000);
                }
                
                element.textContent = current.toLocaleString();
            }, 50); // Slower interval (50ms instead of 16ms)
        }, Math.random() * 500); // Random delay up to 500ms
    }
    
    // Hero section stats
    const heroStats = document.querySelectorAll('.stat-number');
    if (heroStats.length > 0) {
        // Define target values for hero stats
        const heroTargets = [1500, 750, 25];
        
        heroStats.forEach((stat, index) => {
            // Start animation when element comes into view
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    // Slower animation (4000ms instead of 2000ms)
                    animateCounter(stat, heroTargets[index], 4000);
                    observer.disconnect();
                }
            }, { threshold: 0.3 }); // Trigger earlier when scrolling
            
            observer.observe(stat);
        });
    }
    
    // About section impact stats
    const impactStats = document.querySelectorAll('.impact-number');
    if (impactStats.length > 0) {
        // Define target values for impact stats
        const impactTargets = [5000, 2500, 10000];
        
        impactStats.forEach((stat, index) => {
            // Extract the current text without the '+' sign
            const currentText = stat.textContent.replace(/[^0-9]/g, '');
            const targetValue = impactTargets[index];
            
            // Start animation when element comes into view
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    // Slower animation (4000ms instead of 2000ms)
                    animateCounter(stat, targetValue, 4000);
                    // Add the '+' sign back after animation
                    setTimeout(() => {
                        stat.textContent = stat.textContent + '+';
                    }, 4000);
                    observer.disconnect();
                }
            }, { threshold: 0.3 }); // Trigger earlier when scrolling
            
            observer.observe(stat);
        });
    }
    
    // Randomly increment numbers occasionally to make them look dynamic
    setInterval(() => {
        // Hero stats random increment
        heroStats.forEach((stat) => {
            const currentValue = parseInt(stat.textContent.replace(/,/g, ''));
            const increment = Math.floor(Math.random() * 3) + 1; // Smaller random increment between 1-3
            stat.textContent = (currentValue + increment).toLocaleString();
            
            // Add subtle highlight effect on update
            stat.classList.add('highlight');
            setTimeout(() => stat.classList.remove('highlight'), 700);
        });
        
        // Impact stats random increment
        impactStats.forEach((stat) => {
            const currentValue = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
            const increment = Math.floor(Math.random() * 5) + 1; // Smaller random increment between 1-5
            stat.textContent = (currentValue + increment).toLocaleString() + '+';
            
            // Add subtle highlight effect on update
            stat.classList.add('highlight');
            setTimeout(() => stat.classList.remove('highlight'), 700);
        });
    }, 15000); // Update less frequently (15 seconds instead of 10)
}

// Load More button functionality
function initLoadMoreButton() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Redirect to browse.html page
            window.location.href = 'browse.html';
        });
    }
}

// Hero Slider functionality
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    
    if (slides.length === 0) return;
    
    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Add click event listeners to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
}

// Backend integration
function initBackendIntegration() {
    // Ensure API is available
    if (typeof window.api === 'undefined') {
        if (typeof window.APIService !== 'undefined') {
            window.api = new window.APIService();
        } else {
            console.warn('API service not available - running in demo mode');
            return;
        }
    }
    
    // Update dynamic statistics from backend
    updateStatsFromBackend();
    
    // Load recent items for homepage
    loadRecentItems();
    
    // Update login-dependent UI
    checkAuthStatus();
}

async function updateStatsFromBackend() {
    if (!window.api) {
        console.log('API not available - using demo stats');
        return;
    }
    
    try {
        const stats = await api.getItemStats();
        
        // Update stats on homepage
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length >= 3) {
            statNumbers[0].textContent = stats.total_items || 0;
            statNumbers[1].textContent = stats.total_users || 0;
            statNumbers[2].textContent = stats.total_waste_saved || 0;
        }
    } catch (error) {
        console.error('Failed to load stats:', error);
    }
}

async function loadRecentItems() {
    if (!window.api) {
        console.log('API not available - using demo items');
        return;
    }
    
    try {
        const result = await api.getItems({ limit: 6, sort: 'newest' });
        const items = result.items || [];
        
        // Update recent items on homepage
        const itemsGrid = document.querySelector('#browse .items-grid');
        if (itemsGrid && items.length > 0) {
            itemsGrid.innerHTML = items.map(item => createItemCard(item)).join('');
        }
    } catch (error) {
        console.error('Failed to load recent items:', error);
    }
}

function createItemCard(item) {
    const imageUrl = item.images && item.images.length > 0 
        ? item.images[0].image_url 
        : 'https://via.placeholder.com/300x200?text=No+Image';

    return `
        <div class="item-card" data-id="${item.id}">
            <div class="item-image" style="background-image: url('${imageUrl}')"></div>
            <div class="item-details">
                <div class="item-category">${item.category_name}</div>
                <h3>${item.title}</h3>
                <p>${item.description.substring(0, 100)}...</p>
                <div class="item-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${item.distance || 'N/A'} km away</span>
                    <span><i class="fas fa-calendar-alt"></i> ${formatDate(item.created_at)}</span>
                </div>
                <div class="user-info">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="User" class="user-avatar">
                    <span>${item.user_name || 'Anonymous'} <i class="fas fa-star"></i> ${item.user_rating || 'N/A'}</span>
                </div>
                <button class="request-btn" onclick="requestItem(${item.id})">Request Item</button>
            </div>
        </div>
    `;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
}

async function checkAuthStatus() {
    if (!window.api) {
        console.log('API not available - assuming not logged in');
        updateAuthUI(false);
        return;
    }
    
    try {
        const isAuthenticated = await api.checkAuth();
        if (isAuthenticated) {
            // Update UI for logged-in user
            updateAuthUI(true);
        } else {
            updateAuthUI(false);
        }
    } catch (error) {
        console.error('Auth check failed:', error);
        updateAuthUI(false);
    }
}

function updateAuthUI(isLoggedIn) {
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const userMenu = document.querySelector('.user-menu');
    
    if (isLoggedIn) {
        // Hide login/signup buttons, show user menu
        if (loginBtn) loginBtn.style.display = 'none';
        if (signupBtn) signupBtn.style.display = 'none';
        if (userMenu) userMenu.style.display = 'block';
    } else {
        // Show login/signup buttons, hide user menu
        if (loginBtn) loginBtn.style.display = 'inline-block';
        if (signupBtn) signupBtn.style.display = 'inline-block';
        if (userMenu) userMenu.style.display = 'none';
    }
}

async function requestItem(itemId) {
    if (!window.api) {
        alert('Please login to request items');
        return;
    }
    
    if (!window.api.isLoggedIn || !window.api.isLoggedIn()) {
        alert('Please login to request items');
        return;
    }

    const message = prompt('Add a message to your request (optional):');
    
    try {
        const result = await api.createRequest(itemId, message || '');
        
        if (result.success) {
            alert('Request sent successfully!');
        } else {
            alert(result.message || 'Failed to send request');
        }
    } catch (error) {
        console.error('Error sending request:', error);
        alert('Failed to send request. Please try again.');
    }
}