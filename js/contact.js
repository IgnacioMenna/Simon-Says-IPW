// Get form element
const form = document.getElementById('contact-form');

// Show error message for a specific field
function showError(id) {
  document.getElementById('error-' + id).style.display = 'block';
}

// Hide error message for a specific field
function hideError(id) {
  document.getElementById('error-' + id).style.display = 'none';
}

// All Validation Logic
function validateName(name) {
  return /^[a-zA-Z0-9\s]{3,}$/.test(name.trim());
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validateMessage(msg) {
  return msg.trim().length > 5;
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = form.name.value;
  const email = form.email.value;
  const message = form.message.value;

  let valid = true;
  if (!validateName(name)) {
    showError('name');
    valid = false;
  } else {
    hideError('name');
  }

  if (!validateEmail(email)) {
    showError('email');
    valid = false;
  } else {
    hideError('email');
  }

  if (!validateMessage(message)) {
    showError('message');
    valid = false;
  } else {
    hideError('message');
  }

  // Open default mail client with pre-filled data
  if (valid) {
    const subject = encodeURIComponent("Contact from Simon Says");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

});