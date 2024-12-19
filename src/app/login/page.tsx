"use client";
import Image from "next/image"
import React, { useReducer, useState } from 'react'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from 'next-auth/react';

function LoginButton() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>
          <p>Signed in as {session.user.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <Button variant="outline-primary" className="w-full" onClick={() => signIn('google')}>
              Login with Google
            </Button>
      )}
    </div>
  );
}

function LinkedinLoginButton() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>
          <p>Signed in </p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <Button variant="outline-primary" className="w-full" onClick={() => signIn('linkedin')}>
          Login with Linkedin
        </Button>
      )}
    </div>
  );
}
  export default function page() {
    const router = useRouter();
    const [loginCredentials, setLoginCredentials] = useState({
      email: "",
      password: ""
    })

    const [error, setError] = useState("")
    const [showSuccess, setShowSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const changeHandler = (e) => {
      setError("")
      setShowSuccess(false)
      let tempLoginCredentials = {...loginCredentials}
      tempLoginCredentials[e.target.name] = e.target.value
      setLoginCredentials(tempLoginCredentials)
      console.log(tempLoginCredentials)
    }

    const loginHandler = () => {
      setLoading(true)
      setError("")
      setShowSuccess(false)
      axios.post("http://localhost:8000/api/token/", loginCredentials)
      .then(res => {
        setLoading(false)
        console.log(res.data)
        localStorage.setItem("access_token", res.data.access)
        localStorage.setItem("refresh_token", res.data.refresh)
        setShowSuccess(true)
        router.push('/dashboard/boarding')
      })
      .catch(err => {
        setLoading(false)
        console.log(err.response)
        if (err?.response?.data?.detail){
          setError(err.response.data.detail)
        }else if (err?.response?.status >= 400 && err?.response?.status < 500){
          setError("Please provide valid inputs.")
        }
          
        else{
          setError("Something went wrong. Please try again.")
        }
      })
    }

    return (
     
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
          <div className="hidden bg-muted lg:block">
        <Image
          src="/images/login_img.png"
          alt="Image"
          width="100"
          height="100"
          className="h-full w-full object-contain "
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          {showSuccess && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Success! </strong>
            <span className="block sm:inline">Logged in successfully.</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick = {()=>setShowSuccess(false)}>
              <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>}
          
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value = {loginCredentials.email}
                name = "email"
                onChange={changeHandler}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required value = {loginCredentials.password} name = "password" onChange={changeHandler}/>
            </div>
            {error && <p className = "text-red-500">{error}</p>}
            
            <Button type="submit" className="w-full" onClick={loginHandler} disabled = {loading}>
              Login {loading && ". . ."}
            </Button>
              <LoginButton />
              <LinkedinLoginButton />
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      
    </div>
      
    )
  }
  
