'use client'
import { useQuery } from 'react-query'
import { notFound } from 'next/navigation'
import BASE_URL from '@/utils/constants'

interface dataResponse {
    product:{
        id: number,
        Logo: string,
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
            <img src={data.product.Logo} width={200} height={200} className='mx-auto rounded-full' alt='Business Logo'></img>
            <h1 className={`decoration-[${data.design.text_color}] text-4xl my-4 font-bold`}>{data.product.company_name}</h1>
            <p>{data.product.bio}</p>
            <div className={`decoration-[${data.design.text_color}] my-4`}>Links</div>
            {
                data.product.links.map((link) => {
                    return <button className='border-4 border-black px-8 py-3 rounded-lg my-3'><a target='_blank' href={link.url}>{link.text}</a></button>
                })
            }
        </div>
        <div>
            <p>Like this card?</p>
            <a  className='underline' href="/sign_up">Create your own Card on TrendSet</a>
        </div>
    </div>
}