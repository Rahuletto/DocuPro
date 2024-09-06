'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'

export default function Back() {
    const router = useRouter()
  return (
    <button className="text-light-color hidden dark:text-dark-color opacity-40 dark:opacity-40 p-1 border-2 rounded-full 2xl:flex w-fit items-center transition duration-200 justify-center absolute mt-[8px] hover:bg-light-accent-color hover:dark:border-dark-accent-color hover:border-light-accent-color hover:dark:bg-dark-accent-color hover:opacity-80 hover:text-dark-color hover:dark:text-light-color text-sm -ml-12 border-light-color dark:border-dark-color" onClick={() => router.back()}><FaArrowLeft /></button>
  )
}
