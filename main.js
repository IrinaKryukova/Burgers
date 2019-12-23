//One Page Scroll
$(document).ready(function() {

    const sections = $('.section');    
    const display = $('.page-content');
    let inScroll = false;

    const mobileDetect = new MobileDetect(window.navigator.userAgent);
    console.log(mobileDetect);

    const isMobile = mobileDetect.mobile();

    const performTransition = sectionEq => {
        if (inScroll === false) {
            inScroll = true;
            const position = sectionEq * -100;

            sections.eq(sectionEq).addClass('active').siblings().removeClass('active');
    
            display.css({
                transform: `translateY(${position}%)`
            })

            setTimeout(() => {
                inScroll = false;

                //$('.nav-scroll__item').eq(sectionEq).addClass('active').sublings().removeClass('active')
            });
        }   
    }

    const scrollViewport = direction => {
        const activeSection = sections.filter('.active');
        const nextSection = activeSection.next();        
        const prevSection = activeSection.prev();        

        if (direction === 'next' && nextSection.length) {
            performTransition(nextSection.index());
        }

        if (direction === 'prev' && prevSection.length) {
            performTransition(prevSection.index());
        }

    }
    
    $(document).on({
        wheel: e => {
            const deltaY = e.originalEvent.deltaY;
            const direction = deltaY > 0 ? "next" : "prev";
            scrollViewport(direction);
        },
        keydown: e => {
            const tagName = e.target.tagName.toLowerCase();
            const userTypingInInputs = tagName === "input" || tagName === "textarea";
      
            if (userTypingInInputs) return;
      
            switch (e.keyCode) {
                case 40:
                    scrollViewport("next");
                break;
      
            case 38:
                scrollViewport("prev");
            break;
        }
        }
    });

    $("[data-scroll-to]").on("click", e => {
        e.preventDefault();
        performTransition(parseInt($(e.currentTarget).attr("data-scroll-to")));
      });
      
      // разрешаем свайп на мобильниках
      if (isMobile) {
        window.addEventListener(
          "touchmove",
          e => {
            e.preventDefault();
          },
          { passive: false }
        );
      
        $("body").swipe({
          swipe: (event, direction) => {
            let scrollDirecrion;
            if (direction === "up") scrollDirecrion = "next";
            if (direction === "down") scrollDirecrion = "prev";
            scrollViewport(scrollDirecrion);
          }
        });
      }

})

//slider jQuery animate

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
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
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

//api-maps:yandex.ru

var myMap;
        var geoCenter = false;
        
        function init() {
            var map = new ymaps.Map('map', {
                center: [59.94, 30.32],
                zoom: 12,
                controls: ['zoomControl'],
                behaviors: ['drag']
            });

            let coords = [
            [55.80, 37.30],
            [55.80, 37.40],
            [55.70, 37.30],
            [55.70, 37.40]
        ];
        for (let index = 0; index < coords.length; index++) {
            const coord = coords[index];
            let tempLink = '<span>'+'точка на карте' + (index + 1) * 1 +'<span>'
            let tempText = '<p>'+'точка на карте'+'</p>'
            let tempHeader = '<h3><span style="color: black">'+'точка на карте'+'</span></h3>'
            let baloon = tempHeader + tempText + tempLink;

            myMap.geoObjects.add(new ymaps.Placemark(coord, {balloonContent: baloon}, 
                {iconContent: index + 1,
                iconLayout: 'default#image', 
                iconImageHref:'map_img/map-marker.svg',  
                iconImageSize:[37, 42],}));
            
            
        }
            myMap.setBounds(myMap.geoObjects.getBounds());
            myMap.setZoom(myMap.getZoom()-1.4);

        };
        
        ymaps.ready(init);