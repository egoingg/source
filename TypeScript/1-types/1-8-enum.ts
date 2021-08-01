{
    //enum
    //연관된 내용의 상수 값들을 한곳에 모아서 정의 


    //JavaScript
    //에서 변하지 않는 고정값(상수) 정의법
    const MAX_NUM = 6
    const MAX_STUDENTS_PER_CLASS = 10
    const MONDAY = 0
    const TUESDAY = 1
    const WEDNESDAY = 2
    const DAYS_ENUM = Object.freeze({ 'MONDAY': 0, 'TUESDAY': 1, 'WEDNESDAY': 2 })

    console.log(DAYS_ENUM.WEDNESDAY)

    //TypeScript
    enum Days {
        Monday, // 0
        Tuesday, //1
        Wednesday, //2
    }

    enum Ds {
        Monday = 'mon',
        Tuesday = 'tue',
        Wednesday = 'wed',
    }

    let day: Days = Days.Wednesday
    console.log(day)
    day = 10 // <---- 이 부분에서 enum 값이 아닌 그냥 10 값을 넣엇는데 에러가 발생하지 않으므로 문제임


    //*******권장*******그래서 아래와 같은 union 타입을 사용하기를 권장
    type DaysOfWeek = 'Monday' | 'Tuesday' | 'Wednesday'
    let daysOfWeek: DaysOfWeek = 'Monday'

    console.log(daysOfWeek)
}