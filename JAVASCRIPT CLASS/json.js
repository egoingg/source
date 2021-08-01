//JSON
//JavaScript Object Notation

// 1. object to JSON
    let json = JSON.stringify(['AA','BB'])
    console.log(json);

    const rabbit = {
        name:'tori',
        color:'white',
        birthDate:new Date(),
    }

    let json1 = JSON.stringify(rabbit)
    console.log(json1);

    let json2 = JSON.stringify(rabbit, ["name","color"])
    console.log(json2);

    json2 = JSON.stringify(rabbit, (key, value) => {
        console.log(`${key}: ${value}`); 
        return key==='name' ?   'elle'
                            :   value; 
    })
    console.log(json2);

// 2. json to object

    let obj = JSON.parse(json2, (key, value) => { 
        return key === 'birthDate'  ? new Date(value) 
                                    : value;
        });
    console.log(obj);

    console.log(obj.birthDate.getDate());

