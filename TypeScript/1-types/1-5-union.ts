{
    //Union Types : OR
    type Direction = 'left' | 'right' | 'up' | 'down'
    function move(direction: Direction) {
        console.log(direction)
    }
    move('left')

    type TileSize = 8 | 16 | 32
    const ts: TileSize = 16

    // function : login -> sucess, fail

    type SucessState = {
        response: {
            body: string,
        },
    }

    type FailState = {
        reason: string
    }

    type LoginState = SucessState | FailState

    function login(): LoginState {
        return {
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
        if ('response' in state) // state안에 'response'라는 키가 있으면
            console.log(state.response.body)
        else {
            console.log(state.reason)
        }
    }
}