'use client'
import Image from 'next/image'
import { useQuery } from 'react-query'
import { notFound } from 'next/navigation'
import BASE_URL from '@/utils/constants'

interface dataResponse {
    product:{
        id: number,
        logo: string,
        company_name: string,
        bio: string,
        links: {
            text: string
            url:string
        }[]
    },
    design: {
        card_color: string
        window_color: string
        text_font: string
        text_color: string
    }
}

export default function Page({ params }: { params: { id: string } }) {
    const {data, isLoading, isError} = useQuery<dataResponse>([],async () => {
        return fetch(BASE_URL + `api/getUniqueProd/${params.id}`, {
            method: 'GET'
        }).then((response) => { return response.json()})
    },{
        retry: 2
    })

    document.body.style.backgroundColor = data?.design.window_color || 'white'

    if (isLoading) {
        return 'Loading...'
    }

    if(!data || isError){
        document.body.style.backgroundColor = 'black'
        notFound()
    }

    return <div className='m-auto text-center' style={{color:`${data.design.card_color}`}}>
        <div className='mt-8 mb-8'>
            <Image src={data.product.logo} alt='Business Logo'></Image>
            <h1 className={`decoration-[${data.design.text_color}] font-bold`}>{data.product.company_name}</h1>
            <p>{data.product.bio}</p>
            <div className={`decoration-[${data.design.text_color}]`}>Links</div>
            {
                data.product.links.map((link) => {
                    return <button className='border-8 p-8 rounded-md'><a href={link.url}>{link.text}</a></button>
                })
            }
        </div>
        <div>
            <p>Like this card?</p>
            <a href="/sign_up">Create your own Marketing Card today</a>
        </div>
    </div>
}