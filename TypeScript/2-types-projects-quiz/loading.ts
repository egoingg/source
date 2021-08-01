{
  /**
   * Print Loading State
   */
  type LoadingState = {
    state: 'loading';
  };

  type SuccessState = {
    state: 'success';
    response: {
      body: string;
    };
  };

  type FailState = {
    state: 'fail';
    reason: string;
  };

  type ResourceLoadState = LoadingState | SuccessState | FailState;

  function printLoginState(st: ResourceLoadState): void {

    switch (st.state) {
      case 'loading':
        console.log(`👀 ${st.state}`)
        break;
      case 'success':
        console.log(`😃 ${st.response.body}`)
        break;
      case 'fail':
        console.log(`😱 ${st.reason}`)
        break;
      default:
        throw new Error('message other state');
    }

  }

  printLoginState({ state: 'loading' }); // 👀 loading...
  printLoginState({ state: 'success', response: { body: 'loaded' } }); // 😃 loaded
  printLoginState({ state: 'fail', reason: 'no network' }); // 😱 no network
}
