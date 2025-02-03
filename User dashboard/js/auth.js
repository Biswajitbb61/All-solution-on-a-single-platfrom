class Auth {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users') || '[]');
        this.setupEventListeners();
        this.checkAuth();
    }

    setupEventListeners() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegistration();
            });
        }
    }

    handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        const user = this.users.find(u => u.email === email && u.password === password);

        if (user) {
            const userData = {
                id: user.id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                avatar: user.avatar || 'assets/default-avatar.png',
                loginTime: new Date().toISOString()
            };

            localStorage.setItem('currentUser', JSON.stringify(userData));
            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
            }

            window.location.href = 'dashboard.html';
        } else {
            this.showMessage('Invalid email or password', 'error');
        }
    }

    handleRegistration() {
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const mobile = document.getElementById('regMobile').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;

        if (password !== confirmPassword) {
            this.showMessage('Passwords do not match', 'error');
            return;
        }

        if (this.users.some(u => u.email === email)) {
            this.showMessage('Email already registered', 'error');
            return;
        }

        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            mobile,
            password,
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(this.users));

        this.showMessage('Registration successful! Please login.', 'success');
        setTimeout(() => showLogin(), 1500);
    }

    checkAuth() {
        const currentUser = localStorage.getItem('currentUser');
        const isAuthPage = window.location.pathname.includes('login.html');

        if (currentUser && isAuthPage) {
            window.location.href = 'dashboard.html';
        } else if (!currentUser && !isAuthPage && !window.location.pathname.includes('index.html')) {
            window.location.href = 'login.html';
        }
    }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('rememberMe');
        window.location.href = 'login.html';
    }

    showMessage(message, type = 'error') {
        const existingMessage = document.querySelector('.error-message, .success-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
        messageDiv.textContent = message;

        const authBox = document.querySelector('.auth-box:not(.hidden)');
        authBox.insertBefore(messageDiv, authBox.firstChild);

        setTimeout(() => messageDiv.remove(), 3000);
    }
}

// Helper functions for switching between login and register
function showRegister() {
    document.getElementById('loginBox').classList.add('hidden');
    document.getElementById('registerBox').classList.remove('hidden');
}

function showLogin() {
    document.getElementById('registerBox').classList.add('hidden');
    document.getElementById('loginBox').classList.remove('hidden');
}

// Initialize auth
const auth = new Auth(); 