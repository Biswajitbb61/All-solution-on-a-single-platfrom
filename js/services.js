const serviceCategories = {
    business: {
        title: "Business Services",
        icon: "fa-briefcase",
        services: {
            dpr: {
                title: "Detailed Project Report",
                description: "Professional DPR preparation including market analysis, financial projections, and feasibility studies.",
                price: "Starting from ₹25,000",
                requirements: [
                    "Business plan outline",
                    "Market research data",
                    "Financial projections",
                    "Technical specifications"
                ]
            },
            'trade-license': {
                title: "Trade License",
                description: "Complete trade license documentation and processing assistance.",
                price: "Starting from ₹5,000",
                requirements: [
                    "Business details",
                    "Location documents",
                    "Identity proof",
                    "Address proof"
                ]
            }
        }
    },
    financial: {
        title: "Financial Services",
        icon: "fa-money-bill-wave",
        services: {
            'bank-loan': {
                title: "Bank Loan Services",
                description: "Complete assistance in bank loan application and processing.",
                price: "2% of loan amount",
                requirements: [
                    "Business profile",
                    "Financial statements",
                    "Project report",
                    "Collateral documents"
                ]
            },
            gst: {
                title: "GST Services",
                description: "Complete GST registration and filing assistance.",
                price: "Starting from ₹1,500/month",
                requirements: [
                    "PAN card",
                    "Business registration",
                    "Bank account details",
                    "Address proof"
                ]
            },
            'income-tax': {
                title: "Income Tax Filing",
                description: "Professional income tax filing and compliance services.",
                price: "Starting from ₹2,000/year",
                requirements: [
                    "Income statements",
                    "Investment documents",
                    "Tax documents",
                    "Previous returns"
                ]
            }
        }
    },
    legal: {
        title: "Legal & Compliance",
        icon: "fa-balance-scale",
        services: {
            noc: {
                title: "NOC Certificate",
                description: "Assistance in obtaining No Objection Certificates from authorities.",
                price: "Starting from ₹10,000",
                requirements: [
                    "Application details",
                    "Property documents",
                    "Business registration",
                    "Supporting documents"
                ]
            },
            pcb: {
                title: "PCB Certificate",
                description: "Environmental compliance certification (CTE & CTO) processing.",
                price: "Starting from ₹15,000",
                requirements: [
                    "Industry details",
                    "Process documentation",
                    "Environmental assessment",
                    "Compliance documents"
                ]
            }
        }
    }
};

const serviceDetails = {
    business: {
        title: "Business Services",
        description: "Comprehensive business setup and compliance solutions for entrepreneurs and enterprises.",
        features: [
            {
                name: "Project Report",
                description: "Detailed project reports including market analysis, financial projections, and feasibility studies. Essential for loan applications and business planning.",
                price: "Starting from ₹25,000"
            },
            {
                name: "Trade License",
                description: "Complete assistance in obtaining trade licenses from local authorities. Includes documentation, application filing, and follow-up.",
                price: "Starting from ₹5,000"
            },
            {
                name: "Factory License",
                description: "End-to-end support for factory setup licensing, including environmental clearances and safety certifications.",
                price: "Starting from ₹50,000"
            },
            {
                name: "PCB Certificate",
                description: "Pollution Control Board certification assistance (CTE & CTO). Includes environmental compliance documentation and liaison.",
                price: "Starting from ₹30,000"
            }
        ]
    },
    financial: {
        title: "Financial Planning Services",
        description: "Expert financial services to help you manage and grow your business finances.",
        features: [
            {
                name: "Bank Loan Sanction",
                description: "Complete loan application support including documentation, business plan preparation, and bank liaison.",
                price: "2% of loan amount"
            },
            {
                name: "CC & Term Loan",
                description: "Specialized assistance for working capital and term loan applications with detailed financial planning.",
                price: "1.5% of loan amount"
            },
            {
                name: "Income Tax",
                description: "Professional income tax filing services including tax planning, returns preparation, and compliance.",
                price: "Starting from ₹2,000/year"
            },
            {
                name: "GST Services",
                description: "Complete GST solution including registration, monthly filing, and compliance management.",
                price: "Starting from ₹1,500/month"
            }
        ]
    },
    // ... Add similar detailed objects for civil and design services
};

