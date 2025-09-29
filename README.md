# React Product Manager

A modern, responsive web application for managing products and categories with role-based authentication. Built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **Authentication System**: JWT-based login with role-based access control
- **Product Management**: View and manage products with detailed information
- **Category Management**: Admin-only category management system
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Role-Based Access**: Different permissions for admin and standard users
- **Modern UI**: Clean, intuitive interface with Lucide React icons
- **Form Handling**: React Hook Form for efficient form management

## 🛠️ Tech Stack

- **Frontend**: React 19.1.1
- **Build Tool**: Vite 7.1.6
- **Styling**: Tailwind CSS 3.4.17
- **Routing**: React Router DOM 7.9.1
- **HTTP Client**: Axios 1.12.2
- **Forms**: React Hook Form 7.62.0
- **Icons**: Lucide React 0.544.0
- **Authentication**: JWT with jwt-decode 4.0.0

## 📁 Project Structure

```
react-product-manager/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── categories/
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   │   └── Sidebar.jsx
│   │   └── products/
│   │       └── ProductModal.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   ├── pages/
│   │   ├── Categories.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   └── Products.jsx
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── formatters.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-product-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Authentication

The application uses JWT-based authentication with the following features:

- **Login**: Email and password authentication
- **Token Storage**: JWT tokens stored in localStorage
- **Role-Based Access**: Admin and standard user roles
- **Auto-Logout**: Automatic logout on token expiration
- **Protected Routes**: Route protection based on authentication status

### User Roles

- **Admin**: Full access to all features including category management
- **Standard User**: Read-only access to products and dashboard

## 📱 Pages & Features

### Dashboard
- Welcome screen with user information
- Role-based content display
- Quick action buttons
- System overview

### Products
- Complete product listing
- Product details including name, category, price, colors, and tags
- INR currency formatting
- Product summary with total count and value

### Categories (Admin Only)
- Category management interface
- Add new categories
- Manage product categorization

### Login
- Secure authentication form
- Error handling and validation
- Automatic redirect after successful login

## 🔧 Configuration

### API Configuration

The application connects to a backend API. Update the API base URL in `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8000' // Change to your API URL
```

### Environment Variables

Create a `.env` file in the root directory for environment-specific configurations:

```env
VITE_API_BASE_URL=http://localhost:8000
```

## 🎨 Styling

The application uses Tailwind CSS for styling with a custom configuration:

- **Color Scheme**: Blue and purple theme with gray accents
- **Responsive Design**: Mobile-first approach
- **Component Styling**: Utility-first CSS classes
- **Icons**: Lucide React icon library

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the deployment prompts

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload the `dist/` folder to Netlify
3. Configure redirects for SPA routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Issues**: Ensure the backend server is running and the API URL is correct
2. **Authentication Problems**: Check if JWT tokens are being stored properly in localStorage
3. **Build Errors**: Clear node_modules and reinstall dependencies
4. **Styling Issues**: Ensure Tailwind CSS is properly configured

### Getting Help

If you encounter any issues:

1. Check the browser console for errors
2. Verify all dependencies are installed
3. Ensure the backend API is running
4. Check network connectivity

## 🔮 Future Enhancements

- [ ] Product search and filtering
- [ ] Bulk product operations
- [ ] Product image upload
- [ ] Advanced category management
- [ ] User profile management
- [ ] Export/import functionality
- [ ] Dark mode support
- [ ] Mobile app version

---

**Built with  using React and Vite**