class AdminPanel {
    constructor() {
        this.checkAuth();
        this.initializeData();
        this.setupEventListeners();
        this.showSection('dashboard');
        this.initializeDefaultServices();
    }

    checkAuth() {
        if (!localStorage.getItem('adminLoggedIn')) {
            window.location.href = 'login.html';
        }
    }

    initializeData() {
        // Initialize with empty data or load from localStorage
        this.users = JSON.parse(localStorage.getItem('users') || '[]');
        this.services = JSON.parse(localStorage.getItem('services') || '[]');
        this.requests = JSON.parse(localStorage.getItem('requests') || '[]');
    }

    setupEventListeners() {
        // Menu toggle
        document.getElementById('menuToggle').onclick = () => {
            document.querySelector('.admin-sidebar').classList.toggle('collapsed');
        };

        // Menu items
        document.querySelectorAll('.menu-item').forEach(item => {
            item.onclick = (e) => {
                e.preventDefault();
                this.showSection(item.dataset.section);
                // Update active state
                document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            };
        });

        // Logout button
        document.getElementById('logoutBtn').onclick = () => {
            localStorage.removeItem('adminLoggedIn');
            window.location.href = 'login.html';
        };

        // Date range filter
        document.getElementById('dateRange').onchange = (e) => {
            this.updateDashboard(e.target.value);
        };
    }

    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('section').forEach(section => {
            section.style.display = 'none';
        });

