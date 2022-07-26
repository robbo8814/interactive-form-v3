const userNameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const ccNumberInput = document.getElementById("cc-num");
const zipCode = document.getElementById("zip");
const cvv = document.getElementById("cvv");


// Validators

// Can only contain letters a-z in lowercase
function isValidUsername(username) {
    return /^[a-z|A-Z]+$/.test(username);
}

// Must be a valid email address
function isValidEmail(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
  }
  
// The credit card number must be between 13-16 digits
function isValidCCNum(ccnum) {
    return /^\d{13,16}$/.test(ccnum);
}

// The zip code must be 5 digits
function isValidZipCode(zipCode) {
    return /^\d{5}$/.test(zipCode);
}

// The cvv must be 3 digits
function isValidCvv(cvv) {
    return /^\d{3}$/.test(cvv);
}


// Error Display

function showOrHideTip(show, element) {
    // show element when show is true, hide when false
    if (show) {
      element.style.display = "inherit";
    } else {
      element.style.display = "none";
    }
}
  
function createListener(validator) {
    return e => {
      const text = e.target.value;
      const valid = validator(text);
      const showTip = text !== "" && !valid;
      const tooltip = e.target.nextElementSibling;
      showOrHideTip(showTip, tooltip);
    };
}

userNameInput.addEventListener("input", createListener(isValidUsername));
emailInput.addEventListener("input", createListener(isValidEmail));
ccNumberInput.addEventListener("input", createListener(isValidCCNum));
zipCode.addEventListener("input", createListener(isValidZipCode));
cvv.addEventListener("input", createListener(isValidCvv));