//callback hell example
class  UserStorage {
    loginUser(id, password, onSucess, onError){
        setTimeout(()=>{
            if ( 
                (id === 'ellie' && password === 'dream') ||
                (id === 'coder' && password === 'academy')
            ){
                onSucess(id);
            }else {
                onError( new Error('net found'));
            }
        },2000);
    }

    getRoles(user, onSucess, onError){
        setTimeout(()=>{
            if  (user === 'ellie' ) 
            {
                onSucess({name:'ellie', role:'admin'});
            }else {
                onError( new Error('no access'));
            }
        },1000);

    }
}

const userStorage = new UserStorage();
const id = 'ellie';
const password ='dream';

userStorage.loginUser(id, password, 
            function(id){ console.log(id);
                            userStorage.getRoles(
                                                    id,
                                                    function(user){ alert(`hellow${user.name}, you have ${user.role} role`)}, 
                                                    function(err){ console.log(err)}
            )
    },
    function(err){ console.log(err)},
    
    )