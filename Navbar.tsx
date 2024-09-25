import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-green-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white text-xl font-semibold">
              PlantID
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-white hover:bg-green-700 px-3 py-2 rounded-md">
                Home
              </Link>
              <Link href="/about" className="text-white hover:bg-green-700 px-3 py-2 rounded-md">
                About
              </Link>
              <Link href="/contact" className="text-white hover:bg-green-700 px-3 py-2 rounded-md">
                Contact
              </Link>
              <Link href="/faq" className="text-white hover:bg-green-700 px-3 py-2 rounded-md">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}