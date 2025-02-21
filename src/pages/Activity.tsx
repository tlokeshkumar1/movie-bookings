import { useBookingStore } from '../store/bookings';

export default function Activity() {
  const { bookings } = useBookingStore();

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="pb-4">ID</th>
            <th className="pb-4">Movie</th>
            <th className="pb-4">Tickets</th>
            <th className="pb-4">Amount</th>
            <th className="pb-4">Time</th>
            <th className="pb-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking.id} className="border-b">
              <td className="py-4">{String(index + 1).padStart(2, '0')}</td>
              <td className="py-4">{booking.movie}</td>
              <td className="py-4">{booking.tickets}</td>
              <td className="py-4">${booking.amount.toFixed(2)}</td>
              <td className="py-4">{booking.time}</td>
              <td className="py-4">{booking.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}