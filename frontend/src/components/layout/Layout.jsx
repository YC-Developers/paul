import { Link, useLocation } from 'react-router-dom';
import { LogOut, Car, Home, Calendar, Grid } from 'lucide-react';

const Layout = ({ children, user, onLogout }) => {
  const location = useLocation();
  
  // Navigation items
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/parking-slots', label: 'Parking Slots', icon: <Grid size={20} /> },
    { path: '/car-entry', label: 'Car Entry', icon: <Car size={20} /> },
    { path: '/car-exit', label: 'Car Exit', icon: <Car size={20} /> },
    { path: '/reports', label: 'Reports', icon: <Calendar size={20} /> },
  ];
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">SmartPark</h1>
          <p className="text-sm text-gray-400">Parking Management</p>
        </div>
        
        <nav className="mt-6">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 ${
                    location.pathname === item.path
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 w-64 border-t border-gray-800">
          <button
            onClick={onLogout}
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 w-full"
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-end px-6 py-3">
            <div className="flex items-center">
              <span className="text-gray-900 font-medium">
                {user?.username}
              </span>
            </div>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
