import SignUpForm from '@/app/components/forms/signup-from'
import Link from 'next/link'

function RegisterPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">Finance Tracker</h1>
            <div className='bg-white rounded-lg shadow-md w-[28rem] pt-3 pb-4 flex items-center justify-center flex-col'>
                <h2 className="text-2xl font-medium text-neutral-600 ">Create an account</h2>
                <SignUpForm />
                <p className='pt-5'>Already have an account? <Link className='text-blue-400 hover:underline font-medium' href="/user/login">Sign in</Link></p>
            </div>
        </div>
    )
}

export default RegisterPage
