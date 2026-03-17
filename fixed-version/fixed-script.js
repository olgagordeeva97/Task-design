'use strict';

const PROJECTS_DATA = [
    {
        city: "Rostov-on-Don<br>LCD admiral",
        area: "81 m²",
        time: "3.5 months",
        cost: "Upon request",
        title: "Rostov-on-Don, Admiral",
        image: "images/project-1.jpg"
    },
    {
        city: "Sochi<br>Thieves",
        area: "105 m²",
        time: "4 months",
        cost: "Upon request",
        title: "Sochi Thieves",
        image: "images/project-2.jpg"
    },
    {
        city: "Rostov-on-Don<br>Patriotic",
        area: "93 m²",
        time: "3 months",
        cost: "Upon request",
        title: "Rostov-on-Don Patriotic",
        image: "images/project-3.jpg"
    }
];

const SELECTORS = {
    modal: '#modalOverlay',
    modalClose: '#modalClose',
    modalTriggers: ['#requestCallBtn', '#footerRequestCallBtn'],
    callbackForm: '#callbackForm',
    controlForm: '#controlForm',
    questionsForm: '#questionsForm',
    measurementForm: '#measurementForm',
    playButton: '.video__play-button',
    projectImage: '#projectImage',
    projectCity: '#projectCity',
    projectArea: '#projectArea',
    projectTime: '#projectTime',
    projectCost: '#projectCost',
    galleryTabs: '.gallery__tab',
    navDots: '.nav-projects__dot',
    leftArrow: '.nav-projects__arrow--left',
    rightArrow: '.nav-projects__arrow--right',
    galleryNavLeft: '.gallery__nav-button--left',
    galleryNavRight: '.gallery__nav-button--right'
};

const utils = {
    lockScroll() {
        document.body.style.overflow = 'hidden';
    },
    unlockScroll() {
        document.body.style.overflow = '';
    },
    getFormData(form) {
        const formData = new FormData(form);
        return Object.fromEntries(formData);
    },
    showNotification(message) {
        alert(message);
    }
};

const ModalModule = (() => {
    let modal = null;
    let closeBtn = null;
    
    const open = () => {
        if (!modal) return;
        modal.classList.add('active');
        utils.lockScroll();
    };
    
    const close = () => {
        if (!modal) return;
        modal.classList.remove('active');
        utils.unlockScroll();
    };
    
    const init = () => {
        modal = document.querySelector(SELECTORS.modal);
        closeBtn = document.querySelector(SELECTORS.modalClose);
        
        if (!modal || !closeBtn) return;
        
        SELECTORS.modalTriggers.forEach(selector => {
            const btn = document.querySelector(selector);
            if (btn) {
                btn.addEventListener('click', open);
            }
        });

        closeBtn.addEventListener('click', close);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) close();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                close();
            }
        });
    };
    
    return { init, open, close };
})();

const FormModule = (() => {
    const handleCallbackSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        utils.showNotification('Thank you! We will call you back within 10 minutes.');
        ModalModule.close();
        form.reset();
    };
    
    const handleControlSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.querySelector('input[type="text"]').value;
        if (name) {
            utils.showNotification(`Thank you, ${name}! We will send you a link to the broadcast.`);
            form.reset();
        }
    };

    const handleQuestionsSubmit = (e) => {
        e.preventDefault();
        utils.showNotification('Thank you for your question! We will contact you soon.');
        e.target.reset();
    };
    
    const handleMeasurementSubmit = (e) => {
        e.preventDefault();
        utils.showNotification('Thank you! The measurer will contact you soon.');
        e.target.reset();
    };
    
    const init = () => {
        const callbackForm = document.querySelector(SELECTORS.callbackForm);
        const controlForm = document.querySelector(SELECTORS.controlForm);
        const questionsForm = document.querySelector(SELECTORS.questionsForm);
        const measurementForm = document.querySelector(SELECTORS.measurementForm);
        
        if (callbackForm) callbackForm.addEventListener('submit', handleCallbackSubmit);
        if (controlForm) controlForm.addEventListener('submit', handleControlSubmit);
        if (questionsForm) questionsForm.addEventListener('submit', handleQuestionsSubmit);
        if (measurementForm) measurementForm.addEventListener('submit', handleMeasurementSubmit);
    };
    
    return { init };
})();

const ProjectsModule = (() => {
    let currentIndex = 0;
    let elements = {};

    const updateDetails = (index) => {
        const project = PROJECTS_DATA[index];
        if (elements.city) elements.city.innerHTML = project.city;
        if (elements.area) elements.area.textContent = project.area;
        if (elements.time) elements.time.textContent = project.time;
        if (elements.cost) elements.cost.textContent = project.cost;
    };
    
    const updateImage = (index) => {
        const project = PROJECTS_DATA[index];
        if (elements.image) {
            elements.image.src = project.image;
            elements.image.alt = project.title;
        }
    };
    
    const updateActiveStates = (index) => {
        elements.tabs.forEach((tab, i) => {
            tab.classList.toggle('gallery__tab--active', i === index);
        });
        elements.dots.forEach((dot, i) => {
            dot.classList.toggle('nav-projects__dot--active', i === index);
        });
    };

    const setProject = (index) => {
        if (index < 0) index = PROJECTS_DATA.length - 1;
        if (index >= PROJECTS_DATA.length) index = 0;
        
        currentIndex = index;
        updateDetails(currentIndex);
        updateImage(currentIndex);
        updateActiveStates(currentIndex);
    };
    
    const nextProject = () => setProject(currentIndex + 1);
    const prevProject = () => setProject(currentIndex - 1);
    
    const init = () => {
        elements = {
            image: document.querySelector(SELECTORS.projectImage),
            city: document.querySelector(SELECTORS.projectCity),
            area: document.querySelector(SELECTORS.projectArea),
            time: document.querySelector(SELECTORS.projectTime),
            cost: document.querySelector(SELECTORS.projectCost),
            tabs: document.querySelectorAll(SELECTORS.galleryTabs),
            dots: document.querySelectorAll(SELECTORS.navDots),
            leftArrow: document.querySelector(SELECTORS.leftArrow),
            rightArrow: document.querySelector(SELECTORS.rightArrow),
            leftNav: document.querySelector(SELECTORS.galleryNavLeft),
            rightNav: document.querySelector(SELECTORS.galleryNavRight)
        };
        
        if (!elements.image) return;
        
        elements.tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => setProject(index));
        });
        
        elements.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => setProject(index));
        });

        if (elements.leftArrow) elements.leftArrow.addEventListener('click', prevProject);
        if (elements.rightArrow) elements.rightArrow.addEventListener('click', nextProject);
        if (elements.leftNav) elements.leftNav.addEventListener('click', prevProject);
        if (elements.rightNav) elements.rightNav.addEventListener('click', nextProject);
        
        setProject(0);
    };
    
    return { init };
})();

const VideoModule = (() => {
    const handlePlayClick = () => {
        utils.showNotification('Video playback would start here. In a real project, this would embed a video player.');
    };
    
    const init = () => {
        const playButton = document.querySelector(SELECTORS.playButton);
        if (playButton) {
            playButton.addEventListener('click', handlePlayClick);
        }
    };
    
    return { init };
})();

document.addEventListener('DOMContentLoaded', () => {
    ModalModule.init();
    FormModule.init();
    ProjectsModule.init();
    VideoModule.init();
});
