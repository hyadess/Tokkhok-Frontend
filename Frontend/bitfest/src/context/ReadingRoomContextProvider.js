import React , {createContext, useState, useContext} from 'react'
import useLocalStorage from './useLocalStorage'

const ReadingRoomContext=createContext()
const ReadingRoomUpdateContext=createContext()
const ReadingRoomEmptyContext=createContext()
const RemoveReadingRoomItemContext=createContext()

export function useReadingRoom(){
    return useContext(ReadingRoomContext)
}
export function useReadingRoomUpdate(){
    return useContext(ReadingRoomUpdateContext)
}
export function useReadingRoomEmpty(){
    return useContext(ReadingRoomEmptyContext)
}
export function RemoveReadingRoomItem(){
    return useContext(RemoveReadingRoomItemContext)
}

export default function ReadingRoomContextProvider({children}){
    const [readingRoom,setReadingRoom]=useLocalStorage("reading-room-buldr",[])

    const addToReadingRoom=(data)=>{
        setReadingRoom(prev=>[...prev,data])
    }
    const emptyReadingRoom=()=>{
        setReadingRoom([])
    }
    function removeReadingRoomItem(index){
        delete readingRoom[index]
        let newReadingRoom=[]
        readingRoom.forEach(a=>{
            if(a) {newReadingRoom.push(a)}
        })
        setReadingRoom(newReadingRoom)
        
    }
    return(
        <ReadingRoomContext.Provider value={readingRoom}>
            <ReadingRoomUpdateContext.Provider value={addToReadingRoom}>
                <ReadingRoomEmptyContext.Provider value={emptyReadingRoom}>
                    <RemoveReadingRoomItemContext.Provider value={removeReadingRoomItem}>
                        {children}
                    </RemoveReadingRoomItemContext.Provider>
                </ReadingRoomEmptyContext.Provider>
            </ReadingRoomUpdateContext.Provider>
        </ReadingRoomContext.Provider>
    )
}