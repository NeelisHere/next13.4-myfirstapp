"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginPage = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });
    const onLogin = async () => {};

    return (
        <div className="flex flex-col items-center justify-center min-h-screen border-solid border-2 border-indigo-600 p-4">
            <h1 className="text-2xl font-bold p-2">LOGIN</h1>
            <hr />
            <div className="flex flex-col border-solid border-2 border-indigo-600 p-4">
                <label htmlFor="username">username</label>
                <input
                    className="p-2"
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => {
                    setUser({ ...user, username: e.target.value });
                    }}
                    placeholder="username"
                />

                <label htmlFor="password">password</label>
                <input
                    className="p-2"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                    }}
                    placeholder="password"
                />

                <button
                    onClick={onLogin}
                    className="bg-indigo-600 hover:bg-blue-700 text-white font-bold my-4 py-2 rounded w-full"
                >
                    Login
                </button>
                <p>
                    { "Don't have an account? " }
                    <Link className="underline" href={'/register'}>Register</Link>
                </p>
            </div>
            
        </div>
    );
};

export default LoginPage;
