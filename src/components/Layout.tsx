import { Globe, MonitorPlay, Download } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { username } = useAuthStore();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-black text-white p-6">
        <div className="flex items-center gap-2 mb-12">
          <Globe className="w-6 h-6" />
          <span className="text-xl font-semibold">Almanack</span>
        </div>

        <nav className="space-y-2">
          <Link
            to="/booking"
            className={`flex items-center gap-2 p-3 rounded-lg ${
              pathname === '/booking'
                ? 'bg-white text-black'
                : 'hover:bg-white/10'
            }`}
          >
            <MonitorPlay className="w-5 h-5" />
            <span>Booking</span>
          </Link>
          <Link
            to="/activity"
            className={`flex items-center gap-2 p-3 rounded-lg ${
              pathname === '/activity'
                ? 'bg-white text-black'
                : 'hover:bg-white/10'
            }`}
          >
            <Download className="w-5 h-5" />
            <span>Activity</span>
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          {pathname === '/booking' && (
            <h1 className="text-2xl">Good Morning Mr. {username}!</h1>
          )}
          {pathname === '/activity' && (
            <h1 className="text-2xl">Activity</h1>
          )}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">
                {username?.split('.').map(word => word[0].toUpperCase()).join('')}
              </span>
            </div>
            <span className="font-medium">
              {username?.split('.').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </span>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}