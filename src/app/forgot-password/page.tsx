"use client";
import Image from "next/image"
import React, { useState } from 'react'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios";
import { useRouter } from 'next/navigation'


  export default function page() {
    const router = useRouter()
    const [loginCredentials, setLoginCredentials] = useState({
      email: "",
      otp: "",
      password: "",
      confirm_password: "",
    })

    const [step, setStep] = useState(1)

    const [error, setError] = useState("")
    const [showSuccess, setShowSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState({
      title: "",
      description: ""
    })

    const changeHandler = (e) => {
      setError("")
      setShowSuccess(false)
      let tempLoginCredentials = {...loginCredentials}
      tempLoginCredentials[e.target.name] = e.target.value
      setLoginCredentials(tempLoginCredentials)
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

    const sendOTPHandler = () => {
      setLoading(true)
      setError("")
      setShowSuccess(false)
      axios.get(`http://localhost:8000/forgot-password/?email=${loginCredentials.email}`)
      .then(res => {
        setLoading(false)
        console.log(res.data)
        setSuccessMsg({
          title: "Success! ",
          description: res.data.detail
        })
        setShowSuccess(true)
        setStep(2)
      })
      .catch(err => {
        handleErr(err)
      })
    }

    const resetPassword = () => {
      console.log(loginCredentials)
      if (loginCredentials.otp === ""){
        setError("OTP is required")
      }
      else if (loginCredentials.password === ""){
        setError("Password is required")
      }
      else if (loginCredentials.password !== loginCredentials.confirm_password){
        setError("Password does not match")
      }
      else{
        setLoading(true)
        axios.post("http://localhost:8000/forgot-password/", loginCredentials)
        .then(res => {
          setLoading(false)
          console.log(res.data)
          setSuccessMsg({
            title: "Success! ",
            description: res.data.detail
          })
          setShowSuccess(true)
          router.push('/login')
        })
        .catch(err => {
          handleErr(err)
        })
      }

    }

    const resentOTP = () => {
      setLoginCredentials({
        email: loginCredentials.email,
        otp: "",
        password: "",
        confirm_password: "",
      })
      setStep(1)
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
            <strong className="font-bold">{successMsg.title}</strong>
            <span className="block sm:inline">{successMsg.description}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick = {()=>setShowSuccess(false)}>
              <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>}
          
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Forgot Password</h1>
          </div>
          <div className="grid gap-4">
            {step === 1 &&
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
                <Button type="submit" className="w-full" onClick={sendOTPHandler} disabled = {loading}>
                  Send OTP {loading && ". . ."}
                </Button>
              </div>
            }
            {step === 2 &&
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="otp">OTP</Label>
                </div>
                <Input id="otp" type="text" required value = {loginCredentials.otp} name = "otp" onChange={changeHandler}/>
                <p onClick = {resentOTP} className = "underline cursor-pointer text-right">Resent OTP</p>
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required value = {loginCredentials.password} name = "password" onChange={changeHandler}/>
                <div className="flex items-center">
                  <Label htmlFor="confirm_password">Confirm Password</Label>
                </div>
                <Input id="confirm_password" type="text" required value = {loginCredentials.confirm_password} name = "confirm_password" onChange={changeHandler}/>
                <Button type="submit" className="w-full" onClick={resetPassword} disabled = {loading}>
                  Reset Password {loading && ". . ."}
                </Button>
              </div>
            }
          {error && <p className = "text-red-500">{error}</p>}
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      
    </div>
      
    )
  }
  
