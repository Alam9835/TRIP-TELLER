import React, { useEffect, useState } from 'react';
import { Button } from "../ui/button";

import { FcGoogle } from "react-icons/fc";
import { User, LogOut, Plus, MapPin, Menu, X } from 'lucide-react';
import axios from 'axios';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

// Fake toast function (replace with your actual toast lib)
const useToast = () => ({
  success: (message) => console.log('Success:', message),
  error: (message) => console.log('Error:', message),
});

function Header() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [openDialog, setOpenDialog] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      GetUserProfile(tokenResponse);
    },
    onError: (err) => {
      console.log(err);
      toast.error("Login failed");
    },
  });

  const GetUserProfile = async (tokenInfo) => {
    try {
      const resp = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(resp.data));
      toast.success("Signed in successfully!");
      setOpenDialog(false);
      window.location.reload();
    } catch (err) {
      console.error("Error fetching user info", err);
      toast.error("Failed to fetch user info");
    }
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <div className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-white shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 group">
              <a href="/" className="flex items-center space-x-2">
                <div className="relative">
                  <img 
                    src="/logo.svg" 
                    alt="Logo" 
                    className="h-8 w-auto transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full blur-xl"></div>
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                 <a href="/create-trip" className="group">
  <Button 
    variant="outline" 
    className="rounded-full bg-white hover:bg-orange-100 border border-gray-300 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
  >
    <Plus className="w-4 h-4 mr-2" />
    Create Trip
  </Button>
</a>

<a href="/my-trips" className="group">
  <Button 
    variant="outline" 
    className="rounded-full bg-white hover:bg-orange-100 border border-gray-300 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
  >
    <MapPin className="w-4 h-4 mr-2" />
    My Trips
  </Button>
</a>


                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="group relative">
                        <div className="relative">
                          <img 
                            src={user?.picture} 
                            alt="Profile"
                            className="h-10 w-10 rounded-full border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 transform hover:scale-110"
                          />
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </div>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-0 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl rounded-xl">
                      <div className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <img 
                            src={user?.picture} 
                            alt="Profile"
                            className="h-12 w-12 rounded-full"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">{user?.name}</p>
                            <p className="text-sm text-gray-500">{user?.email}</p>
                          </div>
                        </div>
                        <hr className="my-3 border-gray-200" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              ) : (
                <Button 
                  onClick={() => setOpenDialog(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-8 py-2 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Get Started
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-96 opacity-100 border-t border-gray-100' 
              : 'max-h-0 opacity-0'
          } overflow-hidden bg-white/95 backdrop-blur-sm`}
        >
          <div className="px-4 py-4 space-y-3">
            {user ? (
              <>
                <div className="flex items-center space-x-3 mb-4">
                  <img 
                    src={user?.picture} 
                    alt="Profile"
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>
               <a href="/create-trip" className="block">
 <Button variant="whiteOutline" className="rounded-full">
  <Plus className="w-4 h-4 mr-2" />
  Create Trip
</Button>
</a>

<a href="/my-trips" className="block">
  <Button 
    variant="outline" 
    className="w-full rounded-full bg-white hover:bg-orange-100 border border-gray-300"
  >
    <MapPin className="w-4 h-4 mr-2" />
    My Trips
  </Button>
</a>

                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full rounded-full text-red-600 border-red-200 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => setOpenDialog(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full"
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Sign In Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50 rounded-lg"></div>
          <div className="relative">
            <DialogHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome Back!
              </DialogTitle>
              <DialogDescription className="text-gray-600 mt-2">
                Sign in with Google to create and manage your personalized trip plans securely.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6">
              <Button
                onClick={login}
                className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 rounded-full py-3 px-6 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
              >
                <FcGoogle className="w-6 h-6" />
                <span>Continue with Google</span>
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Header;
