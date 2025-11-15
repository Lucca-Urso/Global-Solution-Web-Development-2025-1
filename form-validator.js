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
        "interest": validateUserInterest(interest),
        "skills": validateUserSkills(userSkills)
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
    if (/\D/.test(userCpf)) {
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

        if (userEmail.indexOf("@", atIndex - 2) > (atIndex - 3))
            throw Error("Campo Inválido: Email não existente.")

        if (dotIndex > atIndex && dotIndex < userEmail.length - 1)
            return userEmail;
    }

    throw Error("Campo Inválido: Endereço de email não reconhecido.");
}

function validateUserInterest(userInterest) {
    if (userInterest == null)
        throw Error("Campo Inválido: Necessário selecionar interesse.");

    return userInterest;
}

function validateUserSkills(userSkillsArray) {
    if (userSkillsArray.length < 3)
        throw Error("Campo Inválido: Usuário deve selecionar pelo menos 3 habilidades.");

    return userSkillsArray;
}

function getSkillFromText() {
    let skill = document.getElementById("skills").value;
    
    if (/\d/.test(skill))
        throw Error("Campo Inválido: Habilidade não pode conter dígitos.");

    if (!/^[a-zA-Z0-9\s]+$/.test(skill) || /^\s+$/.test(skill)) {
        document.getElementById("skills").value = "";
        throw Error("Campo Inválido: Habilidade Inválida.");
    }

    userSkills.push(skill);
    addSkillToDiv(skill);
    document.getElementById("skills").value = "";
}

function getSkillFromButton(skill, button) {
    if (userSkills.includes(skill)) {
        userSkills.splice(userSkills.indexOf(skill), 1);
        setVisitedButtonColor(button, "#e0e0e0", "#0000");
        addSkillToDiv(skill);
    }
    else {
        userSkills.push(skill);
        setVisitedButtonColor(button, "#377be9", "#ffff");
        addSkillToDiv(skill);
    }
}

function setVisitedButtonColor(button, backgroundColor, color) {
    button.style.backgroundColor = backgroundColor;
    button.style.color = color
}

function addSkillToDiv(skill) {
    let div = document.getElementById("selected_skills");
    let buttonInput = document.createElement("input");

    buttonInput.value = skill;
    buttonInput.className = "user_skill";
    buttonInput.type = "button";
    buttonInput.onclick = () => removeSelectedSkillFromDiv(buttonInput, skill);
    div.append(buttonInput);
}

function removeSelectedSkillFromDiv(button, skill) {
    button.remove();
    userSkills.splice(userSkills.indexOf(skill), 1);
    
    let suggestionButtons = document.querySelectorAll('.suggestion');
    suggestionButtons.forEach(btn => {
        if (btn.value === skill) {
            setVisitedButtonColor(btn, "#e0e0e0", "#0000");
        }
    });
}

function submitForm() {
    try {
        console.log(getUserInformations());
    } catch (error) {
        alert(error.message);
    }
}