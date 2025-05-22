'use client';

import React from 'react';
import { Global } from '../types/global';
import Navbar from './Navbar';

interface HeaderProps {
  global: Global;
}

export default function Header({ global }: HeaderProps) {
  // Safety check for undefined data
  if (!global) {
    return (
      <header className="fixed top-0 left-0 right-0 bg-[#F8F6F3] shadow-sm z-50">
        
      </header>
    );
  }
  
  return (
    <header className="sticky-header">
      <Navbar navbar={global.navbar} />
    </header>
  );
} 