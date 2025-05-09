'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { MenuIcon, XIcon } from 'lucide-react'
import { UserButton, useUser } from '@clerk/nextjs'

const Navbar = () => {
  const { user } = useUser()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  const navItems = [
    { label: 'Products', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Clients', href: '#' },
    { label: 'Resources', href: '#' },
    { label: 'Documentation', href: '#' },
    { label: 'Enterprise', href: '#' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-900">GumDupe</div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="bg-gradient-to-tr from-blue-500 to-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-full hover:opacity-90 transition-all shadow"
          >
            {user ? 'Dashboard' : 'Get Started'}
          </Link>
          {user ? <UserButton afterSignOutUrl="/" /> : null}

          {/* Mobile Menu Icon */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-sm px-4 pb-4">
          <nav className="flex flex-col gap-3 mt-2 text-gray-700 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
