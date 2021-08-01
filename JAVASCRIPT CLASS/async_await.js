const f1 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //resolve('1번 주문 완료')
            reject(new Error('err...'))  // 1. 에러가 발생하면 async 함수에서 try catch 문을 작성하여 에러를 잡는다.
        }, 1000)
    })
}

const f2 = (msg) => {
    console.log(msg)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('2번 주문 완료')
        }, 1000)
    })
}

const f3 = (msg) => {
    console.log(msg)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('3번 주문 완료')
        }, 1000)
    })
}

console.log('시작')
async function order() {
    try {
        const result1 = await f1()
        const result2 = await f2(result1)
        const result3 = await f3(result2)
        console.log(result3)
    } catch (error) {
        console.log(error)
    }

    //promise.all[배열]을 사용하여 프로미스를 병렬로 실행할수 있다.

    //result 도 배열로 반환됨 ['1번 주문 완료','2번 주문 완료','3번 주문 완료']
    // async function order() {
    //     try {
    //         const result = await Promise.all([f1(), f2(), f3()]) 
    //         console.log(result)
    //     } catch (error) {
    //         console.log(error)
    // }
    //

    console.log('종료')
}

order()
