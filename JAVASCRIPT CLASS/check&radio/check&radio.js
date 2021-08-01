document.addEventListener('DOMContentLoaded', () => {
    const checkBox = document.querySelector('input[type=checkbox]')
    const checkBoxResult = document.querySelector('p#checkbox')
    const radios = document.querySelectorAll('input[type=radio]')
    const radioResult = document.querySelector('p#radio')

    let num = 0
    let timer = 0
    checkBox.addEventListener('change', (e)=>{
         if (e.currentTarget.checked){
             
           timer = setInterval(() => {
                checkBoxResult.textContent = num++
            }, 1000);
         }
        else{
            clearInterval(timer)
        }
    })

    radios.forEach((x) => (
        x.addEventListener('change', () => {
            if (x.checked)
            radioResult.textContent = x.value
        }
    )))



})