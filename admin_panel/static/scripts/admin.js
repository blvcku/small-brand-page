const form = document.querySelector('.form');
const errorField = document.querySelector('.error');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const password = document.querySelector('#password').value;
    sendData(password);
})

const sendData = (password) => {
    fetch('/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: password
        })
    }).then(res => {
        if(res.ok){
            return res;
        }
        throw Error('Invalid password');
    }).then(res => {
        window.location.replace('/admin/panel');
    }).catch(error => {
        form.classList.add('invalid');
    })
}
