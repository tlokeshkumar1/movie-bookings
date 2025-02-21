import { Globe, MonitorPlay, Download, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { username, logout } = useAuthStore();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen p-4 bg-gray-50">
      <aside className="w-64 bg-black text-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center gap-3 mb-12">
          <Globe className="w-6 h-6" />
          <span className="text-xl font-semibold">Almanack</span>
        </div>

        <nav className="space-y-4">
          <Link
            to="/booking"
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
              pathname === '/booking'
                ? 'bg-white text-black'
                : 'hover:bg-white/15'
            }`}
          >
            <MonitorPlay className="w-5 h-5" />
            <span className="text-sm font-medium">Booking</span>
          </Link>
          <Link
            to="/activity"
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
              pathname === '/activity'
                ? 'bg-white text-black'
                : 'hover:bg-white/15'
            }`}
          >
            <Download className="w-5 h-5" />
            <span className="text-sm font-medium">Activity</span>
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-0 bg-white rounded-2xl shadow-lg ml-6">
        <div className="flex justify-end items-center mb-4">
          {pathname === '/booking' && (
            <h1 className="text-xl font-bold flex-1 mr-4">Good Morning Mr. {username}!</h1>
          )}
          {pathname === '/activity' && (
            <h1 className="text-xl font-bold flex-1 mr-4">Activity</h1>
          )}
          <div className="relative">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium">
                  {username?.split('.').map(word => word[0].toUpperCase()).join('')}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {username?.split('.').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </span>
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-100 z-10">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 w-full text-left text-gray-800 transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4 text-gray-600" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="p-4">{children}</div> {/* Added padding inside the main content */}
      </main>
    </div>
  );
}