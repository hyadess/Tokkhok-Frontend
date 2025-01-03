import React, { useState, useEffect } from 'react'
import { RemoveReadingRoomItem, useReadingRoom, useReadingRoomEmpty, useReadingRoomUpdate } from '../../context/ReadingRoomContextProvider'
import { Modal, Label, TextInput, Checkbox, Button, Textarea, ToggleSwitch, Spinner } from 'flowbite-react'
import { CgAddR, CgClose } from 'react-icons/cg';
import { MdArrowBackIosNew } from 'react-icons/md';
import { TbViewfinder } from 'react-icons/tb';

export default function BookReader() {
    const windowWidth = window.innerWidth
    let frameWidth = 0;
    if (windowWidth > 600) {
        frameWidth = windowWidth * 0.5
    }
    else {
        frameWidth = windowWidth * 0.9
    }
    const readingRoomItems = useReadingRoom()
    const readingRoomEmpty = useReadingRoomEmpty()
    const removeItem = RemoveReadingRoomItem()
    const updateReadingRoom = useReadingRoomUpdate()
    const readingRoom = useReadingRoom()
    const [docID, setDocID] = useState()
    const [loading,setLoading]=useState(true)
    const [curId,setCurId]=useState(null)
    const [emptyRoom,setEmptyRoom]=useState(true)
    const [title,setTitle]=useState()
    const [id,setId]=useState()
    const [openNewModal, setOpenNewModal] = useState(false)
    const [viewMode,setViewMode]=useState(false)
    const [gridView,setGridView]=useState(true)
    useEffect(() => {
        console.log(readingRoomItems)
        if (readingRoomItems[0] != null) {
            setCurId(readingRoomItems[0].id)
            setEmptyRoom(false)
            setLoading(false)
        }

    }, [])
   
    // 1eQIIhhilhKxqS1sQZFFfUFnQzTXOQxHn
    // 1XHpoO4l9ukUJiCck00QX61t6s-SI89Kl
    // 1UHQZupr1qdShixFd168x466Ci3SaDlo7

    return (
        <div className='md:pt-20 pb-20 md:pb-0 min-h-screen w-screen flex flex-col justify-center dark:bg-slate-900'>
            <div className="fixed top-10 left-10 p-4 rounded-full bg-gray-200 hover:bg-gray-300 shadow-md dark:bg-slate-700 dark:hover:bg-slate-600 cursor-pointer" onClick={()=>window.history.back()}>
                <MdArrowBackIosNew size={24} className='dark:text-white' />
            </div>
            <div className="fixed top-10 w-full flex items-center justify-center" onClick={()=>window.history.back()}>
                <h2 className='text-xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl text-primary-500'>PDF Reading Room </h2>
            </div>
            <div className="fixed top-10 right-10 p-4 rounded-full bg-gray-200 hover:bg-gray-300 shadow-md dark:bg-slate-700 dark:hover:bg-slate-600 cursor-pointer" onClick={()=>setOpenNewModal(true)}>
                <CgAddR size={24} className='dark:text-white' />
            </div>
            <div className="fixed bottom-10 right-10 p-4 rounded-full bg-primary-500 hover:bg-primary-600 cursor-pointer shadow-md " onClick={()=>setViewMode(true)}>
                <TbViewfinder size={24} className='dark:text-white' />
            </div>
    
            {/*windowWidth > 600 && <div style={{ height: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {emptyRoom && <p>Your room is currently empty</p>}
                {!emptyRoom &&
                    <div style={{ width: "100vw", display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <div style={{ width: "25vw", maxHeight: "100vh", display: "flex", flexDirection: "column", flexWrap: "wrap", overflowY: "scroll" }}>
                            {readingRoomItems.map((a, idx) => (<div elevation={5} onClick={() => {
                                setLoading(true)
                                setCurId(a.id)
                                setLoading(false)
                            }} style={{ backgroundImage: `url(https://i.postimg.cc/zvLSFsrz/12572822-SL-022620-28420-06.jpg)`, position: "relative", width: "300px", minHeight: "75px", paddingBottom: "3px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginY: "10px", marginX: "50px" }}>
                                <CgClose onClick={() => {
                                    removeItem(idx)
                                }} style={{ position: "absolute", top: "0", right: "0" }} color="white" />
                                {/* <img  src="https://i.postimg.cc/zvLSFsrz/12572822-SL-022620-28420-06.jpg" style={{width:"300px"}}/> */}
                                {/* <div style={{ paddingX: "10px" }}> <p variant="h6" style={{ color: "black" }}>{a.name}</p></div>

                            </div>))}
                        </div>
                        
                        {loading && <Spinner />}
                    </div>


                }

            </div>*/}
            {!loading && <iframe src={`https://drive.google.com/file/d/${curId}/preview`} className='h-screen' sanddiv='allow-scripts allow-same-origin'></iframe>}
            { <div style={{ height: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                

            </div>}
            <Modal show={openNewModal} aria-hidden="true" size="7xl" dismissible onClose={() => setOpenNewModal(false)}>
            <Modal.Header>Add New PDF</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                <TextInput placeholder="Document Title" id="doc-title" />
                <TextInput placeholder="Document ID" id="doc-id" />
                <button type="button" class="h-full focus:outline-none text-white font-semibold bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:focus:ring-yellow-900" onClick={()=>{updateReadingRoom({name:document.getElementById("doc-title").value,id:document.getElementById("doc-id").value})}}>Save</button>
                </div>
            </Modal.Body>
            </Modal>
            <Modal show={viewMode} dismissible onClose={() => setViewMode(false)}>
            <Modal.Header>Select PDF</Modal.Header>
            <Modal.Body>
                <div className='w-full h-full'>
                {emptyRoom && <p>Your room is currently empty</p>}
                {!emptyRoom &&
                    <div className='flex items-center justify-center'>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-3 overflow-y-scroll noscrollbar'>
                            {readingRoomItems.map((a, idx) => (<div elevation={5} onClick={() => {
                                setLoading(true)
                                setCurId(a.id)
                                setViewMode(false)
                                setLoading(false)
                            }} color="secondary" variant="outlined" style={{ width: "150px", position: "relative", minHeight: "75px", paddingY: "3px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginY: "10px", marginX: "5px" }}>
                                <CgClose onClick={() => { removeItem(idx) }} style={{ position: "absolute", top: "0", right: "0" }} color="white" />
                                <img src="https://i.postimg.cc/zvLSFsrz/12572822-SL-022620-28420-06.jpg" style={{ width: "150px" }} />
                                <p className='dark:text-white'>{a.name}</p>
                            </div>))}
                        </div>

                    </div>


                }

                </div>
            </Modal.Body>
            </Modal>


        </div>
    )
}
