// selection.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Minus, Plus, Sun, Globe, Moon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useMovieStore } from '../store/movies';
import { useBookingStore } from '../store/bookings';

export default function Selection() {
  const navigate = useNavigate();
  const { selectedMovie } = useMovieStore();
  const addBooking = useBookingStore((state) => state.addBooking);

  const [tickets, setTickets] = useState(1);
  const [time, setTime] = useState('12:00');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [loading, setLoading] = useState(false);

  if (!selectedMovie) {
    navigate('/booking');
    return null;
  }

  const handleBook = async () => {
    setLoading(true);
    addBooking({
      movie: selectedMovie.name,
      tickets,
      amount: tickets * 25,
      time,
      date: format(new Date(date), 'dd-MM-yy')
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success('Tickets Booked');
    setLoading(false);
    navigate('/activity');
  };

  return (
    <div className="w-full">
      <div className="max-w-2xl">
        <div className="aspect-[21/9] rounded-lg overflow-hidden mb-4">
          <img
            src={selectedMovie.image}
            alt={selectedMovie.name}
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="text-lg font-medium mb-4 text-left">
          {selectedMovie.name} ({selectedMovie.year})
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-start gap-2">
            <label className="text-sm font-medium">Ticket Count</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTickets(Math.max(1, tickets - 1))}
                className="rounded-lg bg-transparent text-black hover:bg-gray-200 transition-colors duration-200"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-xl font-medium w-8 text-center bg-black text-white rounded-lg">
                {tickets}
              </span>
              <button
                onClick={() => setTickets(tickets + 1)}
                className="rounded-lg bg-transparent text-black hover:bg-gray-200 transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-start gap-2">
            <label className="text-sm font-medium">Show Time</label>
            <div className="flex gap-2">
              <button
                onClick={() => setTime('09:00')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  time === '09:00'
                    ? 'bg-black text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span className="text-sm">9:00</span>
              </button>
              <button
                onClick={() => setTime('12:00')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  time === '12:00'
                    ? 'bg-black text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">12:00</span>
              </button>
              <button
                onClick={() => setTime('18:00')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  time === '18:00'
                    ? 'bg-black text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span className="text-sm">18:00</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-start gap-2">
            <label className="text-sm font-medium">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-3 py-2 rounded-lg bg-gray-200 text-sm w-32"
            />
          </div>

          <button
            onClick={handleBook}
            disabled={loading}
            className="w-full max-w-xs mr-auto block bg-black text-white py-2 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 mt-2"
          >
            {loading ? 'Booking...' : 'Book Ticket'}
          </button>
        </div>
      </div>
    </div>
  );
}