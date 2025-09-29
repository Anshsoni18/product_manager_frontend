/**
 * Format price in Indian Rupees format
 * @param {number} price - Price to format
 * @returns {string} Formatted price string
 * 
 * Usage: formatINR(500000) returns "Rs. 5,00,000/-"
 */
export const formatINR = (price) => {
    if (typeof price !== 'number' || isNaN(price)) {
      return 'Rs. 0/-'
    }
  
    // Format number with Indian number system (lakhs, crores)
    const formattedPrice = new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(price)
    
    return `Rs. ${formattedPrice}/-`
  }
  
  /**
   * Format price with decimal places
   * @param {number} price - Price to format
   * @returns {string} Formatted price string with decimals
   */
  export const formatINRWithDecimals = (price) => {
    if (typeof price !== 'number' || isNaN(price)) {
      return 'Rs. 0.00/-'
    }
  
    const formattedPrice = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price)
    
    return `Rs. ${formattedPrice}/-`
  }