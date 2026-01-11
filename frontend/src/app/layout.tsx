import './globals.css'
import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {/* Header */}
        <header className="border-b bg-white">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">
            <Link href="/" className="font-bold text-lg text-gray-900 hover:text-gray-700">
            📚 Product Data Explorer
            </Link>
          </div>
        </header>

        {/* Main */}
        <main className="max-w-6xl mx-auto px-6 py-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t mt-12 py-6 text-sm text-gray-500 text-center">
          Data sourced responsibly from World of Books
        </footer>
      </body>
    </html>
  )
}
