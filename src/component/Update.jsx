import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


export default function Update(props) {


    // var regex = new RegExp("^[a-zA-Z0-9 ]+$"); רק אותיות באנגלית ומספרים

    const [newCoins, setNewCoins] =useState(props.coins)
    //יצרתי סטייט כדי לכפות רינדור על ריאקט
    const [render, setRender] = useState(0)
    var allCoinsObj = props.coins
    // ביטוי רגולי זה מאפשר להכניס רק אותיות באנגלית 
    const RegEx = new RegExp('^[a-zA-Z]+$')
    var valType =''
    var newValue = 0
    var flag = false

    let validType = (e) =>{
        valType = e.target.value
        // בדיקה על ידי פונקציה אם הערך תואם את התנאי של הביטוי הרגולרי 
        if(!RegEx.test(valType)){
            alert('ERROR')
        }
    }

    let value = (e) =>{
        newValue = Number(e.target.value) 
    }

    // פונקציה להוספת מטבע חדש או לעדכן ערך של מטבע קיים 
    let newCoin = () =>{
        allCoinsObj.map((item, index) => {
           if(valType ==  item.type[1]){
           allCoinsObj[index].value = newValue
           console.log(allCoinsObj)
           flag = true
           }
        })
        // תנאי על דגל שאומר שבמידה שאין מטבע כזה פשוט להוסיף חדש 
        if(!flag){
        allCoinsObj = [...allCoinsObj,{type:[newValue,valType],value:Number(newValue)}]
        }
        // שליחת עידכון למערך מטבעות בדף הראשי (עידכון שמשנה אותו או מוסף מטבע חדש)
        props.updateFunc(allCoinsObj)
        flag = false
        // ביצוע הרינדור בכפייה 
        setRender(render+1)
    }

    return (
        <div>
          <table id="customers">
            <tr>
                <th>TYPE</th>
                <th>VALUE</th>
            </tr>
            {allCoinsObj.map(item=>{
                return(
                    <tr>
                    <td>{item.type[1]}</td>
                    <td>{item.value}</td>
                    </tr>
                )
            })}
            </table>
            <label>Type </label> 
            <input onChange={validType} type="text"/><br/>
            <label>New value </label>
            <input onChange={value} type="number"/><br/>
            <button onClick={newCoin}>UPDATE</button>
            <Link to= '/Home'><button>BACK</button></Link>
        </div>
    )
}
