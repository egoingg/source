{
    //Type Inference 타입 추론 - 권장하지 않음, 타입을 명시적으로 지정하는 것을 권장함

    let text = 'hello' // 생략했으나 string인게 뻔해서 에러 안남
    //text = 1 에러남

    function print(message = 'hellow') {
        console.log(message)
    }

    print('hello')


    function add(x: number, y: number) { // 리턴되는 타입을 명시 하는 것을 권장
        return x + y
    }

    const result = add(1, 2)
}
