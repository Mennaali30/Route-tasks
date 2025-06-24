document.addEventListener("DOMContentLoaded", function(){

  let emailInput = document.getElementById("email");
  let passInput = document.getElementById("password");
  let nameInput = document.getElementById("name");
  let signUp = document.querySelector(".signUp");
  let nameMsg = document.querySelector(".nameMsg");
  let emailMsg = document.querySelector(".emailMsg");
  let passMsg = document.querySelector(".passMsg");
  let checkEmail = document.querySelector(".check");
  let checkLog = document.querySelector(".checkLog");
  let btnLogin = document.querySelector(".login-btn");
  let nameHome = document.querySelector(".nameBox");
  let goOut= document.getElementById("log-out")

  function addAccount() {
    let validName = validationInputs(nameInput, nameMsg);
    let validEmail = validationInputs(emailInput, emailMsg);
    let validPass = validationInputs(passInput, passMsg);

    if (validName && validEmail && validPass) {
      let emailValue = emailInput.value;
      let passValue = passInput.value;
      let nameValue = nameInput.value;

      let oldAccounts = JSON.parse(localStorage.getItem("accountsContainer")) || [];
      let newAccount = oldAccounts.find(acc => acc.email === emailValue);

      if (newAccount) {
        checkEmail.classList.remove("d-none");
        return;
      } else {
        checkEmail.classList.add("d-none");
      }

      let account = {
        name: nameValue,
        email: emailValue,
        password: passValue
      };

      oldAccounts.push(account);
      localStorage.setItem("accountsContainer", JSON.stringify(oldAccounts));
      clearForm();
      window.location.href = "../index.html";
    }
  }

  function login() {
    let validEmail = validationInputs(emailInput, emailMsg);
    let validPass = validationInputs(passInput, passMsg);

    if (validEmail && validPass) {
      let emailValue = emailInput.value;
      let passValue = passInput.value;

      let oldAccounts = JSON.parse(localStorage.getItem("accountsContainer")) || [];
      let newAccount = oldAccounts.find(acc => acc.email === emailValue && acc.password === passValue);

      if (!newAccount) {
        checkLog.classList.remove("d-none");
        return;
      } else {
        checkLog.classList.add("d-none");
        localStorage.setItem("currentUser", JSON.stringify(newAccount)); 
        clearForm();
        window.location.href = "./html/home.html";
      }
    }
  }

  function clearForm() {
    if (emailInput) emailInput.value = "";
    if (passInput) passInput.value = "";
    if (nameInput) nameInput.value = "";
  }

  function homePage() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.name && nameHome) {
      nameHome.innerHTML = `<h1>Welcome ${currentUser.name}</h1>`;
    }
  }
  function validationInputs(element, msg){
      if(!element) return false;

      let text = element.value;
      let regex = {
          name:/^[A-Z][a-z]{2,}(?: [A-Z][a-z]+)*$/,
          email:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          password:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      };

      if(regex[element.id] && regex[element.id].test(text)){
          element.classList.add("is-valid");
          element.classList.remove("is-invalid");
          msg?.classList.add("d-none");
          return true;
      } else {
          element.classList.add("is-invalid");
          element.classList.remove("is-valid");
          msg?.classList.remove("d-none");
          return false;
      }
  }
  if(nameInput) {
      nameInput.addEventListener("input", () => validationInputs(nameInput, nameMsg));
  }

  if(emailInput) {
      emailInput.addEventListener("input", () => validationInputs(emailInput, emailMsg));
  }

  if(passInput) {
      passInput.addEventListener("input", () => validationInputs(passInput, passMsg));
  }

  if(signUp) {
      signUp.addEventListener("click", addAccount);
  }

  if(btnLogin) {
      btnLogin.addEventListener("click", login);
  }
  if(goOut){
 goOut.addEventListener('click',function(){
        window.location.href="./register.html";
    })
  }
   
  homePage();

});

