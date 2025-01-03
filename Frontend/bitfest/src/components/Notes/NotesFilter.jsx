import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const BASE_URL = 'http://127.0.0.1:8000';
export default function NotesFilter({newFetch}) {
    const navigator = useNavigate()
    const [currentTags,setCurrentTags]=useState([])
    const [allTags,setAllTags]=useState([])
    const [loading,setLoading]=useState(true)
    function removeItem(item){
        let newItems=[]
        currentTags.forEach(a=>{
            if(a!=item) {newItems.push(a)}
        })
        setCurrentTags(newItems)
    }
    let endpoints = [
        BASE_URL+"/notes"
      ];
      const allRequests = async () => {
        axios.all(endpoints.map((promise) => axios.get(promise))).then(
          axios.spread((allnotes) => {
            const notes = allnotes.data
            let tags=[]
            allnotes.data.map(a=>{
                a.tags.map(b=>{
                    if(!tags.includes(b)) tags.push(b)
                })
            })
            setAllTags(tags)
            setLoading(false)

          })
        )
      }
    useEffect(() => {
      allRequests()
    }, [])
    useEffect(() => {
        if(currentTags.length!=0){
            const tgs=[]
            currentTags.forEach(a=>{
                tgs.push(a)
            })
            newFetch(tgs)
        }
      
    }, [currentTags])
    
    const switchPath = (pathname) => {
        navigator(pathname)
    }
    const Color="red"
    return (
      <div>
        <aside
          id="default-sidebar"
          class="fixed hidden md:flex top-0 right-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidenav"
        >
          <div class=" py-5  px-3 h-full overflow-y-scroll noscrollbar  bg-white border-l border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <a href="http://localhost:3001">
              <figure class="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0 ">
                <a href="#">
                  <img
                    class="rounded-lg"
                    src="https://i.postimg.cc/ydxrgctv/image.png"
                    alt="marketplace"
                  />
                </a>
                <figcaption class="absolute px-4 text-md text-white bottom-6">
                  <p className="bg-white px-2 my-2 text-primary-500 font-semibold">
                    See our marketplace
                  </p>
                  <p className="w-1/2 text-sm bg-primary-500 px-2 rounded-full">
                    Visit Now
                  </p>
                </figcaption>
              </figure>
            </a>
            <h5
              id="drawer-label "
              class="inline-flex items-center mb-4 mt-8 text-base font-semibold text-gray-500 dark:text-gray-400"
            >
              View By Tags
            </h5>

            {!loading &&
              allTags.map((a) => (
                <div class="flex items-center my-2">
                  <input
                    type="checkbox"
                    value={a}
                    onChange={(e) => {
                      removeItem(e.target.value);
                      if (e.target.checked == true) {
                        setCurrentTags((currentTags) => [
                          ...currentTags,
                          e.target.value,
                        ]);
                      } else {
                        setCurrentTags((currentTags) => [...currentTags]);
                        if (currentTags.length == 0) {
                          setCurrentTags(allTags);
                        }
                      }
                    }}
                    class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    <span
                      className={`bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800`}
                    >
                      {a}
                    </span>
                  </label>
                </div>
              ))}
          </div>
        </aside>
      </div>
    );
}
