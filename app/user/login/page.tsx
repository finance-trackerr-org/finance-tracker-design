import SignInForm from '@/app/components/forms/signin-form'
import Link from 'next/link'
import React from 'react'

function LoginPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">Finance Tracker</h1>
            <div className='bg-white rounded-lg shadow-md w-[28rem] pt-3 pb-4 flex items-center justify-center flex-col '>
                <SignInForm />
                <p className='pt-5'>Don't have an account? <Link className='text-blue-400 hover:underline font-medium' href="/user/register">Register</Link></p>
            </div>
        </div>
    )
}

export default LoginPage
