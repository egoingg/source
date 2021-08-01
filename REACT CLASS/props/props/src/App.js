import logo from './logo.svg';
import react, {useState} from 'react';
import './App.css';


function App() {

  let [title, setTitle] = useState(['강강','강북','강서']);
  let [cnt , setCnt]  = useState(0);
  let [good,setGood] = useState([0,0,0]);
  let [input,setInput] = useState('');

  console.log(title);

  function addTitle () {

    let newArry = [...title];
    newArry.push(input);
    setTitle(newArry);

    let newGood = [...good];
    newGood.push(0);
    setGood(newGood);
  }


  return (
    <div className="App">
    
    
    {
        title.map(function(a, i){
          return <Modal a ={ a } cnt ={ cnt} i = {i} setCnt = {setCnt} good = {good} setGood = {setGood}/>
          })
    }
   
   <div>
     <input type="text" onChange = { function(e) { setInput(e.target.value) } } />
     <button onClick = { addTitle } >저장</button>
   </div>

   {
     <ModalDetail title = {title} cnt = { cnt }/>
   }
     
    </div>
  );
}

function Modal(props){

  function addGood( props){

    let newarr = [...props.good];
    newarr[props.i]++;

    props.setGood(newarr);
  }
 
  return (
      <div className="list">
        <h4 onClick= { () => { props.setCnt(props.i)} }>
          {props.a}
          <span onClick= { () => { addGood(props) }}>👍</span> { props.good[props.i]}
        </h4>
        <p>2021/4/8</p>
      </div>
  )
}

function ModalDetail(props){
  console.log(props.title, props.cnt);
  return (
      <div className="detail">
        <h4>{props.title[props.cnt]}</h4>
      </div>
  )
}

export default App;
