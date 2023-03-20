//visual 이미지 높이에 맞게 visual 영역 높이 설정
const visualHeight = document.querySelector('.visual');
const visualImg = document.querySelector('.visual_img img').clientHeight;

window.addEventListener('resize', ()=>{
  const visualImg = document.querySelector('.visual_img img').clientHeight;
  document.getElementById('visual').style.height = visualImg + 'px';
})

window.onload = function(){
  document.getElementById('visual').style.height = visualImg + 'px';
}


//메뉴버튼 클릭시 메뉴활성화
const menuBtn = document.querySelector('.m_menu_icon');
const menuBar = document.querySelector('.navbar_menu ul');
menuBtn.addEventListener('click',()=>{
  menuBar.classList.toggle('active');
})

window.addEventListener('resize', ()=> {
  let x = window.clientX;
  console.log(x);
})