const form = document.getElementById("signupForm");
const genderInputs = document.querySelectorAll('input[name="gender"]');
const genderError = document.getElementById("genderError");
const result = document.getElementById("result");
const fnameInput = document.getElementById("fname");
const fnameError = document.getElementById("fnameError");
const lnameInput = document.getElementById("lname");
const lnameError = document.getElementById("lnameError");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");
const phoneInput = document.getElementById("phone");
const phoneError = document.getElementById("phoneError");
const placeInput = document.getElementById("place");
const placeError = document.getElementById("placeError");
const countryInput = document.getElementById("country");
const countryError = document.getElementById("countryError");
const zipCodeInput = document.getElementById("zipCode");
const zipCodeError = document.getElementById("zipCodeError");
const skillInputs = document.querySelectorAll('input[name="skill_tier"]');
const skillError = document.getElementById("skill_tierError");
const pdpaInputs = document.querySelectorAll('input[name="pdpa_check"]');
const pdpaError = document.getElementById("pdpaError");
const popUp = document.getElementById("successpopUp");
const closepopUpBtn = document.getElementById("closepopUpBtn");

function validateGender() {
  const isChecked = Array.from(genderInputs).some((radio) => radio.checked);

  if (!isChecked) {
    showError(genderError, "กรุณาเลือกเพศ");
    if (genderInputs.length > 0) {
      genderInputs[0].focus();
    }
    return false;
  }
  clearError(genderError);
  return true;
}

function validateName() {
  let value = fnameInput.value.trim();
  const letters = /^[a-zA-Zก-ฮะ-์่-ํ์]+$/;
  if (!letters.test(value)) {
    showError(fnameError, "ชื่อต้องเป็นตัวอักษรเท่านั้น");
    fnameInput.style.borderColor = "red";
    return false;
  }
  clearError(fnameError);
  fnameInput.style.borderColor = "";
  return true;
}

function validateLName() {
  let value = lnameInput.value.trim();
  const letters = /^[a-zA-Zก-ฮะ-์่-ํ์]+$/;
  if (!letters.test(value)) {
    showError(lnameError, "นามสกุลต้องเป็นตัวอักษรเท่านั้น");
    lnameInput.style.borderColor = "red";
    return false;
  }
  clearError(lnameError);
  lnameInput.style.borderColor = "";
  return true;
}

function validateEmail() {
  let value = emailInput.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    showError(emailError, "กรุณาใส่ email ให้ถูกต้อง");
    emailInput.style.borderColor = "red";
    return false;
  }
  clearError(emailError);
  emailInput.style.borderColor = "";
  return true;
}

function validatePhone() {
  let value = phoneInput.value.trim();
  const letters = /^\d{10}$/;
  if (!letters.test(value)) {
    showError(phoneError, "เบอร์โทรศัพท์ต้องเป็นตัวเลขและมี 10 ตัวเท่านั้น");
    phoneInput.style.borderColor = "red";
    return false;
  }
  clearError(phoneError);
  phoneInput.style.borderColor = "";
  return true;
}

function validatePlace() {
  let value = placeInput.value.trim();
  const letters = /^[a-zA-Zก-๙0-9\s]+$/;

  if (!letters.test(value)) {
    showError(placeError, "กรุณาใส่ที่อยู่");
    placeInput.style.borderColor = "red";
    return false;
  }
  clearError(placeError);
  placeInput.style.borderColor = "";
  return true;
}

function validateCountry() {
  let value = countryInput.value.trim();
  const letters = /^[a-zA-Zก-๙]+$/;
  if (!letters.test(value)) {
    showError(countryError, "ชื่อประเทศต้องเป็นตัวอักษรเท่านั้น");
    countryInput.style.borderColor = "red";
    return false;
  }
  clearError(countryError);
  countryInput.style.borderColor = "";
  return true;
}

function validatezipCode() {
  let value = zipCodeInput.value.trim();
  const letters = /^\d{5}$/;
  if (!letters.test(value)) {
    showError(zipCodeError, "รหัสไปรษณีย์ต้องเป็นตัวเลขและมี 5 ตัวเท่านั้น");
    zipCodeInput.style.borderColor = "red";
    return false;
  }
  clearError(zipCodeError);
  zipCodeInput.style.borderColor = "";
  return true;
}

function validateSkill() {
  const isChecked = Array.from(skillInputs).some((radio) => radio.checked);

  if (!isChecked) {
    showError(skillError, "กรุณาเลือกระดับสมรรถนะ AI ของตนเอง");
    if (skillInputs.length > 0) {
      skillInputs[0].focus();
    }
    return false;
  }
  clearError(skillError);
  return true;
}

function validatePdpa() {
  const isChecked = Array.from(pdpaInputs).some((checkbox) => checkbox.checked);

  if (!isChecked) {
    showError(pdpaError, "กรุณากดยินยอมให้ความยอม");
    return false;
  }
  clearError(pdpaError);
  return true;
}

/////////////////////////////////////////////////////////////////////////////////////////////
function validateForm() {
  let okGender = validateGender();
  let okName = validateName();
  let okLName = validateLName();
  let okEmail = validateEmail();
  let okPhone = validatePhone();
  let okPlace = validatePlace();
  let okCountry = validateCountry();
  let okzipCode = validatezipCode();
  let okskill = validateSkill();
  let okpdpa = validatePdpa();

  if (!okGender) {
    genderInputs[0].focus();
  } else if (!okName) {
    fnameInput.focus();
  } else if (!okLName) {
    lnameInput.focus();
  } else if (!okEmail) {
    emailInput.focus();
  } else if (!okPhone) {
    phoneInput.focus();
  } else if (!okPlace) {
    placeInput.focus();
  } else if (!okCountry) {
    countryInput.focus();
  } else if (!okzipCode) {
    zipCodeInput.focus();
  } else if (!okskill) {
    skillInputs[0].focus();
  } else if (!okpdpa) {
    pdpaInputs[0].focus();
  }

  return (
    okGender &&
    okName &&
    okLName &&
    okEmail &&
    okPhone &&
    okPlace &&
    okCountry &&
    okzipCode &&
    okskill &&
    okpdpa
  );
}

genderInputs.forEach((radio) => {
  radio.addEventListener("change", validateGender);
});

fnameInput.addEventListener("input", validateName);
lnameInput.addEventListener("input", validateLName);
emailInput.addEventListener("input", validateEmail);
phoneInput.addEventListener("input", validatePhone);
placeInput.addEventListener("input", validatePlace);
countryInput.addEventListener("input", validateCountry);
zipCodeInput.addEventListener("input", validatezipCode);
skillInputs.forEach((radio) => {
  radio.addEventListener("change", validateSkill);
});
pdpaInputs.forEach((checkbox) => {
  checkbox.addEventListener("change", validateSkill);
});

closepopUpBtn.addEventListener("click", function () {
  popUp.classList.remove("show");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("click", function (event) {
  if (event.target === popUp) {
    popUp.classList.remove("show");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
});

function showError(el, message) {
  el.textContent = message;
}

function clearError(el) {
  el.textContent = "";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Clear Result
  result.innerHTML = "";

  // Validate Form
  if (validateForm()) {
    popUp.classList.add("show");

    form.reset();
    genderError.textContent = "";
    fnameInput.textContent = "";
    lnameInput.textContent = "";
    emailInput.textContent = "";
    phoneInput.textContent = "";
    placeInput.textContent = "";
    countryInput.textContent = "";
    zipCodeInput.textContent = "";

    genderError.style.borderColor = "";
  }
});
