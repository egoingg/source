{
    //Intersection Types : &
    //  다양한 타입들을 하나로 묶어서 선언할 수가 있다.

    type Student = {
        name: string
        score: number
    }

    type Worker = {
        employeeId: number
        work: () => void
    }

    function internWork(person: Student & Worker) {
        console.log(person.name, person.score, person.employeeId, person.work())
    }

    internWork({
        name: 'ellie',
        score: 12,
        employeeId: 1,
        work: () => { },
    })
}