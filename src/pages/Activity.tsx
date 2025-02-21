// activity.tsx
import { useBookingStore } from '../store/bookings';

export default function Activity() {
  const { bookings } = useBookingStore();

  return (
    <div className="p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">ID</th>
            <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Movie</th>
            <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Tickets</th>
            <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Amount</th>
            <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Time</th>
            <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking.id} className="border-b border-gray-200">
              <td className="py-4 px-6 text-sm text-gray-800">{String(index + 1).padStart(2, '0')}</td>
              <td className="py-4 px-6 text-sm text-gray-800">{booking.movie}</td>
              <td className="py-4 px-6 text-sm text-gray-800">{booking.tickets}</td>
              <td className="py-4 px-6 text-sm text-gray-800">${booking.amount.toFixed(2)}</td>
              <td className="py-4 px-6 text-sm text-gray-800">{booking.time}</td>
              <td className="py-4 px-6 text-sm text-gray-800">{booking.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}