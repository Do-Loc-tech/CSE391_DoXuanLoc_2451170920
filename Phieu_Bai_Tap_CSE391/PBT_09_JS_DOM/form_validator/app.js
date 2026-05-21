const nameInput =
    document.querySelector("#name");

const emailInput =
    document.querySelector("#email");

const passwordInput =
    document.querySelector("#password");

const confirmInput =
    document.querySelector("#confirmPassword");

const phoneInput =
    document.querySelector("#phone");

const submitBtn =
    document.querySelector("#submitBtn");

const strengthBar =
    document.querySelector("#strengthBar");

// ===== VALIDATE NAME =====

nameInput.addEventListener("input", () => {

    const valid =
        nameInput.value.length >= 2 &&
        nameInput.value.length <= 50;

    document.querySelector("#nameError")
    .textContent =
        valid ? "✅ Valid" : "❌ 2-50 ký tự";
});

// ===== EMAIL =====

emailInput.addEventListener("input", () => {

    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const valid =
        regex.test(emailInput.value);

    document.querySelector("#emailError")
    .textContent =
        valid ? "" : "Email không hợp lệ";

    checkForm();
});

// ===== PASSWORD =====

passwordInput.addEventListener("input", () => {

    const password =
        passwordInput.value;

    let strength = 0;

    if (password.length >= 8) strength++;

    if (/[a-z]/.test(password) &&
        /[0-9]/.test(password)) {
        strength++;
    }

    if (
        /[A-Z]/.test(password) &&
        /[^A-Za-z0-9]/.test(password)
    ) {
        strength++;
    }

    if (strength === 1) {
        strengthBar.style.width = "33%";
        strengthBar.style.background = "red";
    }

    if (strength === 2) {
        strengthBar.style.width = "66%";
        strengthBar.style.background = "orange";
    }

    if (strength === 3) {
        strengthBar.style.width = "100%";
        strengthBar.style.background = "green";
    }

    checkForm();
});

// ===== CONFIRM =====

confirmInput.addEventListener("input", () => {

    const valid =
        confirmInput.value ===
        passwordInput.value;

    document.querySelector("#confirmError")
    .textContent =
        valid ? "" : "Password không khớp";

    checkForm();
});

// ===== PHONE =====

phoneInput.addEventListener("input", () => {

    let value =
        phoneInput.value.replace(/\D/g, "");

    value = value.slice(0, 10);

    if (value.length > 4) {
        value =
            value.slice(0, 4) +
            "-" +
            value.slice(4);
    }

    if (value.length > 8) {
        value =
            value.slice(0, 8) +
            "-" +
            value.slice(8);
    }

    phoneInput.value = value;

    checkForm();
});

// ===== CHECK FORM =====

function checkForm() {

    const valid =
        nameInput.value.length >= 2 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(emailInput.value) &&
        passwordInput.value.length >= 8 &&
        confirmInput.value ===
        passwordInput.value &&
        phoneInput.value.length === 12;

    submitBtn.disabled = !valid;
}

// ===== SUBMIT =====

document.querySelector("#registerForm")
.addEventListener("submit", (e) => {

    e.preventDefault();

    const modal =
        document.querySelector("#successModal");

    modal.classList.remove("hidden");

    document.querySelector("#userInfo")
    .textContent =
        `
        Tên: ${nameInput.value}
        Email: ${emailInput.value}
        Phone: ${phoneInput.value}
        `;
});

// ===== CLOSE =====

document.querySelector("#closeModal")
.addEventListener("click", () => {

    document.querySelector("#successModal")
    .classList.add("hidden");
});