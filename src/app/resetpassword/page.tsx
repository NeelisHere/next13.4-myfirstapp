'use client'

import axios from "axios"
import React, { useEffect, useState } from "react"



function ResetPasswordPage() {

    const [loading, setLoading] = useState(false)
    const [updatedPassword, setUpdatedPassword] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState(true)

    const handleClick = async () => {
        // alert(updatedPassword)
        try {
            setLoading(true)
            await axios.post('/api/users/resetpassword', { 
                data: {
                    updatedPassword,
                    token: window.location.search.split('=')[1]
                }
            })
        } catch (error: any) {
            console.log(error.response.data)
        } finally {
            setUpdatedPassword('')
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(updatedPassword.length > 0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
        
    }, [updatedPassword])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen border-solid border-2 border-indigo-600 p-4">
            <h1 className="text-2xl font-bold p-2">RESET PASSWORD</h1>
            <hr />
            <div className="flex flex-col border-solid border-2 border-indigo-600 p-4 my-2">
                <label className="p-1" htmlFor="updatedPassword">Enter new password:</label>
                <input
                    className="p-2 text-black rounded"
                    type="password"
                    placeholder="Enter new password"
                    value={updatedPassword}
                    onChange={(e)=>{
                        setUpdatedPassword(e.target.value);
                    }}
                />

                <button
                    onClick={handleClick}
                    disabled={buttonDisabled}
                    className="disabled:opacity-50 bg-indigo-600 hover:bg-blue-700 text-white font-bold my-4 py-2 rounded w-full"
                >
                    {
                        loading ?
                        <div>
                            <svg aria-hidden="true" className="inline w-4 h-4 mr-2 text-white-200 animate-spin dark:text-white-600 fill-indigo-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                        </div>
                        :
                        <>Update Password</>
                    }
                </button>
            </div>
        </div>
    )
}


export default ResetPasswordPage
