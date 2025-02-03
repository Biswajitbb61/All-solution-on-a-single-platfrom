document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Modal functionality
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');

    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    signupBtn.addEventListener('click', () => {
        signupModal.style.display = 'block';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (e.target === signupModal) {
            signupModal.style.display = 'none';
        }
    });
});

// Add these functions to your existing main.js
function scrollToServices() {
    document.getElementById('services').scrollIntoView({
        behavior: 'smooth'
    });
}

function scrollToAbout() {
    document.getElementById('about').scrollIntoView({
        behavior: 'smooth'
    });
}

// Update the navbar transparency on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.backgroundColor = '#fff';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
});

// Add this function to show service details
function showServiceDetails(serviceId) {
    // Check authentication first
    if (!handleServiceDetails(serviceId)) {
        return;
    }

    const modal = document.getElementById('serviceDetailsModal');
    const content = document.getElementById('serviceDetailsContent');
    
    // Get service details based on serviceId
    const serviceDetails = {
        'dpr': {
            title: 'Detailed Project Report (DPR)',
            description: `A Detailed Project Report (DPR) is essential for businesses seeking approvals, funding, and project planning. We provide well-structured DPRs covering financial feasibility, technical specifications, market analysis, and compliance requirements to help you secure investments and approvals effortlessly.

Our DPR service includes:
• Comprehensive market analysis and research
• Detailed financial projections and modeling
• Technical feasibility assessment
• Risk analysis and mitigation strategies
• Implementation roadmap and timeline planning`,
            requirements: [
                'Business Plan & Strategy Documents',
                'Financial Statements & Projections',
                'Market Research Data & Analysis',
                'Technical Requirements & Specifications',
                'Location & Infrastructure Details'
            ],
            process: [
                'Initial Consultation & Requirement Analysis',
                'Data Collection & Market Research',
                'Draft Report Preparation',
                'Client Review & Feedback',
                'Final Report Submission'
            ],
            timeline: '15-30 days',
            contact: {
                email: 'biswajit.bb61@gmail.com',
                phones: ['7002255707', '7002321267', '9706039769']
            }
        },
        'trade-license': {
            title: 'Trade License',
            description: `A Trade License is a mandatory certification for businesses operating in commercial spaces. We assist in acquiring, renewing, and managing trade licenses, ensuring full compliance with local municipal regulations.

Our Trade License service includes:
• Complete documentation preparation
• Application processing and filing
• Authority liaison and follow-up
• Progress tracking and updates
• Renewal support and management`,
            requirements: [
                'Identity Proof (Aadhar/PAN)',
                'Address Proof (Recent Utility Bill)',
                'Property Ownership/Rent Agreement',
                'NOC from Property Owner',
                'Business Registration Documents'
            ],
            process: [
                'Document Verification & Compilation',
                'Application Form Preparation',
                'Submission to Municipal Authority',
                'Follow-up & Query Resolution',
                'License Collection & Handover'
            ],
            timeline: '20-25 days',
            contact: {
                email: 'biswajit.bb61@gmail.com',
                phones: ['7002255707', '7002321267', '9706039769']
            }
        }
        // Add other services similarly...
    };

    const service = serviceDetails[serviceId];
    if (!service) {
        console.error('Service not found:', serviceId);
        return;
    }

    content.innerHTML = `
        <div class="service-details-wrapper">
            <div class="service-details-header">
                <h2>${service.title}</h2>
                <div class="service-description">
                    ${service.description.split('\n').map(para => `<p>${para}</p>`).join('')}
                </div>
            </div>
            
            <div class="details-content">
                <div class="details-grid">
                    <div class="details-card">
                        <h3><i class="fas fa-file-alt"></i>Required Documents</h3>
                        <ul>
                            ${service.requirements.map(doc => `
                                <li><i class="fas fa-check-circle"></i>${doc}</li>
                            `).join('')}
                        </ul>
                    </div>

                    <div class="details-card">
                        <h3><i class="fas fa-tasks"></i>Process Flow</h3>
                        <div class="process-steps">
                            ${service.process.map((step, index) => `
                                <div class="process-step">
                                    <div class="step-number">${index + 1}</div>
                                    <div class="step-text">${step}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="contact-section">
                    <h3><i class="fas fa-phone-alt"></i>Contact Us</h3>
                    <div class="contact-grid">
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            <p>${service.contact.email}</p>
                        </div>
                        ${service.contact.phones.map(phone => `
                            <div class="contact-item">
                                <i class="fas fa-phone"></i>
                                <p>${phone}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="timeline-section">
                    <h3><i class="fas fa-clock"></i>Estimated Timeline</h3>
                    <p>${service.timeline}</p>
                </div>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

// Function to close the service details modal
function closeServiceModal() {
    document.getElementById('serviceDetailsModal').style.display = 'none';
}

// Add event listener for ESC key to close modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeServiceModal();
    }
});

// Function to request service
function requestService(serviceId) {
    if (!auth.isAuthenticated) {
        document.getElementById('loginModal').style.display = 'block';
        return;
    }
    
    // Add your service request logic here
    console.log('Requesting service:', serviceId);
    // You can redirect to dashboard or show a confirmation message
    window.location.href = 'dashboard.html#services';
}

// Add event listeners when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Close button functionality for service modal
    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(button => {
        button.onclick = function() {
            closeServiceModal();
        };
    });

    // ESC key to close modal
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeServiceModal();
        }
    });
});

// Add this to your main.js file
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Update auth buttons to work with menu
document.getElementById('loginBtn').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('active');
    auth.showAuthModal('login');
});

document.getElementById('signupBtn').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('active');
    auth.showAuthModal('register');
});

// Button animations
function setupButtonAnimations() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        // Hover animation
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });

        // Click animation
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.95)';
        });

        button.addEventListener('mouseup', () => {
            button.style.transform = 'translateY(-2px)';
            setTimeout(() => {
                button.style.transform = 'translateY(0)';
            }, 150);
        });

        // Touch device support
        button.addEventListener('touchstart', () => {
            button.style.transform = 'scale(0.95)';
        });

        button.addEventListener('touchend', () => {
            button.style.transform = 'scale(1)';
        });
    });
}

// Initialize animations when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupButtonAnimations();
});

// Ensure buttons are visible after page load
window.addEventListener('load', () => {
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
        authButtons.style.opacity = '1';
        authButtons.style.visibility = 'visible';
    }
});

// Add mobile menu toggle functionality
function setupMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    document.querySelector('.navbar').insertBefore(menuToggle, navLinks);

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

document.addEventListener('DOMContentLoaded', setupMobileMenu); 