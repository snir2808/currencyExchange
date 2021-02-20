import React, {useState} from 'react'
import { HashRouter as Router, Switch, Route, } from "react-router-dom";
import {AnimatePresence, motion} from 'framer-motion';
import Welcome from './component/Welcome'
import Home from './component/Home.jsx'
import './App.css';
import Update from './component/Update.jsx';

function App(){

  var obj = []

  fetch('https://api.ratesapi.io/api/latest?base=USD')
  .then(response => response.json())
  .then((data) => {
    data.rates = Object.entries(data.rates)
    data.rates.map(item => {
      obj.push({type:[item[1],item[0]],value:item[1]})
    })
  })
  // סטייט שמחזיק את המערך אובייקטים הראשי של המטבעות הדיפולטיבים

  const [coinsList, setCoinsList] = useState(obj)

  const [list ,setList] =useState([])

  let history = (history) =>{
    setList(history)
  }
  
  let update = (newObg) =>{
    setCoinsList(newObg)
  }
  let deleteList = (oldList,i) =>{
    oldList = oldList.filter((post, index) => i !== index)
    setList(oldList)
}  
    
  return (
    <div className="App">
     
      <Router>
        <AnimatePresence>
        <Switch>
        <Route exact path='/' component={()=>{return(<Welcome/>)}}/>

          <Route path='/Home' component={()=>{return(<Home setNewList={history} list ={list} coins={coinsList} deleteFunc = {deleteList}/>)}}>
          </Route>
          <Route path='/update' component={()=>{return(<Update coins={coinsList}
          updateFunc={update}
          />)}}>
          </Route>
        </Switch>
            </AnimatePresence>
      </Router>
    </div>
  );
}

export default App;
