import Image from "next/image";
import dumb from "./../../public/dumbbell.png";

interface DisplayProps {
    icon: string,
    progress: number,
}

export default function Display({icon, progress}: DisplayProps) {


    return (
        <div className="w-96 h-96 relative flex justify-center items-center">
            <div className="w-full h-full flex justify-center items-center bg-white rounded-full">
                <Image
                  src={icon}
                  width={250}
                  height={250}
                  alt=""
                />
            </div>
            <svg className="absolute w-[412px] h-[412px] z-10 rotate-90" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g className="fill-none stroke-none">
                    <circle className="w-full h-full stroke-[3px] stroke-gray-900" cx="50%" cy="50%" r="45%" />
                    <path
                      id="base-timer-path-remaining"
                      strokeDasharray={`${Math.round((progress * 283) / 100)} 283`} //2PI * 45
                      className="base-timer__path-remaining stroke-[3px] stroke-main-500 transition-all"
                      d="
                      M 50, 50
                      m -45, 0
                      a 45,45 0 1,0 90,0
                      a 45,45 0 1,0 -90,0
                      "
                    ></path>
                </g>
            </svg>
            <svg className="absolute w-[412px] h-[412px] z-0" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g className="fill-none stroke-none">
                    <circle className="w-full h-full stroke-[3px] stroke-blue-900" cx="50%" cy="50%" r="45%" />
                </g>
            </svg>
        </div>
        
    )
}