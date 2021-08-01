let numbers = [273, 25, 75, 52, 103, 32, 57, 24, 76]
let result;

//1. 홀수만 추찰
result = numbers.filter((value) => value % 2 === 1)
console.log(`홀수만추출:${result}`);

//2. 100 이하의 수만 추찰
result = numbers.filter((value) => value <= 100)
console.log(`100 이하의 수:${result}`);

//3. 5로 나눈 나머지가 0인 수만 추출
result = numbers.filter((value) => value  % 5 === 0)
console.log(`5로 나눈 나머지가 0인 수:${result}`);

//4. foreach 반복문으로 변경
const array = ['사과','배','귤','바나나']
array.forEach((value, index) => console.log('과일은?',value,'index는?',index))

