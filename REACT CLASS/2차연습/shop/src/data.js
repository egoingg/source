export default [
    {
      id : 0,
      title : "White and Black",
      content : "Born in France",
      price : 120000
    },
  
    {
      id : 1,
      title : "Red Knit",
      content : "Born in Seoul",
      price : 110000
    },
  
    {
      id : 2,
      title : "Grey Yordan",
      content : "Born in the States",
      price : 130000
    }
  ] 

//============================================================
//export {} 문법


//여러개의 변수들을 내보내고싶으면 export default 말고 이런 문법을 씁니다.
    // var name1 = 'Kim';
    // var name2 = 'Park';
    // export { name1, name2 }


//============================================================
//import {} 문법

    ////export {} 이걸로 내보낸 변수들을 갖다쓰고 싶으면 import {} 문법을 씁니다.

    ////(App.js 파일)
    //import { name1, name2 } from './data.js';