const serviceDescriptions = {
    dpr: {
        title: "Detailed Project Report",
        description: "Professional DPR preparation including market analysis, financial projections, and feasibility studies.",
        price: "Starting from ₹25,000",
        requirements: [
            "Business plan outline",
            "Market research data",
            "Financial projections",
            "Technical specifications"
        ]
    },
    'trade-license': {
        title: "Trade License",
        description: "Complete trade license documentation and processing assistance.",
        price: "Starting from ₹5,000",
        requirements: [
            "Business details",
            "Location documents",
            "Identity proof",
            "Address proof"
        ]
    },
    noc: {
        title: "NOC Certificate",
        description: "Assistance in obtaining No Objection Certificates from relevant authorities.",
        requirements: [
            "Application details",
            "Property documents",
            "Business registration",
            "Supporting documents"
        ]
    },
    pcb: {
        title: "PCB Certificate",
        description: "Environmental compliance certification (CTE & CTO) processing.",
        requirements: [
            "Industry details",
            "Process documentation",
            "Environmental impact assessment",
            "Compliance documents"
        ]
    },
    'bank-loan': {
        title: "Bank Loan Services",
        description: "Complete assistance in bank loan application and processing.",
        price: "2% of loan amount",
        requirements: [
            "Business profile",
            "Financial statements",
            "Project report",
            "Collateral documents"
        ]
    },
    'term-loan': {
        title: "CC & Term Loan Services",
        description: "Specialized support for working capital and term loan arrangements.",
        requirements: [
            "Business financials",
            "Bank statements",
            "GST returns",
            "Property documents",
            "Business projections"
        ]
    },
    'income-tax': {
        title: "Income Tax Services",
        description: "Professional income tax filing and compliance management services.",
        requirements: [
            "Income statements",
            "Investment proofs",
            "Tax deduction documents",
            "Previous returns",
            "Asset statements"
        ]
    },
    gst: {
        title: "GST Services",
        description: "Complete GST registration and filing assistance.",
        price: "Starting from ₹1,500/month",
        requirements: [
            "PAN card",
            "Business registration",
            "Bank account details",
            "Address proof"
        ]
    },
    'cad': {
        title: "CAD Drawing Services",
        description: "Professional CAD drawings and architectural design services.",
        requirements: [
            "Site measurements",
            "Design requirements",
            "Existing plans (if any)",
            "Project specifications",
            "Local building codes"
        ]
    },
    'construction': {
        title: "Construction Management",
        description: "End-to-end construction project management and supervision.",
        requirements: [
            "Approved plans",
            "Building permits",
            "Material specifications",
            "Timeline requirements",
            "Budget details"
        ]
    },
    'labor': {
        title: "Labor Support Services",
        description: "Skilled and unskilled labor management for construction projects.",
        requirements: [
            "Project scope",
            "Labor requirements",
            "Timeline details",
            "Safety protocols",
            "Work specifications"
        ]
    },
    'graphic': {
        title: "Graphic Design Services",
        description: "Professional graphic design services for all your branding needs.",
        requirements: [
            "Brand guidelines",
            "Design preferences",
            "Target audience",
            "Usage requirements",
            "Format specifications"
        ]
    },
    'motion': {
        title: "Motion Graphics Services",
        description: "Creative motion graphics and animation services for digital content.",
        requirements: [
            "Storyboard",
            "Brand assets",
            "Audio requirements",
            "Duration details",
            "Platform specifications"
        ]
    },
    'social': {
        title: "Social Media Services",
        description: "Complete social media marketing and management solutions.",
        requirements: [
            "Brand information",
            "Target audience",
            "Content guidelines",
            "Platform preferences",
            "Marketing objectives"
        ]
    }
};

