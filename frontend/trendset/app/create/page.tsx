'use client'
import { useEffect, useState, SyntheticEvent } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "react-query"
import BASE_URL from "@/utils/constants"
import app from "@/utils/config"
import { getAuth } from "firebase/auth"
import { useAuthContext } from "../_components/AuthProvider"

const auth = getAuth(app)

const page = () => {
    const [businessName, setBusinessName] = useState<string>('')
    const [logoDesc, setLogoDesc] = useState<string>('')
    const [links, setLinks] = useState<string[]>([])
    const [texts, setTexts] = useState<string[]>([])
    const [description, setDescription] = useState<string>('')
    const [currentText, setCurrentText] = useState<string>('')
    const [currentLink, setCurrentLink] = useState<string>('')
    const [bio, setBio] = useState<string>('')
    const [logo,setLogo] = useState<string>('')
    const [cardColor, setCardColor] = useState<string>('')
    const [windowColor, setWindowColor] = useState<string>('')
    const [textFont, setTextFont] = useState<string>('')
    const [textColor, setTextColor] = useState<string>('')
    const {mutateAsync: generateBio} = useMutation((variables)=>{
        return fetch(BASE_URL + `api/createBio/`,{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name: businessName,
                desc: description
            })
        }).then((res)=>res.json())
    })
    const {mutateAsync:generateLogo} = useMutation((variables)=>{
        return fetch(BASE_URL + `api/makeLogo`,{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "prompt": logoDesc
            })
        }).then((res)=>res.json())
    })

    const {mutate:generateProduct} = useMutation((variables) => {
        const link_map = links.map((link, index) =>{
            return {
                "text": texts[index],
                "url": links[index]
            }
        })
        return fetch(BASE_URL + `/api/addProduct/${user?.email}`,{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                logo: logo,
                bio: bio,
                links: link_map,
                design:{
                    card_color: cardColor,
                    window_color: windowColor,
                    text_font: textFont,
                    textColor: textColor
                }
            })
        })
    })

    const createAndAddProduct = async (e: SyntheticEvent) => {
        e.preventDefault()
        const bio = await generateBio()
        const logo = await generateLogo()
        setBio(bio)
        setLogo(logo)
        generateProduct();
        console.log(bio,logo)
    }

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
        <nav className="flex justify-between w-full mb-4">
            <a href='/'><h1 className='text-4xl font-bold'>TrendSet.tech</h1></a>
            <div className='flex flex-row content-end gap-6'>
                <button ><a href="/dashboard">{user?.email}</a></button>
                <button onClick={() =>{auth.signOut()}}>Log out</button>
            </div>
        </nav>
        <div>
            <form className="flex flex-col w-[50%] m-auto" onSubmit={createAndAddProduct}>
                <label>
                    <p>Describe your Logo:</p>
                    <input className="border mb-4" type="text" id="logoDesc" onChange={(e)=>setLogoDesc(e.target.value)}></input>
                </label>
                <label>
                    <p>What is the name of your store?</p>
                    <input className="border mb-4" type="text" id="businessName" onChange={(e)=>setBusinessName(e.target.value)}></input>
                </label>
                <label>
                    <p>Describe your Product or Store</p>
                    <input className="border mb-4" type="text" id="description" onChange={(e)=>setDescription(e.target.value)}></input>
                </label>
                <label>
                    <p>What color do you want your card to be</p>
                    <input className="border mb-4" type="text" id="cardColor" onChange={(e)=>setCardColor(e.target.value)}></input>
                </label>
                <label>
                    <p>What color do you want your background to be</p>
                    <input className="border mb-4" type="text" id="windowColor" onChange={(e)=>setWindowColor(e.target.value)}></input>
                </label>
                <label>
                    <p>What color do you want the text to be?</p>
                    <input className="border mb-4" type="text" id="textColor" onChange={(e)=>setTextColor(e.target.value)}></input>
                </label>
                <label>
                    <p>What font do you want the text to  be?</p>
                    <input className="border mb-4" type="text" id="textFont" onChange={(e)=>setTextFont(e.target.value)}></input>
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
                <div className='flex justify-center'>
                    <button type="submit" className='pt-2 pb-2 pl-4 pr-4 self-center bg-blue-500 text-white font-bold rounded-md'>Create Product</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default page