
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="h-screen flex flex-col justify-between bg-gray-100">
      <header className="bg-amber-500 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">App de Estudos</h1>
          <nav className='flex '>
            <Link href="/login">
              <p className="px-4 py-2 rounded-md bg-white text-amber-500 hover:bg-gray-200">Login</p>
            </Link>
            <Link href="/register">
              <p className="ml-4 px-4 py-2 rounded-md bg-white text-amber-500 hover:bg-gray-200">Register</p>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <section className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-3xl font-bold mb-4">Bem Vindo ao App de Estudos</h2>
          <p className="text-gray-700 mb-4">
            Product Name is a revolutionary product that helps you achieve your goals. It offers a range of features designed to make your life easier and more productive.
          </p>
          <p className="text-gray-700 mb-4">
            With Product Name, you can manage your tasks, track your progress, and stay organized. Our intuitive interface and powerful tools are designed to help you succeed.
          </p>
          <p className="text-gray-700">
            Join us today and start experiencing the benefits of Product Name!
          </p>
        </section>

        <section className="mt-8 flex justify-center space-x-4">
          <Link href="/login">
            <p className="px-6 py-3 rounded-md bg-amber-500 text-white font-bold hover:bg-amber-600">Login</p>
          </Link>
          <Link href="/register">
            <p className="px-6 py-3 rounded-md bg-amber-500 text-white font-bold hover:bg-amber-600">Register</p>
          </Link>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} App de Estudos. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
