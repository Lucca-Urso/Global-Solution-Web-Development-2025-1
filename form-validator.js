let userSkills = [];

function getUserInformations() {
    let name = document.getElementById("name").value;
    let cpf = document.getElementById("cpf").value;
    let email = document.getElementById("email").value;
    let interest = document.querySelector('input[name="interest"]:checked')?.value;
    
    return {
        "name": validateUserName(name),
        "cpf": validateUserCpf(cpf),
        "email": validateUserEmail(email),
        "interest": interest,
        "skills": userSkills
    }
}

function validateUserName(userName) {
    if (/\d/.test(userName)) {
        throw Error("Campo Inválido: O nome do usuário deve conter apenas dígitos.");
    }

    for (i = 0; i < userName.length; i++) {
        if (userName[i] == " " && !(userName.indexOf(" ", 0) == 0) && 
            !(userName.indexOf(" ", 0) == (userName.length - 1))) {
            
            return userName;
        }
    }

    throw Error("Campo Inválido: O nome do usuário deve conter sobrenome.");
}

function validateUserCpf(userCpf) {
    if (!/\d/.test(userCpf)) {
        throw Error("Campo Inválido: O CPF deve conter apenas dígitos.");
    }

    if (userCpf.length < 11) {
        throw Error("Campo Inválido: O CPF deve conter 11 dígitos.");
    }

    return userCpf;
}

function validateUserEmail(userEmail) {
    if (!userEmail.includes("@") || !userEmail.includes("."))
        throw Error("Campo Inválido: Formato de email inválido.")

    let atIndex = userEmail.indexOf("@", 0) + 3;
    let dotIndex = userEmail.indexOf(".", atIndex);

    for (i = 0; i < userEmail.length; i++) {
        if (userEmail[i] == " ") 
            throw Error("Campo Inválido: O email não pode conter espaços.");

        if (dotIndex > atIndex && dotIndex < userEmail.length - 1)
            return userEmail;
    }

    throw Error("Campo Inválido: Endereço de email não reconhecido.");
}

function getSkillFromText() {
    let skill = document.getElementById("skills").value;
    
    if (/\d/.test(skill))
        throw Error("Campo Inválido: Habilidade não pode conter dígitos.");

    userSkills.push(skill);
    document.getElementById("skills").value = "";
}

function getSkillFromButton(skill) {
    userSkills.push(skill);
}

function submitForm() {
    console.log(getUserInformations());
}