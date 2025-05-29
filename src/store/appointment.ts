import { defineStore } from 'pinia';

interface AppointmentState {
  selectedDate: string;
  selectedHour: string;
  formattedDate: string;
  dayName: string;
}

export const useAppointmentStore = defineStore('appointment', {
  state: (): AppointmentState => ({
    selectedDate: '',
    selectedHour: '',
    formattedDate: '',
    dayName: ''
  }),
  
  actions: {
    setAppointment(dayName: string, hour: string, formattedDate: string) {
      this.dayName = dayName; // Guardamos el nombre del día
      this.selectedDate = dayName; // Y también lo guardamos aquí
      this.selectedHour = hour;
      this.formattedDate = formattedDate;
    },
    
    getDayNameFromDate(dateString: string): string {
      const date = new Date(dateString);
      const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      return days[date.getDay()];
    }
  },
  
  getters: {
    getSelectedDate: (state) => state.selectedDate,
    getSelectedHour: (state) => state.selectedHour,
    getFormattedDate: (state) => state.formattedDate,
    getDayName: (state) => state.dayName
  }
});