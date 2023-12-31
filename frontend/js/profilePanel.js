document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const profilePanel = document.getElementById('profilePanel');
    
    const navbarHeight = navbar.offsetHeight;
    profilePanel.style.top = `${navbarHeight}px`;
    profilePanel.style.height = `calc(100% - ${navbarHeight}px)`;
    
    profileIcon.addEventListener('click', () => {
        profilePanel.classList.toggle('open');
    });

    const closeProfilePanel = document.getElementById('closeProfilePanel');
    if (closeProfilePanel) {
        closeProfilePanel.addEventListener('click', () => {
            profilePanel.classList.remove('open');
        });
    }
});
