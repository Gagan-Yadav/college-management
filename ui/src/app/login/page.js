'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserIcon, LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react'

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const response = await fetch('http://localhost:8080/public/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
          credentials: 'include', 
        });
        console.log(response);
  
        if (response.ok) {
          console.log('Login successful');
          window.location.href = '/dashboard'; 
        } else {
          const errorMessage = await response.text();
          alert(errorMessage);
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed, please try again.');
      }
    };
  
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900"></div>
          <div className="absolute inset-0 opacity-50">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-blue-500 rounded-full blur-3xl"
                style={{
                  width: '40vw',
                  height: '40vw',
                  top: `${30 * i}%`,
                  left: `${30 * i}%`,
                  animation: `pulse 15s ease-in-out infinite alternate-reverse`,
                  animationDelay: `${5 * i}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
  
        <style jsx global>{`
          @keyframes pulse {
            0% { transform: scale(1) translate(0, 0); opacity: 0.5; }
            50% { transform: scale(1.05) translate(2%, 2%); opacity: 0.6; }
            100% { transform: scale(1) translate(0, 0); opacity: 0.5; }
          }
        `}</style>
  
        <div className="bg-gray-800 bg-opacity-80 rounded-lg shadow-xl p-8 w-full max-w-md relative z-10 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-100">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-gray-300">Username</Label>
              <div className="relative">
                <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-300">Password</Label>
              <div className="relative">
                <LockIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-12 py-2 w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 focus:outline-none"
                >
                  {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
            >
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-gray-400 hover:text-gray-200 transition duration-200">Forgot password?</a>
          </div>
        </div>
      </div>
    );
}