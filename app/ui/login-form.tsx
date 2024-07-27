'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
	e.preventDefault();
	// Handle login logic here
	// For example, you can call an API to authenticate the user
	// If successful, redirect to the dashboard or another page
	console.log('Email:', email);
	console.log('Password:', password);
	// Example redirect
	router.push('/dashboard');
  };

  return (
	<div className="flex items-center justify-center min-h-screen bg-gray-100">
	  <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
		<h2 className="text-2xl font-bold text-center">Login</h2>
		<form onSubmit={handleSubmit} className="space-y-6">
		  <div>
			<label htmlFor="email" className="block text-sm font-medium text-gray-700">
			  Email address
			</label>
			<input
			  id="email"
			  name="email"
			  type="email"
			  autoComplete="email"
			  required
			  className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
			  value={email}
			  onChange={(e) => setEmail(e.target.value)}
			/>
		  </div>
		  <div>
			<label htmlFor="password" className="block text-sm font-medium text-gray-700">
			  Password
			</label>
			<input
			  id="password"
			  name="password"
			  type="password"
			  autoComplete="current-password"
			  required
			  className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
			  value={password}
			  onChange={(e) => setPassword(e.target.value)}
			/>
		  </div>
		  <div>
			<button
			  type="submit"
			  className="w-full px-4 py-2 font-medium text-white bg-amber-500 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
			>
			  Sign in
			</button>
		  </div>
		</form>
	  </div>
	</div>
  );
};

export default LoginPage;