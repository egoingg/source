import React, {useState} from 'react';
import {Card , Carousel} from 'react-bootstrap';
import axios from 'axios'; //ajax 요청 라이브러리-- 더보기 기능
import { useHistory } from 'react-router';
import img_carousel1 from './img/carousel1.png'
import img_carousel2 from './img/carousel2.png'

function Main(props) {
    let [isLoading, setLoading] = useState(false)

    let getCardComp = () => {
        let arr = []
        for (let i = 0; i < props.items.length; i++) {
          arr.push( <CardComp item = {props.items[i]}   key = {i}  /> )
        }
        return arr
      }

      //더보기기능- 서버에 ajax 요청
    let onMore = () =>{
        setLoading(true)

        axios.get('https://jungyooree.github.io/data'+ (props.cntClickMore + 2) + '.json') 
        .then((result)=>{ 

          let cnt =props.cntClickMore;
          props.setCntClickMore(cnt+1)

            //서버에서 get한 데이터를 state에 add
            let arr = [...props.items, ...result.data]
            props.setItems(arr)
            setLoading(false)
        })
        .catch((err) =>{ 
            console.log('ajax get 요청 실패', err)
            setLoading(false)
        })
    }
    return (
        <div>
            {/* <Jumbotron className='Jumbotron' fluid></Jumbotron> */}
            <Carousel >
              <Carousel.Item interval={3000} >
                <img style={{height: '19rem'}}
                  className="d-block w-100"
                  src={img_carousel1}
                  alt="First slide"
                />
              </Carousel.Item>

              <Carousel.Item interval={3000} >
                <img style={{height: '19rem'}}
                  className="d-block w-100"
                  src={img_carousel2}
                  alt="Second slide"
                />
              </Carousel.Item>
            </Carousel>
            
            <div className='container'>
                <div className='row mt-5'>
                { getCardComp() }
                </div>
                { 
                  props.cntClickMore < 1
                  ? <button className="btn btn-primary mb-5" onClick = {onMore}>{isLoading ? 'Loading…' : 'MORE+'}</button>
                  : null
                }
                
            </div>
        </div>
    )
}

function CardComp(props) {
    let history = useHistory()
    return (
      <div className='col-md-4 mb-5' onClick={()=>{
        history.push('/detail/'+ props.item.id) 
        window.scrollTo(0,0) //스크롤위치 상위로
        }}>
        <Card style={{ width: '20rem', cursor:'pointer', margin:'auto'}}>
          <Card.Img variant="top" src= {'https://jungyooree.github.io/item'+ (props.item.id + 1) +'.jpg'}/>
          <Card.Body>
            <Card.Title>{props.item.title}</Card.Title>
            <Card.Text>{props.item.content}</Card.Text>
            <Card.Text>{props.item.price.toLocaleString()}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }

export default Main
