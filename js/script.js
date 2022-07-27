const userNameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const ccNumberInput = document.getElementById("cc-num");
const zipCode = document.getElementById("zip");
const cvv = document.getElementById("cvv");

// Focus on name input on load
window. onload = function() { userNameInput. focus(); };

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

function showOrHide(show, element) {
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
      showOrHide(showTip, tooltip);
    };
}


// Event Listeners For Validators

userNameInput.addEventListener("input", createListener(isValidUsername));
emailInput.addEventListener("input", createListener(isValidEmail));
ccNumberInput.addEventListener("input", createListener(isValidCCNum));
zipCode.addEventListener("input", createListener(isValidZipCode));
cvv.addEventListener("input", createListener(isValidCvv));


// Job Role Selector & Functionality

const jobRole = document.getElementById("title");
const otherJobRole = document.getElementById('other-job-role');
showOrHide(false, otherJobRole);

jobRole.addEventListener('change', () => {
  let selection = jobRole.selectedIndex;
  showOrHide(selection == '6', otherJobRole);
  });


// T-Shirt Info Selector & Functionality
const shirtColor = document.getElementById('shirt-colors');
showOrHide(false, shirtColor);
const shirtColorOpt1 = `<p><label for="color">Color:</label>
<select id="color">
  <option selected hidden>Select a design theme above</option>
  <option data-theme="js puns" value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>
  <option data-theme="js puns" value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option> 
  <option data-theme="js puns" value="gold">Gold (JS Puns shirt only)</option>
  </select>`
const shirtColorOpt2 = `<p><label for="color">Color:</label>
<select id="color">
<option selected hidden>Select a design theme above</option>
<option data-theme="heart js" value="tomato">Tomato (I &#9829; JS shirt only)</option>
<option data-theme="heart js" value="steelblue">Steel Blue (I &#9829; JS shirt only)</option> 
<option data-theme="heart js" value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>
</select>`

const shirtDesign = document.getElementById('design');
shirtDesign.addEventListener('change', () => {
  let selection = shirtDesign.selectedIndex;
    if (selection == '1') {
      showOrHide(true, shirtColor);
    shirtColor.innerHTML = shirtColorOpt1;
} else if (selection == '2') {
  showOrHide(true, shirtColor);
  shirtColor.innerHTML = shirtColorOpt2;
}
});