document.querySelector('#qualbutton').addEventListener('click', ()=> {

// *
// **
// ***
// ****

    let out='';

    for (let i = 0; i < 4; i++) {
        
        let 별 =''
        for (let j = 0; j < i+1; j++) {
             별 = 별 + '*'
            //console.log(i,j)
            //console.log(별)
        }
        out = out + 별 +'\n'
        //console.log(out)
    }
    console.log(out)


//=================================================================  
//      *
//     ***
//    *****
//     ***
//      *
     out='';

    for (let i = 4; i >= -4; i=i-2) {  // 4 2 0 -2 -4
        
        let 별 =''
        let 공 =''
        for (let j = 0; j < 5 - Math.abs(i); j++) { // 1 3 5 3 1  ===> 5 - 절대값i
             별 = 별 + '*'
            //console.log(i,j)
            //console.log(별)
        }

        for (let k = 0; k <  Math.abs(i) / 2; k++) { // 2 1 0 1 2 ===> 절대값i / 2
            공 = 공 + ' '
        }

        out = out + 공 + 별 +'\n'
        //console.log(out)
       
    }
    console.log(out)

//=================================================================  
//     *
//   ***
// *****
//   ***
//     *

    
    out='';

    for (let i = 4; i >= -4; i=i-2) {  // 4 2 0 -2 -4
        
        let 별 =''
        let 공 =''
        for (let j = 0; j < 5 - Math.abs(i); j++) { // 1 3 5 3 1  ===> 5 - 절대값i
             별 = 별 + '*'
            //console.log(i,j)
            //console.log(별)
        }

        for (let k = 0; k <  Math.abs(i); k++) { // 4 2 0 2 4 ===> 절대값i
            공 = 공 + ' '
        }

        out = out + 공 + 별 +'\n'
        //console.log(out)
       
    }
    console.log(out)    

})

