function setupModal(buttonSelector, modalId, overlayId) {
  const buttons = document.querySelectorAll(buttonSelector);
  const modal = document.getElementById(modalId);
  const overlay = overlayId ? document.getElementById(overlayId) : null;
  const closeBtn = modal ? modal.querySelector(".close-modal") : null;

  if (!modal) return;

  const open = () => {
    modal.classList.add("active");
    if (overlay) overlay.classList.add("active");
  };
  const close = () => {
    modal.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
  };

  buttons.forEach(btn => btn.addEventListener("click", open));
  if (closeBtn) closeBtn.addEventListener("click", close);
  if (overlay) overlay.addEventListener("click", close);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") close();
  });
}

// Existing modals
setupModal(".learn-button", "learnMoreModal", "learnMoreOverlay");
const trailerButtons = document.querySelectorAll(".watch-button");
trailerButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        window.open("https://www.youtube.com/embed/uwDx7-HTk0s", "_blank");
    });
});

// New modals for other buttons
setupModal(".find-more-btn", "findMoreModal", "findMoreOverlay");
setupModal(".buy-now-btn", "buyNowModal", "buyNowOverlay");
setupModal(".store-btn", "storeModal", "storeOverlay");
setupModal(".find-out-btn", "findOutModal", "findOutOverlay");
setupModal(".join-btn", "joinModal", "joinOverlay");
setupModal(".explore-btn", "exploreModal", "exploreOverlay");

// Smooth Fade-in Animations on Page Load
window.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll("h1, h2, h3, p, button, img, .modal");
  elements.forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transition = "opacity 0.8s ease";
    setTimeout(() => {
      el.style.opacity = 1;
    }, i * 100); // slight delay for staggered effect
  });
});

//Ripple Effect on buttons
document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", function (e) {
    const circle = document.createElement("span");
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop;
    circle.style.left = x + "px";
    circle.style.top = y + "px";
    circle.classList.add("ripple");
    this.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });
});

//Add a Sticky Navbar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar"); // replace with your nav class
  if (!navbar) return;
  if (window.scrollY > 50) navbar.classList.add("sticky");
  else navbar.classList.remove("sticky");
});

//Add Scroll Reveal Animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    } else {
      entry.target.style.opacity = 0;
      entry.target.style.transform = "translateY(50px)";
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll("section, .card, .feature, .product").forEach(el => {
  el.style.opacity = 0;
  el.style.transition = "all 0.6s ease";
  el.style.transform = "translateY(50px)";
  observer.observe(el);
});

window.addEventListener("DOMContentLoaded", () => {
    const bannerContent = document.querySelector(".thismay-banner-content");
    if (bannerContent) {
        bannerContent.style.top = "20%"; // Adjust as needed
    }
});
// ===== FEEDBACK MODAL LOGIC =====
const feedbackBtn = document.querySelector('.feedback-button');
const feedbackModal = document.getElementById('feedbackModal');
const feedbackOverlay = document.getElementById('feedbackOverlay');
const feedbackForm = document.getElementById('feedbackForm');
const stars = document.querySelectorAll('.star');
const ratingInput = document.getElementById('rating');
const ratingError = document.getElementById('ratingError');
const feedbackSuccess = document.getElementById('feedbackSuccess');

// Open feedback modal
if (feedbackBtn) {
  feedbackBtn.addEventListener('click', () => {
    feedbackModal.classList.add('active');
    feedbackOverlay.classList.add('active');
  });
}

// Close feedback modal
const closeFeedbackModal = () => {
  feedbackModal.classList.remove('active');
  feedbackOverlay.classList.remove('active');
  feedbackForm.reset();
  stars.forEach(s => s.classList.remove('active'));
  ratingInput.value = '0';
  ratingError.style.display = 'none';
  feedbackSuccess.style.display = 'none';
};

// Close button for feedback modal
feedbackModal.querySelector('.close-modal').addEventListener('click', closeFeedbackModal);
feedbackOverlay.addEventListener('click', closeFeedbackModal);

// Star rating logic
stars.forEach(star => {
  star.addEventListener('click', () => {
    const value = star.getAttribute('data-value');
    ratingInput.value = value;
    ratingError.style.display = 'none';
    
    stars.forEach(s => {
      if (s.getAttribute('data-value') <= value) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });
  });

  star.addEventListener('mouseover', () => {
    const value = star.getAttribute('data-value');
    stars.forEach(s => {
      if (s.getAttribute('data-value') <= value) {
        s.style.color = '#ffc107';
      } else {
        s.style.color = '#ddd';
      }
    });
  });
});

