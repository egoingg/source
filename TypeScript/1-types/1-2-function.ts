{
    //javaScript
    function jsAdd(num1, num2) {
        return num1 + num2
    }

    //TypeScript
    function add(num1: number, num2: number): number {
        return num1 + num2
    }

    //-------------------
    //javaScript
    function jsFetchNum(id) {
        //code...
        //code...
        //code...
        return new Promise((resolve, reject) => {
            resolve(100)
        })
    }

    //TypeScript   
    function fetchNum(id: string): Promise<number> {
        //code...
        //code...
        //code...
        return new Promise((resolve, reject) => {
            resolve(100)
        })
    }

    //--------------------
    //javascript => TypeScript

    //Optional parameter

    //? 로 표시 : 인자를 전달 해도 되고 안해도 되고
    //전달안하면 optional para의 값은 undefined으로 나옴

    function printName(firstName: string, lastName?: string) {
        console.log(firstName)
        console.log(lastName)
    }

    printName('Steve', 'Jobs')
    printName('Ellie')
    printName('Anna', undefined)

    //결과------
    //Steve
    //Jobs
    //----------
    //Ellie
    //undefined
    //----------
    //Anna
    //undefined

    //default parameter
    //인자를 전달하지 않으면 default 값이 인자에 들어감

    function printMessage(message: string = 'default message') {
        console.log(message)
    }
    printMessage()


    //Rest parameter

    function addNumbers(...para: number[]): number {
        return para.reduce((a, b) => a + b)
    }
    console.log(addNumbers(1, 2))
    console.log(addNumbers(1, 2, 3, 4))
    console.log(addNumbers(1, 2, 3, 4, 5, 0))
}