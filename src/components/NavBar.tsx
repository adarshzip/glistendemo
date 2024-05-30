"use client";

import { useState } from "react";

import { Client, Content, asLink } from "@prismicio/client";
import WordMark from "./WordMark";
import Link from "next/link";
import { PrismicNextLink } from "@prismicio/next";
import ButtonLink from "./ButtonLink";
import { MdMenu, MdClose } from "react-icons/md";
import clsx from "clsx";
import { usePathname } from "next/navigation";

type NavBarProps = {
    settings: Content.SettingsDocument
}

export default function NavBar({settings}: NavBarProps) {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()


  return (
    <nav aria-label="Main" className="p-4 md:p-6"> 
        <div className="flex flex-col justify-between max-w-6xl py-2 mx-auto font-medium text-white md:flex-row md:items-center">

            <div className="flex items-center justify-between">


                <Link href={"/"} className="z-50" onClick={()=> setOpen(false)}> 
                    <WordMark/>
                    <span className="sr-only">Glisten.ai Home Page</span> 
                </Link>

                <button type="button" 
                className="block p-2 text-3xl text-white md:hidden" 
                aria-expanded={open}
                onClick={() => setOpen(true)}
                >

                    <MdMenu/>
                    <span className="sr-only">Open Menu</span>
                </button>
            </div>

{/* mobile nav */}
<div className={clsx("fixed bottom-0 right-0 left-0 top-0 z-40 flex flex-col items-end gap-4 bg-[#070815] pr-4 pt-14 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:hidden", open ? "translate-x-0" : "translate-x-[100%]")}>

                <button type="button" 
                className="fixed block p-2 mb-4 text-3xl text-white md:hidden right-4 top-4" 
                aria-expanded={open}
                onClick={() => setOpen(false)}
                >

                    <MdClose/>
                    <span className="sr-only">Close Menu</span>
                </button>

                <div className="grid gap-8 justify-items-end">
                    {settings.data.navigation.map((item) => {
                        if (item.cta_button){
                            return (
                                <ButtonLink key={item.label} field={item.link} onClick={()=> setOpen(false)}>
                                    {item.label}
                                </ButtonLink>
                            )
                        }

                    return(
                        <PrismicNextLink
                        key={item.label}
                        className="block px-3 text-3xl first:mt-8"
                        field={item.link}
                        onClick={()=> setOpen(false)}
                        aria-current={
                            pathname.includes(asLink(item.link) as string) ? "page" : undefined
                        }>
                        {item.label}

                        </PrismicNextLink>
                    )
                    })}
                </div>

</div>



{/* desktop nav */}
            <ul className="hidden gap-6 md:flex">
                {settings.data.navigation.map((item)=>{

                    if( item.cta_button){
                        return(
                            <li key={item.label}>
                                <ButtonLink key={item.label} field={item.link} aria-current={
                            pathname.includes(asLink(item.link) as string) ? "page" : undefined}>
                                    {item.label}
                                </ButtonLink>
                            </li>
                        )
                    }

                    return(
                    <li key={item.label}>
                        <PrismicNextLink 
                        field={item.link} 
                        className="inline-flex items-center min-h-11"
                        aria-current={
                            pathname.includes(asLink(item.link) as string) ? "page" : undefined}
                        >
                            {item.label}
                        </PrismicNextLink>
                    </li>
                )})}
            </ul>
        </div>
    </nav>
  )
}
