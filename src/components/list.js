import React, { useContext, useState, useEffect } from 'react'
import { displaySettings } from './context'
export default function List(props) {
    const context = useContext(displaySettings);
    const [pageNumber, setPageNumber] = useState({ start: 0, end: 5, numPages: 1, cure: 1 })
    console.log((pageNumber.numPages), '==========');
    useEffect(() => {
        setPageNumber({ ...pageNumber, numPages: Math.ceil((props.list.length / 5)) })
    },[Math.ceil((props.list.length / 5))])
    let pageNumberEnd = context.numOfItems
    function handelNext() {
        if (pageNumber.cure <= pageNumber.numPages - 1) {            
            setPageNumber({ ...pageNumber, start: pageNumber.start + 5, end: pageNumber.end + 5, cure: pageNumber.cure + 1 })
        }
    }
    
    function handelPrev() {        
        if (pageNumber.cure - 1 > 0) {
            setPageNumber({ ...pageNumber, start: pageNumber.start - 5, end: pageNumber.end - 5, cure: pageNumber.cure - 1 })
        }
    }

    return (
        <div>
            {props.list.slice(pageNumber.start, pageNumber.end).map(item => (
                <div key={item.id}>
                    <p>{item.text}</p>
                    <p><small>Assigned to: {item.assignee}</small></p>
                    <p><small>Difficulty: {item.difficulty}</small></p>
                    <div onClick={() => props.toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
                    <hr />

                </div>
            ))}
            <button onClick={() => handelNext()}>next</button>
            <label>{pageNumber.cure}/{pageNumber.numPages}</label>
            <button onClick={() => handelPrev()}>prev</button>
        </div>
    )
}
