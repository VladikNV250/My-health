export default function Card() {
    return (
        <div className="relative flex flex-col justify-between w-full h-52 p-5 shadow-2xl bg-gray-500 bg-gradient-to-r from-main-500 to-second text-white rounded-2xl">
          <div className="first_level flex justify-between items-center">
            <h2 className="text-xl font-bold">Workout</h2>
            <div className="three_dots flex justify-between items-center space-x-1">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            </div>
          </div>
          <div className="line relative w-full h-0.5 bg-white left-0"></div>
          <div className="second_level flex justify-between">
            <ul className="w-2/5 h-full space-y-px">
              <li>Exercise 1</li>
              <li>Exercise 2</li>
              <li>Exercise 3</li>
            </ul>
            <div className="line relative w-0.5 h-full bg-white top-0 left"></div>
            <ul className="w-3/5 h-full flex flex-col items-center text-sm">
              <h3 className="text-lg mb-1">Run log</h3>
              <li className="text-center">26 December, Tuesday</li>
            </ul>
          </div>
          <div className="third_level relative flex">
            <div className="time_display flex items-center space-x-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
              </svg>
              <div className="time">3 min</div>
            </div>
            <button className="play absolute left-1/2 transform -translate-x-1/2 bg-white border-4 border-gray-900 w-14 h-14 rounded-full flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-play-fill fill-gray-900 ml-1" viewBox="0 0 16 16">
                <path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z"/>
                {/* <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/> */}
              </svg>
            </button>
          </div>
          
        </div>
    )
}