class AdminAuth {
    constructor() {
        this.adminUser = {
            username: 'biswajit',
            password: 'Biswajit@123',
            name: 'Biswajit',
            avatar: 'assets/admin-avatar.png'
        };
        this.setupEventListeners();
    }

    setupEventListeners() {
        const loginForm = document.getElementById('adminLoginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.login();
            });
        }
    }

    login() {
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;

        if (this.login(username, password)) {
            window.location.href = 'index.html';
        } else {
            this.showError('Invalid credentials');
        }
    }

    login(username, password) {
        if (username === this.adminUser.username && password === this.adminUser.password) {
            const adminData = {
                name: this.adminUser.name,
                avatar: this.adminUser.avatar,
                loginTime: new Date().toISOString()
            };
            localStorage.setItem('adminAuth', JSON.stringify(adminData));
            localStorage.setItem('adminLoggedIn', 'true');
            return true;
        }
        return false;
    }

    checkAuth() {
        const auth = localStorage.getItem('adminLoggedIn');
        if (!auth) return false;
        
        const adminData = JSON.parse(localStorage.getItem('adminAuth') || '{}');
        const loginTime = new Date(adminData.loginTime || '');
        const now = new Date();
        
        // Session expires after 2 hours
        if (now - loginTime > 2 * 60 * 60 * 1000) {
            this.logout();
            return false;
        }
        return true;
    }

    getAdminInfo() {
        const auth = localStorage.getItem('adminAuth');
        return auth ? JSON.parse(auth) : null;
    }

    logout() {
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminLoggedIn');
        window.location.href = 'login.html';
    }

    generateToken() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }

    showError(message) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        
        const loginBox = document.querySelector('.login-box');
        if (loginBox) {
            loginBox.insertBefore(error, loginBox.firstChild);
            setTimeout(() => error.remove(), 3000);
        }
    }
}

const adminAuth = new AdminAuth(); 