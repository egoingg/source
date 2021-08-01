{
    //다형성

    type CoffeeCup = {
        shots: number
        hasMilk?: boolean
        hasSugar?: boolean
    }

    interface CoffeeMaker {
        makeCoffee(shots: number): CoffeeCup
    }

    abstract class coffeeMachine implements CoffeeMaker {
        private static COFFEE_BEAN_GR_PER_CUP: number = 7 // class level
        private coffeeBeans: number = 0 // instance

        public constructor(coffeeBeans: number) {
            this.coffeeBeans = coffeeBeans
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

        protected abstract extract(shots: number): CoffeeCup


        makeCoffee(shots: number): CoffeeCup {
            this.grindBeans(shots)
            this.preheat()
            return this.extract(shots)
        }
    }

    class CaffeLatteMachine extends coffeeMachine {
        constructor(beans: number, public readonly serialNumber: string) {
            super(beans) // 자식 생성자애서는 부모 생성자까지 호출해줘야함
        }
        private steamMilk(): void {
            console.log('steamMilk...')
        }

        protected extract(shots: number): CoffeeCup {
            this.steamMilk()
            return {
                shots,
                hasMilk: true,
            }
        }
    }

    class SweetCoffeeMachine extends coffeeMachine {

        protected extract(shots: number): CoffeeCup {

            return {
                shots,
                hasSugar: true,
            }
        }
    }

    const machines: CoffeeMaker[] = [
        new CaffeLatteMachine(16, 'ssss'),
        new SweetCoffeeMachine(16),
        new CaffeLatteMachine(16, 'ssss'),
        new SweetCoffeeMachine(16),
    ]

    machines.forEach((machine) => {
        console.log('---------------------------------')
        machine.makeCoffee(1)
    })
}