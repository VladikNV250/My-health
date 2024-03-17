import { Day, Exercise, Month, Workout } from "@/data"
import clsx from "clsx";
import { useState } from "react";

interface CardProps {
  name: string,
  exercises: Exercise[],
  log: Date[],
  duration: string,
  breakTime: string,
  creationDate: Date,
  workouts: Workout[],
  setWorkouts: Function,
}


export default function Card({name, exercises, log, duration, breakTime, creationDate, workouts, setWorkouts}: CardProps) {
    const [modalWindow, setModalWindow] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const exercisesNames = exercises.map((exercise, index) => {
      if (index <= 2) return exercise.name;
    })

    function getMonth(month: number): Month {
      const MONTHS: Month[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return MONTHS[month];
    }

    function getDay(day: number): Day {
      const DAYS: Day[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return DAYS[day];
    }

    

    function calculateTotalTime() {
      function turnIntoSeconds(time: string): number {
        const [minutes, seconds] = time.split(':');
        return (+minutes * 60) + +seconds;
      }
      function turnIntoStringFormat(time: number) {
        let minutes = 0;
        let hours = 0;
        if (time <= 60) 
          return `${Math.round(time)} sec`;
        
        minutes = Math.round(time / 60);
        hours = Math.round((time / 60) / 60);

        if (hours <= 1)
         return `${minutes} min`;
        else return `${hours} hours`;
      }
      const breakTimeSec = turnIntoSeconds(breakTime);
      let totalExerciseTime = 0;
      exercises.forEach(exercise => {
        totalExerciseTime += turnIntoSeconds(exercise.time);
      })
      
      const totalTime = totalExerciseTime + (breakTimeSec * (exercises.length - 1));
      return turnIntoStringFormat(totalTime);
    }

    
    function deleteCard() {
      const newWorkouts = workouts.filter(workout => workout.name !== name)
      setWorkouts(newWorkouts);
      const workoutsLS: {[key: string]: Workout} = {};
      newWorkouts.forEach(workout => {
        workoutsLS[workout.name] = workout;
      })
      localStorage.setItem('workouts', JSON.stringify(workoutsLS));
      setModalWindow(false);
    }

    function checkFinish() {

    }

    return (
        <div className="relative flex flex-col justify-between w-full h-52 p-5 shadow-2xl bg-gray-500 bg-gradient-to-r from-main-500 to-second text-white rounded-2xl">
          <div 
            className={clsx(
              "absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center space-y-3 py-3 px-2 rounded-2xl transition",
              modalWindow && "backdrop-blur-sm bg-main-500/20 opacity-100 z-30",
              !modalWindow && 'opacity-0 z-10',
            )}
          >
            <button 
              disabled={!modalWindow} 
              className="modal-button relative"
            >
              Edit workout program
            </button>
            <button 
              disabled={!modalWindow} 
              className="modal-button relative"
              onClick={deleteCard}
            >
              Delete workout program
            </button>
            <div onClick={() => setModalWindow(false)} className="X cursor-pointer absolute w-[50px] h-[50px] right-2 top-0 flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
              </svg>
            </div>
          </div>
          <div className="first_level flex justify-between items-center">
            <h2 className="text-xl font-bold truncate">{name}</h2>
            <div onClick={() => setModalWindow(true)} className="three_dots cursor-pointer h-full flex justify-between items-center space-x-1 z-20">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            </div>
          </div>
          <div className="line relative w-full h-0.5 bg-white left-0"></div>
          <div className="second_level flex justify-between">
            <ul className="w-2/5 h-full space-y-px">
              {exercisesNames.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
            <div className="line relative w-0.5 h-full bg-white top-0 left"></div>
            <ul className="w-3/5 h-full flex flex-col items-center text-sm">
              <h3 className="text-lg mb-1">Run log</h3>
              {log.map(date => (
                <li className="text-center">{date.getDate()} {getMonth(date.getMonth())}, {getDay(date.getDay())}</li>
              ))}
            </ul>
          </div>
          <div className="third_level relative flex">
            <div className="time_display flex items-center space-x-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
              </svg>
              <div className="time">{calculateTotalTime()}</div>
            </div>
            <button className="play z-40 absolute left-1/2 transform -translate-x-1/2 bg-white border-4 border-gray-900 w-14 h-14 rounded-full flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-play-fill fill-gray-900 ml-1" viewBox="0 0 16 16">
                <path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z"/>
                {/* <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/> */}
              </svg>
            </button>
            <div 
              className={clsx(
                ""
              )}
            >
              Finished
            </div>
          </div>
        </div>
    )
}