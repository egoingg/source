{

    type CoffeeCup = {
        shots: number
        hasMilk: boolean
    }
    const COFFEE_BEAN_GR_PER_CUP: number = 7
    let coffeeBeans: number = 0

    function makeCoffee(shots: number): CoffeeCup {
        if (coffeeBeans < shots * COFFEE_BEAN_GR_PER_CUP) {
            throw new Error('Not enough coffee beans')
        }
        coffeeBeans -= shots * COFFEE_BEAN_GR_PER_CUP
        return {
            shots,
            hasMilk: false,
        }
    }

    coffeeBeans += 3 * COFFEE_BEAN_GR_PER_CUP
    const coffee = makeCoffee(2)
    console.log(coffee)

}