/////////////////////////////////////
//////// All Global Variables ///////
/////////////////////////////////////

const userNameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const ccNumberInput = document.getElementById("cc-num");
const zipCode = document.getElementById("zip");
const cvv = document.getElementById("cvv");
const jobRole = document.getElementById("title");
const otherJobRole = document.getElementById('other-job-role');
const colorItems = document.getElementById('color');
const shirtColorParent = colorItems.parentNode;
const shirtDesign = document.getElementById('design');
const actRegister = document.getElementById('activities');
const totalCost = document.getElementById('activities-cost');
let sumCost = 0;
let totalAct = 0;
const actChecks = document.getElementById('activities-box')
const checkBoxNum = actChecks.querySelectorAll("input[type=checkbox]")
const mainConf = document.querySelector('[name="all"]');
const javaLib = document.querySelector('[name="js-libs"]');
const nodeWork = document.querySelector('[name="node"]');
const javaFrame = document.querySelector('[name="js-frameworks"]');
const buildTool = document.querySelector('[name="build-tools"]');
const npmWork = document.querySelector('[name="npm"]');
const expWork = document.querySelector('[name="express"]');
const paymentMethod = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const payPal = document.getElementById('paypal');
const bitCoin = document.getElementById('bitcoin');
const register = document.querySelector('[type="submit"]');

// Focus on name input on load
window. onload = function() { userNameInput. focus(); };


/////////////////////////////////////
//////////// Validators /////////////
/////////////////////////////////////

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
// Function to show or hide dom elements
function showOrHide(show, element) {
    if (show) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
}

// Function to add or remove error tips
function createListener(validator) {
    return e => {
      const text = e.target.value;
      const valid = validator(text);
      const showTip = text !== "" && !valid;
      const tooltip = e.target.nextElementSibling;
      showOrHide(showTip, tooltip);
      // Add | Remove class for valid/not-valid
      if (showTip) {
      e.target.parentElement.classList.add('not-valid');
      e.target.parentElement.classList.remove('valid');
      } else if (!showTip) {
        e.target.parentElement.classList.add('valid');
        e.target.parentElement.classList.remove('not-valid');
      }
    };
}

// Event Listeners For Validators
userNameInput.addEventListener("input", createListener(isValidUsername));
emailInput.addEventListener("input", createListener(isValidEmail));
ccNumberInput.addEventListener("input", createListener(isValidCCNum));
zipCode.addEventListener("input", createListener(isValidZipCode));
cvv.addEventListener("input", createListener(isValidCvv));

/////////////////////////////////////
///////// Job Role Selector /////////
/////////////////////////////////////

showOrHide(false, otherJobRole);

jobRole.addEventListener('change', () => {
  let selection = jobRole.selectedIndex;
  showOrHide(selection == jobRole.length-1, otherJobRole); // assumes 'Other' is always last in the list
  });

/////////////////////////////////////
///////// T-Shirt  Selector /////////
/////////////////////////////////////

showOrHide(false, shirtColorParent);

shirtDesign.addEventListener('change', () => {
  colorItems.selectedIndex = 0;
  const jsPuns = colorItems[1].dataset.theme
  const i3JS = colorItems[4].dataset.theme

  if (shirtDesign.value === jsPuns) {
    for (let i=0; i<colorItems.length; i++) {
      showOrHide(true, shirtColorParent);
      let currentColor = colorItems.options[i];
      if (currentColor.dataset.theme === jsPuns) {
        currentColor.hidden = false;
      } else {
        currentColor.hidden = true;
      }
    }
  } else if (shirtDesign.value === i3JS) {
    for (let i=0; i<colorItems.length; i++) {
      showOrHide(true, shirtColorParent);
      let currentColor = colorItems.options[i];
      if (currentColor.dataset.theme === i3JS) {
        currentColor.hidden = false;
      } else {
        currentColor.hidden = true;
      }
    }
  }
});


/////////////////////////////////////
///////// Activity Register /////////
/////////////////////////////////////

// Preventing activities being chosen if they are at the same time as another
function timeAllocated(active) {
  for (let i=0; i<checkBoxNum.length; i++) {
    if (checkBoxNum[i].dataset.dayAndTime === active.dataset.dayAndTime && checkBoxNum[i] !== active && active.checked) {
      checkBoxNum[i].disabled = true;
    } else if (checkBoxNum[i].dataset.dayAndTime === active.dataset.dayAndTime && !active.checked) {
      checkBoxNum[i].disabled = false;
    }
  }
};

// Showing error message if no activities selected
function validateAct () {
  if (totalAct !== 0) {
    actRegister.firstElementChild.className = 'valid';
    showOrHide(false, actRegister.lastElementChild);
  } else {
    actRegister.firstElementChild.className = 'not-valid';
    showOrHide(true, actRegister.lastElementChild);
  }
}

// Total cost calculator
function actCalc(active) {
let actCost = parseInt(active.getAttribute('data-cost'));
if (active.checked) {
  sumCost += actCost;
  totalAct += 1;
} else {
  sumCost -= actCost;
  totalAct -= 1;
}
totalCost.innerHTML = `Total: $${sumCost}`
}

// Activity register rvent listener for checkbox selection & total cost calculator
actRegister.addEventListener('change', (e) => {
  let activity = e.target;
  timeAllocated(activity);
  actCalc(activity);
  validateAct();
});


// Accessibility addition for checkbox focus
for (let i=0; i<checkBoxNum; i++) {
  checkBoxNum[i].addEventListener("focus", (e) => {
    e.target.parentElement.classList.add("focus");
  });
  checkBoxNum[i].addEventListener("blur", (e) => {
    e.target.parentElement.classList.remove("focus");
  });
}


// Payment Type Selector
function paymentToDisplay(display, hide1, hide2) {
  showOrHide(true, display);
  showOrHide(false, hide1);
  showOrHide(false, hide2);
}
paymentMethod.selectedIndex = 1;
paymentToDisplay(creditCard, bitCoin, payPal);

paymentMethod.addEventListener('change', () => {
  let selection = paymentMethod.selectedIndex;
  if (selection == '2') {
    paymentToDisplay(payPal, creditCard, bitCoin);
  } else if (selection == '3') {
    paymentToDisplay(bitCoin, creditCard, payPal);
  } else {
    paymentToDisplay(creditCard, payPal, bitCoin);
  }
});


// Prevent form submission if required fields not valid

register.addEventListener("submit", (e) => {
  if (!isValidUsername()) {
    e.preventDefault()
  }
  if (!isValidEmail()) {
    e.preventDefault()
  }
  if (paymentMethod.selectedIndex === 1) {
    if (!isValidCCNum()) {
      e.preventDefault()
   }
   if (!isValidZipCode()) {
    e.preventDefault()
  }
  if (!isValidCvv()) {
    e.preventDefault()
  }
  }
});
