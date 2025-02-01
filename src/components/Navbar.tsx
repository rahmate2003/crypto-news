// src/components/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold">CryptoNews</h1>
        <div>
          <Link href="/global" className="text-white mr-4 hover:underline">
            News from Global
          </Link>
          <Link href="/id" className="text-white hover:underline">
            News from Indonesia
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
