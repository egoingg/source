//start 랜덤한 숫자 4자리 생성하기 ==============
let randomstr='';
let numbers = [0,1,2,3,4,5,6,7,8,9]
let ans =[]

for (let i = 0; i < 4; i++) {
    
    let idx = Math.floor(Math.random() * (10-i))
    ans.push(numbers[idx])
    numbers.splice(idx,1) // 뽑은애는 원본배열에서 삭제
}
randomstr = ans.join('')
console.log(randomstr)
//====end 랜덤한 숫자 4자리 생성하기 start==============






//false 값 = null, '', Nan, undefined, 0, false

//랜덤한 숫자 4자리 생성하기
// let randomstr='';
// for (let i =0; i < 4; i++){
    
//      randomstr += `${Math.floor(Math.random() * 10)}` 
  
// }
// console.log('f:',randomstr) 

////

const userval = document.querySelector('#input')
const check = document.querySelector('#check')
const logs = document.querySelector('#logs')
const answer = randomstr//'2580'
let cnt = 10



check.addEventListener('click', ()=>{
    const input = userval.value;
    console.log(input)

    let ballcnt =0;
    let strkcnt =0;


    if (input){
        if(input.length === 4)
        {
            if(input === answer)
            {
                logs.textContent = '홈런';
            }
            else{
                    cnt--
                    //스트라이크 /볼 계산
                    for (const i in input) {
                        for (const j in answer) {
                            if (input[i] ===  answer[j]) {
                                console.log('자리수',i, j)

                                if (i === j)
                                {
                                    // 숫자와 자리수 까지 같은면  === straike
                                    strkcnt++;
                                    logs.textContent = strkcnt +  'straike'
                                }
                                else // 숫자만 같으면 ====== ball
                                {
                                    ballcnt++;
                                    logs.textContent = ballcnt + 'ball'
                                }
                            }
                        }
                    }
                }
            }
        }

    if (cnt < 0){
        logs.textContent =  'game over'
    }
      
    })