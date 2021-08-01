{
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

        public constructor(coffeeBeans: number, private milk: MilkFrother, private sugar: SugarProvider) {
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
            const coffee = this.extract(shots)
            const sugarAdded = this.sugar.addSugar(coffee)
            return this.milk.makeMilk(sugarAdded)
        }
    }

    interface MilkFrother {
        makeMilk(cup: CoffeeCup): CoffeeCup
    }

    interface SugarProvider {
        addSugar(cup: CoffeeCup): CoffeeCup
    }


    //싸구려 우유 거품기
    class CheapMilkSteamer implements MilkFrother {
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

    class FancyMilkSteamer implements MilkFrother {
        private steamMilk(): void {
            console.log('Fancy steaming some milk...')
        }

        makeMilk(cup: CoffeeCup): CoffeeCup {
            this.steamMilk()
            return {
                ...cup,
                hasMilk: true
            }
        }
    }

    class ColdMilkSteamer implements MilkFrother {
        private steamMilk(): void {
            console.log('Cold steaming some milk...')
        }

        makeMilk(cup: CoffeeCup): CoffeeCup {
            this.steamMilk()
            return {
                ...cup,
                hasMilk: true
            }
        }
    }

    class noMilk implements MilkFrother {
        makeMilk(cup: CoffeeCup): CoffeeCup {
            return cup
        }
    }

    //설탕 제조기
    class CandySugarMixer implements SugarProvider {
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

    class SugarMixer implements SugarProvider {
        private getSuer() {
            console.log('getting some sugar form jar')
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

    class noSugar implements SugarProvider {
        addSugar(cup: CoffeeCup): CoffeeCup {
            return cup
        }
    }


    // milk
    const cheapMilkMaker = new CheapMilkSteamer()
    const fancyMilkMaker = new FancyMilkSteamer()
    const coldMilkMaker = new ColdMilkSteamer()
    const nMilk = new noMilk()

    //sugar
    const candySuger = new CandySugarMixer()
    const suger = new SugarMixer()
    const nSugar = new noSugar()

    const sweetCandyMachine = new coffeeMachine(12, nMilk, candySuger)
    const sweetMachine = new coffeeMachine(12, nMilk, suger)

    const latteMachine = new coffeeMachine(12, cheapMilkMaker, nSugar)
    const coldLatteMachine = new coffeeMachine(12, coldMilkMaker, nSugar)
    const sweetLatteMachine = new coffeeMachine(12, cheapMilkMaker, candySuger)


}