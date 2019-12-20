//slider jQuery

$(document).ready(function() {

    var moveSlide = function (container, slideNumber) {
        var 
            sliders = container.find('.burger__item'),
            activeSlide = sliders.filter('.active'),
            reqItem = sliders.eq(slideNumber),
            reqIndex = reqItem.index(),
            list = container.find('.slider__list'),
            duration = 500;

        if (reqItem.length) {
            list.animate({
                'left' : -reqIndex*100 + '%'
            }, duration, function () {
                activeSlide.removeClass('active');
                reqItem.addClass('active');
            });
        }     

    }
    
    $('.slider__btn').on('click', function(e){
        e.preventDefault();

        var $this = $(this),
            container = $this.closest('.slider'),
            sliders = $('.burger__item', container),
            activeItem = sliders.filter('.active'),
            nextSlide = activeItem.next();
            prevSlide = activeItem.prev();

        if ($this.hasClass('arrow__right')) { //вперед

            if (nextSlide.length) {
                moveSlide(container,nextSlide.index());
            } else {
                moveSlide(container,sliders.first().index());
            }
        } 
        
        if ($this.hasClass('arrow__left')) { //назад

            if (prevSlide.length) {
                moveSlide(container,prevSlide.index());
            } else {
                moveSlide(container,sliders.last().index());
            }             
        }       

    })

});

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

//accordeon team 

const membersList = document.querySelectorAll('li.member__item');

const member = membersList[item];

for (var item = 0; item<membersList.length; item++) {

    const member = membersList[item];    

    member.addEventListener('click', function (e){

        for (let index = 0; index < membersList.length; index++) {

            if (membersList[index] !== member) {
                membersList[index].classList.remove('member__item_active');
            }
            
        }

        if (member.classList.contains('member__item_active')){
            
            member.classList.remove('member__item_active');
        } else {
            member.classList.add('member__item_active');
        }  

    });

}
    
//accordeon menu 

const accord1 = document.getElementsByClassName("menu-acco__item");

var width = document.documentElement.clientWidth;

window.addEventListener('resize', function (e) {
    width = document.documentElement.clientWidth;
})

for (var index = 0; index < accord1.length; index++) {

    const element = accord1[index];
    
    element.addEventListener('click', function (e) {
        e.preventDefault();
        for (var i = 0; i < accord1.length; i++) {
            if (element !== accord1[i]) {
                accord1[i].classList.remove('menu-acco__item--active');
            }
            
        }
        
        if (element.classList.contains('menu-acco__item--active')) {
            element.classList.remove('menu-acco__item--active');

        } else {
            
            element.classList.add('menu-acco__item--active');
        }
        

        if (width < 450) {
            let currElem = index + 1;
            let count = lines.length - currElem;
            let overWidth = 80 * count;
            let content = element.getElementsByClassName('menu-acco__content');
            content[0].style ='right: -' + overWidth+'px';
        }       
        
    })    
}

    
//slider
//const left = document.querySelector("#left");

//const right = document.querySelector("#right");

//const items = document.querySelector("#items");

//right.addEventListener('click', function(e) {
    
//    loop("right", e);
//});
 
//left.addEventListener('click', function(e) {
//    loop("left", e);
//});

//function loop(direction, e) {
//    e.preventDefault();
//    if (direction === "right") {
//        items.appendChild(items.firstElementChild);
//    } else {
//        items.insertBefore(items.lastElementChild, items.firstElementChild);
//  }
//}

//orderForm functional

const myForm = document.querySelector('#myForm');

let form = new FormData;

const success = document.querySelector('#success');

const modalError = document.querySelector('#error');

myForm.addEventListener('submit', function(event) {
    event.preventDefault();
        
    if (validateForm(myForm)) {

        const data = {
            name: myForm.elements.name.value,            
            phone: myForm.elements.phone.value,
            comment: myForm.elements.comment.value,
            to: 'my@mail.com'
        };

        for (const key in data) {
            form.append(key, data[key]);
        }

        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = processReqChange;

        function processReqChange() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200 && xhr.response.status) {

                    success.classList.add('modal__success_active');
                    console.log(xhr.response);
                    // удачно 
                  
                   
                } else {

                    modalError.classList.add('modal__error_active');
                    // ошибка                   
                }
            }
        }
        xhr.responseType = 'json';
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail/fail');
        xhr.send(form);          
        
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

const closeSuccess = document.getElementById('closeSuccess');

const closeError = document.getElementById('closeError');

closeSuccess.addEventListener('click', function (e) {
    e.preventDefault();
    
    success.classList.remove('modal__success_active');
    
});


closeError.addEventListener('click', function (e) {
    e.preventDefault();
    
    modalError.classList.remove('modal__error_active');
    
});