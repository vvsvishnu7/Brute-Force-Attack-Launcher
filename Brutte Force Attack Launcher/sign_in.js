const signinSubmit = document.getElementById("signinSubmit");
const attackbtn = document.getElementById("attackbtn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

signinSubmit.onclick = function () {
  const email = emailInput.value;
  const password = passwordInput.value;

  console.log(email + " " + password);

  if (email === "" || password === "") {
    alert("Both fields are required");
    return;
  }
  

  const storedUser = localStorage.getItem(email);
  
  if (storedUser) {
    const userObject = JSON.parse(storedUser);

    if (userObject.password === password) {
      alert("Login Success!");
      setTimeout(() => {
        window.location.assign("welcome.html");
      }, 500);
    } else {
      alert("Wrong email or password");
    }
  } else {
    alert("User not Found! Please Sign Up");
  }

};



function attemptPasswords(passwords) {
  if (passwords.length === 0) {
    alert("Password not found");
    return;
  }

  const currentPassword = passwords.shift();
  passwordInput.value = currentPassword; 

  setTimeout(() => {
    const alerts = [];
    window.alert = function(message) {
      alerts.push(message);
    };
    signinSubmit.click();
    if (alerts.includes("Login Success!")) {
      return;
    }

    attemptPasswords(passwords);
  }, 100);
}



attackbtn.onclick = function () {
  let password2 = passwordInput.value;
  let email2 = emailInput.value;
  const http = new XMLHttpRequest();
  http.open("get", "dictionary.json", true);
  http.send();
  http.onload = function () {

    if (this.readyState === 4 && this.status === 200) {
      if(email2===""){
        alert("Email required");
      }
      else{
        const passwords = JSON.parse(this.responseText);
        const storedUser = localStorage.getItem(email2);
        attemptPasswords(passwords);
      }
      
    }
  };
};

const togglePassword = document.querySelector("#togglePassword");
togglePassword.addEventListener("click", function (e) {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  this.classList.toggle("fa-eye-slash");
  this.classList.toggle("fa-eye");
});
