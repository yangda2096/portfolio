const slides = document.querySelector('.visual_wrap');//슬라이드 뼈대감지
const item = document.querySelectorAll('.visual_box');//슬라이드 아이템 획득
const firstEle = item[0]; //첫번째 슬라이드 아이템
const maxSlide = item.length; //슬라이드 전체 개수 획득
let currSlide = 1 ; // 버튼 클릭할때마다 현재 슬라이드가 어디인지 알려주기 위한 변수

let slideNum = document.querySelector('.slide_num');
let slideLeng = document.querySelector('.slide_leng');


slideNum.innerHTML += `${currSlide}`
slideLeng.innerHTML +=`/${maxSlide}`



//페이지네이션 생성
const pagination = document.querySelector('.ctl');

for(let i = 0; i < maxSlide; i++){
  if (i === 0) pagination.innerHTML += `<div class="ctl_item on"></div>`
  else pagination.innerHTML += `<div class="ctl_item"></div>`
}

const paginationItem = document.querySelectorAll('.ctl_item');


//자동 슬라이드
function sliderOn(){
  firstEle.classList.add('on');
}

sliderOn();

const goSlide = setInterval(sliderGo, 3000); //시간셋업

function sliderGo(){
  const currentItem = document.querySelector('.on'); //현재 활성화된 슬라이드를 감지
  currentItem.classList.remove('on');//현재 활성화된 슬라이드 비활성화
  
  const cuttrntP = document.querySelector('.ctl_item.on');//현재 활성화된 페이지네이션을 감지
  cuttrntP.classList.remove('on'); //현재 활성화된 페이지네이션을 비활성화 

  //자동슬라이드 셋업
  if(!currentItem.nextElementSibling){
    item[0].classList.add('on');
  }else{
    currentItem.nextElementSibling.classList.add('on');
  }

  //자동 페이지네이션 셋업
  if(!cuttrntP.nextElementSibling){
    paginationItem[0].classList.add('on');
  }else{
    cuttrntP.nextElementSibling.classList.add('on');
  }
}



//각 페이지네이션 클릭시 해당 슬라이드로 이동하기
for (let i = 0; i < maxSlide; i++){
  paginationItem[i].addEventListener('click', ()=>{ //각 페이지네이션마다 클릭이벤트 추가하기
    currSlide = i;
    const offset = currSlide;
    let slideNum = document.querySelector('.slide_num');
    const currentItem = document.querySelectorAll('.visual_box'); 
    currentItem.forEach((i) => i.classList.remove('on'));
    currentItem[offset].classList.add('on');
    //슬라이드 변경을 위한 현재 값 가져오기

    paginationItem.forEach((i)=> i.classList.remove('on')); //클릭시 활성화된 on 지우기
    paginationItem[offset].classList.add('on'); //클릭한 페이지네이션 활성화

    slideNum.innerHTML = `${offset+1}`//클릭시 숫자바꾸기
  });
}



//만약에 1번째 슬라이드가 on이면 slideNum에 innerHTML = 1 주기
// 2번째 슬라이드가 on이면 slideNumm에 innerHTML = 2 주기 
// 3번째 슬라이드가 on이면 slideNumm에 innerHTML = 2 주기 
const gogonumber = setInterval(numgo, 3000);
function numgo(){
  // console.log(item)
  // console.log(item[0].className);
  let slideNum = document.querySelector('.slide_num');
  if(item[0].className.includes('on')){
    //console.log(item[2].getElementsByClassName('on'));
    slideNum.innerHTML = '1';
  }else if(item[1].className.includes('on')){
    slideNum.innerHTML = '2';
  }else if(item[2].className.includes('on')){
    slideNum.innerHTML = '3';
  }
}

numgo()
