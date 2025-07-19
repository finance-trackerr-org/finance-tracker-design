"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { FormInput } from "./form-input"
import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { loginUser } from "@/lib/api/auth"
import { removeCookie, setUserCookies } from "@/lib/utils/tokenHandler"
import { fetchUserByName } from "@/lib/api/user"
import { useSnackbarQueue } from "@/app/hooks/useSnackbarQueue"

const FormSchema = z.object({
    email : z.string().email({ message : "Invalid email address" }),
    password : z
            .string()
            .min(8, { message: "Password must be at least 8 characters" })
            .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })
            .regex(/[0-9]/, { message: "Password must contain a number" }),
    })

function SignInForm() {
  const { enqueueSnackbar, SnackbarRenderer } = useSnackbarQueue();
  const searchParams = useSearchParams();

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver : zodResolver(FormSchema),
    defaultValues : {
      email : "",
      password : ""
    }
  })

    useEffect(() => {
    const error = searchParams.get('error')
    const logout = searchParams.get('logout')
    if (error || logout) {
      const message =
        error === 'invalid_token' ? 'Your session has expired.' : logout == 'true' ? 'Login to enjoy services'
          : 'An unknown error occurred.'

      enqueueSnackbar({ severity: 'error', message: message });
      localStorage.clear();
      removeCookie();

      const newUrl = new URL(window.location.href)
      if(error) newUrl.searchParams.delete('error')
      else newUrl.searchParams.delete('logout')
      router.replace(newUrl.pathname + newUrl.search)
    }
  }, [searchParams])

  const { reset } = form;

  async function onSubmit(data : z.infer<typeof FormSchema>) {
    try{
      const res = await loginUser(data);
      if(res.status != "OK") {
          enqueueSnackbar({ severity: 'error', message: res.message });
          if(res.errors){
            if(typeof res.errors == 'string') {
              enqueueSnackbar({ severity: 'error',message: res.errors });
            }else{
              for(let error of res.errors){
                console.log(error)
                enqueueSnackbar({ severity: 'error', message: error });
              }
            }
            reset();
        }
      } else {
        const token = res.data;
        setUserCookies(token);
        const userDetails = await fetchUserByName();
        if(userDetails.status != 'OK') {
          enqueueSnackbar({ severity: 'error', message: 'User Details Not Found' });
          reset();
        } else {
          localStorage.setItem('userDetail', userDetails.data)
          localStorage.setItem('userId', userDetails.data['id'])

          enqueueSnackbar({ severity: 'success', message: res.message });
          reset();
          router.replace('/dashboard');
        }
      }
    } catch(err : any) {
      enqueueSnackbar({ severity: 'error', message: 'Something went wrong' });
      reset();
    }
  }

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[25rem]">
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

        <Button type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: '1rem',backgroundColor: '#000', color: '#fff', '&:hover': { backgroundColor: '#444' } }}
          >Submit</Button>
      </form>

      <SnackbarRenderer />
    </div>
  )
}

export default SignInForm