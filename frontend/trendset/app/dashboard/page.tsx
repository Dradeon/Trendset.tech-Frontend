'use client';
import {useEffect} from 'react'
import { useAuthContext } from "@/app/_components/AuthProvider"
import { useRouter } from "next/navigation"
import { getAuth } from 'firebase/auth'
import app from '@/utils/config'
import BASE_URL from '../../utils/constants'
import { User } from 'firebase/auth'
import ProductTile from '../_components/ProductTile';
import { useQuery } from 'react-query';

const auth = getAuth(app)

const products = ['Product A', 'Product B']

const page = () => {
    const user : User | null = useAuthContext()
    const {data} = useQuery<[]>([],()=>{
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': user?.email ?? '',
            'Access-Control-Allow-Headers': 'Authorization'
          };
        return fetch(BASE_URL + `api/getAllForUser/${user?.email}`,{method:'GET'}).then((res)=>res.json())
    },{retry:2,enabled: !!user})
    const router = useRouter()

    useEffect(() => {
        if (user == null) router.push("/login")
    }, [user])

    return <div>
        <nav className="flex justify-between w-full mb-8">
            <a href='/'><h1 className='text-4xl font-bold'>TrendSet.tech</h1></a>
            <div className='flex flex-row content-end gap-6'>
                <button onClick={()=>{}}><a href="/dashboard">{user?.email}</a></button>
                <button onClick={() =>{auth.signOut()}}>Log out</button>
            </div>
        </nav>
        <div className='flex flex-col w-[50%] m-auto'>
            <h1 className='text-3xl font-bold mb-4'>Current Products</h1>
            <div className='mt-4 mb-4'>
                {data?.length == 0  && 'No Products Here! Click the button below!'}
                {
                    data?.map((something: any) => {
                        return <ProductTile name='Product' key={something.id}/>
                    })
                }
            </div>
            <button className='bg-blue-600 p-4 rounded-lg'><a className='text-white font-bold' href="/create">Create New Product</a></button>
        </div>
    </div>;
}

export default page