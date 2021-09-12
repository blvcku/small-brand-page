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
            const emptyInformation = document.createElement('p');
            emptyInformation.className = 'empty-information';
            emptyInformation.append(`There is: ${messages.length} messages`);
            container.classList.add('empty');
            slide.append(emptyInformation);
            return;
        }
        for(let i = 0; i < messages.length; i++){
            const messageContainer = document.createElement('div');
            messageContainer.className = 'message';
            const header = document.createElement('header');
            const br = document.createElement('br');
            header.append('From:', br, messages[i].email);
            const createdAt = new Date(messages[i].createdAt);
            const br2 = document.createElement('br');
            const date = document.createElement('p');
            date.className = 'date';
            date.append(createdAt.toLocaleDateString(), br2, createdAt.toLocaleTimeString());
            const message = document.createElement('p');
            message.className = 'text';
            message.append(messages[i].message);
            messageContainer.append(header, message, date);
            slide.append(messageContainer);
        }
        if(messages.length > 1){
            const prevButton = document.createElement('button');
            prevButton.className = 'prev-button slide-button hide';
            const prevButtonIcon = document.createElement('i');
            prevButtonIcon.className = 'fas fa-angle-left';
            prevButton.append(prevButtonIcon);
            const nextButton = document.createElement('button');
            nextButton.className = 'next-button slide-button';
            const nextButtonIcon = document.createElement('i');
            nextButtonIcon.className = 'fas fa-angle-right';
            nextButton.append(nextButtonIcon);
            nextButton.addEventListener('click', handleNextButton);
            prevButton.addEventListener('click', handlePrevButton);
            prevBtn = prevButton;
            nextBtn = nextButton;
            container.append(prevButton, nextButton);
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
