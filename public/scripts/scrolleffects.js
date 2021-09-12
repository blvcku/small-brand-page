
//Scrolling header using gsap

gsap.registerPlugin(ScrollTrigger);

gsap.to('.parallax-header', {
    scrollTrigger: {
        trigger: '.parallax-header',
        scrub:true,
        start: '-200px center',
        end: '600px center',
        invalidateOnRefresh:true,
        invalidateOnResize:true
    },
    x:() => -window.innerWidth,
    duration:5,
});


//Our projects observer

const projectDescriptions = document.querySelectorAll('.project-description');
const projectHeaders = document.querySelectorAll('.project-header');
const projectsOptions = {
    threshold: 1
};

const projectsObserver = new IntersectionObserver(function(entries, projectsObserver){
    entries.forEach(entry => {
        if(!entry.isIntersecting){
            return;
        }
        entry.target.classList.add('appear');
        projectsObserver.unobserve(entry.target);
    })
}, projectsOptions);

projectDescriptions.forEach(description => {
    projectsObserver.observe(description);
})
projectHeaders.forEach(header => {
    projectsObserver.observe(header);
})


//About us observer

const aboutUsInformations = document.querySelectorAll('.about-us-information');
const aboutUsHeader = document.querySelector('.about-us-header');
const informationsOptions = {
    threshold: 1,
    rootMargin: '0px 0px -100px 0px'
};

const aboutUsObserver = new IntersectionObserver(function(entries, aboutUsObserver){
    entries.forEach(entry => {
        if(!entry.isIntersecting){
            return;
        }
        entry.target.classList.add('appear');
        aboutUsObserver.unobserve(entry.target);
    })
}, informationsOptions);

aboutUsInformations.forEach(information => {
    aboutUsObserver.observe(information);
})

aboutUsObserver.observe(aboutUsHeader);