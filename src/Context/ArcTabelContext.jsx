import { createContext, useEffect, useState } from "react";
export let ArcContext = createContext()
export default function ArcContextProvider({ children }) {
    let [ArcData, setArcData] = useState([])
    let [parentId, setId] = useState('')
    let [isChild, setIsChild] = useState('')
    let [pathArray, setPathArray] = useState([])
    let [idPath, setidPath] = useState('')


    function setPath(path) {
        setPathArray([])
        pathArray.push(path)
        localStorage.setItem('path', JSON.stringify(pathArray))
    }

    return <>
        <ArcContext.Provider value={{ ArcData, setArcData, parentId, setId, isChild, setIsChild, setPath, pathArray, idPath, setidPath }} >
            {children}
        </ArcContext.Provider>
    </>
}