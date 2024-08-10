let signupSubmit = document.getElementById("signupSubmit");

signupSubmit.onclick = function () {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  

  let user = {
    email: email,
    password: password,
    name: name
  };

  if(email== "" || password == "" || name == ""){
    alert("All fields are required");
  }
  else{
  localStorage.setItem(email, JSON.stringify(user));
  alert("Credentials Saved Successfully");
  }
  
};

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

togglePassword.addEventListener("click", function (e) {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);

  this.classList.toggle("fa-eye-slash");
  this.classList.toggle("fa-eye");
});
