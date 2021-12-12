import React from 'react'

export default function header(props) {
    return (
        <div>
             <h1>To Do List: {props.incomplete} items pending</h1>
        </div>
    )
}
