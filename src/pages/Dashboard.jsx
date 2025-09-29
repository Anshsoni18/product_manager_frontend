import { useAuth } from '../contexts/AuthContext'
import Sidebar from '../components/layout/Sidebar'
import { Crown, User as UserIcon } from 'lucide-react'

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <div className={`mx-auto h-16 w-16 rounded-full flex items-center justify-center ${
                user?.role === 'admin' ? 'bg-purple-100' : 'bg-blue-100'
              }`}>
                {user?.role === 'admin' ? (
                  <Crown className={`h-8 w-8 ${
                    user?.role === 'admin' ? 'text-purple-600' : 'text-blue-600'
                  }`} />
                ) : (
                  <UserIcon className="h-8 w-8 text-blue-600" />
                )}
              </div>
              
              <h1 className="mt-4 text-3xl font-bold text-gray-900">
                Welcome, {user?.role === 'admin' ? 'Admin' : 'User'}!
              </h1>
              
              <p className="mt-2 text-lg text-gray-600">
                {user?.email}
              </p>
              
              <div className={`mt-4 inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                user?.role === 'admin' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {user?.role === 'admin' ? 'Administrator' : 'Standard User'}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Product Management
                </h3>
                <p className="text-blue-700">
                  View and manage all products in the system. You can see product details, 
                  categories, pricing, and more.
                </p>
              </div>

              {user?.role === 'admin' && (
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">
                    Category Management
                  </h3>
                  <p className="text-purple-700">
                    As an admin, you have access to category management. 
                    Add new products to categories and manage the product catalog.
                  </p>
                </div>
              )}
              
              {user?.role !== 'admin' && (
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Limited Access
                  </h3>
                  <p className="text-gray-700">
                    You have read-only access to the product catalog. 
                    Contact an administrator for additional permissions.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/products"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  View All Products
                </a>
                {user?.role === 'admin' && (
                  <a
                    href="/categories"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Manage Categories
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard