// Function to open MoonPay in a new tab
function openMoonPay() {
  // Replace 'https://www.moonpay.com' with your actual MoonPay URL
  window.open("https://www.moonpay.com", "_blank");

  // Enable the "I have made this donation" button
  document.getElementById("confirmDonationBtn").disabled = false;
}

// Function to submit the form (assuming you have a form with id="myForm")
document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Check if "Continue/Make Payment" button was clicked before enabling the form submission
  if (document.getElementById("confirmDonationBtn").disabled) {
    alert('Please click "Continue/Make Payment" first.');
    return;
  }

  // Proceed with form submission or other actions
  sendForm(event);
});
// scripts.js

function copyBitcoinAddress() {
  // Select the Bitcoin address text field
  const bitcoinAddress = document.getElementById("bitcoinAddress");

  // Select its text
  bitcoinAddress.select();
  bitcoinAddress.setSelectionRange(0, 99999); /* For mobile devices */

  // Copy the text inside the text field
  document.execCommand("copy");

  // Deselect the Bitcoin address text field
  bitcoinAddress.setSelectionRange(0, 0);
}

document.querySelectorAll(".amount-box").forEach((box) => {
  box.addEventListener("click", function () {
    document
      .querySelectorAll(".amount-box")
      .forEach((b) => b.classList.remove("selected"));
    this.classList.add("selected");
    document.getElementById("amount").value = this.getAttribute("data-amount");
  });
});

(function () {
  // https://dashboard.emailjs.com/admin/account
  emailjs.init("OrMvvN5aoYDYfaHuu");

  // Function to handle form submission
  function sendForm(event) {
    event.preventDefault();

    // Get the form element
    const form = document.getElementById("myForm");

    // Create an object to get values from form fields
    const templateParams = {
      from_name: document.querySelector("#name").value,
      from_email: document.querySelector("#email").value,
      amount: amount.value,
      message: document.querySelector("#paymentProof").value,
    };

    // Send the email using the EmailJS service
    emailjs
      .send("service_wlm11to", "template_jpcdi3a", templateParams)
      .then(function (response) {
        // Check if any of the form fields are empty
        if (
          templateParams.from_name === "" ||
          templateParams.from_email === "" ||
          templateParams.amount === "" ||
          templateParams.message === ""
        ) {
          // Error pop-up message
          emptyError();
          console.log("FAILED...");
          return;
        } else {
          // Success pop-up message
          success();
          console.log("SUCCESS!", response.status, response.text);
          // Reset the form after successful submission
          setTimeout(() => {
            form.reset();
          }, 5);
        }
      })
      .catch(function (error) {
        console.log("FAILED...", error);
      });
  }

  // Attach event listener to the form
  document.getElementById("myForm").addEventListener("submit", sendForm);
})();

// Sweet Alert Integration
// Failed message for empty fields
function emptyError() {
  Swal.fire({
    title: "Sorry boo...",
    text: "Fields cannot be empty",
    icon: "error",
  });
}

// Success message after email submission
function success() {
  Swal.fire({
    title: "Donation Details Submitted",
    text: "Thank you for your generosity! A confirmation email has been sent to you. Please check your inbox for further instructions.",
    icon: "success",
  });
}
