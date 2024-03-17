export interface Exercise {
    icon: string, 
    name: string, 
    time: string,
    readonly id: string,
};
export interface Workout {
    name: string,
    breakInterval: string,
    duration: string,
    exercises: Exercise[],
    log: Date[],
    creationDate: Date,
  }
  

export type Month = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';
export type Day = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';