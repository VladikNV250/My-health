"use client"
import Navbar from "@/components/navbar";
import Exercise from "@/components/exercise";
import IconsMenu from "@/components/iconsmenu";
import { useState } from "react";
import { Icon } from "@/icons";
import clsx from "clsx";
import { useRouter } from "next/navigation";



export default function Page() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [targetID, setTargetID] = useState('');
  const [error, setError] = useState('');
  const [exercises, setExercises] = useState([
    {icon: Icon.Ball, name: 'Exercise 1', time: '00:30', id: 'ex-0'},
    {icon: Icon.Dumb, name: 'Exercise 2', time: '00:30', id: 'ex-1'},
    {icon: Icon.Run, name: 'Exercise 3', time: '00:30', id: 'ex-2'},
    {icon: Icon.Swim, name: 'Exercise 4', time: '00:30', id: 'ex-3'},
    {icon: Icon.Cycling, name: 'Exercise 5', time: '00:30', id: 'ex-4'},
  ])


  function handleSubmit(e: any) {
    // Prevent the browser from reloading the page
    e.preventDefault();


    function isValidTime(time: string): boolean {
      const regEx = /^([0-9][0-9]:[0-9][0-9])/i;
      if (!regEx.test(time)) 
        return false;
      if (time === '')
        return false;
      const [minutes, seconds] = time.split(':');
      if (+minutes === 0 && +seconds === 0)
        return false;
      return true;
    }

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    try {
      if (formJson.name === '') 
        throw new Error('workout name is empty');
    } catch (error) {
      console.log(error);
      setError('workout-name');
      return;
    }
    try {
      if (formJson.duration === '' || +formJson.duration === 0) 
        throw new Error('wrong duration');
    } catch (error) {
      console.log(error);
      setError('duration');
      return;
    }
    try {
      if (!isValidTime(formJson.breakInterval as string))
        throw new Error('not valid break interval');
    } catch (error) {
      console.log(error);
      setError('breakInterval');
      return;
    }
    try {
      exercises.forEach(exercise => {
        if (exercise.name === '')
          throw new Error(`${exercise.id} - name is empty`);
        if (!isValidTime(exercise.time)) 
          throw new Error(`${exercise.id} - wrong time`);
      })
    } catch (error) {
      console.log(error);
      setError('exercises');
      return;
    }

    const workouts_stringify = localStorage.getItem('workouts');
    let workouts
    if (workouts_stringify === null) {
      workouts = {};
      localStorage.setItem('workouts', "{}");
    } else {
      workouts = JSON.parse(workouts_stringify as string);
    }
    try {
      const oldWorkout = workouts[formJson.name as string]
      if (oldWorkout) throw new Error('That workout has already existed')
    } catch(error) {
      console.log(error);
      setError('workout-name-exist');
      return;
    }

    const workout = {
      name: formJson.name,
      breakInterval: formJson.breakInterval,
      duration: formJson.duration,
      exercises: exercises,
      log: [],
    }
    workouts[formJson.name as string] = workout;
    localStorage.setItem('workouts', JSON.stringify(workouts))   
    setError('');
    router.push('/');
  }

  function addExercise() {
    const lastExerciseID = exercises[exercises.length - 1].id;
    const newExercise = {icon: Icon.Ball, name: 'Exercise 1', time: '00:30', id: `ex-${+lastExerciseID.split('-')[1] + 1}`}
    setExercises([...exercises, newExercise]);
  }

  function changeBreakTime(target: HTMLInputElement, value: string) {
    const regEx = /[A-Za-z]+/i
    if (regEx.test(value)) {
        target.value = '00:00';
        return;
    }
    if (!value.includes(':')) {
        target.value = '00:00';
        return;
    }

    const [minutes, seconds] = value.split(':');
    if (seconds.length > 2 || +seconds >= 60) 
      target.value = `${minutes}:00`;
    if (minutes === '') 
      target.value = `00:${seconds}`;
    if (seconds === '') 
      target.value = `${minutes}:00`;
    
  }

  function changeDuration(target: HTMLInputElement, value: string) {
    const regEx = /[A-Za-z]+/i
    if (regEx.test(value)) {
        target.value = '00';
        return;
    }
  }

  return (
    <main className="relative bg-gray-200 w-screen min-h-screen pl-96 pr-20 py-24">
      <IconsMenu 
        opened={isOpen} 
        setOpened={setIsOpen}
        targetID={targetID}
        exercises={exercises}
        setExercises={setExercises}
      />
      <Navbar />
      <h2 className="absolute left-1/2 top-8 font-bold text-3xl">Workout Constructor</h2>
      <form onSubmit={handleSubmit} className="ml-32 mt-24 pr-52 space-y-12">
        <div className="name space-y-4">
          <h4 className="text-lg ml-3">Workout name</h4>
          <input type="text" name="name" id="name" className="outline-remove w-full text-lg py-1 px-3 border-2 border-main-500" />
          <div 
            className={clsx(
              "error text-base w-full bg-red-300/40 rounded-md px-3 py-2 border-2 border-red-400",
              error !== 'workout-name' && 'hidden',
            )}
          >
            Empty input
          </div>
          <div 
            className={clsx(
              "error text-base w-full bg-red-300/40 rounded-md px-3 py-2 border-2 border-red-400",
              error !== 'workout-name-exist' && 'hidden',
            )}
          >
            This workout name has been already taken
          </div>
        </div>
        <div className="exercises space-y-4">
          <h4 className="text-lg ml-3">Exercises</h4>
          <div 
            className={clsx(
              "error text-base w-full bg-red-300/40 rounded-md px-3 py-2 border-2 border-red-400",
              error !== 'exercises' && 'hidden'
            )}
          >
            Some errors in exercises input
          </div>
          {exercises.map((exercise, index) => (
            <Exercise
             icon={exercise.icon}
             name={exercise.name}
             time={exercise.time}
             id={exercise.id}
             exercises={exercises}
             setExercises={setExercises}
             setIsOpen={setIsOpen}
             setTargetID={setTargetID}
             key={index}
            />
          ))}
          <button type="button" onClick={addExercise} className="add-exercise flex justify-between items-center space-x-3 bg-white border-2 border-main-500 rounded-r-full px-3 py-0.5" >
            <p className="text-base">Add Exercise</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-plus text-main-500 mt-0.5" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          </button>
        </div>
        <div className="space-y-3">
          <div className="break-interval flex justify-between items-center">
            <h4 className="text-lg ml-3">Interval between exercises</h4>
            <div className="settimer w-[65px] flex border-2 border-main-500"> 
                  <input
                    onChange={event => changeBreakTime(event.target, event.target.value)}
                    type="text" 
                    name="breakInterval" 
                    id="breakInterval" 
                    defaultValue={'00:15'} 
                    className="outline-remove w-full text-end px-1" 
                  />
                  {/* <div className="w-[25px] flex flex-col justify-between items-center"> 
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
                  </div> */}
              </div>
          </div>
          <div 
            className={clsx(
              "error text-base w-full bg-red-300/40 rounded-md px-3 py-2 border-2 border-red-400",
              error !== 'breakInterval' && 'hidden'
            )}
          >
            Wrong time input
          </div>
        </div>
        <div className="space-y-3">
          <div className="duration flex justify-between items-center">
            <h4 className="text-lg ml-3">Workout duration (Days)</h4>
            <div className="w-[60px] flex border-2 border-main-500">
              <input 
                onChange={event => changeDuration(event.target, event.target.value)}
                type="text" 
                name="duration" 
                id="duration" 
                defaultValue='01'
                className="outline-remove w-full text-end px-1"
              />
              {/* <div className="w-5/12 flex flex-col justify-between items-center">
                <button className="up w-full h-1/2 pt-0.5 flex items-start justify-center bg-neutral-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-chevron-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z" />
                  </svg>
                </button>
                <div className="hr w-full h-0.5 bg-neutral-600" />
                <button className="down w-full h-1/2 pb-0.5 flex items-end justify-center bg-neutral-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                  </svg>
                </button>
              </div> */}
            </div>
          </div>
          <div 
            className={clsx(
              "error text-base w-full bg-red-300/40 rounded-md px-3 py-2 border-2 border-red-400", 
              error !== 'duration' && 'hidden'
          )}>
            Wrong day input
          </div>
        </div>
        <button type="submit" className="flex justify-between items-center space-x-3 bg-white border-2 border-main-500 rounded-r-full px-4 py-2">
          <p className="text-base">Create Workout Program</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-check text-main-500 mt-0.5" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
          </svg>
        </button>
      </form>
    </main>
  )
}