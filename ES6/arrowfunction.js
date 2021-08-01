'use strict';

//1. 간단한 메소드 만들기
var 사람 = {
    name :'손흥민',
    sayHi : function ()  { console.log( `안녕 나는 ${this.name}`)} // this는 사람이라는 object 
}

사람.sayHi();

//2. 오브젝트 내의 데이터를 전부 더해주는 메소드만들기

var 자료 = {
    data: [1,2,3,4,5],
}

자료.전부더하기  = function (){
    let sum =0;
    this.data.forEach(value => {
        sum += value;
    });
    console.log("[1,2,3,4,5]합은?:", sum);
}

자료.전부더하기();

//3. setTimeout 이용해보기


document.getElementById('qualbutton').addEventListener('click', function(){
    setTimeout(() => {
        console.log(this.innerHTML)
        
    }, 1000);
})