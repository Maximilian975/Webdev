'use strict';

const saveButtons = document.querySelectorAll('.save');
const resetButton = document.querySelector("#resetButton");
let counter = 0;
for(let i = 0; i < saveButtons.length; i++){
    saveButtons[i].addEventListener('click', function(){
        counter+=1;
        alert(counter);
    })
}

resetButton.addEventListener('click',function(){
    counter = 0;
    alert("Reset!")
})