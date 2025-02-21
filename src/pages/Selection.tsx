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
    <div className="max-w-2xl mx-auto p-4">
      <div className="aspect-[21/9] rounded-lg overflow-hidden mb-4">
        <img
          src={selectedMovie.image}
          alt={selectedMovie.name}
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-lg font-medium mb-4">
        {selectedMovie.name} ({selectedMovie.year})
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Ticket Count</label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTickets(Math.max(1, tickets - 1))}
              className="p-1 rounded-lg bg-black text-white"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-lg font-medium w-6 text-center">
              {tickets}
            </span>
            <button
              onClick={() => setTickets(tickets + 1)}
              className="p-1 rounded-lg bg-black text-white"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Show Time</label>
          <div className="flex gap-2">
            <button
              onClick={() => setTime('09:00')}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg ${
                time === '09:00'
                  ? 'bg-black text-white'
                  : 'bg-gray-100'
              }`}
            >
              <Sun className="w-3 h-3" />
              <span className="text-sm">9:00</span>
            </button>
            <button
              onClick={() => setTime('12:00')}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg ${
                time === '12:00'
                  ? 'bg-black text-white'
                  : 'bg-gray-100'
              }`}
            >
              <Globe className="w-3 h-3" />
              <span className="text-sm">12:00</span>
            </button>
            <button
              onClick={() => setTime('18:00')}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg ${
                time === '18:00'
                  ? 'bg-black text-white'
                  : 'bg-gray-100'
              }`}
            >
              <Moon className="w-3 h-3" />
              <span className="text-sm">18:00</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-1 rounded-lg bg-gray-100 text-sm"
          />
        </div>

        <button
          onClick={handleBook}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg font-medium text-sm disabled:opacity-50"
        >
          {loading ? 'Booking...' : 'Book Ticket'}
        </button>
      </div>
    </div>
  );
}