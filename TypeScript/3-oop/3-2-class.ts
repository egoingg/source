{
    type CoffeeCup = {
        shots: number
        hasMilk: boolean
    }

    class coffeeMaker {
        static COFFEE_BEAN_GR_PER_CUP: number = 7 // class level
        coffeeBeans: number = 0 // instance

        constructor(coffeeBeans: number) {
            this.coffeeBeans = coffeeBeans
        }

        static makeMachine(beans: number): coffeeMaker {
            return new coffeeMaker(beans)
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

    const maker = new coffeeMaker(32)
    console.log(maker)

    const maker1 = coffeeMaker.makeMachine(20) // static func
}