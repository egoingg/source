{
    //차별화 하는 구분할 수 있는 union

    // result라는 값을 공통으로 가지고 있으므로 바로 접근이 가능

    type SucessState = {
        result: 'success'
        response: {
            body: string,
        },
    }

    type FailState = {
        result: 'fail'
        reason: string
    }

    type LoginState = SucessState | FailState

    function login(): LoginState {
        return {
            result: 'success',
            response: {
                body: 'logged in!',
            },
        }
    }
    login()

    //printLoginState(state: LoginState)
    //success -> body
    // fail -> reason

    function printLoginState(state: LoginState) {
        if (state.result === 'success')
            console.log(state.response.body)
        else {
            console.log(state.reason)
        }
    }

}