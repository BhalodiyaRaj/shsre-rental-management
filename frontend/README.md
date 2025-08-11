# Rental Management System

A comprehensive React-based rental management application that streamlines the entire rental process, providing a unified platform to manage products, schedule pickups, and handle customer orders.

## Features

### Core Rental Features
- **Rental Product Management**: Define rentable products with flexible pricing (hour, day, week, month)
- **Custom Rental Duration**: Support for short-term and long-term rentals
- **Product Availability**: Calendar and list view to avoid overbooking
- **Rental Quotations & Orders**: Create quotations, confirm orders, and generate contracts
- **Online Payment Integration**: Secure payment gateway support
- **Delivery Management**: Automated pickup and return scheduling
- **Flexible Invoicing**: Full upfront payment or partial payment options
- **Pricelist Management**: Multiple pricing tiers and discount rules
- **Returns & Delays Handling**: Late fee calculations and alerts
- **Reports & Dashboards**: Comprehensive analytics and reporting

### User Roles
- **Admin**: Full system access for managing products, orders, and users
- **Customer**: Browse products, place orders, and manage rentals

## Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Date Handling**: date-fns
- **Utilities**: clsx for conditional classes

## Project Structure

```
rental-management/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── Layout.jsx      # Main layout with navigation
│   ├── pages/              # Page components
│   │   ├── Login.jsx       # Authentication page
│   │   ├── Dashboard.jsx   # Admin dashboard
│   │   ├── ProductManagement.jsx  # Admin product management
│   │   ├── ProductCatalog.jsx     # Customer product browsing
│   │   ├── ProductDetail.jsx      # Product details page
│   │   ├── OrderDetail.jsx        # Order management
│   │   ├── Checkout.jsx           # Customer checkout process
│   │   └── [Other admin pages]    # Placeholder pages
│   ├── contexts/           # React contexts (future use)
│   ├── utils/              # Utility functions
│   ├── assets/             # Static assets
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles and Tailwind imports
├── public/                 # Public assets
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── postcss.config.js       # PostCSS configuration
```

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rental-management
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
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Key Components

### Layout Component
- Responsive navigation with role-based menu items
- Mobile-friendly design with collapsible menu
- User role display and logout functionality

### Authentication
- Role-based login (Admin/Customer)
- Sign up and sign in functionality
- Password strength requirements

### Admin Dashboard
- Overview statistics (products, orders, revenue, customers)
- Recent orders with status tracking
- Search and filtering capabilities
- Status color coding for order states

### Product Management
- Product listing with search and filters
- Add/edit/delete product functionality
- Image upload support
- Category and status management

### Customer Experience
- Product catalog with grid view
- Product quick view sidebar
- Multi-step checkout process
- Delivery address management

### Order Management
- Comprehensive order details
- Rental state management workflow
- Customer information management
- Payment processing integration

## Design System

### Color Palette
- **Primary**: Blue shades for main actions and branding
- **Success**: Green for positive actions
- **Warning**: Yellow for caution states
- **Danger**: Red for errors and destructive actions
- **Info**: Cyan for informational elements

### Status Colors
- **Quotation**: Red
- **Confirmed**: Yellow
- **Pickup**: Green
- **Return**: Blue
- **Completed**: Grey

### Components
- **Buttons**: Primary, secondary, success, warning, danger variants
- **Cards**: Consistent card design with shadows and borders
- **Forms**: Styled inputs with focus states and icons
- **Tables**: Responsive tables with hover effects
- **Badges**: Status indicators with color coding

## Future Enhancements

### Backend Integration
- RESTful API endpoints for all CRUD operations
- User authentication and authorization
- Database integration (PostgreSQL/MongoDB)
- File upload for product images

### Advanced Features
- Real-time notifications
- Email integration for order updates
- Advanced reporting and analytics
- Inventory management
- Customer relationship management
- Multi-language support

### Payment Integration
- Stripe/PayPal integration
- Multiple payment methods
- Subscription billing
- Invoice generation

### Mobile Application
- React Native mobile app
- Push notifications
- Offline functionality
- Camera integration for product photos

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository or contact the development team. 