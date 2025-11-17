let userSkills = [];

function validateUserName(userName) {
    if (/\d/.test(userName)) {
        return "Campo Inválido: O nome do usuário deve conter apenas dígitos.";
    }
    for (i = 0; i < userName.length; i++) {
        if (userName[i] == " " && !(userName.indexOf(" ", 0) == 0) &&
            !(userName.indexOf(" ", 0) == (userName.length - 1))) {
            return null;
        }
    }
    return "Campo Inválido: O nome do usuário deve conter sobrenome.";
}

function validateUserCpf(userCpf) {
    if (/\D/.test(userCpf)) {
        return "Campo Inválido: O CPF deve conter apenas dígitos.";
    }
    if (userCpf.length < 11) {
        return "Campo Inválido: O CPF deve conter 11 dígitos.";
    }
    return null;
}

function validateUserEmail(userEmail) {
    if (!userEmail.includes("@") || !userEmail.includes("."))
        return "Campo Inválido: Formato de email inválido.";
    let atIndex = userEmail.indexOf("@", 0) + 3;
    let dotIndex = userEmail.indexOf(".", atIndex);
    for (i = 0; i < userEmail.length; i++) {
        if (userEmail[i] == " ")
            return "Campo Inválido: O email não pode conter espaços.";
        if (userEmail.indexOf("@", atIndex - 2) > (atIndex - 3))
            return "Campo Inválido: Email não existente.";
        if (dotIndex > atIndex && dotIndex < userEmail.length - 1)
            return null;
    }
    return "Campo Inválido: Endereço de email não reconhecido.";
}

function validateUserInterest(userInterest) {
    if (userInterest == null)
        return "Campo Inválido: Necessário selecionar interesse.";
    return null;
}

function validateUserSkills(userSkillsArray) {
    if (userSkillsArray.length < 3)
        return "Campo Inválido: Usuário deve selecionar pelo menos 3 habilidades.";
    return null;
}

function getSkillFromText() {

    let errorDisplay = document.getElementById("form-error");
    errorDisplay.innerHTML = "";
    
    let skill = document.getElementById("skills").value;
    
    if (/\d/.test(skill)) {
        errorDisplay.innerHTML = "<li>Campo Inválido: Habilidade não pode conter dígitos.</li>";
        return;
    }

    if (!/^[a-zA-Z0-9\s]+$/.test(skill) || /^\s+$/.test(skill) || skill.trim() === "") {
        document.getElementById("skills").value = "";
        errorDisplay.innerHTML = "<li>Campo Inválido: Habilidade Inválida.</li>";
        return;
    }

    let skillTrimmed = skill.trim();
    if (skillTrimmed.length > 0 && !userSkills.includes(skillTrimmed)) {
        userSkills.push(skillTrimmed);
        addSkillToDiv(skillTrimmed);
    }
    document.getElementById("skills").value = "";
}

function getSkillFromButton(skill, button) {
    if (userSkills.includes(skill)) {
        userSkills.splice(userSkills.indexOf(skill), 1);
        setVisitedButtonColor(button, "#e0e0e0", "#0000");

        let selectedSkillsDiv = document.getElementById("selected_skills");
        let buttons = selectedSkillsDiv.getElementsByClassName("user_skill");
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].value === skill) {
                buttons[i].remove();
                break;
            }
        }
    }
    else {
        userSkills.push(skill);
        setVisitedButtonColor(button, "#377be9", "#ffff");
        addSkillToDiv(skill);
    }
}

function setVisitedButtonColor(button, backgroundColor, color) {
    button.style.backgroundColor = backgroundColor;
    button.style.color = color;
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
    let erros = [];

    let name = document.getElementById("name").value;
    let cpf = document.getElementById("cpf").value;
    let email = document.getElementById("email").value;
    let interest = document.querySelector('input[name="interest"]:checked')?.value;

    let erroNome = validateUserName(name);
    if (erroNome) erros.push(erroNome);

    let erroCpf = validateUserCpf(cpf);
    if (erroCpf) erros.push(erroCpf);

    let erroEmail = validateUserEmail(email);
    if (erroEmail) erros.push(erroEmail);

    let erroInterest = validateUserInterest(interest);
    if (erroInterest) erros.push(erroInterest);

    let erroSkills = validateUserSkills(userSkills);
    if (erroSkills) erros.push(erroSkills);

    if (erros.length > 0) {
        exibirFeedback(erros);
    } else {
        exibirFeedback(null);
        console.log("Dados validados com sucesso:", { name, cpf, email, interest, skills: userSkills });
        setTimeout(() => location.reload(), 2000);
    }
}

function exibirFeedback(vetorErros) {
    let errorDisplay = document.getElementById("form-error");

    if (vetorErros && vetorErros.length > 0) {   
        errorDisplay.style.color = "#d9534f";

        let htmlErros = "<strong>Por favor, corrija os seguintes erros:</strong><ul>";
        for (let i = 0; i < vetorErros.length; i++) {
            htmlErros += `<li>${vetorErros[i]}</li>`;
        }
        htmlErros += "</ul>";
        
        errorDisplay.innerHTML = htmlErros;
    } else {
        errorDisplay.style.color = "#5cb85c";
        errorDisplay.innerHTML = "Cadastro realizado com sucesso!";
    }
}