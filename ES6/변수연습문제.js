//에러
// 함수();
// function 함수(){
//     console.log(안녕)
//     let 안녕 = 'hello' // let으로 선언해도 호이스팅(선언을 위로 끌어 올려주지만 )이 되지만  undefined로 출력까지는 안해줘서 에러남
// }


//에러
//호이스팅은 선언부분만 되기때문에  함수에 할당값이 순서상 없으므로 함수가 아니라고 에러남
//함수();
// var 함수 = function(){
//     console.log(안녕)
//     var 안녕 = 'hello'
// }

//결과는 1
// let a = 1;
// var 함수 = function() {
//     a =2;
// }
// console.log(a)


//결과는 5 , 나랑 가장 가까운 범위의 a 변수사용 그래서 a =1 ,  같은 전역변수 이므로 재할당해서 b = 4
// let a =1;
// var b=2;
// window.a = 3;
// window.b =4;

// console.log(a+b)


// var 변수를 let 으로 변경하면됨
//왜냐면 var는 전역 변수로 개념이고 for문 다돌면 5를 담고 있음  let은 {} 안에서 유효하으로 1,2,3,4,5 담고 있음 
for (var i = 1; i < 6; i++) {
    setTimeout(function(){ console.log(i)}, i*1000)
    
}

