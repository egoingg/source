{
    //Array
    const fruits: string[] = ['π', 'π', 'π'];
    const scroes: Array<number> = [1, 3, 4]
    //readonly μ½μμλ§ μκ³  λ³κ²½μ μλ¨
    function printArray(fruits: readonly string[]) {
        // fruits.push('a') readonlyλΌμ μμ ν  μ μλλ μλ¬ λ°μ 
    }

    //Tuple -> λ³΄λ€ interface, type alias, class μ¬μ©μ κΆμ₯
    //λ°°μ΄ μμ μ²«λ²μ§Έ νμκ³Ό λλ²μ§Έ νμμ΄ λ€λ₯Όλ μ¬μ©
    let student: [string, number]
    student = ['name', 123]
    student[0] // name
    student[1] // 123
    const [name, age] = student
}