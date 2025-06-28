"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { FormInput } from "./form-input"
import { Button } from "@mui/material"
import { registerUser } from "@/lib/api/auth"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react"
import CustomizedSnackbar from "../SnackBar"

const FormSchema = z.object({
    firstname : z.string()
                .min(3,{ message : "first name must be at least 3 characters" })
                .max(10),
    lastname : z.string()
                .min(3,{ message : "last name must be at least 3 characters"})
                .max(10),
    email : z.string().email({ message : "Invalid email address" }),
    password : z
            .string()
            .min(8, { message: "Password must be at least 8 characters" })
            .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })
            .regex(/[0-9]/, { message: "Password must contain a number" }),
    confirmPassword : z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message : "Password do not match",
    path : ["confirmPassword"]
  })

function SignUpForm() {
  
  const router = useRouter();

  const [snackBarProps ,setSnackBarProps] = useState<null | { severity: 'success' | 'error'; message: string }>(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarQueue, setSnackBarQueue] = useState<{ message: string; severity: 'error' | 'success' }[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver : zodResolver(FormSchema),
    defaultValues : {
      firstname : "",
      lastname : "",
      email : "",
      password : "",
      confirmPassword : ""
    }
  })

  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
    setSnackBarProps(null);
  };

  useEffect(() => {
    if(!snackBarOpen && snackBarQueue.length>0){
      const nextStack = snackBarQueue[0]
      setSnackBarProps(nextStack)
      setSnackBarQueue(prev => prev.slice(1))
      setSnackBarOpen(true)
    }
  }, [snackBarQueue,snackBarOpen])

  const enqueueSnackbar = (snack : { message: string; severity: 'error' | 'success' }) => {
    setSnackBarQueue(prev => [... prev, snack])
  }

  const { reset } = form;

  async function onSubmit(data : z.infer<typeof FormSchema>) {
    try{
      const updatedData = {
        ... data,
        role : 'USER'
      }
      console.log("data====",updatedData)
      const res : any = await registerUser(updatedData)
      console.log("res.status===",res.status)
      if(res.status != 'OK') {
        enqueueSnackbar({ severity: 'error', message: res.message });
        setSnackBarOpen(true);
        console.log("res.errors====",res.errors)
        if(res.errors){
          if(typeof res.errors == 'string') {
            enqueueSnackbar({ severity: 'error', message: res.message });
            setSnackBarOpen(true);
          }else{
            for(let error of res.errors){
              console.log(error)
              enqueueSnackbar({ severity: 'error', message: error });
              setSnackBarOpen(true);
            }
          }
          reset();
        }
      }else {
        enqueueSnackbar({ severity: 'success', message: res.message });
        setSnackBarOpen(true);
        router.replace('/user/login');
      }
    } catch(err : any) {
      setSnackBarProps({ severity: 'error', message: 'Something went wrong' });
      setSnackBarOpen(true);

      reset();
    }
  }

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[25rem]">
        <FormInput
          control={form.control}
          name="firstname"
          label="First Name"
          placeholder="Enter your first name here"
        />

        <FormInput
          control={form.control}
          name="lastname"
          label="Last Name"
          placeholder="Enter your last name here"
        />

        <FormInput
          control={form.control}
          name="email"
          label="Email"
          placeholder="Enter your email here"
        />

        <FormInput
          control={form.control}
          name="password"
          label="Password"
          placeholder="Enter your password here"
          type="password"
        />

        <FormInput
          control={form.control}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter your password"
          type="password"
        />

        <Button type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: '1rem',backgroundColor: '#000', color: '#fff', '&:hover': { backgroundColor: '#444' } }}
          >Submit</Button>
      </form>

        {snackBarOpen && <div className="fixed bottom-4 right-4 z-50 w-[20rem] h-6">
          <CustomizedSnackbar
            severity={snackBarProps?.severity ?? 'error'}
            message={snackBarProps?.message ?? ''}
            open={snackBarOpen}
            onClose={handleSnackBarClose}
            onSnackBarClose={handleSnackBarClose}
          />
        </div>}
    </div>
  )
}

export default SignUpForm
