'use client'
import React, {useState} from 'react'
import Search from "@/components/SearchBar";

export default function HomeSearch() {
    const [papers, setPapers] = useState(false)
  return (
    <div className='flex flex-col gap-3'>
        
        <Search papers={papers} />
        <div className='flex gap-2 w-full items-center justify-center'>
            <button onClick={() => setPapers(false)} className={`${papers ? "bg-dark-accent-background text-dark-accent-color" : "bg-dark-accent-color text-dark-background-darker"} transition duration-200 px-3 py-1 font-medium text-sm rounded-lg`}>
                Search for semester papers
            </button>
            <button onClick={() => setPapers(true)} className={`${!papers ? "bg-dark-accent-background text-dark-accent-color" : "bg-dark-accent-color text-dark-background-darker"} transition duration-200 px-3 py-1 font-medium text-sm rounded-lg`} >
                Search for resources
            </button>
        </div>
    </div>
  )
}
