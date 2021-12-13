
// import React, { useContext, useState, useEffect } from 'react'
import React, { useState, useEffect } from 'react'
export const displaySettings = React.createContext();

export default function Displaycontext(props) {

    const [numOfItems, setNumOfItems] = useState(1);
    const [displayItem, setDisplayItem] = useState(false);

    const getFromStorge = localStorage.getItem('mySetiing')
    useEffect(() => {
        setNumOfItems(getFromStorge ? getFromStorge : 2)

    }, []);

    const settingHandel = (polean, num) => {
        setNumOfItems(num)
        setDisplayItem(polean)
        localStorage.setItem('mySetiing', num);
    }

    const state = {
        displayItem: displayItem,
        numOfItems: numOfItems,
        settingHandel
    }

    return (
        <displaySettings.Provider value={state}>
            {props.children}
        </displaySettings.Provider >
    )
}
