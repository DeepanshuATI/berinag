// app/dashboard/layout.tsx
import Sidebar from '../../components/Sidebar';
import React from 'react'; // Make sure to import React!

// 1. Define the props type
type DashboardLayoutProps = {
  children: React.ReactNode;
};

// 2. Apply the type to your component's props
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-100">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto relative">
        {/* Water particles background effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-300/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}