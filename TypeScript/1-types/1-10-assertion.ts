{
    // Type Assertion : 타입 강요 , 권장ㅎ ㅏ지 않음
    //as, <string>, !

    function jsStrFunc(): any {
        return 'hello'
    }

    const result = jsStrFunc()
    console.log((result as string).length) // as로 string이라고 장담함 , 타입 강요
    console.log((<string>result).length)

    const wrong: any = 5
    console.log((wrong as Array<number>).push(1)) //😱  에러 어플이 종료됨

    function findNumbers(): number[] | undefined {
        return undefined
    }
    const numbers = findNumbers()
    numbers!.push(2) //😱 !는 장담하는데 null이 아니라 절대적으로 값이 있다는 것을 확신할때 사용

    const button = document.querySelector('class')! // null이 아니라는 것을 장담함
    // if (button){
    //     button.nodeValue
    // }
}
