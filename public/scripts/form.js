const inputEmail = document.querySelector('#email');
const inputMessage = document.querySelector('#message');
const labelEmail = document.querySelector('#label-email');
const labelMessage = document.querySelector('#label-message');

//Input fields focus animation
const handleEmailFocus = () =>{
    labelEmail.classList.toggle('active');
}

const handleMessageFocus = () =>{
    labelMessage.classList.toggle('active');
}

inputEmail.addEventListener('focus', handleEmailFocus);
inputMessage.addEventListener('focus', handleMessageFocus);
inputEmail.addEventListener('blur', handleEmailFocus);
inputMessage.addEventListener('blur', handleMessageFocus);

//Form submit handler
const form = document.querySelector('.form');
const formValidations = document.querySelectorAll('.form-validation');
const errorFields = document.querySelectorAll('.error');
const successField = document.querySelector('.success');

const handleFormSubmit = () => {
    formValidations.forEach((form) => form.classList.remove('invalid'));
    errorFields.forEach((field) => field.innerText = '');
    fetch('/api/sendmessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: inputEmail.value,
            message: inputMessage.value
        })
    }).then(res => {
        return res.json();
    }).then(res => {
        if(!Object.keys(res).length){
            successField.classList.add('active');
            form.removeEventListener('submit', handleFormSubmit);
            form.reset();
            return;
        }
        for(let i = 0; i < res.length; i++){
            switch(res[i].param){
                case 'email':
                    formValidations[0].classList.add('invalid');
                    errorFields[0].innerText = res[i].msg;
                    break;
                case 'message':
                    formValidations[1].classList.add('invalid');
                    errorFields[1].innerText = res[i].msg;
                    break;
            }
        }
    }).catch(error => console.log('ERROR: ' + error))
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
})
form.addEventListener('submit', handleFormSubmit);