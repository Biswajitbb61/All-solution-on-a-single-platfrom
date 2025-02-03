class Auth {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users') || '[]');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // View Details buttons
        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (!this.isLoggedIn()) {
                    this.showAuthModal();
                } else {
                    this.showServiceDetails(btn.dataset.serviceId);
                }
            });
        });

        // Auth forms
        document.getElementById('loginForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        document.getElementById('registerForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegistration();
        });
    }

    isLoggedIn() {
        return !!localStorage.getItem('currentUser');
    }

    showAuthModal() {
        const modal = document.getElementById('authModal');
        if (modal) {
            modal.style.display = 'block';
            showLogin(); // Show login form by default
        }
    }

    closeAuthModal() {
        const modal = document.getElementById('authModal');
        if (modal) {
            modal.style.display = 'none';
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

            this.showMessage('Login successful!', 'success');
            setTimeout(() => {
                this.closeAuthModal();
                window.location.href = 'dashboard.html';
            }, 1500);
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

    showMessage(message, type = 'error') {
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;

        const form = document.querySelector('.auth-form-container:not(.hidden)');
        form.insertBefore(messageDiv, form.firstChild);

        setTimeout(() => messageDiv.remove(), 3000);
    }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('rememberMe');
        window.location.href = 'index.html';
    }

    setupPasswordToggles() {
        document.querySelectorAll('.toggle-password').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const input = e.target.previousElementSibling;
                const type = input.type === 'password' ? 'text' : 'password';
                input.type = type;
                e.target.classList.toggle('fa-eye');
                e.target.classList.toggle('fa-eye-slash');
            });
        });
    }

    setupKeyboardEvents() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAuthModal();
            }
        });
    }
}

// Helper functions
function showLogin() {
    document.getElementById('registerContainer').classList.add('hidden');
    document.getElementById('loginContainer').classList.remove('hidden');
}

function showRegister() {
    document.getElementById('loginContainer').classList.add('hidden');
    document.getElementById('registerContainer').classList.remove('hidden');
}

// Initialize auth
const auth = new Auth(); 