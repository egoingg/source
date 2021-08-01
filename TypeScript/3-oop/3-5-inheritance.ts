{
    //상속


    type CoffeeCup = {
        shots: number
        hasMilk: boolean
    }

    interface CoffeeMaker {
        makeCoffee(shots: number): CoffeeCup
    }

    class coffeeMachine implements CoffeeMaker {
        private static COFFEE_BEAN_GR_PER_CUP: number = 7 // class level
        private coffeeBeans: number = 0 // instance

        public constructor(coffeeBeans: number) {
            this.coffeeBeans = coffeeBeans
        }

        static makeMachine(beans: number): coffeeMachine {
            return new coffeeMachine(beans)
        }

        clean(): void {
            console.log(`cleaning the machine..`)
        }

        fillCoffeeBeans(beans: number) {
            if (beans < 0) {
                throw new Error('value for beans should be greater than 0')
            }
            this.coffeeBeans += beans
        }

        private grindBeans(shots: number) {
            console.log(`grinding beans for ${shots}`)
            if (this.coffeeBeans < shots * coffeeMachine.COFFEE_BEAN_GR_PER_CUP) {
                throw new Error('Not enough coffee beans')
            }
            this.coffeeBeans -= shots * coffeeMachine.COFFEE_BEAN_GR_PER_CUP
        }

        private preheat(): void {
            console.log('heating up...')
        }

        private extract(shots: number): CoffeeCup {
            console.log(`pulling ${shots}`)
            return {
                shots,
                hasMilk: false,
            }
        }
        makeCoffee(shots: number): CoffeeCup {
            this.grindBeans(shots)
            this.preheat()
            return this.extract(shots)
            // if (this.coffeeBeans < shots * coffeeMachine.COFFEE_BEAN_GR_PER_CUP) {
            //     throw new Error('Not enough coffee beans')
            // }
            // this.coffeeBeans -= shots * coffeeMachine.COFFEE_BEAN_GR_PER_CUP
            // return {
            //     shots,
            //     hasMilk: false,
            // }
        }
    }

    class CaffeLatteMachine extends coffeeMachine {
        constructor(beans: number, public readonly serialNumber: string) {
            super(beans) // 자식 생성자애서는 부모 생성자까지 호출해줘야함
        }
        private steamMilk(): void {
            console.log('steamMilk...')
        }
        //overrding
        makeCoffee(shots: number): CoffeeCup {
            const coffee = super.makeCoffee(shots)
            this.steamMilk()
            return {
                ...coffee,
                hasMilk: true
            }
        }
    }

    const machine = new coffeeMachine(32)
    const latteMachine = new CaffeLatteMachine(32, 'sssss')
    const coffee = latteMachine.makeCoffee(1)
    console.log(coffee)
    console.log(latteMachine.serialNumber)
}