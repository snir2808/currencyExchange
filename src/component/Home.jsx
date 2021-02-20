import React, {useState} from 'react'
import {AnimatePresence, motion} from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import List from './List'
import Title from './Title';
import News from './News';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import arrow from './../media/circled-up.png'

export default function Home(props) {

    const [coins, setCoins] = useState(props.coins)
    const [list, setList] = useState(props.list)
    const [disabled, setDisabled] = useState(true)
    const [from, setFrom] = useState()
    const [to, setTo] = useState()
    const [inputValue, setInputValue] = useState()
    var coin = props.coins
    var history = props.list
    const useStyles = makeStyles({
        InputLabel: {
            width: 130,
            marginLeft: '10px',
            marginRight: '10px',
        },
        button:{
            marginTop: '10px'
        }
    })
    const classes = useStyles();

    let fromFunc = (e) =>{
        let fromSelect = e.target.value
        setFrom(fromSelect)
    }
    let toFunc = (e) =>{
        console.log(e.target.value)
        let toSelect = e.target.value
        setTo(toSelect)
    }
    let inputFunc = (e) =>{
        let inputVal = e.target.value
        setInputValue(inputVal)
        if(inputVal.length >0){
            setDisabled(false)
        }else{
            setDisabled(true) 
        }
    }

    // זוהי הפונקציה המרכזית לחישוב ההמרה 
    let calculation = () =>{
        let result = 0;
        // נוסחה לחישוב ההמרה עצמה 
        result = (to[0] * inputValue) / from[0];
        // תנאי: במידה ואין היסטוריית המרות אז פשוט לעשות שינוי כולל לסטייס על ידי פונקציה
        if(list == ''){
            history = [{numberOfCalculation: 0, from: from[1], to: to[1], fromValue : from[1], toValue: to[1], sum: result,value:inputValue}]
            props.setNewList(history)
        // במידה ויש היסטוריית המרות אז אני משתמש בנוסחה שמוסיפה אובייקט חדש למערך בלי למחוק את הישן
        }else{
            history = [...history,{numberOfCalculation: 0, from: from[1], to: to[1], fromValue : from[1], toValue: to[1], sum: result,value:inputValue}]
            props.setNewList(history)
        }
    }
    const pageTransition = {
        in: {
            opacity: 1,
            y:0
        },
        out: {
            opacity: 0,
            y:'-100%'
        }
    }
    return (
        <motion.div 
        initial='out'
        animate='in'
        exit='out'
        variants={pageTransition}>
            <News/>
            <Title/>
   {/* פה הישתמשתי בלולאת מאפ על מנת ליצור תפריט סלקט כדי שאוכל לעדכן אותו בהתאם לאובייקט שמתקבל  */}
        <p className ='p'>
        <h3>Amount</h3><br/>
            <TextField  className={classes.InputLabel}
         onChange={inputFunc}
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        /></p>
        <p  className ='p'>
            <h3>From </h3><br/>
            <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Currency</InputLabel>
        <Select
         style = {{minWidth: '130px'}}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={fromFunc}
          label="Currency">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
            {coin.map(item =>{
                let imgSrc = require(`./../media/${item.type[1]}.png`)
                    return(
                    <MenuItem value={item.type}> <img className='flags' src ={imgSrc.default}/> {item.type[1]}</MenuItem>
                    )
                })}

        </Select>
      </FormControl> 
      </p>
          <img className ='arrow' src ={arrow}/>
      <p  className ='p'>
            <h3>To</h3><br/>
        <FormControl variant="outlined" className={classes.InputLabel}>
        <InputLabel id="demo-simple-select-outlined-label">Currency</InputLabel>
        <Select
         style = {{minWidth: '130px'}}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={toFunc}
          label="Currency">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          
            {coin.map(item =>{
                let imgSrc = require(`./../media/${item.type[1]}.png`)
                    return(
                        <MenuItem value={item.type}> <img className='flags' src ={imgSrc.default}/> {item.type[1]}</MenuItem>
                    )
                })}

        </Select>
      </FormControl> </p><br/>
            {/* פה הישתמשתי בסטייט על מנת לקבוע אם הכפתור יהיה לחיץ או לא .. בהתאם לתוכן האינפוט */}
            <Button   className={classes.button}  variant="outlined" color="primary"  onClick={calculation} disabled = {disabled}>start</Button >

        <div>
        <List history = {list}
        delete = {props.deleteFunc}
        />
        </div>
        </motion.div>
    )
}
