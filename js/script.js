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
const register = document.querySelector('form');

// Focus on name input on load
window.onload = function() { userNameInput. focus(); };


/////////////////////////////////////
//////////// Validators /////////////
/////////////////////////////////////

// Can only contain letters a-z in lowercase
function isValidUsername() {
    return /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(userNameInput.value);
};

// Must be a valid email address
function isValidEmail() {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value);
};
  
// The credit card number must be between 13-16 digits
function isValidCCNum() {
    return /^\d{13,16}$/.test(ccNumberInput.value);
};

// The zip code must be 5 digits
function isValidZipCode() {
    return /^\d{5}$/.test(zipCode.value);
};

// The cvv must be 3 digits
function isValidCvv() {
    return /^\d{3}$/.test(cvv.value);
};

// Error Display
// Functions to show or hide dom elements & create event listeners
// Creating a showOrHide function for Validators, Job Role & Activity Register
function showOrHide(show, element) {
  if (show) {
    element.style.display = "block";
  } else if (!show) {
    element.style.display = "none";
  };
};

// Seperated showOrHide & validatorForAll so that they could be used independently later in program
function validatorForAll(field, fieldValidator) {
    let element = field.nextElementSibling;
    if (!fieldValidator()) {
      showOrHide(true, element);
      element.parentElement.classList.add('not-valid');
      element.parentElement.classList.remove('valid');
    } else if (fieldValidator()) {
      showOrHide(false, element);
      element.parentElement.classList.add('valid');
      element.parentElement.classList.remove('not-valid');
    };
    // Adding alternate text for Email error if text is missing
    if (emailInput.value == '' && field == emailInput) {
      emailInput.nextElementSibling.textContent = 'Field cannot be blank';
    } if (emailInput.value !== '') {
          emailInput.nextElementSibling.textContent = 'Email address must be formatted correctly';
    }
};
// Creating listener for field inputs
function createListener(field, fieldValidator) {
  field.addEventListener("input", () => {
    validatorForAll(field, fieldValidator)
  })
}

// Calling all validators
createListener(userNameInput, isValidUsername);
createListener(emailInput, isValidEmail);
createListener(ccNumberInput, isValidCCNum);
createListener(zipCode, isValidZipCode);
createListener(cvv, isValidCvv);


/////////////////////////////////////
///////// Job Role Selector /////////
/////////////////////////////////////

// Setting Other Job Role field as hidden until selected
showOrHide(false, otherJobRole);

jobRole.addEventListener('change', () => {
  let selection = jobRole.selectedIndex;
  showOrHide(selection == jobRole.length-1, otherJobRole); // assumes 'Other' is always last in the list
  });

/////////////////////////////////////
///////// T-Shirt  Selector /////////
/////////////////////////////////////
colorItems.setAttribute('disabled', 'true');

shirtDesign.addEventListener('change', () => {
  colorItems.removeAttribute('disabled');
  colorItems[0].innerHTML = 'Select a Color';
  colorItems.selectedIndex = 0;
  const jsPuns = colorItems[1].dataset.theme;
  const i3JS = colorItems[4].dataset.theme;

  if (shirtDesign.value === jsPuns) {
    for (let i=0; i<colorItems.length; i++) {
      shirtColorParent.style.display = "block";
      let currentColor = colorItems.options[i];
      if (currentColor.dataset.theme === jsPuns) {
        currentColor.hidden = false;
      } else {
        currentColor.hidden = true;
      };
    };
  } else if (shirtDesign.value === i3JS) {
    for (let i=0; i<colorItems.length; i++) {
      shirtColorParent.style.display = "block";
      let currentColor = colorItems.options[i];
      if (currentColor.dataset.theme === i3JS) {
        currentColor.hidden = false;
      } else {
        currentColor.hidden = true;
      };
    };
  };
});


/////////////////////////////////////
///////// Activity Register /////////
/////////////////////////////////////

// Preventing activities being chosen if they are at the same time as another
function timeAllocated(active) {
  for (let i=0; i<checkBoxNum.length; i++) {
    if (checkBoxNum[i].dataset.dayAndTime === active.dataset.dayAndTime && checkBoxNum[i] !== active && active.checked) {
      checkBoxNum[i].disabled = true;
      checkBoxNum[i].parentElement.classList.add('disabled');
    } else if (checkBoxNum[i].dataset.dayAndTime === active.dataset.dayAndTime && !active.checked) {
      checkBoxNum[i].disabled = false;
      checkBoxNum[i].parentElement.classList.remove('disabled');
    };
  };
};

// Showing error message if no activities selected
function validateAct () {
  if (totalAct !== 0) {
    actRegister.firstElementChild.className = 'valid';
    showOrHide(false, actRegister.lastElementChild);
  } else {
    actRegister.firstElementChild.className = 'not-valid';
    showOrHide(true, actRegister.lastElementChild);
    return false;
  };
};

// Total cost calculator
function actCalc(active) {
let actCost = parseInt(active.getAttribute('data-cost'));
if (active.checked) {
  sumCost += actCost;
  totalAct += 1;
} else {
  sumCost -= actCost;
  totalAct -= 1;
};
totalCost.innerHTML = `Total: $${sumCost}`
};

// Activity register event listener for checkbox selection & total cost calculator
actRegister.addEventListener('change', (e) => {
  let activity = e.target;
  timeAllocated(activity);
  actCalc(activity);
  validateAct();
});


/////////////////////////////////////
/////////// Accessibility ///////////
/////////////////////////////////////

// Accessibility addition for checkbox focus
for (let i=0; i<checkBoxNum.length; i++) {
  checkBoxNum[i].addEventListener('focus', (e) => {
    e.target.parentElement.classList.add('focus');
  });
  checkBoxNum[i].addEventListener('blur', (e) => {
    e.target.parentElement.classList.remove('focus');
  });
};


/////////////////////////////////////
///////// Payment Selector //////////
/////////////////////////////////////

// Payment Type Selector
function paymentToDisplay(display, hide1, hide2) {
  display.style.display = "block";
  hide1.style.display = "none";
  hide2.style.display = "none";
};
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
  };
});


/////////////////////////////////////
//////////// Form Submit ////////////
/////////////////////////////////////

// Prevent form submission if required fields not valid
register.addEventListener("submit", (e) => {
  if (!isValidUsername() || !isValidEmail() || totalAct == 0) {
    validatorForAll(userNameInput, isValidUsername);
    validatorForAll(emailInput, isValidEmail);
    validateAct();
    e.preventDefault()
  };
  // Only check credit card validity if credit card field selected
  if (paymentMethod.selectedIndex === 1) {
    if (!isValidCCNum() || !isValidZipCode() || !isValidCvv()) {
      validatorForAll(ccNumberInput, isValidCCNum);
      validatorForAll(zipCode, isValidZipCode);
      validatorForAll(cvv, isValidCvv);
      e.preventDefault()
   };
  };
});