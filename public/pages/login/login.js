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

    createAccountForm.addEventListener("submit",e =>{
        e.preventDefault();

        router.post('/signup', async (req, res) => {
            const { error } = validate(req.body); 
            if (error) return res.status(400).send(error.details[0].message);
          
            let newUser = await User.findOne({ email: req.body.email });
            if (newUser) return res.status(400).send('User already registered.');
            
            newUser = new User(_.pick(req.body, ['email','password','isAdmin']));
            newUser.password = await hashingPassword(req.body.password);
            
            await newUser.save();
            res.send(newUser)
          })
        
        })
    

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform your AJAX/Fetch login

        setFormMessage(loginForm, "error", "Invalid username/password combination");
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