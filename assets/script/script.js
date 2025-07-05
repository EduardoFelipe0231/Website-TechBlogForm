let form = document.getElementById('form_contact');
let result = document.querySelector('.errorDefault');
let inputName = document.getElementById("name");
let inputEmail = document.getElementById("email");
let inputMessage = document.getElementById("message");
let btn = document.getElementById("submit");

form.addEventListener('submit', function(e) {
    e.preventDefault();

    let nameValue = inputName.value;
    let emailValue = inputEmail.value;
    let messageValue = inputMessage.value;

    if(nameValue === "" || emailValue === "" |  messageValue === ""){
        result.textContent = 'Precisa preencher todos os campos...'
        result.classList = "error"

        setTimeout(() => {
            result.classList = "";
            result.textContent = "";
        }, 3000)
    } else {

        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.textContent = "Mensagem enviada com sucesso!";
                result.classList = 'sucess'
            } else {
                console.log(response);
                result.textContent = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.textContent = "Ops.. algo deu errado";
            result.classList = "alert"
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 5000);
        });
    }
});


































































































