// Firebase configuration (replace with your own config from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyAXMcELlNeMoeo7Ilnaxb5q3UXvjvECjWI",
  authDomain: "backend-6c176.firebaseapp.com",
  projectId: "backend-6c176backend-6c176.firebasestorage.app",
  storageBucket: "136393192002",
  messagingSenderId: "1:136393192002:web:4aaeabc3a9f4893aebf3db ",
  appId: "G-JTJTKLJDEQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Export for use in other scripts (if using modules, otherwise just use global)
// export { auth, db }; // Uncomment if using ES modules

// Helper to show alerts (simple for demo)
function showAlert(message) {
  alert(message);
}

// Helper to show error below form
function showFormError(form, message) {
  let errorDiv = form.querySelector('.form-error');
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.style.color = 'red';
    errorDiv.style.marginTop = '8px';
    form.appendChild(errorDiv);
  }
  errorDiv.textContent = message;
}
function clearFormError(form) {
  const errorDiv = form.querySelector('.form-error');
  if (errorDiv) errorDiv.textContent = '';
}

// Handle Login
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    clearFormError(loginForm);
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const submitBtn = loginForm.querySelector('.auth-submit-btn');
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Logging in...';
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        closeAuthModal();
      })
      .catch(error => {
        showFormError(loginForm, error.message);
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
  });
}

// Handle Signup
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    clearFormError(signupForm);
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const submitBtn = signupForm.querySelector('.auth-submit-btn');
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Signing up...';
    if (password !== confirmPassword) {
      showFormError(signupForm, 'Passwords do not match.');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      return;
    }
    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        return userCredential.user.updateProfile({ displayName: name });
      })
      .then(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        closeAuthModal();
      })
      .catch(error => {
        showFormError(signupForm, error.message);
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
  });
}

// Helper to close modal
function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.style.display = 'none';
}

// Logout function
function logout() {
  auth.signOut()
    .then(() => {
      showAlert('Logged out successfully!');
      updateAuthUI();
    })
    .catch(error => showAlert(error.message));
}

// Update UI based on auth state
function updateAuthUI() {
  const loginBtn = document.querySelector('.login-btn');
  const signupBtn = document.querySelector('.signup-btn');
  let logoutBtn = document.querySelector('.logout-btn');
  const navLinks = document.querySelector('.nav-links');
  let userDisplay = document.getElementById('user-display');

  if (!userDisplay) {
    userDisplay = document.createElement('span');
    userDisplay.id = 'user-display';
    userDisplay.style.marginLeft = '10px';
    navLinks && navLinks.appendChild(userDisplay);
  }

  auth.onAuthStateChanged(user => {
    if (user) {
      // Hide login/signup, show logout
      if (loginBtn) loginBtn.style.display = 'none';
      if (signupBtn) signupBtn.style.display = 'none';
      if (!logoutBtn) {
        logoutBtn = document.createElement('button');
        logoutBtn.className = 'logout-btn';
        logoutBtn.textContent = 'Logout';
        logoutBtn.onclick = logout;
        loginBtn && loginBtn.parentNode.insertBefore(logoutBtn, loginBtn);
      }
      logoutBtn.style.display = 'inline-block';
      userDisplay.textContent = user.displayName ? `Hello, ${user.displayName}` : user.email;
      userDisplay.style.display = 'inline-block';
    } else {
      // Show login/signup, hide logout
      if (loginBtn) loginBtn.style.display = 'inline-block';
      if (signupBtn) signupBtn.style.display = 'inline-block';
      if (logoutBtn) logoutBtn.style.display = 'none';
      userDisplay.textContent = '';
      userDisplay.style.display = 'none';
    }
  });
}

// Call updateAuthUI on page load
window.addEventListener('DOMContentLoaded', updateAuthUI);