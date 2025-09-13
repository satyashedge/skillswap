// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeButtons = document.querySelectorAll('.close');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Sample data (In a real application, this would come from a backend)
const sampleSkills = [
    { id: 1, name: 'Web Development', category: 'Programming', level: 'Intermediate' },
    { id: 2, name: 'Graphic Design', category: 'Design', level: 'Advanced' },
    { id: 3, name: 'Spanish Language', category: 'Languages', level: 'Beginner' },
    { id: 4, name: 'Digital Marketing', category: 'Marketing', level: 'Intermediate' },
    { id: 5, name: 'Photography', category: 'Arts', level: 'Advanced' },
    { id: 6, name: 'Cooking', category: 'Lifestyle', level: 'Intermediate' }
];

// Modal Functions
function openModal(modal) {
    modal.style.display = 'block';
}

function closeModal(modal) {
    modal.style.display = 'none';
}

// Event Listeners
loginBtn.addEventListener('click', () => openModal(loginModal));
signupBtn.addEventListener('click', () => openModal(signupModal));

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        closeModal(loginModal);
        closeModal(signupModal);
    });
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) closeModal(loginModal);
    if (e.target === signupModal) closeModal(signupModal);
});

// Form Submissions
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;
    
    // Here you would typically make an API call to authenticate
    console.log('Login attempt:', { email, password });
    closeModal(loginModal);
    // Show success message or redirect
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(signupForm);
    const userData = Object.fromEntries(formData.entries());
    
    // Here you would typically make an API call to register the user
    console.log('Signup attempt:', userData);
    closeModal(signupModal);
    // Show success message or redirect
});

// Render Skills
function renderSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    skillsGrid.innerHTML = sampleSkills.map(skill => `
        <div class="skill-card">
            <h3>${skill.name}</h3>
            <p>Category: ${skill.category}</p>
            <p>Level: ${skill.level}</p>
            <button class="btn btn-primary">Request Swap</button>
        </div>
    `).join('');
}

// Initialize the application
function init() {
    renderSkills();
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Start the application
init();

// Add some basic animations
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        heroContent.style.transition = 'all 1s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 500);
});

// Matches Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const matchCards = document.querySelectorAll('.match-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        matchCards.forEach(card => {
            const status = card.querySelector('.match-status').classList[1];
            
            if (filter === 'all' || filter === status) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Add animation to match cards
matchCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
});

// Contact Form Animation
const formGroups = document.querySelectorAll('.form-group');

formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');

    input.addEventListener('focus', () => {
        label.classList.add('active');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            label.classList.remove('active');
        }
    });

    // Check if input has value on load
    if (input.value) {
        label.classList.add('active');
    }
});

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    // Here you would typically send the data to your backend
    console.log('Contact form submission:', data);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Chat Functionality
const chatInput = document.querySelector('.chat-input input');
const sendButton = document.querySelector('.chat-input .btn');
const chatMessages = document.querySelector('.chat-messages');

function addMessage(message, isSent = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isSent ? 'sent' : 'received'}`;
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <p>${message}</p>
        <span class="time">${time}</span>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendButton.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message);
        chatInput.value = '';
        
        // Simulate reply after 1 second
        setTimeout(() => {
            addMessage('Thanks for your message! I will get back to you soon.', false);
        }, 1000);
    }
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});

// Chat Search
const chatSearch = document.querySelector('.chat-search input');
const chatItems = document.querySelectorAll('.chat-item');

chatSearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    chatItems.forEach(item => {
        const name = item.querySelector('h4').textContent.toLowerCase();
        const message = item.querySelector('.last-message').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || message.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});

// Chat Item Selection
chatItems.forEach(item => {
    item.addEventListener('click', () => {
        chatItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        // Update chat window header
        const name = item.querySelector('h4').textContent;
        const avatar = item.querySelector('img').src;
        
        document.querySelector('.chat-header h3').textContent = name;
        document.querySelector('.chat-header img').src = avatar;
        
        // Clear unread count
        const unread = item.querySelector('.unread');
        if (unread) {
            unread.remove();
        }
    });
});

// Loading Animation Functions
function showLoading() {
    document.querySelector('.loading-overlay').classList.add('active');
    document.querySelector('.loading-progress').classList.add('active');
}

function hideLoading() {
    document.querySelector('.loading-overlay').classList.remove('active');
    document.querySelector('.loading-progress').classList.remove('active');
}

// Add loading state to form submissions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        this.classList.add('loading');
        const submitButton = this.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.classList.add('loading');
        }
    });
});

// Add loading state to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 2000); // Remove loading state after 2 seconds
        }
    });
});

// Show loading on page load
window.addEventListener('load', () => {
    showLoading();
    setTimeout(hideLoading, 1000); // Hide loading after 1 second
});

// Show loading on navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        showLoading();
        setTimeout(hideLoading, 500); // Hide loading after 0.5 seconds
    });
});

// Add loading cursor on long operations
let loadingTimeout;
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.loading-cursor');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Show loading cursor on long operations
function showLoadingCursor() {
    const cursor = document.querySelector('.loading-cursor');
    cursor.classList.add('active');
}

function hideLoadingCursor() {
    const cursor = document.querySelector('.loading-cursor');
    cursor.classList.remove('active');
}

// Example of using loading cursor for long operations
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', () => {
        showLoadingCursor();
        setTimeout(hideLoadingCursor, 1000); // Hide cursor after 1 second
    });
}); 