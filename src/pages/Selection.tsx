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
    <div className="max-w-3xl">
      <div className="aspect-[21/9] rounded-lg overflow-hidden mb-6">
        <img
          src={selectedMovie.image}
          alt={selectedMovie.name}
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-2xl font-medium mb-8">
        {selectedMovie.name} ({selectedMovie.year})
      </h2>

      <div className="space-y-8">
        <div>
          <label className="block mb-2">Ticket Count</label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTickets(Math.max(1, tickets - 1))}
              className="p-2 rounded-lg bg-black text-white"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-xl font-medium w-8 text-center">
              {tickets}
            </span>
            <button
              onClick={() => setTickets(tickets + 1)}
              className="p-2 rounded-lg bg-black text-white"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div>
          <label className="block mb-2">Show Time</label>
          <div className="flex gap-4">
            <button
              onClick={() => setTime('09:00')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                time === '09:00'
                  ? 'bg-black text-white'
                  : 'bg-gray-100'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>9:00</span>
            </button>
            <button
              onClick={() => setTime('12:00')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                time === '12:00'
                  ? 'bg-black text-white'
                  : 'bg-gray-100'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>12:00</span>
            </button>
            <button
              onClick={() => setTime('18:00')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                time === '18:00'
                  ? 'bg-black text-white'
                  : 'bg-gray-100'
              }`}
            >
              <Moon className="w-4 h-4" />
              <span>18:00</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-100"
          />
        </div>

        <button
          onClick={handleBook}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg font-medium disabled:opacity-50"
        >
          {loading ? 'Booking...' : 'Book Ticket'}
        </button>
      </div>
    </div>
  );
}