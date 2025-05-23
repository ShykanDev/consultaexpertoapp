export interface IFutureAppointment {
  id: string
  userId: string
  proffession: string
  dayNumber: number
  month: string
  hour: string
  day: string
  year: string
  createdAt: {
    seconds: number
    nanoseconds: number
  }
}
