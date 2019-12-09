const menuButton = document.getElementById('hamburger-menu');

const fullScreenMenu = document.getElementById('modal');

const body = document.getElementById('body');

const menuClose = document.getElementById('menu_close');

menuButton.addEventListener('click', function () {
     
   // body.classList.add('body_closed');
    fullScreenMenu.classList.add('full-screen__menu_active');
   
});

menuClose.addEventListener('click', function () {
   // body.classList.remove('body_closed');
    fullScreenMenu.classList.remove('full-screen__menu_active');

});
