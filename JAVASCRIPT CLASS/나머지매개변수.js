//1. rest parameter - 나머지 매개 변수
    //함수선언할때 파라미터에 ...을 붙여주면 받은 인자 값을 자동으로 배열로 받음

    //▶▶▶▶▶▶함수 선언에 사용, ...은 []를 입힌다▶▶▶▶▶▶
    //▶▶▶▶▶▶배열이 입혀짐 function func(...나머지매개변수)

    // function func(...나머지매개변수)
    // {
    //     console.log(나머지매개변수);
    // }

    function func(...나머지매개변수) // ▶▶▶▶▶▶function func([1,2,3,4]) 배열이 입혀짐
    {
        for (const 요소 of 나머지매개변수) {
            console.log(요소);
        }
        
    }

    function func(...나머지매개변수)
    {
        for (const idx in 나머지매개변수) {
            
                const element = 나머지매개변수[idx];
                console.log(idx, element);
            
        }   
    }

    func(1,2,3,4);
    //func([1,2,3],4);


//2. 전개 연산지
    //함수를 호출할때 사용, ...은 []를 벗긴다
    //▶▶▶▶▶▶배열이 벗겨짐
    //func(...arry) 

    function func (a,b,c)
    {
        console.log(a,b,c)
    }

    const arry = [1,2,3]
    func(...arry) // ▶▶▶▶▶▶ func(1,2,3) 배열이 벗겨짐


//3. -----------------------예제------------------------

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


