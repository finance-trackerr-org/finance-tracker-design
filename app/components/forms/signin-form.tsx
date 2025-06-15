"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"

import { zodResolver } from "@hookform/resolvers/zod"
import { FormInput } from "./form-input"
import { Button } from "@mui/material"

const FormSchema = z.object({
    email : z.string().email({ message : "Invalid email address" }),
    password : z
            .string()
            .min(8, { message: "Password must be at least 8 characters" })
            .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })
            .regex(/[0-9]/, { message: "Password must contain a number" }),
    })

function SignInForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver : zodResolver(FormSchema),
    defaultValues : {
      email : "",
      password : ""
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
  )
}

export default SignInForm