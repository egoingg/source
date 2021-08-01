
    console.clear();
   
    //------Set자료형------  배열 중복제거
    let r =  ['🍎, 🥝,🥝, 🍌, 🍒'];
    r = new Set(r)  //Array를 Set으로 바꾸기 (중복제거)
    r = [...r]      //Set을 Array로 바꾸기
    console.log( r.reverse());
    
    //------join------  배열을 -> string 으로 
    const r1 = ['사과','배','레몬','포도'];
    console.log( r1.join('/')); // '/' 값이 추가됨 => "사과/배/레몬/포도"
  
    //------split------ string -> 배열로
    console.clear();
    const r2 = '망고^파인애플^귤^수박';
    console.log( r2.split('^')); // '^' 문자를 기준으로 자름 => [사과,배,레몬,포도]
  
  
    //------reverse------ 거꾸로
    console.clear();
    const r3 =  ['🍎, 🥝, 🍌, 🍒'];
    console.log( r3.reverse());
  
    //------splice------ 배열 삭제 (index , 갯수) / return 삭제된 배열 , 원본 배열 자체가 변경 o
    console.clear();
    const r4 =  ['🍎, 🥝, 🍌, 🍒'];
    const result = r4.splice(0,2); // 삭제된 배열을 return ['🍎, 🥝,]
    console.log( reuslt); 
    console.log( r4);// 원본 배열 자체가 변경되어 져서 결괴는 ['🍌, 🍒']
  
  
    //------slice------ 배열의 특정 부분을 return (start index, end index +1), 원본배열 자체는 변경 x
    console.clear();
    const r5 =  ['1','2','3','4'];
    const result = r5.slice(2,4); 
    console.log( result);// 즉정 부분 인덱스 해당 값 return ['3','4']
    console.log( r5); // 원본 배열 자체가 변경x 결괴는  ['1','2','3','4']
  
  
    class Student {
      constructor(name, age, enrolled, score) {
        this.name = name;
        this.age = age;
        this.enrolled = enrolled;
        this.score = score;
      }
    }
    const students = [
      new Student('A', 29, true, 45),
      new Student('B', 28, false, 80),
      new Student('C', 30, true, 90),
      new Student('D', 40, false, 66),
      new Student('E', 18, true, 88),
    ];
  
    //------find------ 콜백 함수가 true 를 return 하는 조건 충족 '첫번째 항목만' 리턴함 / 만약 찾지 못하면 undefine return 함
    //return 단일 or undefine
  
    console.clear();
    const r6 = students.find(function(student) { return student.score === 90})
    console.log(r6);
  
    //------filter------ 콜백 함수가 true 를 return 하는 조건 충족 '항목 모두'를 리턴함 
    // return 다중(배열)
    //원본 유지, 결과는 newarray 리턴
  
    const r7 = students.filter( function(student) { return student.enrolled});
    console.log(r7);


     //------map------ 배열에 들어 있는 요소 각각을 다른 값으로 변환 즉 콜백함수를 거쳐서 콜백함수에서 리턴되어진 값들로 대체
     // return 다중(배열)
     // 원본이 수정됨
  
     // Q7. make an array containing only the students' scores
    // result should be: [45, 80, 90, 66, 88]
    {
      const r8 = students.map(function(student){ return student.score; });
      console.log(r8);
    }
  
  
    //------some------ return boolean / 배열중에서 콜백 함수의 결과가 하나라도 만족이면 ture 아니면 false
    // return boolean
  
    // Q8. check if there is a student with the score lower than 50
  {
    const r9 = students.some( function(student){ return student.score > 50});
    console.log(r9);
  }
  
    //------every------ return boolean / 배열중에서 콜백 함수의 결과가 모두 만족이어야 ture 아니면 false
    // return boolean
  
    // Q8. check if there is a student with the score lower than 50
    {
      const r10 = students.every( function(student){ return student.score > 50});
      console.log(r10);
    }
  
    //------reduce------ 누적된 값 구할때 사용,  콜백함수에서 return 한 값이 다음 콜백함수의 pre 값으로 들어감 
    //pre 는 누적된 값, curr 은 현재값 
    // return boolean
  
    // Q9. compute students' average score
    {
      const r11 = students.reduce( function(pre, curr) { console.log(pre, curr.score); return pre += curr.score  }, 0) // 처음 pre 값을 0으로 지정
      console.log(`average score : ${r11 / students.length}`);
    }
  
    // Q10. make a string containing all the scores
    // result should be: '45, 80, 90, 66, 88'
    {
      const r12 = students.map((student)=> student.score)
                          .filter((score)=> score >= 50)
                          .join();
      console.log(r12);
    }
  
     //------sort------  sort((a,b)=> a-b) or sort((a,b)=> b-a)  /a = 이전값, b는 현재값
  
    // Bonus! do Q10 sorted in ascending order
    // result should be: '45, 66, 80, 88, 90'
    {
      const r13 = students.map((student)=> student.score)
                          .sort((a,b)=> a-b)
                          .join();
  
      console.log( r13);
      
    }


