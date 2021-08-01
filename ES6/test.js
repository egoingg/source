
// $(document).ready(function(){

//     document.body.innerHTML+='<h1>A</h1>';

// });

document.addEventListener('DOMContentLoaded',function () {
    document.body.innerHTML+='<h1>A</h1>';


var person = {
    name:'kim',
    인사: function(){
        console.log(this.name)
    }
}

var person2 = {
    name:'jj'
}

person.인사.apply(person2)

function 더하기(a,b,c) {
    console.log(a+b+c)
}

더하기(...[1,2,3])
더하기.apply(undefined, [1,2,3])


function 글자세기(p)
{
  const obj = {}
  
  const pp = [...p]
  
  pp.forEach(function (val) {
      obj[val] = obj[val]  +1
  })
  
}


글자세기('aacbbb')

var arr = [1,2,3]
var arr1 = new Array(1,2,3)

console.log(arr)
console.log(arr1)
})
