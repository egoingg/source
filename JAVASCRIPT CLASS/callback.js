class Counter{
    constructor(runEveryFiveTimes){ //콜백함수 받음
        this.counter =0;
        this.callback =runEveryFiveTimes; // 콜백함수를 callback 변수에 담음
    }

    increase()
    {
        this.counter++;
        //console.log(this.counter);

        if ( this.counter % 5 == 0)
        this.callback && this.callback(this.counter); // 변수에 담아 놓았던 콜백 함수를 실행
    }
}


function print(num)
{
    console.log(`print된 숫자는?${num}`);
}

function alert()
{
    console.log(`yo`);
}

const obj = new Counter(print); // 객체 생성할때 prit 함수를 파라미터로 생성자로 넘김

obj.increase();
obj.increase();
obj.increase();
obj.increase();
obj.increase();
obj.increase();

const obj2 = new Counter(alert);// 객체 생성할때 alert 함수를 파라미터로 생성자로 넘김
obj2.increase();
obj2.increase();
obj2.increase();
obj2.increase();
obj2.increase();
obj2.increase();