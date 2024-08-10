const sendTokenBtn = document.getElementById("sendTokenBtn");
const verifyTokenBtn = document.getElementById("verifyTokenBtn");
const resetPasswordBtn = document.getElementById("resetPasswordBtn");
const forgotPasswordForm = document.getElementById("forgotPasswordForm");
const verifyTokenForm = document.getElementById("verifyTokenForm");
const resetPasswordForm = document.getElementById("resetPasswordForm");
const emailInput = document.getElementById("email");
const tokenInput = document.getElementById("token");
const newPasswordInput = document.getElementById("newPassword");
const nameInput=document.getElementById("name");

let generatedToken = "";
let currentEmail = ""; 

sendTokenBtn.onclick = function () {
    const email = emailInput.value;
    const storedUser = localStorage.getItem(email);
    const userObject = JSON.parse(storedUser);

    if (storedUser) {
        if(nameInput.value===userObject.name){
        generatedToken = Math.floor(100000 + Math.random() * 900000).toString();
        currentEmail = email;

        console.log("OTP sent to email: " + generatedToken);
        alert("An OTP has been sent to your email. (Check console for the OTP)");

        forgotPasswordForm.style.display = "none";
        verifyTokenForm.style.display = "block";
        }
        else{
            alert("Name does not match with email");
        }
        
    } else {
        alert("Email not found. Please check your email.");
    }
};

verifyTokenBtn.onclick = function () {
    const enteredToken = tokenInput.value;

    if (enteredToken === generatedToken) {
        alert("OTP verified. Please enter your new password.");
        verifyTokenForm.style.display = "none";
        resetPasswordForm.style.display = "block";
    } else {
        alert("Invalid OTP. Please try again.");
        window.location.assign("ForgotPassword.html");
    }
};

resetPasswordBtn.onclick = function () {
    const newPassword = newPasswordInput.value;
    const storedUser = localStorage.getItem(currentEmail);

    if (storedUser) {
        const userObject = JSON.parse(storedUser);
        userObject.password = newPassword;

        localStorage.setItem(currentEmail, JSON.stringify(userObject));

        alert("Password reset successfully. You can now log in with your new password.");
        window.location.assign("sign_in.html");
    } else {
        alert("Something went wrong. Please try again.");
    }
};