const registerForm = document.getElementById('register-form');
const errorMessage = document.getElementById('error-message');

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    errorMessage.textContent = 'Passwords do not match';
  } else {
    const userData = { username, email, password };

    fetch('register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => response.text())
    .then((message) => {
      if (message === 'success') {
        // Registration successful, redirect to login page
        window.location.href = 'login.html';
      } else {
        errorMessage.textContent = message;
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
});