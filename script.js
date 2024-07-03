  // <!-- JavaScript -->
document.addEventListener('DOMContentLoaded', function() {
  const contactBtn = document.getElementById('contactBtn');
  const contactModal = document.getElementById('contactModal');
  const closeBtn = document.querySelector('.close');
  const contactForm = document.getElementById('contactForm');
  
  // Show modal on button click
  contactBtn.addEventListener('click', function() {
    contactModal.style.display = 'block'; // method
  });

  // Close modal on close button click
  closeBtn.addEventListener('click', function() {
    contactModal.style.display = 'none';
    resetForm();
  });

  // Close modal if user clicks outside of it
  window.addEventListener('click', function(event) {
    if (event.target == contactModal) {
      contactModal.style.display = 'none';
      resetForm();
    }
  });

  // Form submission
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (validateForm()) {
      saveContactData();
      alert('Contact information submitted successfully!');
      contactModal.style.display = 'none';
      resetForm();
    }
  });

  function validateForm() {
    const name = document.getElementById('name').value.trim(); // trim uesing for white sapce vara iruka
    const address = document.getElementById('address').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    let isValid = true;

    // Reset errors
    resetErrors();

    // Validate name (required)
    if (name === '') {
      isValid = false;
      displayError('nameError', 'Name is required');
    }

    // Validate address (required)
    if (address === '') {
      isValid = false;
      displayError('addressError', 'Address is required');
    }

    // Validate phone number (+94 followed by 9 digits)
    const phoneRegex = /^\+94\d{9}$/;
    if (!phoneRegex.test(phone)) {
      isValid = false;
      displayError('phoneError', 'Phone number must start with +94 and have 9 digits');
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      isValid = false;
      displayError('emailError', 'Invalid email address');
    }

    // Validate message length (at least 10 characters)
    if (message.length < 10) {
      isValid = false;
      displayError('messageError', 'Message must be at least 10 characters long');
    }

    return isValid;
  }

  function displayError(id, errorMessage) {
    const errorElement = document.getElementById(id);
    errorElement.innerText = errorMessage;
  }

  function resetErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => {
      element.innerText = '';
    });
  }
  function saveContactData() {
    const contactData = {
      name: document.getElementById('name').value.trim(),
      address: document.getElementById('address').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      email: document.getElementById('email').value.trim(),
      message: document.getElementById('message').value.trim()
    };

    // Save data to localStorage (you can adjust as needed)
    localStorage.setItem('contactData', JSON.stringify(contactData));
  }

  function resetForm() {
    contactForm.reset();
    resetErrors();
  }

});