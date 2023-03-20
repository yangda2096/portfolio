/*

.visual .slide_wrap ul li 가 순서대로 값을 가진다.(100승) 


.visual .slide_wrap ul li.slide01 가

2초마다
margin-left: -100%; 값을 가지는데

100이 200 300 400 300 200 100 000  순서로 반복 
*/

let slideWrap = document.querySelector('.visual .slide_wrap') ,
    slideContainer = slideWrap.querySelector('ul'),
    slides = slideContainer.querySelectorAll('li'),
    slideCount = slides.length, //슬라이드의 개수
    currentIndex = 0, //슬라이드 순서
    navPrev = slideWrap.querySelector('.button_prev'),//아이디 prev
    navNext = slideWrap.querySelector('.button_next');//아이디 next

const pagerWrap = slideWrap.querySelector('.pager');





/*

1. 슬라이드 개수만큼 pager 안에 div 태그를 만든다
2. 해당 슬라이드에 따라 div태그에 on 클래스가 붙는다.
3. div 클릭시 해당 슬라이드로 이동한다.
*/

jQuery(function($){
    for(let i=0; i < slideCount; i++){
        $(pagerWrap).append('<div class="pageDots">');
    }
})

const pageDots = document.querySelectorAll('.pageDots'); 



function goToSlide(idx){ //슬라이드 이동 함수
    slides[0].style.marginLeft = idx * -100 + '%';
    slides[0].classList.add('animated');
    currentIndex = idx;
}//goTOSlide




//버튼기능 업데이트 함수


//버튼 클릭시 슬라이드 이동
navPrev.addEventListener('click',function(){

    if(currentIndex > 0){
        goToSlide(currentIndex - 1);
    }else{
        goToSlide(currentIndex + 4);
    }
});


navNext.addEventListener('click',function(){
    if(currentIndex < slideCount - 1){
        goToSlide(currentIndex + 1);
    }else{
        goToSlide(0);
    }
});

//setInterval(할일, 시간);
//할일 = 함수 

/*
$('.visual .slide_wrap .pager div').click(function(){
    let imgLeft
});

03.22 작성중
*/
