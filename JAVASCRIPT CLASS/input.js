document.addEventListener('DOMContentLoaded', () => {
    console.log('1')
    const textarea = document.querySelector('textarea')
    const button = document.querySelector('button')
    const p = document.querySelector('p')

    button.addEventListener('click', () => {
        console.log('2')
        p.textContent = `${Number(textarea.value) * 2.54} cm로 변환되었습니다.`
    })

    // textarea.addEventListener('change', (e)=>{
    //     p.textContent =`${Number( e.currentTarget.value) * 2.54} cm로 변환되었습니다.`
    // })

    //keydown -> keypress -> 입력양식에 값이 들어감 keyup ----입력과 동시에 값을 확인할수 잇음
    //change 이벤트 : 입력 양식 전체에 값 입력을 마쳤을때 ----입력을 마치고 커서가 벗어났을때 확인 할수 있음
    textarea.addEventListener('keyup', (e)=>{
        p.textContent =`${Number( e.currentTarget.value) * 2.54} cm로 변환되었습니다.`
    })
})