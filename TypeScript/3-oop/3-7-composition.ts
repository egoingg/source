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

    //싸구려 우유 거품기
    class CheapMilkSteamer {
        private steamMilk(): void {
            console.log('steaming some milk...')
        }

        makeMilk(cup: CoffeeCup): CoffeeCup {
            this.steamMilk()
            return {
                ...cup,
                hasMilk: true
            }
        }
    }

    //설탕 제조기
    class CandySugarMixer {
        private getSuer() {
            console.log('getting some sugar form candy')
            return true
        }

        addSugar(cup: CoffeeCup): CoffeeCup {
            const sugar = this.getSuer()
            return {
                ...cup,
                hasSugar: sugar
            }
        }
    }

    class CaffeLatteMachine extends coffeeMachine {
        constructor(beans: number, public readonly serialNumber: string, private milkFother: CheapMilkSteamer) {
            super(beans) // 자식 생성자애서는 부모 생성자까지 호출해줘야함
        }
        makeCoffee(shots: number): CoffeeCup {
            const coffee = super.makeCoffee(shots)
            return this.milkFother.makeMilk(coffee)
        }
    }

    class SweetCoffeeMachine extends coffeeMachine {
        constructor(private beans: number, private sugar: CandySugarMixer) {
            super(beans)
        }

        makeCoffee(shots: number): CoffeeCup {
            const coffee = super.makeCoffee(shots)
            return this.sugar.addSugar(coffee)
        }
    }

    class SweetCaffeLatteMachine extends coffeeMachine {
        constructor(private beans: number, private milkFother: CheapMilkSteamer, private sugar: CandySugarMixer) {
            super(beans)
        }

        makeCoffee(shots: number): CoffeeCup {
            const coffee = super.makeCoffee(shots)
            const CoffeeAddedMilk = this.milkFother.makeMilk(coffee)
            const CoffeeAddedSugar = this.sugar.addSugar(CoffeeAddedMilk)
            return CoffeeAddedSugar
        }
    }

    const cheapMilkMaker = new CheapMilkSteamer()
    const candySuger = new CandySugarMixer()

    const sweetMachine = new SweetCoffeeMachine(12, candySuger)
    const latteMachine = new CaffeLatteMachine(12, 'sss', cheapMilkMaker)
    const sweetLatteMachine = new SweetCaffeLatteMachine(12, cheapMilkMaker, candySuger)


}