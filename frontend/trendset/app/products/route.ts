import { headers } from 'next/headers'
import { NextRequest } from "next/server"
 

export async function GET(request: NextRequest) {
    const head = headers()
    const email = head.get('Authorization')

    if(!email){
        return new Response('Access Forbidden',{status:403})
    }
    

    const res = new Response(null,{})
    return new Response('Hello!',{status: 200})
}

export async function POST(request: NextRequest){

}

export async function DELETE(request: NextRequest){
    
}