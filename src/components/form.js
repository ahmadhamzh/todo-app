import React from 'react'
// import useForm from '../hooks/form'
import './form.css'


export default function form(props) {
    return (
        <>
         <h2>To Do List: {props.incomplete} items pending</h2>
         
            <form id='addForm' onSubmit={props.handleSubmit}>
                <h2>Add To Do Item</h2>
                <label>
                    <span>To Do Item</span>
                    <input onChange={props.handleChange} name="text" type="text" placeholder="Item Details" />
                </label>
                <label>
                    <span>Assigned To</span>
                    <input onChange={props.handleChange} name="assignee" type="text" placeholder="Assignee Name" />
                </label>
                <label>
                    <span>Difficulty</span>
                    <input onChange={props.handleChange} defaultValue={3} type="range" min={1} max={5} name="difficulty" />
                </label>
                <label>
                    <button type="submit">Add Item</button>
                </label>
            </form>           


        </>
    )
}
