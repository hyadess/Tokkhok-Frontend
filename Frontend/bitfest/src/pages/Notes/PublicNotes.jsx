import { useNavigate,useParams } from 'react-router';
import React,{useState} from 'react'
import MDEditor from '@uiw/react-md-editor';
import { Spinner, ToggleSwitch } from 'flowbite-react';
import Navbar from "../../components/navbar/Navbar";
// import Navigation from '../../components/Navigation';
import {AiOutlineSave} from 'react-icons/ai'
import { CgRemove } from 'react-icons/cg';
import { useAuth } from "../../context/AuthContext";
import axios from 'axios'
import { BsGrid3X2Gap } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md'
import { PiListFill } from 'react-icons/pi';
import { Edit, EditAttributesRounded } from '@mui/icons-material';
import NotesFilter from '../../components/Notes/NotesFilter';

const BASE_URL = 'http://127.0.0.1:8000';

export default function PublicNotes() {
    const navigator=useNavigate()
    const urlParams=useParams()
    const {buldrUser} = useAuth();

    const [data, setData] = useState(null);
    const [loading,setLoading]=useState(true)
    const [gridView,setGridView]=useState(true)
    const [tags,setTags]=useState([])


    const getData=async()=>{
        const res=await axios.get(BASE_URL+"/notes")
        setData(res.data)
        console.log(res.data)
        setLoading(false)
    }
    const deleteNote=async(id)=>{
        const res=await axios.delete(BASE_URL+"/note/"+id)
        window.location.reload()
      }
      const newFetch=async(items)=>{
        const param=[...items]
        setLoading(true)
        const res = await axios.get(BASE_URL+"/notes/tags?tags="+param)
        setData(res.data)
        setLoading(false)
      }
    React.useEffect(()=>{
        getData()
    },[])
    return (
        <div>
            <Navbar/>
            {/* <Navigation/> */}
            <NotesFilter newFetch={newFetch}/>
        <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}} className="w-full dark:bg-slate-900">
            
           
            <div className='mt-24 mb-4 flex flex-col items-center'>
                <h2 className='text-xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl text-primary-500'>Public Notes </h2>
                <h2 className='mb-4 text-lg text-center font-normal leading-none tracking-tight text-gray-900 md:text-lg lg:text-lg dark:text-white'>A list of all notes made public by our users </h2>
            </div>
            <div className="w-full flex items-center justify-center">
            <div class="inline-flex rounded-md shadow-sm" role="group">
                <button onClick={() => setGridView(true)} type="button" class="inline-flex gap-1 items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-primary-500 dark:focus:text-white">
                    <BsGrid3X2Gap size={16} /> <span className='hidden md:flex'> Grid View</span>
                </button>
                <button onClick={() => setGridView(false)} type="button" class="inline-flex gap-1 items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-primary-500 dark:focus:text-white">
                    <PiListFill size={16} /> <span className='hidden md:flex'> List View</span>
                </button>
            
                </div>

            </div>
            {!loading && gridView && <div className='grid md:grid-cols-2 md:p-20 md:mr-24 gap-4 lg:grid-cols-3 grid-cols-1'>
                {data.map(a=>(
                     <article class="p-6 bg-white max-w-xl mx-5 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                     <img class="w-full mb-2 rounded-lg " src={a.image} alt="projectImage" />
                     <div class="flex justify-between items-center mb-5 text-gray-500">
                       {a.tags.length!=0 && <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                         {/* <svg class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg> */}
                         {a.tags[0]}
                       </span>}
                     </div>
                     {a.userID==buldrUser && <button onClick={()=>deleteNote(a.noteID)} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 mr-2 mt-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" ><MdOutlineDelete size={24}/></button>}
                     
                     <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">{a.title}</a></h2>
                     <p class="mb-5 font-light text-gray-500 dark:text-gray-400">{a.subtitle}</p>
                     <div class="flex flex-row justify-start items-center">
                     {a.userID==buldrUser && <button onClick={()=>navigator('/note/edit/'+a.noteID)} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-2 py-2 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-red-900" ><Edit size={24}/></button>}
                     <button type="button" class="focus:outline-none text-white font-semibold bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:focus:ring-yellow-900" onClick={()=>navigator('/note-viewer/'+a.noteID)}>View</button>
                       
                     </div>
                   </article>
                ))}
            </div>}
            {!loading && !gridView && <div className='w-full flex flex-col md:p-24 md:mr-24'>
                {data.map(a=>(
                     <article class="p-2 flex items-center justify-between bg-white w-full rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex">
                        <img class="w-24 mr-2 rounded-lg " src={a.image} alt="projectImage" style={{objectFit:"contain"}}/>
                        <div className='max-w-4xl'>
                            
                            <div class="flex justify-between items-center mb-5 text-gray-500">
                            {a.tags.length!=0 && <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                                {a.tags[0]}
                            </span>}
                            </div>
                    
                            <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">{a.title}</a></h2>
                            <p class="mb-5 font-light text-gray-500 dark:text-gray-400">{a.subtitle}</p>
                        </div>
                    </div>
                     
                     <div class="flex flex-col justify-center items-start">
                        <button type="button" class="focus:outline-none text-white font-semibold bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900" onClick={()=>navigator('/note-viewer/'+a.noteID)}>View</button>
                        {a.userID==buldrUser && <button onClick={()=>deleteNote(a.noteID)} type="button" class="focus:outline-none text-white font-semibold bg-red-500 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-red-900" >Delete</button>}
                     </div>
                   </article>
                ))}
            </div>}
            {loading && <div elevation={5} style={{zIndex:"5",width:"80vw",minHeight:"50vh",margin:"5vh 0",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"50px"}}><Spinner /><p fontFamily="Oswald">Loading ....</p></div>}
         
        
        </div>
        </div>
    )
}
