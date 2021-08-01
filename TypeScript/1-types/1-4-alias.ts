{
    // Type Aliases
    //새로운 타입을 내가 정의할 수 있다는 말

    type Text = string
    const name: string = 'ellie'
    const name1: Text = 'ellie'
    const address: Text = 'korea'

    type Num = number
    const age: Num = 20

    type Student = {
        name: string,
        age: number
    }
    const student: Student = {
        name: 'ellie',
        age: 21
    }


    // string Literal Types

    type Name = 'name'
    let ellieName: Name = 'name'

    type JSON = 'json'
    let json: JSON = 'json'
}