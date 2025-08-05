// Firebase configuration (replace with your own config from Firebase Console)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
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

// Handle Login
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        showAlert('Login successful!');
        closeAuthModal();
      })
      .catch(error => {
        showAlert(error.message);
      });
  });
}

// Handle Signup
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    if (password !== confirmPassword) {
      showAlert('Passwords do not match.');
      return;
    }
    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Optionally update display name
        return userCredential.user.updateProfile({ displayName: name });
      })
      .then(() => {
        showAlert('Signup successful!');
        closeAuthModal();
      })
      .catch(error => {
        showAlert(error.message);
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