import React from "react";
import { motion } from "framer-motion";
import { Transition } from "@/components/ui/transition";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-white font-bold text-xl">Next-Gen G Klasa</div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-white hover:text-gray-300">Features</a>
            <a href="#" className="text-white hover:text-gray-300">Leagues</a>
            <a href="#" className="text-white hover:text-gray-300">Players</a>
            <a href="#" className="text-white hover:text-gray-300">Schedule</a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-white hover:text-gray-300">Login</a>
          <a href="#" className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">Sign Up</a>
        </div>
      </div>
    </nav>
  );
}