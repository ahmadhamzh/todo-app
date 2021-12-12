import React from 'react'

export const displaySettings = React.createContext();

export default function Displaycontext(props) {
    const state = {
        displayItem: true,
        numOfItems: 5,
        sortItem: 'item'
    }

    return (
        <displaySettings.Provider value={state}>
            {props.children}
        </displaySettings.Provider >
    )
}
