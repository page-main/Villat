// Navbar scroll effect
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Add active class to nav items when scrolling
  const sections = document.querySelectorAll('section, div[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });
});

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitSpinner = document.getElementById('submitSpinner');
    const formStatus = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            submitBtn.disabled = true;
            submitText.textContent = 'Sending...';
            submitSpinner.style.display = 'inline-block';
            
            // Create FormData object
            const formData = new FormData(form);
            
            // Send to Formspree
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Success
                    formStatus.innerHTML = '<div class="alert alert-success">Thank you! Your message has been sent successfully.</div>';
                    formStatus.style.display = 'block';
                    form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                // Error
                formStatus.innerHTML = '<div class="alert alert-danger">Sorry, there was an error sending your message. Please try again.</div>';
                formStatus.style.display = 'block';
            })
            .finally(() => {
                // Reset button state
                submitBtn.disabled = false;
                submitText.textContent = 'Send Message';
                submitSpinner.style.display = 'none';
            });
        });
    }
});