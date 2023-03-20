


function stopDefAction(evt) {
    evt.preventDefault();
  }

const tab1 = document.querySelector('#tab01');
const tab2 = document.querySelector('#tab02');
const tab3 = document.querySelector('#tab03');
const tab4 = document.querySelector('#tab04');
const tab5 = document.querySelector('#tab05');


function removeOn(){
    tab1.classList.remove('on');
    tab2.classList.remove('on');
    tab3.classList.remove('on');
    tab4.classList.remove('on');
    tab5.classList.remove('on');
}

function tab01(){
    removeOn();
    tab1.classList.add('on');
}

function tab02(){
    removeOn();
    tab2.classList.add('on');
}
function tab03(){
    removeOn();
    tab3.classList.add('on');
}
function tab04(){
    removeOn();
    tab4.classList.add('on');
}
function tab05(){
    removeOn();
    tab5.classList.add('on');
}

