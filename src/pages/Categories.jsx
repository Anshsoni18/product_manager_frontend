import { useState, useEffect } from 'react'
import Sidebar from '../components/layout/Sidebar'
import ProductModal from '../components/products/ProductModal'
import { categoriesAPI } from '../services/api'
import { FolderOpen, Plus, Package } from 'lucide-react'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await categoriesAPI.getAll()
      setCategories(response.data)
    } catch (error) {
      setError('Failed to fetch categories')
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddProduct = (category) => {
    setSelectedCategory(category)
    setIsModalOpen(true)
  }

  const handleProductAdded = () => {
    setIsModalOpen(false)
    setSelectedCategory(null)
    // Refresh categories to update product count
    fetchCategories()
  }

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Category Management
            </h1>
            <p className="text-gray-600">
              Manage product categories and add new products
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 rounded-full p-3 mr-4">
                      <FolderOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Package className="h-4 w-4 mr-1" />
                      <span>{category.product_count} products</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddProduct(category)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </button>
                </div>
              </div>
            ))}
          </div>

          {categories.length === 0 && !loading && (
            <div className="text-center py-12">
              <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No categories</h3>
              <p className="mt-1 text-sm text-gray-500">
                No categories have been created yet.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Product Modal */}
      {isModalOpen && selectedCategory && (
        <ProductModal
          category={selectedCategory}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onProductAdded={handleProductAdded}
        />
      )}
    </div>
  )
}

export default Categories