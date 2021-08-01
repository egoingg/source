import React, {useState} from 'react'

function Sort(props) {
    const [sortNum, setSortNum] = useState(0)

    const onChangeSort = (e)=>{
        e.current.target
    }
    return (
        <div className='m'>
            <ul>
                <li  onClick={ onChangeSort(e) }>등록순</li>
                <li  onClick={ onChangeSort }>상품명</li>
                <li>낮은가격</li>
                <li>높은가격</li>
            </ul>
        
        </div>
    )
}

export default Sort
