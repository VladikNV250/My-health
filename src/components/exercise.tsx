import Image from "next/image";
import dumb from "./../../public/dumbbell.png";

export default function Exercise({icon, name, time, id}: {icon: string, name: string, time: string, id: string}) {
    return (
        <div className="exercise flex justify-between divide-x-2 divide-main-500 border-2 border-main-500">
            <button className="select-icon w-[60px] bg-white flex justify-center items-center">
                <Image
                    src={dumb.src}
                    width={30}
                    height={30}
                    alt=""
                />
            </button>
            <input 
              value={name} 
              type="text" 
              name="exercise-1-text" 
              id="exercise-1-text" 
              className="outline-remove w-full text-xl py-1 px-3 border-transparent" 
            />
            <div className="settimer w-[85px] flex">
                <input 
                  type="text" 
                  name="exercise-1-time" 
                  id="exercise-1-time" 
                  value={time ? time : '00:00'} 
                  className="outline-remove w-[60px] text-end px-1" 
                />
                <div className="w-[25px] flex flex-col justify-between items-center">
                    <button className="up w-full h-1/2 pt-0.5 flex items-start justify-center bg-neutral-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-chevron-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z" />
                        </svg>
                    </button>
                    <div className="hr w-full h-0.5 bg-neutral-600"/>
                    <button className="down w-full h-1/2 pb-0.5 flex items-end justify-center bg-neutral-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                        </svg>
                    </button>
                </div>
            </div>
            <button className="copy-exercise w-[60px] flex justify-center items-center bg-blue-600 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-copy" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
                </svg>
            </button>
            <button className="delete-exercise w-[60px] flex justify-center items-center bg-red-600 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                </svg>
            </button>
        </div>
    )
}