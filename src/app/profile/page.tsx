'use client'
import { userDataContext } from '@/src/context/UserContext'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { HiPencil } from 'react-icons/hi'

const SignOut = () => {
    const data = useContext(userDataContext)
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleSignOut = async () => {
        setLoading(true)
        try {
            await signOut()
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 '>
            {data &&
                <div className='w-full max-w-md border-2 border-white rounded-2xl p-8 shadow-lg text-center relative flex flex-col items-center'>
                    <HiPencil size={22} color='white' className='absolute right-[20px] top-[20px] cursor-pointer' onClick={() => router.push("/edit")} />
                    <div className='w-[100px] h-[100px] rounded-full border-2 flex justify-center items-center border-white transition-all hover:border-blue-500 text-white hover:text-blue-500 cursor-pointer overflow-hidden relative'>
                        {data.user?.image ? <Image src={data.user.image} fill alt='userImage' /> : <CgProfile size={30} color='white' />}
                    </div>
                    <h1 className='text-2xl font-semibold my-4'>Welcome, {data.user?.name}</h1>
                    <button className='w-full py-2 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors' disabled={loading} onClick={handleSignOut}>{loading ? "Signing Out..." : "Sign Out"}</button>
                </div>}
            {!data && <div className='text-white text-2xl'>Loading...</div>}

        </div>
    )
}

export default SignOut