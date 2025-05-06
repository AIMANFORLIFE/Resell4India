import React from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { AuthForm } from './components/auth/AuthForm'
import { Cart } from './components/cart/Cart'
import { Products } from './components/products/Products'
import ErrorBoundary from './components/ErrorBoundary'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function AppContent() {
  const { user, signOut, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <h1 className="text-2xl md:text-3xl font-bold">Resell4India</h1>
            <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <a href="#" className="nav-link text-white hover:text-primary-200">Home</a>
              <a href="#" className="nav-link text-white hover:text-primary-200">Products</a>
              <a href="#" className="nav-link text-white hover:text-primary-200">Categories</a>
              <Cart />
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-primary-100">Welcome, {user.email}</span>
                  <button
                    onClick={signOut}
                    className="btn btn-secondary text-sm"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <a href="#auth" className="btn btn-secondary text-sm">
                  Sign In
                </a>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!user ? (
          <section id="auth" className="py-12">
            <AuthForm />
          </section>
        ) : (
          <>
            <section className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Welcome to Resell4India
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Your one-stop destination for quality second-hand products. 
                Browse through our extensive collection of pre-owned items at unbeatable prices.
              </p>
            </section>

            {/* Products Section */}
            <section className="mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Featured Products</h3>
              <Products />
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">About Resell4India</h4>
              <p className="text-gray-400">
                Your trusted marketplace for quality second-hand products.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contact Us</h4>
              <p className="text-gray-400">
                Email: info@resell4india.com<br />
                Phone: +91 123 456 7890
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Resell4India. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App 