function getUserInformations() {
    let name = document.getElementById("name").value;
    let cpf = document.getElementById("cpf").value;
    let email = document.getElementById("email").value;
    

    return {
        "name": name,
        "cpf": cpf,
        "email": email
    }
}

function submitForm() {
    console.log(getUserInformations())
}