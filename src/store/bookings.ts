import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BookingState } from '../types';

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      bookings: [],
      addBooking: (booking) =>
        set((state) => ({
          bookings: [
            ...state.bookings,
            {
              ...booking,
              id: Math.random().toString(36).substring(7)
            }
          ]
        }))
    }),
    {
      name: 'bookings-storage'
    }
  )
);