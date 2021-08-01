// class 붕어빵기계 {
//     constructor(ingr1, ingr2, price){
//         this.속재료 = ingr1;
//         this.겉재료=ingr2;
//         this.가격=price;
//     }
// }

// let 팥붕어빵 = new 붕어빵기계('팥', '밀가루반죽', '500');

// console.log(팥붕어빵);



// class 붕어빵기계 {
//     constructor(info){
//         this.속재료 = info.속재료;
//         this.겉재료=info.겉재료;
//         this.가격=info.가격;
//     }
// }

// let 팥붕어빵 = new 붕어빵기계( {속재료:'팥',겉재료: '밀가루반죽', 가격:500 } );

// console.log(팥붕어빵);

class 붕어빵기계
{
    constructor(info){
    this.속재료 = info.속재료;
    this.겉재료=info.겉재료;
    this.가격=info.가격;
    this.callback = info.func;
 
    }

    
    increase()
    {
        this.가격 += 1;
        this.callback(this.가격);
    }
}

function print(num)
{
    console.log(num);
}

const 슈크림붕어빵 = new 붕어빵기계( {속재료:'슈크림',겉재료: '밀가루반죽', 가격:600, func:print } );
슈크림붕어빵.increase();
console.log(슈크림붕어빵);
슈크림붕어빵.increase();
console.log(슈크림붕어빵);

const 팥붕어빵 = new 붕어빵기계( {속재료:'팥',겉재료: '밀가루반죽', 가격:500, func:print } );
console.log(팥붕어빵);
