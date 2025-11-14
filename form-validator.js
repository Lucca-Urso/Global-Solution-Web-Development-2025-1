function getUserInformations() {
    let name = document.getElementById("name").value;
    let cpf = document.getElementById("cpf").value;
    let email = document.getElementById("email").value;
    let interest = document.getElementsByName("radio-interest");
    
    return {
        "name": validateUserName(name),
        "cpf": validateUserCpf(cpf),
        "email": validateUserEmail(email),
        "interest": interest
    }
}

function validateUserName(userName) {
    if (/\d/.test(userName)) {
        throw Error("Incorrect Input: Username must not contain numeric characters");
    }

    for (i = 0; i < userName.length; i++) {
        if (userName[i] == " " && !(userName.indexOf(" ", 0) == 0) && 
            !(userName.indexOf(" ", 0) == (userName.length - 1))) {
            
            return userName;
        }
    }

    return Error("Incorrect Username: Username must contain second name");
}

function validateUserCpf(userCpf) {
    if (!/\d/.test(userCpf)) {
        throw Error("Incorrect Input: CPF must only contain digits");
    }

    if (userCpf.length < 11) {
        throw Error("Incorrect Input: CPF must contains 11 digits");
    }

    return userCpf;
}

function validateUserEmail(userEmail) {
    if (!userEmail.includes("@") || !userEmail.includes("."))
        throw Error("Invalid Input: Email format is invalid.")

    let atIndex = userEmail.indexOf("@", 0) + 3;
    let dotIndex = userEmail.indexOf(".", atIndex);

    for (i = 0; i < userEmail.length; i++) {
        if (userEmail[i] == " ") 
            throw Error("Invalid Input: Email must not contain spaces.");

        if (dotIndex > atIndex && dotIndex < userEmail.length - 1)
            return userEmail;
    }

    throw Error("Invalid Input: Email address does not exist.");
}

function submitForm() {
    console.log(getUserInformations());
}