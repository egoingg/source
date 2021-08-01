import React, {useEffect, useState} from ‘react’;
import {dbService} from ‘../fbase.js’
import React, { useState } from 'react'



function infodd(props){
        
        console.log('')
        
        
        const [info, setInfo] = useState([]);
var array =[1,2,3]
const newLocal = array.filter();
const getInfo = async () =>{
                            const dbinfo = await dbService.collection(“UKOV”).get();
                            
                            dbinfo.forEach((document) => {
                                    const newInfo = {document.data(),id: document.id};
                                    setInfo([newInfo])});
                            };

                            

useEffect(()=>{
            getInfo();
}, [])

return (
<>
<div className="container">
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
</div>

{info.year}
</>
)
}

 

export default info
