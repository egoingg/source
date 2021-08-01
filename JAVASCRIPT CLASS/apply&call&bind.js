

//-----------------------------this값 지정하는 방법 (call, apply, bind)------------------------------------------------

// 1. call : 메서드는 모든 함수에서 사용할 수 있으며, this를 특정값으로 지정할 수 있다
const mike = {
    name: 'Mike'
}

const tom = {
    name: 'Tom'
}

function showThisName() {
    console.log(this.name)
}

showThisName.call(mike) // mike를 this로 
showThisName.call(tom) // tom을 this로

// 2. apply: 매개 변수를 배열로 받는다..그 외 call과 완전히 같다.
function update(birthYear, occupation) {
    this.birthYear = birthYear
    this.occupation = occupation
}

update.apply(mike, [1999, 'singer'])
update.apply(tom, [2002, 'teacher'])

const nums = [3, 10, 1, 6, 4]
//const minNum = Math.min(...nums)
//const maxNum = Math.max(...nums)

const minNum = Math.min.apply(null, nums)
//const minNum = Math.min.apply(null, [3,10,1,6,4])

const maxNum = Math.max.call(null, ...nums) // call은 배열로 넘기면X

// 3. bind : 함수의 this 값을 영구히 바꿀 수 있다.
const mike = {
    name: 'Mike'
}

function update(birthYear, occupation) {
    this.birthYear = birthYear
    this.occupation = occupation
}

const updateMike = update.bind(mike)
updateMike(1990, 'police')
console.log(mike)


//-------------------------------------------------
const user = {
    name: 'Mike',
    showName: function () {
        console.log('hello', this.name)
    },
}

user.showName() // 결과는  'hello Mike'

let fn = user.showName
fn() // 결과는 'hello' 왜냐면 fn할당해서 this가 없음

//이럴때 call or apply을 사용해보면 
fn.call(user) // this로 user를 넘김
fn.apply(user) // this로 user를 넘김
//결과는 둘다 'hello, Mike'로 잘 나옴

// bind를 사용해 보면
let boundFn = fn.bind(user)
//결과는 'hello, Mike'로 잘나옴


