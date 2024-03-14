import { openSans } from "@/fonts";
import Image from "next/image";
import logo from "./../../public/logo-white.png";

export default function Navbar() {
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
              <button className="w-full h-12 rounded-md text-gray-900 text-xl flex items-center pl-5 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-house mr-3" viewBox="0 0 16 16">
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                </svg>
                Home
              </button>
              <button className="w-full h-12 rounded-md text-gray-900 text-xl flex items-center pl-5 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-house mr-3" viewBox="0 0 16 16">
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                </svg>
                Constuctor
              </button>
              <button className="w-full h-12 rounded-md text-gray-900 text-xl flex items-center pl-5 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-house mr-3" viewBox="0 0 16 16">
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                </svg>
                Profile
              </button>
            </div>
            
            {/* <nav className="burger-menu space-y-1">
                <div className="w-7 h-1 bg-main rounded-md"></div>
                <div className="w-7 h-1 bg-main rounded-md"></div>
                <div className="w-7 h-1 bg-main rounded-md"></div>
            </nav> */}
        </nav>
    )
}