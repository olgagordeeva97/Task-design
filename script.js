document.addEventListener('DOMContentLoaded', function() {
    console.log('JS файл подключен!');
    
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const callbackForm = document.querySelector('.callback-form');
    
    const requestCallBtn = document.querySelector('.header .button');
    const footerRequestCallBtn = document.getElementById('footerRequestCallBtn');

    function openModal() {
        console.log('Кнопка нажата, открываем модал');
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    if (requestCallBtn) {
        requestCallBtn.addEventListener('click', openModal);
    }

    if (footerRequestCallBtn) {
        footerRequestCallBtn.addEventListener('click', openModal);
    }

    if (modalClose) {
        modalClose.addEventListener('click', function() {
            console.log('Закрытие модала по крестику');
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                console.log('Закрытие модала по клику на оверлей');
                modalOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            console.log('Закрытие модала по ESC');
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    if (callbackForm) {
        callbackForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(callbackForm);
            const data = Object.fromEntries(formData);

            console.log('Form data:', data);
            alert('Thank you! We will call you back within 10 minutes.');

            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
            callbackForm.reset();
        });
    }

    const projects = [
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
    
    let currentProject = 0;
    const imageTabs = document.querySelectorAll('.image-tab');
    const dots = document.querySelectorAll('.dot');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const projectImage = document.querySelector('.project-image');
    const detailItems = document.querySelectorAll('.detail-item p');
    
    function updateProject(index) {
        const project = projects[index];
        
        if (detailItems.length >= 4) {
            detailItems[0].innerHTML = project.city;
            detailItems[1].textContent = project.area;
            detailItems[2].textContent = project.time;
            detailItems[3].textContent = project.cost;
        }
        
        if (projectImage) {
            projectImage.src = project.image;
            projectImage.alt = project.title;
        }
        
        imageTabs.forEach((tab, i) => {
            tab.classList.toggle('active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentProject = index;
    }
    
    imageTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => updateProject(index));
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => updateProject(index));
    });
    
    if (leftArrow) {
        leftArrow.addEventListener('click', () => {
            let newIndex = currentProject - 1;
            if (newIndex < 0) newIndex = projects.length - 1;
            updateProject(newIndex);
        });
    }
    
    if (rightArrow) {
        rightArrow.addEventListener('click', () => {
            let newIndex = currentProject + 1;
            if (newIndex >= projects.length) newIndex = 0;
            updateProject(newIndex);
        });
    }
    
    const controlForm = document.querySelector('.control-form');
    if (controlForm) {
        controlForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            
            if (name && phone) {
                alert(`Thank you, ${name}! We will send you a link to the broadcast.`);
                this.reset();
            }
        });
    }
    
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', function() {
            alert('Video playback would start here. In a real project, this would embed a video player.');
        });
    }
});