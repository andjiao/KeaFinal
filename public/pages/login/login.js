function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;

    messageElement.classList.remove("form__message--success", "form__message--error");

  
    messageElement.classList.add(`form__message--${type}`);
}


function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
   
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}


function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });





    createAccountForm.addEventListener("submit", async(e) =>{
        e.preventDefault();
            const response = await fetch("http://localhost:8080/signup", {
                method: "POST",
                body: JSON.stringify({
                    firstName: document.getElementById("signupFirstName").value,
                    lastName: document.getElementById("signupLastName").value,
                    email: document.getElementById("signupEmail").value,
                    password: document.getElementById("signupPassword").value
                }),
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json",
                },
            }).then(res => res.json()) 
           
            if (response.succes !== true){
                setFormMessage(createAccountForm, "success", "Du er nu medlmem!");
                
            } else {
                setFormMessage(createAccountForm, "error", "Noget gik galt");
                
            }
    })

    loginForm.addEventListener("submit", async(e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8080/signup", {
                method: "POST",
                body: JSON.stringify({
                    email: document.getElementById("email").value,
                    password: document.getElementById("password").value
                }),
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json",
                },
            }).then(res => res.json())
            console.log("Login succes!") 

            if (response.succes !== true){
                setTimeout(function(){
                    window.location.replace("/home")
                },1500); 
                
            } else {
                window.location.replace("/signup") // set notification
                
            }
    });

 
const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
document.querySelectorAll(".form__input").forEach(inputElement => {
        
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupEmail" && e.target.value.length === 0) {
                setInputError(inputElement, "Emailfeltet skal udfyldes");

            } else if (e.target.id === "signupEmail" && !e.target.value.match(regEmail)) {
                setInputError(inputElement, "Invalid email");
            }    
        });

        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupPassword" && e.target.value.length === 0) {
                setInputError(inputElement, "Passwordfeltet skal udfyldes");

            } else if (e.target.id === "singupConfirmPassword" && e.target.value !== document.getElementById("signupPassword").value) {
                setInputError(inputElement, "Ikke ens passwords");
            }    
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});