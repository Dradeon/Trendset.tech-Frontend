import { NextApiRequest } from "next"
import { headers } from 'next/headers'
 

export async function GET(request: NextApiRequest) {
    const head = headers()
    const email = head.get('Authorization')

    if(!email){
        return new Response('Access Forbidden',{status:403})
    }
    

    const res = new Response(null,{})
    return new Response('Hello!',{status: 200})
}

export async function POST(request: NextApiRequest){

}

export async function DELETE(request: NextApiRequest){
    
}