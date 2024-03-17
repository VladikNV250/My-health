"use client"
import Card from "@/components/card";
import Navbar from "@/components/navbar";
import { Exercise, Workout } from "@/data";
import { useEffect, useState } from "react";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  useEffect(() => {
    const workoutsLS = JSON.parse(localStorage.getItem('workouts') as string);
    const arrWorkouts = [];
    if (workoutsLS) {
      for (let workout in workoutsLS) {
        arrWorkouts.push(workoutsLS[workout]);
      }
      setWorkouts(arrWorkouts);
    }
  }, [])


  return (
    <main className="bg-gray-200 w-screen h-screen pl-96 pr-20 py-24">
      <Navbar />
      <div className="container min-w-full min-h-full grid grid-cols-3 auto-rows-min gap-x-5 gap-y-16">
        {
          workouts.map((workout, key) => (
            <Card
              name={workout.name}
              breakTime={workout.breakInterval}
              duration={workout.duration}
              exercises={workout.exercises}
              log={workout.log}
              creationDate={workout.creationDate}
              workouts={workouts}
              setWorkouts={setWorkouts}
              key={key}
            />
          ))
        }
      </div>
    </main>
  );
}
