export interface Movie {
  id: string;
  name: string;
  year: number;
  image: string;
}

export interface Booking {
  id: string;
  movie: string;
  tickets: number;
  amount: number;
  time: string;
  date: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export interface BookingState {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id'>) => void;
}

export interface MovieState {
  movies: Movie[];
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
}