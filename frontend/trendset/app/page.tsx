'use client'

import { useAuthContext } from "@/app/_components/AuthProvider"
import Image from 'next/image'
import image from '../public/icon.png'
import { User } from "firebase/auth"



export default function Home() {
  const user : User | null = useAuthContext()

  return (

      <div className="flex flex-col min-h-screen">
          <nav className="flex justify-between bg-gray-100 p-4 border rounded shadow-md">
              <div className="container mx-auto max-w-7x1">
                  <div className="flex items-center justify-between">
                      <div className="flex items-center">
                          <div>
                              <Image
                                  src={image}
                                  width={100}
                                  height={100}
                                  alt={'image'}
                              />
                          </div>
                          <div className="ml-4">
                              <h1>
                                  <a href="/" style={{ textDecoration: "none" }}>
                                      <b className={"text-2xl"}>TRENDSET.TECH</b>
                                  </a>
                              </h1>
                          </div>
                      </div>
                      <div className="flex gap-4">
                          {user && <a href="/dashboard">Dashboard</a>}
                          <b><a className="bg-black hover:bg-gray text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow-lg" href="/sign_up">Sign Up</a></b>
                          <b><a className="bg-black hover:bg-gray text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow-lg" href="/login">Login</a></b>
                      </div>
                  </div>
              </div>
          </nav>

          <main className="container mx-auto flex-grow">
              <div className="flex justify-center">
                  <a className={"space mt-10"}> <i>"One card, for an unforgettable impression"</i></a>
              </div>

              <div className="flex-grow flex justify-center items-center bg-gray-100 p-4 border rounded shadow-md">
                  <section className="py-8">
                      <div className="max-w-4xl text-center">
                          <h2 className="text-3xl font-bold mb-4">About Us</h2>
                          <p className="text-lg text-gray-600">
                              "Welcome to TrendSet, your gateway to innovative AI marketing tools! Our cutting-edge platform automates the creation of company logos and bios, and seamlessly integrates links to your website and social media pages onto your business card.
                              Empower your brand and connect with consumers effortlessly – it's a whole new world of marketing!"                          </p>

                      </div>
                  </section>
              </div>
              
          </main>
      </div>
  );
}
