// Firebase Configuration and Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB0mM6Opz9tcbYZdo1knx7aD6YcYsDQUCk",
  authDomain: "fjordr-auth.firebaseapp.com",
  databaseURL: "https://fjordr-auth-default-rtdb.firebaseio.com",
  projectId: "fjordr-auth",
  storageBucket: "fjordr-auth.appspot.com",
  messagingSenderId: "813540345580",
  appId: "1:813540345580:web:0210dfbc39c007a71d87c9",
  measurementId: "G-JHTW62P2EN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to dynamically create the modals
document.addEventListener("DOMContentLoaded", () => {
  // Create Account Modal
  const registerModal = document.createElement("div");
  registerModal.id = "register-modal";
  registerModal.className = "modal-medieval";
  registerModal.style.display = "none";
  registerModal.innerHTML = `
    <h2>Create an Account</h2>
    <input type="email" id="register-email" placeholder="Enter your email">
    <input type="password" id="register-password" placeholder="Enter your password">
    <button onclick="createAccount()">Create Account</button>
    <button onclick="closeModal('register-modal')">Cancel</button>
  `;
  document.body.appendChild(registerModal);

  // Login Modal
  const loginModal = document.createElement("div");
  loginModal.id = "login-modal";
  loginModal.className = "modal-medieval";
  loginModal.style.display = "none";
  loginModal.innerHTML = `
    <h2>Login</h2>
    <input type="email" id="login-email" placeholder="Enter your email">
    <input type="password" id="login-password" placeholder="Enter your password">
    <button onclick="loginAccount()">Login</button>
    <button onclick="openModal('reset-modal')">Forgot Password?</button>
    <button onclick="closeModal('login-modal')">Cancel</button>
  `;
  document.body.appendChild(loginModal);

  // Reset Password Modal
  const resetModal = document.createElement("div");
  resetModal.id = "reset-modal";
  resetModal.className = "modal-medieval";
  resetModal.style.display = "none";
  resetModal.innerHTML = `
    <h2>Reset Password</h2>
    <input type="email" id="reset-email" placeholder="Enter your email">
    <button onclick="resetPassword()">Send Reset Email</button>
    <button onclick="closeModal('reset-modal')">Cancel</button>
  `;
  document.body.appendChild(resetModal);
});

// Helper Functions to Open and Close Modals
function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// Firebase Authentication Functions
function createAccount() {
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Save user data to Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: email,
        createdAt: new Date().toISOString(),
      });

      alert("Account created successfully!");
      closeModal("register-modal");
    })
    .catch((error) => {
      alert(error.message);
    });
}

function loginAccount() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login successful!");
      closeModal("login-modal");
      document.getElementById("game-container").style.display = "block";
    })
    .catch((error) => {
      alert(error.message);
    });
}

function resetPassword() {
  const email = document.getElementById("reset-email").value;

  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Password reset email sent!");
      closeModal("reset-modal");
    })
    .catch((error) => {
      alert(error.message);
    });
}

// Automatically show the login modal on page load
window.onload = () => {
  openModal("login-modal");
};
