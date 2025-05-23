interface IWeeklySchedule {
    dayInfo:{
        isDayAvailable: boolean,
        day: string,
        availableHours: string[],
        hoursTaken: string[],
        dayNumber: number,
        fullDate: string
    }
}

export interface IDateRoot {
    id?: string | number,
    availableForAppointment: boolean,
    weeklySchedule: Array<IWeeklySchedule>
}