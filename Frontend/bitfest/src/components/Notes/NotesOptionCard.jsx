import { PublicOutlined, PublicSharp } from '@mui/icons-material'
import React from 'react'
import {MdEditNote,MdOutlinePreview,MdAddCard} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

export default function NotesOptionCard({id,name,path}) {
    const navigator=useNavigate()
    const catIcons={
        "create":<MdEditNote size="150" className='text-gray-300 my-5 dark:text-gray-600'/>,
        "view":<MdOutlinePreview size="150" className='text-gray-300 my-5 dark:text-gray-600'/>,
        "add":<MdAddCard size="150" className='text-gray-300 my-5 dark:text-gray-600'/>,
        "public":<PublicSharp size="150" className='text-gray-300 my-5 dark:text-gray-600'/>
    }
    const paths={
        'create':"/notes-create",
        'view':"/mynotes",
        'add':"/notes-pdf",
        'public':"/notes-public",
    }
    return (
        <div onClick={()=>navigator(paths[id])} class="w-full m-4 min-w-xs max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                <div className="w-full flex flex-col items-center justify-center">
                    <h5 class="text-xl my-5 font-semibold tracking-tight text-gray-900 dark:text-gray-300">{name}</h5>
                    {catIcons[id]}
                </div>
        </div>

    )
}
