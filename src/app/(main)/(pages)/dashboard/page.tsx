import React from 'react'

const DashboardPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-800">
      <header className="sticky top-0 z-10 p-6 bg-white/70 backdrop-blur-md shadow-md border-b">
        <h1 className="text-2xl font-bold ">📊 Dashboard</h1>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-xl text-center space-y-6 bg-white p-8 rounded-2xl shadow-lg border">
          <p className="text-lg font-medium">
            🚧 This is just a prototype. There may be bugs and issues — thanks for your patience!
          </p>
          <p className="text-base text-gray-600">
            🛠️ Built with <span className="font-semibold">Next.js</span>, <span className="font-semibold">Zustand</span>,{' '}
            <span className="font-semibold">Clerk</span>, <span className="font-semibold">NeonTech</span> (DB), and{' '}
            <span className="font-semibold">Prisma ORM</span>.
          </p>
          <p className="italic text-gray-500">
            🚀 This project showcases my full-stack development skills.
          </p>
        </div>
      </main>

      <footer className="text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Your Name. All rights reserved.
      </footer>
    </div>
  )
}

export default DashboardPage
