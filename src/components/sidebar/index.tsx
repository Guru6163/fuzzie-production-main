'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { menuOptions } from '@/lib/constant'
import clsx from 'clsx'
import { Separator } from '@/components/ui/separator'
import { Database, GitBranch, LucideMousePointerClick } from 'lucide-react'
import { ModeToggle } from '../global/mode-toggle'

type Props = {}

const MenuOptions = (props: Props) => {
  const pathName = usePathname()

  return (
    <nav className="bg-white border-r border-gray-200 h-screen flex flex-col justify-between items-center py-6 px-3 shadow-sm">
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-900">
          GumDupe.
        </Link>

        {/* Menu Options */}
        <TooltipProvider>
          <ul className="flex flex-col gap-4 items-center">
            {menuOptions.map((menuItem) => (
              <Tooltip key={menuItem.name} delayDuration={0}>
                <TooltipTrigger asChild>
                  <li>
                    <Link
                      href={menuItem.href}
                      className={clsx(
                        'p-2 rounded-lg transition-colors duration-200 flex items-center justify-center',
                        {
                          'bg-blue-100 text-blue-600': pathName === menuItem.href,
                          'hover:bg-gray-100': pathName !== menuItem.href,
                        }
                      )}
                    >
                      <menuItem.Component
                        selected={pathName === menuItem.href}
                        className="w-5 h-5"
                      />
                    </Link>
                  </li>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-sm">
                  {menuItem.name}
                </TooltipContent>
              </Tooltip>
            ))}
          </ul>
        </TooltipProvider>

        <Separator className="w-full my-6" />

        {/* Extra Tools Section */}
        <div className="flex flex-col items-center gap-6">
          {[LucideMousePointerClick, GitBranch, Database, GitBranch].map(
            (Icon, idx) => (
              <div
                key={idx}
                className="relative p-2 rounded-lg bg-gray-50 border border-gray-200 hover:shadow transition"
              >
                <Icon className="text-gray-500 w-4 h-4" />
                {idx < 3 && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-[24px] h-5 border-l border-gray-300" />
                )}
              </div>
            )
          )}
        </div>
      </div>

      {/* Mode Toggle */}
      <div>
        <ModeToggle />
      </div>
    </nav>
  )
}

export default MenuOptions