function showServiceDetails(serviceType) {
    const service = serviceDetails[serviceType];
    if (!service) return;

    const content = document.getElementById('serviceDetailsContent');
    content.innerHTML = `
        <h2>${service.title}</h2>
        <div class="service-description">
            <p>${service.description}</p>
        </div>
        <div class="service-features">
            ${service.features.map(feature => `
                <div class="feature-item">
                    <h4>${feature.name}</h4>
                    <p>${feature.description}</p>
                    <div class="pricing-info">
                        <strong>Pricing:</strong> ${feature.price}
                    </div>
                </div>
            `).join('')}
        </div>
        <button class="request-service-btn" onclick="requestService('${serviceType}')">
            Request Service
        </button>
    `;

    document.getElementById('serviceDetailsModal').style.display = 'block';
}

function requestService(serviceType) {
    if (!auth.isAuthenticated) {
        auth.showNotification('Please login to request services', 'error');
        document.getElementById('serviceDetailsModal').style.display = 'none';
        document.getElementById('loginModal').style.display = 'block';
        return;
    }

    // Here you would typically show a form to collect specific requirements
    // For now, we'll just show a success message
    auth.showNotification('Service request submitted successfully!', 'success');
    document.getElementById('serviceDetailsModal').style.display = 'none';
}

class Services {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Service category tabs
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchCategory(tab.dataset.category));
        });
    }

    enquireService(serviceType) {
        if (!auth.isAuthenticated) {
            auth.showNotification('Please login to enquire about services', 'error');
            document.getElementById('loginModal').style.display = 'block';
            return;
        }

        const service = serviceDescriptions[serviceType];
        if (!service) {
            auth.showNotification('Service not found!', 'error');
            return;
        }

        this.showEnquiryModal(service, serviceType);
    }

    showEnquiryModal(service, serviceType) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${service.title}</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="service-details">
                        <p>${service.description}</p>
                        <div class="requirements-section">
                            <h3>Required Documents</h3>
                            <ul>
                                ${service.requirements.map(req => 
                                    `<li><i class="fas fa-check-circle"></i> ${req}</li>`
                                ).join('')}
                            </ul>
                        </div>
                    </div>
                    <form id="enquiryForm" class="enquiry-form">
                        <div class="form-group">
                            <label>Additional Details</label>
                            <textarea required placeholder="Please provide any specific requirements or questions"></textarea>
                        </div>
                        <button type="submit" class="btn-primary">Submit Enquiry</button>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Handle form submission
        document.getElementById('enquiryForm').onsubmit = (e) => {
            e.preventDefault();
            const details = e.target.querySelector('textarea').value;
            
            if (auth.addServiceRequest(serviceType, details)) {
                auth.showNotification('Service request submitted successfully!', 'success');
                modal.remove();
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html#services';
            } else {
                auth.showNotification('Failed to submit request. Please try again.', 'error');
            }
        };

        // Close modal handlers
        modal.querySelector('.close-btn').onclick = () => modal.remove();
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
    }

    viewDetails(serviceType) {
        const service = serviceDescriptions[serviceType];
        if (!service) return;

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${service.title}</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="service-details">
                        <p>${service.description}</p>
                        <div class="price-section">
                            <h3>Pricing</h3>
                            <p>${service.price}</p>
                        </div>
                        <div class="requirements-section">
                            <h3>Required Documents</h3>
                            <ul>
                                ${service.requirements.map(req => 
                                    `<li><i class="fas fa-check-circle"></i> ${req}</li>`
                                ).join('')}
                            </ul>
                        </div>
                    </div>
                    <button onclick="services.enquireService('${serviceType}')" class="btn-primary">
                        Enquire Now
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal handlers
        modal.querySelector('.close-btn').onclick = () => modal.remove();
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
    }
}

// Initialize services
const services = new Services(); 