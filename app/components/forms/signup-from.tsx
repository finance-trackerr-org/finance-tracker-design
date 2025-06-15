"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"

import { zodResolver } from "@hookform/resolvers/zod"
import { FormInput } from "./form-input"
import { Button } from "@mui/material"

const FormSchema = z.object({
    firstName : z.string()
                .min(3,{ message : "first name must be at least 3 characters" })
                .max(10),
    lastName : z.string()
                .min(3,{ message : "first name must be at least 3 characters"})
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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver : zodResolver(FormSchema),
    defaultValues : {
      firstName : "",
      lastName : "",
      email : "",
      password : "",
      confirmPassword : ""
    }
  })

  function onSubmit(data : z.infer<typeof FormSchema>) {
    console.log("data==== ",data)
    toast ("You submitted the following values", {
      description : (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    })
  }

  return (
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[25rem]">
        <FormInput
          control={form.control}
          name="firstName"
          label="First Name"
          placeholder="Enter your first name here"
        />

        <FormInput
          control={form.control}
          name="lastName"
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
  )
}

export default SignUpForm
