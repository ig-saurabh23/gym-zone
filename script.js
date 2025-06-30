// Main Navigation
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

// Mobile menu toggle
if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        navbar.classList.toggle('active');
        menuIcon.classList.toggle('bx-x');
    };
}

// Close mobile menu when clicking a link
document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 768 && navbar) {
            navbar.classList.remove("active");
            menuIcon.classList.remove("bx-x");
        }
    });
});

// Sticky header
window.addEventListener("scroll", () => {
    const header = document.querySelector('header');
    if (header) header.classList.toggle('sticky', window.scrollY > 0);
});

// Active section highlighting
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});

// Dropdown Menus
document.querySelectorAll('.dropdown > a').forEach(item => {
    item.addEventListener('click', e => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            const menu = item.nextElementSibling;
            if (menu) {
                // Close any other open dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(otherMenu => {
                    if (otherMenu !== menu) {
                        otherMenu.style.display = 'none';
                    }
                });
                menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
            }
        }
    });
});

// Close dropdown when clicking elsewhere on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) menu.style.display = 'none';
            }
        });
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && navbar && menuIcon) {
        if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
            navbar.classList.remove('active');
            menuIcon.classList.remove('bx-x');
        }
    }
});

// BMI Calculator
const calculateBtn = document.getElementById('calculate-btn');
if (calculateBtn) {
    calculateBtn.addEventListener('click', calculateBMI);
}

function calculateBMI() {
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const resultDiv = document.getElementById('result');
    
    if (!heightInput || !weightInput || !resultDiv) return;
    
    // Clear previous error styles
    heightInput.style.borderColor = '';
    weightInput.style.borderColor = '';
    
    // Get values
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);
    
    // Validate inputs
    if (isNaN(height) || height <= 0) {
        resultDiv.textContent = 'Please enter valid height (positive number)';
        resultDiv.style.color = 'red';
        heightInput.style.borderColor = 'red';
        return;
    }
    
    if (isNaN(weight) || weight <= 0) {
        resultDiv.textContent = 'Please enter valid weight (positive number)';
        resultDiv.style.color = 'red';
        weightInput.style.borderColor = 'red';
        return;
    }
    
    // Calculate BMI
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    // Determine category
    let category = '';
    let color = '';
    
    if (bmi < 18.5) {
        category = 'Underweight';
        color = '#3498db';
    } else if (bmi < 25) {
        category = 'Normal weight';
        color = '#2ecc71';
    } else if (bmi < 30) {
        category = 'Overweight';
        color = '#f39c12';
    } else {
        category = 'Obese';
        color = '#e74c3c';
    }
    
    // Display result
    resultDiv.innerHTML = `
        <p style="margin-bottom:5px;font-size:1.8rem">Your BMI: <strong>${bmi.toFixed(1)}</strong></p>
        <p style="font-size:1.6rem">Category: <strong style="color:${color}">${category}</strong></p>
    `;
    resultDiv.style.color = 'white';
}

// Review System
const addReviewBtn = document.querySelector('.add-review-btn');
const reviewPopup = document.getElementById('reviewPopup');
const reviewForm = document.getElementById('reviewForm');
const reviewContainer = document.getElementById('review-container');

if (addReviewBtn && reviewPopup) {
    addReviewBtn.addEventListener('click', openReviewForm);
}

function openReviewForm() {
    if (reviewPopup) reviewPopup.style.display = "flex";
}

function closeReviewForm() {
    if (reviewPopup) reviewPopup.style.display = "none";
}

if (reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        submitReview();
    });
}

function submitReview() {
    const userName = document.getElementById('userName');
    const userComment = document.getElementById('userComment');
    const userRating = document.getElementById('userRating');

    if (userName && userComment && userRating && reviewContainer) {
        const name = userName.value.trim();
        const comment = userComment.value.trim();
        const rating = userRating.value;

        if (name && comment) {
            const newCard = document.createElement('div');
            newCard.className = 'review-card';
            newCard.innerHTML = `
                <img src="images/default.jpg" alt="${name}">
                <h3>${name}</h3>
                <p>"${comment}"</p>
                <div class="stars">${'★'.repeat(rating)}${'☆'.repeat(5-rating)}</div>
            `;
            reviewContainer.appendChild(newCard);
            closeReviewForm();
            reviewForm.reset();
        } else {
            alert("Please enter both name and comment.");
        }
    }
}

// Join Form
const joinForm = document.getElementById("joinForm");
if (joinForm) {
    joinForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const name = document.getElementById("name");
        if (name && name.value.trim()) {
            alert("Thank you, " + name.value.trim() + "! Your request has been submitted.");
            this.reset();
            const photoPreview = document.getElementById('photoPreview');
            if (photoPreview) photoPreview.src = '';
        }
    });
}

// Image preview for join form
const photoInput = document.getElementById('photo');
if (photoInput) {
    photoInput.addEventListener('change', previewImage);
}

function previewImage(event) {
    const input = event.target;
    const preview = document.getElementById('photoPreview');

    if (input.files && input.files[0] && preview) {
        const reader = new FileReader();

        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        }

        reader.readAsDataURL(input.files[0]);
    } else if (preview) {
        preview.style.display = 'none';
    }
}

// Form Validation
function validateForm() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const goal = document.getElementById("goal");
    const date = document.getElementById("date");

    if (!name || !email || !phone || !goal || !date) return false;

    if (!name.value.trim() || !email.value.trim() || !phone.value.trim() || !goal.value || !date.value) {
        alert("Please fill out all fields.");
        return false;
    }

    alert("Your session is successfully booked!");
    return true;
}

// Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.3
});

document.querySelectorAll('.contact-form, .contact-info, .achievement-card, .plan-card').forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
});

// Achievement Card Animations
const achievementCards = document.querySelectorAll('.achievement-card');
achievementCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('i');
        if (icon) {
            icon.style.transform = 'rotateY(360deg)';
            icon.style.transition = 'transform 0.8s ease';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('i');
        if (icon) icon.style.transform = 'rotateY(0deg)';
    });
});

// Plan Card Animations
const planCards = document.querySelectorAll('.plan-card');
planCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const price = card.querySelector('.price');
        if (price) price.style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        const price = card.querySelector('.price');
        if (price) price.style.transform = 'scale(1)';
    });
});

// Smooth scroll to pricing page
document.querySelectorAll('.plan-card .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (window.location.pathname.includes('pricing.html')) {
            e.preventDefault();
            window.scrollTo({
                top: document.getElementById('pricing').offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Close review popup when clicking outside
    if (reviewPopup) {
        reviewPopup.addEventListener('click', function(e) {
            if (e.target === reviewPopup) {
                closeReviewForm();
            }
        });
    }

    // Close buttons for popups
    const closeButtons = document.querySelectorAll('.cancel-btn, .close-btn');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeReviewForm);
    });
});