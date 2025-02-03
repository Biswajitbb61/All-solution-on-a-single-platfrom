class Dashboard {
    constructor() {
        this.checkAuth();
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!this.currentUser) {
            window.location.href = 'login.html';
            return;
        }
        this.initializeData();
        this.setupEventListeners();
        this.loadUserProfile();
        this.updateDashboard();
    }

    initializeData() {
        // Load data from localStorage
        this.services = JSON.parse(localStorage.getItem('userServices') || '[]');
        this.activities = JSON.parse(localStorage.getItem('userActivities') || '[]');
        this.profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    }

    setupEventListeners() {
        // Menu navigation
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSection(item.dataset.section);
            });
        });

        // Theme toggle
        document.getElementById('themeToggle').onclick = () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', 
                document.body.classList.contains('dark-mode') ? 'dark' : 'light'
            );
        };

        // Profile form
        const profileForm = document.getElementById('profileUpdateForm');
        if (profileForm) {
            profileForm.onsubmit = (e) => {
                e.preventDefault();
                this.updateProfile();
            };
        }

        // Avatar change
        const avatarInput = document.getElementById('avatarInput');
        if (avatarInput) {
            avatarInput.onchange = (e) => {
                this.handleAvatarChange(e);
            };
        }
    }

    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.dashboard-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        const currentSection = document.getElementById(sectionId);
        if (currentSection) {
            currentSection.classList.add('active');
            this.updateSectionData(sectionId);
        }

        // Update menu active state
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.toggle('active', item.dataset.section === sectionId);
        });
    }

    updateSectionData(sectionId) {
        switch(sectionId) {
            case 'overview':
                this.updateDashboard();
                break;
            case 'services':
                this.loadServices();
                break;
            case 'support':
                this.loadSupport();
                break;
            case 'profile':
                this.loadUserProfile();
                break;
            case 'catalog':
                this.loadCatalog();
                break;
        }
    }

    updateDashboard() {
        // Update counts
        document.getElementById('pendingCount').textContent = 
            this.services.filter(s => s.status === 'pending').length;
        document.getElementById('progressCount').textContent = 
            this.services.filter(s => s.status === 'progress').length;
        document.getElementById('completedCount').textContent = 
            this.services.filter(s => s.status === 'completed').length;

        // Update activity list
        this.updateActivityList();
    }

    updateActivityList() {
        const activityList = document.getElementById('activityList');
        if (!activityList) return;

        activityList.innerHTML = this.activities
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5)
            .map(activity => `
                <div class="activity-item">
                    <i class="fas ${this.getActivityIcon(activity.type)}"></i>
                    <div class="activity-details">
                        <p>${activity.description}</p>
                        <small>${this.formatDate(activity.date)}</small>
                    </div>
                </div>
            `).join('');
    }

    getActivityIcon(type) {
        const icons = {
            'service': 'fa-cog',
            'support': 'fa-headset',
            'profile': 'fa-user',
            'payment': 'fa-credit-card'
        };
        return icons[type] || 'fa-info-circle';
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    loadUserProfile() {
        if (this.profile) {
            document.getElementById('userName').textContent = this.profile.name || 'User';
            document.getElementById('userEmail').textContent = this.profile.email || '';
            document.getElementById('welcomeName').textContent = this.profile.name || 'User';
            
            if (this.profile.avatar) {
                document.getElementById('profileImage').src = this.profile.avatar;
                document.getElementById('avatarPreview').src = this.profile.avatar;
            }
        }
    }

    checkAuth() {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }

    // Add more methods as needed...
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new Dashboard();
}); 