'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const formMessage = document.querySelector("[data-form-message]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// handle form submission
form.addEventListener("submit", function(e) {
  e.preventDefault();
  
  // Show loading state
  const originalText = formBtn.querySelector("span").textContent;
  formBtn.querySelector("span").textContent = "Sending...";
  formBtn.setAttribute("disabled", "");
  
  // Hide any previous messages
  formMessage.style.display = "none";
  formMessage.className = "form-message";
  
  // Get form data
  const formData = new FormData(form);
  
  // Submit to Google Apps Script with FormEasy
  fetch(form.action, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    // FormEasy typically returns a redirect response
    if (response.redirected || response.status === 200 || response.status === 302) {
      // Success
      formMessage.className = "form-message success";
      formMessage.querySelector(".form-message-text").textContent = "Thank you! Your message has been sent successfully.";
      formMessage.style.display = "block";
      form.reset();
    } else {
      throw new Error('Form submission failed');
    }
  })
  .catch(error => {
    // Error
    formMessage.className = "form-message error";
    formMessage.querySelector(".form-message-text").textContent = "Sorry, there was an error sending your message. Please try again.";
    formMessage.style.display = "block";
    console.error('Form submission error:', error);
  })
  .finally(() => {
    // Reset button state
    formBtn.querySelector("span").textContent = originalText;
    formBtn.removeAttribute("disabled");
  });
});



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}