// -------------------------------------------------------------------- FORMULÁRIO -----------------------

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
            }, 4000);
        });
    }
});



// -------------------------------------------------------------------- DARK MODE / LIGHT MODE -----------------------

let btnChangeTheme = document.getElementById("btnChangeTheme");

btnChangeTheme.addEventListener("click", e =>{
    switchTheme();0
})


const switchTheme = () => {
    //Get root element and data-theme value
        const rootElem = document.documentElement
        let dataTheme = rootElem.getAttribute('data-theme'),
            newTheme
    
        newTheme = (dataTheme === 'light') ? 'dark' : 'light'
    
        //set the new HTML attribute
        rootElem.setAttribute('data-theme', newTheme)
    
        //set the new local storage item
        localStorage.setItem('them', newTheme)
}


// -------------------------------------------------------------------- RELOAD PAGE TO THE TOP F5-----------------------

//Quando reload página volta ao topo.
window.scrollTo(0, 0);



// -------------------------------------------------------------------- BUTTONS SHARE - FOOTER -----------------------

//get button
let btnWhatsapp = document.querySelector(".fa-whatsapp");
let btnTwitter = document.querySelector(".fa-x-twitter");

// set cofing page and message.
const pageURL = location.href
const message = `Este é um incrível artigo, leve apenas 5 minutos para ler.`

//API share
const whatsappApi = `https://wa.me/?text=${pageURL}`;
const twtitterApi = `https://x.com/intent/post?text=${pageURL}`;


//button click
btnWhatsapp.addEventListener("click", () => {
    window.open(url=whatsappApi,targe='blank')
})


btnTwitter.addEventListener("click", () =>{
    window.open(url=twtitterApi, target='blank')
})




































































































