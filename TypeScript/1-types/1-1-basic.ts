{
    // javascript 기본 타입
    //* primitive(원시타입) : number, string, boolean, bigint, symbol, null, undefined
    //* object : function, array....

    //number
    const num: number = -1

    //string
    const str: string = 'hello'

    //boolean
    const boal: boolean = true

    //undefined :값이 있는지 없는지 아무것도 결정되지 않은 상태
    //let name : undefined // 이렇게 단독으로는 쓰지 않음💩
    let age: number | undefined
    age = undefined
    age = 1

    // 무언가가 있을수도 없을수도 있을때 undefined을 많이 쓴다
    function find(): number | undefined {
        return undefined
    }

    //null :텅텅 비어져 있음
    //let person : null // 이렇게 단독으로는 쓰지 않음💩
    let person2: string | null

    //unknown : (알수없는)어떤 종류의 변수가 담길지 알수가 없는💩
    let notsure: unknown = 0
    notsure = 'he'
    notsure = true

    //any 💩
    let anything: any = 0
    anything = 'hello'

    //void : 함수에서 아무것도 리턴X, 생략가능
    function print(): void {
        console.log('hello')
        return
    }

    // never : 리턴할 값이 없음 , 예 함수에서 Error를 던질때 
    //에러는 던지고 리턴할 값이 없이 나오게됨
    function throwError(message: string): never {
        //message = > server (log)
        throw new Error(message)

        while (true) { }
    }

    //object 💩
    // object도 어떤 타입인지 명시해서 작성하는것이 좋음 그래서 똥
    let obj: object //💩
    function acceptSomeObject(obj: object) {
        acceptSomeObject({ name: 'ellie' })
        acceptSomeObject({ animal: 'dog' })
    }


}