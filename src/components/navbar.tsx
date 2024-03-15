"use client"
import { openSans } from "@/fonts";
import Image from "next/image";
import logo from "./../../public/logo-white.png";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    const links = [
      {name: 'Home', href: '/', icon: {class: 'bi bi-house mr-3', d: 'M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z'}},
      {name: 'Constructor', href: '/constructor', icon: {class: 'bi bi-pencil mr-3', d: 'M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325'}},
    ]

    return (
        <nav className="z-20 fixed top-0 left-0 w-80 h-full container text-main-500 bg-gray-100 border-r-4 border-main-500">
            <div className="flex items-end justify-between pb-5 pl-4 pr-2 w-full h-48 bg-gradient-to-r from-second to-main-500">
              <Image
                  src={logo.src}
                  width={275}
                  height={275}
                  alt=""
              />
            </div>
            <div className="p-5 space-y-3">
              {
                links.map(link => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={clsx(
                      "w-full h-12 rounded-md text-gray-900 text-xl flex items-center pl-5 hover:bg-main-500/20 hover:text-main-500 hover:transition-all",
                      link.href == pathname && 'bg-main-500/10 text-main-500'
                    )}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className={link.icon.class} viewBox="0 0 16 16">
                      <path d={link.icon.d} />
                    </svg>
                    <p>{link.name}</p>
                  </Link>
                ))
              }
            </div>
        </nav>
    )
}