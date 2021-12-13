import React, { useContext, useState, useEffect } from 'react'
import { displaySettings } from './context'
import { Button, Card } from "@blueprintjs/core";
import './list.css'

export default function List(props) {
    const context = useContext(displaySettings);
    const [pageNumber, setPageNumber] = useState({ start: 0, end: context.numOfItems, numPages: 1, cure: 1 })
    console.log((pageNumber.numPages), '==========');
    useEffect(() => {
        setPageNumber({ ...pageNumber, numPages: Math.ceil((props.list.length / context.numOfItems)) })
    }, [Math.ceil((props.list.length / context.numOfItems))])

    function handelNext() {
        if (pageNumber.cure <= pageNumber.numPages - 1) {
            setPageNumber({ ...pageNumber, start: pageNumber.start + context.numOfItems, end: pageNumber.end + context.numOfItems, cure: pageNumber.cure + 1 })
        }
    }

    function renderList(polean) {
        let render;
        if (polean === true) {
            render = props.list.filter(item => !item.complete)

        } else {
            render = props.list
        }
        return render
    }

    function handelPrev() {
        if (pageNumber.cure - 1 > 0) {
            setPageNumber({ ...pageNumber, start: pageNumber.start - context.numOfItems, end: pageNumber.end - context.numOfItems, cure: pageNumber.cure - 1 })
        }
    }

    return (
        <div id='list'>
            {renderList(context.displayItem).slice(pageNumber.start, pageNumber.end).map(item => (

                <Card id="card">
                    <h3>{item.text}</h3>
                    <p>Assigned to: {item.assignee}</p>
                    <p>Difficulty: {item.difficulty}</p>
                    <Button onClick={() => props.toggleComplete(item.id)} > Complete : {item.complete.toString()} </Button>
                </Card>
            ))}

            <Button onClick={() => handelNext()}>next</Button>
            <label>{pageNumber.cure}/{pageNumber.numPages}</label>
            <Button onClick={() => handelPrev()}>prev</Button>
        </div>
    )
}
