import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';

export default function List(props) {

    let deleteList = (e,index) =>{
        console.log(props.history)
        console.log(index)
        props.delete(props.history,index)
    }

    return (
        <div>
            {props.history.map((item, index)=>{
                return( 
                <div>
                    <p className = 'list'>#{index +1}</p>
                    <p className = 'list'>{`${item.value} ${item.fromValue} = ${item.sum.toString().substring(0, 6)}  ${item.toValue}`}</p>
                    <span onClick={(e)=>{deleteList(e,index)}}><DeleteIcon style={{ fontSize: 22 }}/></span>
                </div>
                )
            })}
        </div>
    )
}
