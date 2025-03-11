import React from "react";
import { motion } from "framer-motion";
import { Transition } from "@/components/ui/transition";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
          <span className="ml-3 text-xl">Next-Gen G Klasa</span>
        </a>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l sm:border-gray-700 sm:py-2 sm:mt-0 mt-4">© 2023 Next-Gen G Klasa —
          <a href="https://twitter.com/knyttneve" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">@twitter</a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a className="text-gray-500">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14h2v8h-2zm0 10h2v2h-2z"></path>
            </svg>
          </a>
          <a className="ml-3 text-gray-500">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
              <rect fill="none" height="24" width="24"></rect>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18l-2.79-5.25h5.58L12 8l-2.79 5.25h-5.58L12 20z"></path>
            </svg>
          </a>
          <a className="ml-3 text-gray-500">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M17.89 9.61c.33-.34.09-.86-.36-.86H13.5V6c0-.55-.45-1-1-1s-1 .45-1 1v2H7.47c-.44 0-.69.52-.37.86l5.96 6.04c.2.19.45.3.74.3s.54-.11.74-.3l5.96-6.04z"></path>
              <path fill="none" d="M0 0h24v24H0z"></path>
            </svg>
          </a>
          <a className="ml-3 text-gray-500">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
              <rect fill="none" height="24" width="24"></rect>
              <circle cx="12" cy="12" r="5"></circle>
            </svg>
          </a>
        </span>
      </div>
    </footer>
  );
}