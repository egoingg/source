{
    /**
     * Let's make a game 🕹
     */
    type command = 'up' | 'down' | 'left' | 'right'

    type xy = {
        x: number
        y: number
    }

    const position: xy = { x: 0, y: 0 }

    function move(cmd: command): void {

        switch (cmd) {
            case 'up':
                position.y += 1
                break;
            case 'down':
                position.y = position.y - 1
                break;
            case 'left':
                position.x = position.x - 1
                break;
            case 'right':
                position.x = position.x + 1
                break;
            default:
                throw new Error('message other command');
        }

    }

    console.log(position); // { x: 0, y: 0}
    move('up');
    console.log(position); // { x: 0, y: 1}
    move('down');
    console.log(position); // { x: 0, y: 0}
    move('left');
    console.log(position); // { x: -1, y: 0}
    move('right');
    console.log(position); // { x: 0, y: 0}
}
