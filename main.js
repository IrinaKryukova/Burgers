//fullScreenMenu
const menuButton = document.getElementById('hamburger-menu');

const fullScreenMenu = document.getElementById('modal');

const body = document.getElementById('body');

const menuClose = document.getElementById('menu_close');

menuButton.addEventListener('click', function () {
     
    body.classList.add('body_closed');   
    fullScreenMenu.classList.add('full-screen__menu_active');
   
});

menuClose.addEventListener('click', function () {
    
    body.classList.remove('body_closed');
    fullScreenMenu.classList.remove('full-screen__menu_active');

});

//fullReview__modal
const moreButton = document.querySelectorAll('button.button__more');

console.log(moreButton);

const fullReview = document.getElementById('fullReview__modal');

const fullReviewClose = document.getElementById('fullReviewClose');

for (var index = 0; index<moreButton.length; index++) {

    moreButton[index].addEventListener('click', function (e) {
             
        body.classList.add('body_closed');   
        fullReview.classList.add('full-review__modal_active');
    
    });
 
}

fullReviewClose.addEventListener('click', function (e) {
    e.preventDefault();
    
    body.classList.remove('body_closed');
    fullReview.classList.remove('full-review__modal_active');

});

//аккордеон меню (горизонтальный)

const accord1 = document.getElementsByClassName("menu-acco__item");

console.log(accord1);

var width = document.documentElement.clientWidth;

console.log(width);

window.addEventListener('resize', function (e) {
    width = document.documentElement.clientWidth;
})

for (var index = 0; index < accord1.length; index++) {

    const element = accord1[index];
    
    element.addEventListener('click', function (e) {
        e.preventDefault();

        for (var i = 0; i < accord1.length; i++) {
            if (i !== index) {
                accord1[i].classList.remove('menu-acco__item--active');
            }
            
        }
        
        if (element.classList.contains('menu-acco__item--active')) {            
            element.classList.remove('menu-acco__item--active');

        } else {
            //console.log('add');
            element.classList.add('menu-acco__item--active');
        }
        

        if (width < 650) {
            let currElem = index + 1;
            let count = lines.length - currElem;
            let overWidth = 80 * count;
            let content = element.getElementsByClassName('menu-acco__content');
            content[0].style ='right: -' + overWidth+'px';
        }       
        
    })    
}


//slider
const left = document.querySelector("#left");
console.log(left);
const right = document.querySelector("#right");
console.log(right);
const items = document.querySelector("#items");
console.log(items);
right.addEventListener('click', function(e) {
    console.log("сработало");
    loop("right", e);
});
 
left.addEventListener('click', function(e) {
    loop("left", e);
});

function loop(direction, e) {
    e.preventDefault();
    if (direction === "right") {
        items.appendChild(items.firstElementChild);
    } else {
        items.insertBefore(items.lastElementChild, items.firstElementChild);
  }
}


//orderForm functional

const myForm = document.querySelector('#myForm');
const orderButton = document.querySelector('#orderButton')

orderButton.addEventListener('click', function(event) {
    event.preventDefault();
    //console.log(myForm.elements.name.value);
    //console.log(myForm.elements.phone.value);
    //console.log(myForm.elements.comment.value);  

    
    if (validateForm(myForm)) {

       // data.append("to","my@mail.com");

        const data = {
            name: myForm.elements.name.value,            
            phone: myForm.elements.phone.value,
            comment: myForm.elements.comment.value,
            to: 'my@mail.com'
        };

        console.log(data);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.send(JSON.stringify(data));
        
       
        
    }


    //if (myForm.elements.callback.checked == true) {
        //console.log('не перезванивать');
    //})

    function validateForm(form) {
        let valid = true;

        if (!validateField(form.elements.name)) {
            valid = false;
        }

        if (!validateField(form.elements.phone)) {
            valid = false;
        }

        if (!validateField(form.elements.comment)) {
            valid = false;
        }

        return valid;
    }

    function validateField(field) {
        
        if (!field.checkValidity()) {         
           
            field.nextElementSibling.textContent = field.validationMessage;
            
            return false;
        } else {
            field.nextElementSibling.textContent = '';

            return true;
        }
    }
})