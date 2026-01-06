'use client'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const Navbar = () => {

const {data} = useSession()
const router = useRouter()

  return (
     
    <div className='flex px-10 py-5 bg-white justify-between font-bold '>
        <div className='bg-cyan-300 px-8 py-2 rounded-2xl cursor-pointer active:scale-95' onClick={() => router.push('/')}>Note App</div>
        {data && <div>
             <div className='bg-cyan-300 px-8 py-2 rounded-2xl cursor-pointer active:scale-95' onClick={() => router.push('/profile')}>Profile</div> 
        </div>
       
        }
    </div>
  )
}

export default Navbar