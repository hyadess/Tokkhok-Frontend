import React, { useEffect, useState } from 'react'
// import Navigation from '../../components/Navigation'
// import NavigationWide from '../../components/NavigationWide'
import NotesOptionCard from '../../components/Notes/NotesOptionCard'


export default function Notes() {
  const [width, setWidth] = useState(600)
  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])
  return (
    <div className='pb-20 dark:bg-slate-900'>
      {/* {width > 600 && <NavigationWide />} */}
      {/* {width <= 600 && <Navigation />} */}

      <div className="min-h-screen bg-base flex flex-wrap flex-col  font-primary dark:bg-slate-900" style={{ alignItems: "center", justifyContent: "center" }}>
        <h2 class="mb-4 text-center md:text-left text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"> Choose your option <span class="text-amber-600 dark:text-amber-500">Create  </span> or <span class="text-amber-600 dark:text-amber-500">View</span></h2>
        <div className="w-1/2 options grid grid-cols-1 gap-3 md:grid-cols-4">
            <NotesOptionCard id="create" name="Create Note"/>
            <NotesOptionCard id="view" name="View your notes"/>
            <NotesOptionCard id="add" name="Add pdf notes"/>
            <NotesOptionCard id="public" name="View Public Notes"/>
        </div>
      </div>

    </div>
  )
}
