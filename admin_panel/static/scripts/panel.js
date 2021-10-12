const slide = document.querySelector('.slide');
const container = document.querySelector('.container');

let nextBtn, prevBtn;

window.onload = () => {
    fetch('/admin/panel/messages')
    .then(res => {
        if(res.ok){
            return res.json();
        }
        throw Error('Invalid token');
    }).then(messages =>{
        if(messages.length === 0){
            const div = document.createElement('div');
            div.innerHTML = `
                <p class='empty-information'>
                    There is: ${messages.length} messages
                </p>
            `;
            const fragment = document.createDocumentFragment();
            fragment.appendChild(div);
            container.classList.add('empty');
            slide.append(fragment);
            return;
        }
        messages.forEach(({email, message, createdAt}) => {
            const date = new Date(createdAt) 
            const messageContainer = document.createElement('div');
            messageContainer.className = 'message';
            messageContainer.innerHTML = `
                <h1>From:<br>${email}</h1>
                <p class='text'>${message}</p>
                <p class='date'>
                    ${date.toLocaleTimeString()}<br>${date.toLocaleDateString()}
                <p>
            `;
            slide.appendChild(messageContainer);
        })
        if(messages.length > 1){
            const template = document.createElement('template');
            template.innerHTML = `
                <button type='button' class='prev-button slide-button hide'>
                    <i class='fas fa-angle-left'></i>
                </button>
                <button type='button' class='next-button slide-button'>
                    <i class='fas fa-angle-right'></i>
                </button>
            `;
            const fragment = template.content;
            container.appendChild(fragment);
            prevBtn = document.querySelector('.prev-button');
            nextBtn = document.querySelector('.next-button');
            prevBtn.addEventListener('click', handlePrevButton);
            nextBtn.addEventListener('click', handleNextButton);
        }
    }).catch(error => {
        window.location.replace('/admin');
    })
}

let counter = 0;

const handleNextButton = (event) => {
    event.preventDefault();
    if(prevBtn.classList.contains('hide')){
        prevBtn.classList.remove('hide');
    }
    counter++;
    slide.style.transform = 'translateX(' + (-100 * counter) + '%)';
    if(counter === slide.children.length - 1){
        nextBtn.classList.add('hide');
    }  
}
    
const handlePrevButton = (event) => {
    event.preventDefault();
    if(nextBtn.classList.contains('hide')){
        nextBtn.classList.remove('hide');
    }
    counter--;
    slide.style.transform = 'translateX(' + (-100 * counter) + '%)';
    if(counter === 0){
        prevBtn.classList.add('hide');
    }
}
