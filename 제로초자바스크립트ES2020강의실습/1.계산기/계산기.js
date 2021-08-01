// <input type="text" id='textinput'>
//   <button id='clearbutton'></button>
//   <button id='plusbutton'></button>
//   <button id='minusbutton'></button>
//   <button id='dividebutton'></button>
//   <button id='mulitiplebutton'></button>
//   <button id='qualbutton'></button>
//   <input type="text" id='resultinput'>
      
const textinput = document.querySelector('#textinput')
const clearbutton= document.querySelector('#clearbutton')
const plusbutton= document.querySelector('#plusbutton')
const minusbutton= document.querySelector('#minusbutton')
const dividebutton= document.querySelector('#dividebutton')
const mulitiplebutton= document.querySelector('#mulitiplebutton')
const qualbutton= document.querySelector('#qualbutton')
const resultinput= document.querySelector('#resultinput')


let temp;
let oper;


plusbutton.addEventListener('click', function() {
    
    if (temp)
        {
            oper = '+'
        }
    else{
        
        if(textinput.value)
        {
            temp =textinput.value
            oper = '+'
        }
        
    }
    
    textinput.value = '';
  
    
})

qualbutton.addEventListener('click', ()=>{
    
    if (oper)
        {
            if (textinput.value)
                {
                    resultinput.value = Number(temp) + Number(textinput.value)
                    temp = resultinput.value 
                }
        }
    else
        {
            if (textinput.value)
                {
                    temp = textinput.value;
                }
        }
    

    
})

clearbutton.addEventListener('click', ()=>{
    textinput.value = null;
    resultinput.value = null;
    temp = null;
    oper = null;
})  

   