document.querySelector('.star-rating').addEventListener('mouseleave', () => {
  stars.forEach(s => {
    if (s.classList.contains('active')) {
      s.style.color = '#ffc107';
    } else {
      s.style.color = '#ddd';
    }
  });
});

// Feedback form submission
feedbackForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const rating = ratingInput.value;
  const comment = document.getElementById('comment').value.trim();

  if (rating === '0') {
    ratingError.style.display = 'block';
    return;
  }

  // Show success message
  feedbackSuccess.style.display = 'block';
  
  // Log the feedback (in real app, send to server)
  console.log('Feedback submitted:', { rating, comment });

  // Reset and close after 2 seconds
  setTimeout(() => {
    closeFeedbackModal();
  }, 2000);
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && feedbackModal.classList.contains('active')) {
    closeFeedbackModal();
  }
});
// ===== SIGN IN MODAL LOGIC =====
const signInBtn = document.querySelector('.sign-in-button');
const signInModal = document.getElementById('signInModal');
const signInOverlay = document.getElementById('signInOverlay');
const signInForm = document.getElementById('signInForm');
const userInfo = document.getElementById('userInfo');
const userDisplay = document.getElementById('userDisplay');
const logoutBtn = document.querySelector('.logout-btn');
let currentUser = null;

// Open sign-in modal
if (signInBtn) {
  signInBtn.addEventListener('click', () => {
    signInModal.classList.add('active');
    signInOverlay.classList.add('active');
  });
}

// Close sign-in modal
const closeSignInModal = () => {
  signInModal.classList.remove('active');
  signInOverlay.classList.remove('active');
  if (!currentUser) {
    signInForm.reset();
    document.getElementById('loginError').style.display = 'none';
    document.getElementById('loginSuccess').style.display = 'none';
    document.getElementById('emailError').style.display = 'none';
    document.getElementById('passwordError').style.display = 'none';
  }
};

// Close button for sign-in modal
signInModal.querySelector('.close-modal').addEventListener('click', closeSignInModal);
signInOverlay.addEventListener('click', closeSignInModal);

// Form validation and submission
signInForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  
  // Reset error messages
  document.getElementById('emailError').style.display = 'none';
  document.getElementById('passwordError').style.display = 'none';
  document.getElementById('loginError').style.display = 'none';
  
  // Validate email
  if (!email) {
    document.getElementById('emailError').textContent = 'Email is required';
    document.getElementById('emailError').style.display = 'block';
    return;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById('emailError').textContent = 'Please enter a valid email';
    document.getElementById('emailError').style.display = 'block';
    return;
  }
  
  // Validate password
  if (!password) {
    document.getElementById('passwordError').textContent = 'Password is required';
    document.getElementById('passwordError').style.display = 'block';
    return;
  }
  
  if (password.length < 6) {
    document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
    document.getElementById('passwordError').style.display = 'block';
    return;
  }
  
  // Demo credentials (in real app, this would be an API call)
  if (email === 'user@playstation.com' && password === 'password123') {
    currentUser = email;
    signInForm.style.display = 'none';
    userInfo.style.display = 'block';
    userDisplay.textContent = `Welcome back, ${email}!`;
    document.getElementById('loginSuccess').style.display = 'block';
    
    // Update sign-in button text
    signInBtn.textContent = 'Account';
    signInBtn.style.background = '#28a745';
    
    // Auto close after 2 seconds
    setTimeout(() => {
      closeSignInModal();
    }, 2000);
  } else {
    document.getElementById('loginError').textContent = 'Invalid email or password. Try user@playstation.com / password123';
    document.getElementById('loginError').style.display = 'block';
  }
});

// Logout functionality
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    currentUser = null;
    signInForm.style.display = 'block';
    userInfo.style.display = 'none';
    signInForm.reset();
    document.getElementById('loginError').style.display = 'none';
    document.getElementById('loginSuccess').style.display = 'none';
    
    // Reset sign-in button
    signInBtn.textContent = 'Sign In';
    signInBtn.style.background = '#0070d1';
    
    closeSignInModal();
  });
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (signInModal.classList.contains('active') && !currentUser) {
      closeSignInModal();
    }
  }
});
