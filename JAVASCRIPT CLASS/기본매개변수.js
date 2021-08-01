//함수호출에서 매개 변수를 넣지 않을 경우
//함수 선언부분에 기본 매개 변수값를 지정하는 새로운 방법임
//function (매개변수=기본값)
const isLeapYear = function (연도 = new Date().getFullYear()){ //기본 매개 변수값으로 올해 년도를 지정

    
    //1)
    // if (연도 === undefined)
    // {
    //     연도 = new Date().getFullYear();
    // }
    //2)
    //연도 = 연도 === undefined ? new Date().getFullYear() : 연도;
    //3)
    //연도 = 연도 || new Date().getFullYear();
    console.log(연도);

    return (연도 % 4 === 0) 
            && (연도 % 100 !==0)
            || (연도 % 400 === 0)
}

let result = isLeapYear();///매개 변수를 넣지 않을 경우

console.log(result);


//범위 안의 모든 숫자 곱하기
function multiplayAll(start, end)
{
    let aa = 1;
    for(let i = start; i <= end; i++)
    {
        aa *= i;
    }
    console.log(`모든숫자곱한${aa}`);
}

multiplayAll(1,3);

//max값을 찹는함수

// function findMax(array)
// {
//     let output = array[0];
//     for (const 요소 of array) {
//         if ( output < 요소) output = 요소
//     }
//     console.log(`[23,43,12,76,31]중에서 Max값은?${output}`);
// }

// findMax([23,43,12,76,31]);


// function findMax(...array)
// {
//     let output = array[0];
//     for (const 요소 of array) {
//         if ( output < 요소) output = 요소
//     }
//     console.log(`[23,43,12,76,31]중에서 Max값은?${output}`);
// }

// findMax(23,43,12,76,31);


//두 가지 함수 모두 만족하는 함수 만들기
//첫번째 값을 비교하여 배열인지 아닌지로 구문한다ㅣ.
function findMax(first, ...array)
{
    if(Array.isArray(first)){
        let output = first[0];
        for (const 요소 of first) {
            if ( output < 요소) output = 요소
        }
        console.log(`[23,43,12,76,31]중에서 Max값은?${output}`);
    }
    else{

        let output = first;
        for (const 요소 of array) {
            if ( output < 요소) output = 요소
        }
        console.log(`[23,43,12,76,31]중에서 Max값은?${output}`);
    }

}

findMax([23,43,12,76,31]);
findMax(23,43,12,76,31);

