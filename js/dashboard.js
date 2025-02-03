class Dashboard {
    constructor() {
        this.init();
        this.currentSection = 'overview';
        this.serviceRequests = [];
        this.cart = [];
        this.notifications = [];
        this.setupEventListeners();
        this.startRealTimeUpdates();
    }

    async init() {
        if (!auth.isAuthenticated) {
            window.location.href = 'index.html';
            return;
        }

        await this.loadUserData();
        await this.loadServiceRequests();
        this.renderServiceCatalog();
        this.updateDashboard();

        // Show overview section by default
        this.switchSection('overview');
    }

    setupEventListeners() {
        // Panel switching
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.currentTarget.getAttribute('data-section');
                this.switchSection(section);
            });
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });

        // Mobile menu toggle
        document.getElementById('menuToggle').addEventListener('click', () => {
            document.querySelector('.dashboard-sidebar').classList.toggle('active');
        });

        // Cart icon click
        document.querySelector('.cart-icon').addEventListener('click', () => {
            this.showCart();
        });

        // Profile form
        document.getElementById('profileUpdateForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateProfile();
        });

        // Password change form
        document.getElementById('passwordChangeForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.changePassword();
        });

        // Profile image upload
        document.querySelector('.change-avatar-btn').addEventListener('click', () => {
            document.getElementById('avatarInput').click();
        });

        document.getElementById('avatarInput').addEventListener('change', (e) => {
            this.handleProfileImageUpload(e);
        });

        // Service filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterServices(e.target.dataset.filter);
            });
        });

        // Add service catalog button
        document.getElementById('catalogBtn').addEventListener('click', () => {
            this.switchSection('catalog');
        });
    }

    switchSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.dashboard-section').forEach(section => {
            section.style.display = 'none';
        });

        // Show selected section
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.style.display = 'block';
        }

        // Update menu active state
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

        // Update current section
        this.currentSection = sectionId;
    }

    async loadUserData() {
        const user = auth.currentUser;
        if (user) {
            // Update welcome message
            document.getElementById('welcomeName').textContent = user.name;
            
            // Update profile info
            document.getElementById('userName').textContent = user.name;
            document.getElementById('userEmail').textContent = user.email;
            document.getElementById('profileName').value = user.name;
            document.getElementById('profileEmail').value = user.email;
            document.getElementById('mobileInput').value = user.mobile || '';

            // Load profile image if exists
            if (user.profileImage) {
                document.getElementById('profileImage').src = user.profileImage;
                document.getElementById('avatarPreview').src = user.profileImage;
            }
        }
    }

    async loadServiceRequests() {
        this.serviceRequests = auth.getUserServiceRequests();
        this.updateServiceStats();
        this.renderServicesList();
        this.updateRecentActivity();
    }

    updateServiceStats() {
        const stats = {
            pending: 0,
            progress: 0,
            completed: 0
        };

        this.serviceRequests.forEach(request => {
            stats[request.status]++;
        });

        document.getElementById('pendingCount').textContent = stats.pending;
        document.getElementById('progressCount').textContent = stats.progress;
        document.getElementById('completedCount').textContent = stats.completed;
    }

    renderServicesList() {
        const servicesList = document.getElementById('servicesList');
        if (!servicesList) return;

        servicesList.innerHTML = this.serviceRequests.length ? this.serviceRequests.map(request => `
            <div class="service-card">
                <div class="service-header">
                    <span class="status-badge ${request.status}">${request.status}</span>
                    <span class="service-date">${new Date(request.requestDate).toLocaleDateString()}</span>
                </div>
                <h3>${serviceDescriptions[request.serviceType].title}</h3>
                <p>${request.details}</p>
            </div>
        `).join('') : '<p class="no-services">No service requests yet.</p>';
    }

    updateRecentActivity() {
        const activityList = document.getElementById('activityList');
        if (!activityList) return;

        const recentRequests = [...this.serviceRequests]
            .sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate))
            .slice(0, 5);

        activityList.innerHTML = recentRequests.length ? recentRequests.map(request => `
            <div class="activity-item">
                <div class="activity-icon ${request.status}">
                    <i class="fas fa-${this.getStatusIcon(request.status)}"></i>
                </div>
                <div class="activity-details">
                    <h4>${serviceDescriptions[request.serviceType].title}</h4>
                    <p>${this.getStatusMessage(request.status)}</p>
                    <small>${this.getTimeAgo(request.requestDate)}</small>
                </div>
            </div>
        `).join('') : '<p>No recent activity</p>';
    }

    getStatusIcon(status) {
        const icons = {
            pending: 'clock',
            progress: 'spinner',
            completed: 'check-circle'
        };
        return icons[status] || 'info-circle';
    }

    getStatusMessage(status) {
        const messages = {
            pending: 'Awaiting review',
            progress: 'In progress',
            completed: 'Completed'
        };
        return messages[status] || 'Unknown status';
    }

    getTimeAgo(date) {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60
        };

        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / secondsInUnit);
            if (interval >= 1) {
                return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
            }
        }
        return 'Just now';
    }

    startRealTimeUpdates() {
        // Simulate real-time updates every 30 seconds
        setInterval(() => {
            this.loadServiceRequests();
            this.checkNotifications();
        }, 30000);
    }

    setupTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.classList.toggle('dark-mode', savedTheme === 'dark');
        }
    }

    updateProfile() {
        const name = document.getElementById('profileName').value;
        const mobile = document.getElementById('mobileInput').value;

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.email === auth.currentUser.email);

        if (userIndex !== -1) {
            users[userIndex].name = name;
            users[userIndex].mobile = mobile;
            localStorage.setItem('users', JSON.stringify(users));

            auth.currentUser = users[userIndex];
            localStorage.setItem('currentUser', JSON.stringify(auth.currentUser));

            this.loadUserData();
            this.showNotification('Profile updated successfully!', 'success');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => notification.remove(), 3000);
    }

    renderServiceCatalog() {
        const catalogContainer = document.querySelector('.catalog-container');
        
        catalogContainer.innerHTML = Object.entries(serviceCategories).map(([categoryId, category]) => `
            <div class="service-category">
                <div class="category-header">
                    <i class="fas ${category.icon}"></i>
                    <h2>${category.title}</h2>
                </div>
                <div class="category-services">
                    ${Object.entries(category.services).map(([serviceId, service]) => `
                        <div class="service-card">
                            <h3>${service.title}</h3>
                            <p>${service.description}</p>
                            <div class="service-price">
                                <i class="fas fa-tag"></i> ${service.price}
                            </div>
                            <div class="service-actions">
                                <button onclick="dashboard.addToCart('${serviceId}')" class="add-to-cart-btn">
                                    <i class="fas fa-cart-plus"></i> Add to Cart
                                </button>
                                <button onclick="dashboard.viewServiceDetails('${serviceId}')" class="view-details-btn">
                                    <i class="fas fa-info-circle"></i> Details
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    getServiceIcon(serviceType) {
        const icons = {
            'dpr': 'fa-file-contract',
            'trade-license': 'fa-certificate',
            'noc': 'fa-file-signature',
            'pcb': 'fa-leaf',
            'bank-loan': 'fa-money-check-alt',
            'term-loan': 'fa-university',
            'income-tax': 'fa-file-invoice-dollar',
            'gst': 'fa-receipt',
            'cad': 'fa-drafting-compass'
        };
        return icons[serviceType] || 'fa-briefcase';
    }

    addToCart(serviceType) {
        if (!this.cart.includes(serviceType)) {
            this.cart.push(serviceType);
            localStorage.setItem(`cart_${auth.currentUser.email}`, JSON.stringify(this.cart));
            this.updateCartCount();
            this.showNotification('Service added to cart', 'success');
        } else {
            this.showNotification('Service already in cart', 'info');
        }
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.cart.length;
        cartCount.style.display = this.cart.length ? 'block' : 'none';
    }

    showCart() {
        const modal = document.createElement('div');
        modal.className = 'modal cart-modal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Your Cart</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="cart-items">
                    ${this.cart.length ? this.cart.map(serviceType => `
                        <div class="cart-item">
                            <div class="cart-item-info">
                                <h4>${serviceDescriptions[serviceType].title}</h4>
                                <p>${serviceDescriptions[serviceType].description}</p>
                            </div>
                            <button onclick="dashboard.removeFromCart('${serviceType}')" class="remove-btn">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `).join('') : '<p class="empty-cart">Your cart is empty</p>'}
                </div>
                ${this.cart.length ? `
                    <div class="cart-actions">
                        <button onclick="dashboard.checkoutServices()" class="checkout-btn">
                            Proceed to Enquiry
                        </button>
                    </div>
                ` : ''}
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.close-btn').onclick = () => modal.remove();
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
    }

    removeFromCart(serviceType) {
        this.cart = this.cart.filter(type => type !== serviceType);
        localStorage.setItem(`cart_${auth.currentUser.email}`, JSON.stringify(this.cart));
        this.updateCartCount();
        this.showCart(); // Refresh cart modal
        this.showNotification('Service removed from cart', 'info');
    }

    async checkoutServices() {
        const modal = document.querySelector('.cart-modal');
        if (modal) modal.remove();

        // Show enquiry form for all cart items
        const enquiryModal = document.createElement('div');
        enquiryModal.className = 'modal enquiry-modal';
        
        enquiryModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Service Enquiry</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <form id="enquiryForm" class="enquiry-form">
                    <div class="selected-services">
                        ${this.cart.map(type => `
                            <div class="selected-service">
                                <h4>${serviceDescriptions[type].title}</h4>
                                <ul class="requirements-list">
                                    ${serviceDescriptions[type].requirements.map(req => 
                                        `<li><i class="fas fa-check"></i> ${req}</li>`
                                    ).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                    <div class="form-group">
                        <label>Additional Details</label>
                        <textarea required placeholder="Please provide any specific requirements or questions"></textarea>
                    </div>
                    <button type="submit" class="submit-btn">Submit Enquiry</button>
                </form>
            </div>
        `;

        document.body.appendChild(enquiryModal);

        // Handle form submission
        document.getElementById('enquiryForm').onsubmit = async (e) => {
            e.preventDefault();
            const details = e.target.querySelector('textarea').value;
            
            // Create service requests for all cart items
            for (const serviceType of this.cart) {
                await auth.addServiceRequest(serviceType, details);
            }

            // Clear cart
            this.cart = [];
            localStorage.setItem(`cart_${auth.currentUser.email}`, JSON.stringify(this.cart));
            this.updateCartCount();

            // Close modal and show success message
            enquiryModal.remove();
            this.showNotification('Services requested successfully!', 'success');
            this.loadServiceRequests(); // Refresh service list
        };

        enquiryModal.querySelector('.close-btn').onclick = () => enquiryModal.remove();
        enquiryModal.onclick = (e) => {
            if (e.target === enquiryModal) enquiryModal.remove();
        };
    }
}

// Initialize dashboard
const dashboard = new Dashboard(); 