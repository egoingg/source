{
    //Array
    const fruits: string[] = ['🍋', '🍉', '🍓'];
    const scroes: Array<number> = [1, 3, 4]
    //readonly 읽을수만 있고 변경은 안됨
    function printArray(fruits: readonly string[]) {
        // fruits.push('a') readonly라서 수정할 수 없디는 에러 발생 
    }

    //Tuple -> 보다 interface, type alias, class 사용을 권장
    //배열 안에 첫번째 타입과 두번째 타입이 다를때 사용
    let student: [string, number]
    student = ['name', 123]
    student[0] // name
    student[1] // 123
    const [name, age] = student
}