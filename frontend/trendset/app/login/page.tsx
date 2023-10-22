'use client';
import { useState, SyntheticEvent } from 'react'
import { useRouter } from 'next/navigation'
import app from '@/utils/config'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const auth = getAuth(app)

const login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()

  const login = async (event: SyntheticEvent) => {
    event.preventDefault()
    let result = null
    let error = null
    
    console.log(email, password)

    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        console.error(e)
        error = e;
    }

    if (error){
        console.log(error)
        return error
    }

    return router.push('/dashboard')
  }

  return (
    
    <div className="max-h-full">
        <nav className="flex justify-between">
          <a href='/'><h1 className='text-4xl font-bold'>TrendSet.tech</h1></a>
        </nav>
        <div className='mt-4 mb-4 flex flex-col border-2 rounded max-w-xs p-2 mx-auto align-middle'>
          <h1 className='text-4xl font-bold text-center mt-8 mb-8'>Login</h1>
          <form onSubmit={login} className='m-auto mb-6'>
              <label htmlFor='email'>
                  <p>Email:</p>
                  <input className='shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' required type='email' name='email' id='email' onChange={(e)=>setEmail(e.target.value)}></input>
              </label>
              <label htmlFor='password'>
                  <p>Password:</p>
                  <input className='shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' required type='password' name='email' id='password' onChange={(e) => setPassword(e.target.value)}></input>
              </label>
              <div className='flex justify-center'>
                <button type="submit" className='pt-2 pb-2 pl-4 pr-4 self-center bg-green-500 font-bold rounded-md'>Login</button>
              </div>
          </form>
          <span className='m-auto text-center'><p>Don't have an account?</p> <a href = "/sign_up" className='underline'>Create your account.</a></span>
        </div>
    </div>
  )
}

export default login