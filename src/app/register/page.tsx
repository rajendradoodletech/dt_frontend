"use client";
import Image from "next/image"
import React, { useReducer, useState } from 'react'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios";
import { useRouter } from "next/navigation";


  export default function page() {
    const router = useRouter();
    const [data, setData] = useState({
      email: "",
      password: "",
      confirm_password: ""
    })

    const [error, setError] = useState("")
    const [showSuccess, setShowSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    
    const changeHandler = (e) => {
      setError("")
      setShowSuccess(false)
      let tempLoginCredentials = {...data}
      tempLoginCredentials[e.target.name] = e.target.value
      setData(tempLoginCredentials)
      console.log(tempLoginCredentials)
    }

    
    const handleErr = (err) => {
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
    }

    const validEmail = (email) => {
      const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return pattern.test(email);
    }
    

    const registerHandler = () => {
      if (data.password.length < 8){
        setError("Password must have atlease 8 characters")
      }else if (data.password !== data.confirm_password){
        setError("Password doesn't match")
      }else if (!validEmail(data.email)){
        setError("Email ID is not valid. Please enter valid Email ID.")
      }
      else{
        axios.post("http://localhost:8000/register/", data)
        .then(res => {
          setShowSuccess(true)
          router.push("/login")
        })
        .catch(err => {
          handleErr(err)
        })
      }
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
            <span className="block sm:inline">Registered successfully.</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick = {()=>setShowSuccess(false)}>
              <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>}
          
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-balance text-muted-foreground">
              Enter your informations below to Register
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
                value = {data.email}
                name = "email"
                onChange={changeHandler}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required value = {data.password} name = "password" onChange={changeHandler}/>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="confirm_password">Confirm Password</Label>
              </div>
              <Input id="confirm_password" type="password" required value = {data.confirm_password} name = "confirm_password" onChange={changeHandler}/>
            </div>
            {error && <p className = "text-red-500">{error}</p>}
            
            <Button type="submit" className="w-full" onClick={registerHandler} disabled = {loading}>
              Register {loading && ". . ."}
            </Button>
            <Button variant="outline-primary" className="w-full">
              Register with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      
    </div>
      
    )
  }
  
