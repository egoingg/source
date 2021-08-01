//콜백함수란? 인자로 전달해준 함수를 나중에 불러죠...라는 의미
//javascript is synchronous.
//Execute the code block by orger after hoisting.
//hoisting:var, function declaration

function callback()
{
    console.log('2-1');
}

console.log('1');
//콜백함수 넣는방법1 : 인자에 실행함수를 작성하여 넣는 방법
setTimeout(()=>console.log('2'), 1000); // setTimeout(콜백함수 , timeout 시간) / setTimeout 함수 인자에 콜백함수를 넣으면 1 초가 지난후 콜백함수가 실행됨
console.log('3');
//콜백함수 넣는방법2 : 이미 선언되어진 함수명을  인자에 넣는 방법
setTimeout(callback, 2000); //2후에 callback 함수 실행됨

//실행된 순서를 확인하면...1 , 3, 2 , 2-1 순으로 실행됨 .. 왜냐면 setTimeout api를 사용하여 비동기 적으로 콜백함수를 실행했기때문


//동기적 콜백
function printImmediately(callback1)
{
    callback1();
}

printImmediately(()=> console.log('hello'));


//비동기적 콜백
function printAsync(callback1, time){
    setTimeout(callback1, time);
}

printAsync(()=>console.log('async callback'), 2000);