        // Show selected section
        const currentSection = document.getElementById(sectionId);
        if (currentSection) {
            currentSection.style.display = 'block';
            this.loadSectionData(sectionId);
        }
    }

    loadSectionData(sectionId) {
        switch(sectionId) {
            case 'dashboard':
                this.updateDashboard();
                break;
            case 'users':
                this.loadUsers();
                break;
            case 'services':
                this.loadServices();
                break;
            case 'requests':
                this.loadRequests();
                break;
        }
    }

    updateDashboard() {
        // Update basic stats
        document.getElementById('totalUsers').textContent = this.users.length;

        // Setup simple chart
        if (document.getElementById('requestsTrend')) {
            this.setupChart();
        }
    }

    setupChart() {
        const ctx = document.getElementById('requestsTrend').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Service Requests',
                    data: [12, 19, 3, 5, 2, 3],
                    borderColor: '#4361ee',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    loadUsers() {
        const usersList = document.getElementById('usersList');
        if (!usersList) return;

        usersList.innerHTML = this.users.map(user => `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td><span class="status-badge ${user.status}">${user.status}</span></td>
                <td>
                    <button onclick="admin.editUser('${user.id}')" class="action-btn edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="admin.deleteUser('${user.id}')" class="action-btn delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    loadServices() {
        const servicesList = document.getElementById('servicesList');
        if (!servicesList) return;

        servicesList.innerHTML = this.services.map(service => `
            <div class="service-card">
                <div class="service-header">
                    <h3>${service.name}</h3>
                    <span class="status-badge ${service.status}">${service.status}</span>
                </div>
                ${service.image ? `
                    <div class="service-image">
                        <img src="../${service.image}" alt="${service.name}">
                    </div>
                ` : ''}
                <p class="service-description">${service.description}</p>
                <div class="service-details">
                    <span class="service-category">${service.category}</span>
                    <span class="service-price">$${service.price.toFixed(2)}</span>
                </div>
                <div class="service-actions">
                    <button onclick="admin.showEditServiceModal('${service.id}')" class="action-btn edit">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button onclick="admin.deleteService('${service.id}')" class="action-btn delete">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    loadRequests() {
        const requestsList = document.getElementById('requestsList');
        if (!requestsList) return;

        requestsList.innerHTML = this.requests.map(request => `
            <tr>
                <td>${request.userName}</td>
                <td>${request.serviceName}</td>
                <td>${new Date(request.date).toLocaleDateString()}</td>
                <td><span class="status-badge ${request.status}">${request.status}</span></td>
                <td>
                    <button onclick="admin.updateRequestStatus('${request.id}')" class="action-btn">
                        Update Status
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Service Management Methods
    showAddServiceModal() {
        document.getElementById('modalTitle').textContent = 'Add Service';
        document.getElementById('serviceForm').reset();
        document.getElementById('serviceId').value = '';
        document.getElementById('serviceModal').style.display = 'block';
    }

    showEditServiceModal(serviceId) {
        const service = this.services.find(s => s.id === serviceId);
        if (!service) return;

        document.getElementById('modalTitle').textContent = 'Edit Service';
        document.getElementById('serviceId').value = service.id;
        document.getElementById('serviceName').value = service.name;
        document.getElementById('serviceDescription').value = service.description;
        document.getElementById('servicePrice').value = service.price;
        document.getElementById('serviceCategory').value = service.category;
        document.getElementById('serviceStatus').value = service.status;
        document.getElementById('serviceModal').style.display = 'block';
    }

    closeServiceModal() {
        document.getElementById('serviceModal').style.display = 'none';
    }

    handleServiceSubmit(event) {
        event.preventDefault();
        
        const serviceData = {
            id: document.getElementById('serviceId').value || Date.now().toString(),
            name: document.getElementById('serviceName').value,
            description: document.getElementById('serviceDescription').value,
            price: parseFloat(document.getElementById('servicePrice').value),
            category: document.getElementById('serviceCategory').value,
            status: document.getElementById('serviceStatus').value,
            updatedAt: new Date().toISOString()
        };

        if (serviceData.id === Date.now().toString()) {
            // Add new service
            this.services.push(serviceData);
        } else {
            // Update existing service
            const index = this.services.findIndex(s => s.id === serviceData.id);
            if (index !== -1) {
                this.services[index] = serviceData;
            }
        }

        // Save to localStorage
        localStorage.setItem('services', JSON.stringify(this.services));
        
        // Refresh the services list
        this.loadServices();
        this.closeServiceModal();
    }

    deleteService(serviceId) {
        if (confirm('Are you sure you want to delete this service?')) {
            this.services = this.services.filter(s => s.id !== serviceId);
            localStorage.setItem('services', JSON.stringify(this.services));
            this.loadServices();
        }
    }

    initializeDefaultServices() {
        // Only initialize if services are empty
        if (this.services.length === 0) {
            const defaultServices = [
                {
                    id: '1',
                    name: 'Computer Repair',
                    description: 'Professional computer repair services including hardware fixes, software troubleshooting, and system optimization.',
                    price: 49.99,
                    category: 'repair',
                    status: 'active',
                    image: 'images/services/computer-repair.jpg'
                },
                {
                    id: '2',
                    name: 'Mobile Repair',
                    description: 'Expert mobile phone repair services covering screen replacement, battery issues, and other hardware/software problems.',
                    price: 39.99,
                    category: 'repair',
                    status: 'active',
                    image: 'images/services/mobile-repair.jpg'
                },
                {
                    id: '3',
                    name: 'Printer Repair',
                    description: 'Comprehensive printer repair and maintenance services for all major brands and models.',
                    price: 44.99,
                    category: 'repair',
                    status: 'active',
                    image: 'images/services/printer-repair.jpg'
                },
                {
                    id: '4',
                    name: 'Network Solutions',
                    description: 'Complete networking solutions including setup, troubleshooting, and security implementation.',
                    price: 59.99,
                    category: 'installation',
                    status: 'active',
                    image: 'images/services/network-solutions.jpg'
                },
                {
                    id: '5',
                    name: 'Data Recovery',
                    description: 'Professional data recovery services for all storage devices with high success rate.',
                    price: 79.99,
                    category: 'recovery',
                    status: 'active',
                    image: 'images/services/data-recovery.jpg'
                },
                {
                    id: '6',
                    name: 'Software Installation',
                    description: 'Expert software installation and configuration services for both personal and business needs.',
                    price: 29.99,
                    category: 'installation',
                    status: 'active',
                    image: 'images/services/software-installation.jpg'
                }
            ];

            this.services = defaultServices;
            localStorage.setItem('services', JSON.stringify(defaultServices));
        }
    }
}

// Initialize admin panel
document.addEventListener('DOMContentLoaded', () => {
    window.admin = new AdminPanel();
}); 