'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function VerifyEmailPage() {
    const [token, setToken] = useState('')
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', {token})
            setVerified(true)
        } catch (error: any) {
            setError(true)
            console.log(error.response.data)
        }
    }

    useEffect(()=>{
        const urlToken = window.location.search.split('=')[1]
        setToken(urlToken || '')
    }, [])

    useEffect(()=>{
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen 
                        border-solid border-2 border-indigo-600 p-4">
            <div className="flex flex-col items-center justify-center border-solid 
                            border-2 border-indigo-500 p-4">
                <p className="text-xs">{ token? `${token}`: 'No Token' }</p>
                {
                    verified &&
                    <>
                        <p className='text-green'>Token verified</p>
                        <Link className='underline' href={'/login'}>Login</Link>
                    </>
                }
                {
                    error &&
                    <p className='text-red'>Error Verifying</p>
                }
            </div>
        </div>
    )

}