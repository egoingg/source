{
    type CoffeeCup = {
        shots: number
        hasMilk: boolean
    }
    //캡슐화~~~~~~~
    //public
    //private : 외부에서 절대 볼수 X, 접근 X
    //protected: 외부에서 접근 X, 그러나 ****자식 class 내부**** 에서 접근 O
    class coffeeMaker {
        private static COFFEE_BEAN_GR_PER_CUP: number = 7 // class level
        private coffeeBeans: number = 0 // instance

        private constructor(coffeeBeans: number) {
            this.coffeeBeans = coffeeBeans
        }

        static makeMachine(beans: number): coffeeMaker {
            return new coffeeMaker(beans)
        }

        fillCoffeeBeans(beans: number) {
            if (beans < 0) {
                throw new Error('value for beans should be greater than 0')
            }
            this.coffeeBeans += beans
        }

        makeCoffee(shots: number): CoffeeCup {
            if (this.coffeeBeans < shots * coffeeMaker.COFFEE_BEAN_GR_PER_CUP) {
                throw new Error('Not enough coffee beans')
            }
            this.coffeeBeans -= shots * coffeeMaker.COFFEE_BEAN_GR_PER_CUP
            return {
                shots,
                hasMilk: false,
            }
        }
    }

    const maker = coffeeMaker.makeMachine(32)
    maker.fillCoffeeBeans(32) // 멤버 변수 값변경은 접근은 함수를 통해서

    //getter, setter
    class User {
        private firstName: string
        private lastName: string

        private internalAge = 4

        get getFullName(): string {
            return `${this.firstName} ${this.lastName}`
        }

        get age(): number {
            return this.internalAge
        }

        set age(num: number) {
            if (num < 0) {
                throw new Error('value for age should be more than 0 ')
            }
            this.internalAge = num
        }

        constructor(fname: string, lName: string) {
            this.firstName = fname
            this.lastName = lName
        }

        //생성자를 이렇게 표현할수도 잇음
        //constructor(private firstName:string, private lastName:string){}
    }

    const user = new User('steve', 'jobs')
    user.age = 6
    console.log(user.getFullName)
}