{
    //μΆμν

    type CoffeeCup = {
        shots: number
        hasMilk: boolean
    }

    interface CoffeeMaker {
        makeCoffee(shots: number): CoffeeCup
    }

    interface CommercialCofeeMaker {
        makeCoffee(shots: number): CoffeeCup
        fillCoffeeBeans(beans: number): void
        clean(): void
    }

    class coffeeMachine implements CoffeeMaker, CommercialCofeeMaker {
        private static COFFEE_BEAN_GR_PER_CUP: number = 7 // class level
        private coffeeBeans: number = 0 // instance

        private constructor(coffeeBeans: number) {
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

    const maker = coffeeMachine.makeMachine(32)
    maker.fillCoffeeBeans(32) // λ©€λ² λ³μ κ° λ³κ²½μ μ κ·Όμ ν¨μλ₯Ό ν΅ν΄μ

    // μΆμν λ°©λ² 1 : μ κ·Όμ νμλ₯Ό μ΄μ©ν μΆμν
    maker.makeCoffee(2) // μ λ§ νμν ν¨μλ§ λΈμΆν΄μ κ°λ¨νκ² νλκ²λ μΆμν, μ λ³΄ μλ(μ μ΄μprivate)μ ν΅ν μΆμν 


    // μΆμν λ°©λ² 2 : interfaceλ₯Ό ν΅ν μΆμν
    //ex1)
    const maker2: CoffeeMaker = coffeeMachine.makeMachine(32)
    maker2.makeCoffee(2)

    //ex2)
    const maker3: CommercialCofeeMaker = coffeeMachine.makeMachine(32)
    maker3.makeCoffee(2)
    maker3.fillCoffeeBeans(32)
    maker3.clean()

    //ex3)
    class AmateurUser {
        private machine: CoffeeMaker
        constructor(Imachine: CoffeeMaker) {
            this.machine = Imachine
        }
        makeCoffee() {
            const coffee = this.machine.makeCoffee(2)
            console.log(coffee)
        }
    }

    class ProBarista {
        private machine: CommercialCofeeMaker
        constructor(Imachine: CommercialCofeeMaker) {
            this.machine = Imachine
        }
        makeCoffee() {
            const coffee = this.machine.makeCoffee(2)
            console.log(coffee)
            this.machine.fillCoffeeBeans(32)
            this.machine.clean()
        }
    }

    const maker4: coffeeMachine = coffeeMachine.makeMachine(32)
    const amateur = new AmateurUser(maker4)
    const proBarista = new ProBarista(maker4)
    //amateur.makeCoffee()
    proBarista.makeCoffee()
}