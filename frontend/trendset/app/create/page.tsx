'use client'
import { useEffect, useState, SyntheticEvent } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "react-query"
import app from "@/utils/config"
import { getAuth } from "firebase/auth"
import { useAuthContext } from "../_components/AuthProvider"

const auth = getAuth(app)

const page = () => {
    const [businessName, setBusinessName] = useState<string>('')
    const [color, setColor] = useState<string>('')
    const [links, setLinks] = useState<string[]>([])
    const [texts, setTexts] = useState<string[]>([])
    const [currentText, setCurrentText] = useState<string>('')
    const [currentLink, setCurrentLink] = useState<string>('')
    const {mutate} = useMutation((variables)=>{
        return fetch('')
    })
    const user = useAuthContext()
    const router = useRouter()

    

    const onAddLink = (e: SyntheticEvent) =>{
        e.preventDefault()
        setLinks((state) => ([...state, currentLink])
        )
        setTexts((state) => ([...state, currentText]))
        console.log(links,texts)
    }
    
    const onDeleteLink = (id: string, text: string) => {
        const newLinks = links.filter((val) => val !== id)
        const newTexts = texts.filter((val) => val !== text)
        setLinks(newLinks)
        setTexts(newTexts)
    }

    useEffect(() => {
        if (user == null) router.push("/login")
    }, [user])

    return (
    <div>
        <nav className="flex justify-between w-full">
            <a href='/'><h1 className='text-4xl font-bold'>TrendSet.tech</h1></a>
            <div className='flex flex-row content-end gap-6'>
                <button ><a href="/dashboard">{user?.email}</a></button>
                <button onClick={() =>{auth.signOut()}}>Log out</button>
            </div>
        </nav>
        <div>
            <form onSubmit={()=>{}}>
                <label>
                    <p>What color do you want your logo to be?</p>
                    <input className="border mb-4" type="text" id="color" onChange={(e)=>setColor(e.target.value)}></input>
                </label>
                <label>
                    <p>What is the name of your store?</p>
                    <input className="border mb-4" type="text" id="businessName" onChange={(e)=>setBusinessName(e.target.value)}></input>
                </label>
                <label>
                    <p>Add any links:</p>
                    <p>Text</p>
                    <input className="border mb-4" type="text" id="text" onChange={(e)=>setCurrentText(e.target.value)}></input>
                    <p>Link</p>
                    <input className="border mb-4" type="text" id="link" onChange={(e)=>setCurrentLink(e.target.value)}></input>
                    <button onClick={onAddLink}>Add</button>
                </label>
                <ul>
                    {links.map((link, i)=>{return <li key={link}>
                        <div>
                            <p>{link}</p>
                            <p>{texts[i]}</p>
                        </div>
                        <button onClick={() => onDeleteLink(link, texts[i])}>Delete</button>
                    </li>})}
                </ul>
            </form>
        </div>
    </div>
  )
}

export default page