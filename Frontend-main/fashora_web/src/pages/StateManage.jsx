

import React, { useEffect, useState } from 'react'

export default function StateManage() {
    // state in functional component using useState
    const [data, setData] = useState("Default data")
    // [variable, update function]
    const [num, setNum] = useState(0)
    const updateCurrentData = () => {
        setData("New data")
    }
    // use Effect, dependencies checker
    // 1. Initially logic (API Calls)
    useEffect(
        ()=> {
            setData("Initial Data Change")
        },
        [] // empty for initial run
    )

    // 2. State dependencies
    useEffect(
        () => {
            if(data == "Arya"){
                setNum(10000)
            }
        },
        [data] // list of states
    )

    // Logic num < 0 data Less else More
    useEffect(
        ()=>{
            if(num < 0){
                setData("Less")
            }else{
                setData("More")
            }
        },
        [num]
    )

    const handleName = (e) => setData(e.target.value)
    return (
        <div>
            {data}
            <button onClick={updateCurrentData}>Click Me</button>
            <button onClick={
                () => {
                    setData("From callback")
                }
            }>Click Callback</button>
            <div>
                {num}
                <button onClick={() => setNum(num + 1)}>+</button>
                <button onClick={() => setNum(num - 1)}>-</button>
            </div>
            <div>
                <input onChange={(e)=>setData(e.target.value)}></input>
                <input onChange={handleName}></input>
            </div>
        </div>
    )
}