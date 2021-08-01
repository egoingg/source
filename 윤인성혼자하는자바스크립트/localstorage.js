document.addEventListener('DOMContentLoaded', ()=>{
    //{color:색상, message:메시지}
    const item = {color:'red', message:'안녕하세요'}
   // console.log(JSON.stringify(item))
    localStorage.setItem('test',JSON.stringify(item))

    const button = document.querySelector('button')

    button.addEventListener('click', button1_click(e))

    function button1_click(e){
        
        const temp = localStorage.getItem('test')
        console.log(temp)

        const arr = JSON.parse(temp)
        console.log(arr.color)

        console.log(e.target)
    }

  
})