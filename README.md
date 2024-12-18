# Fashion E-commerce Website Project

## Key Features

### Homepage
- Visually displays the latest products, featured collections, and attractive promotions.
- Large banner with eye-catching product images and a **"Buy Now"** button for easy access to featured items.
- "New Arrivals" and "Collections" sections are organized to help users quickly find suitable products.
![Homescreen](docs/gifs/Homescreen.gif)

### Registration/Login
- Login grants Admins and Customers access to their accounts.
- **Interface Features:**
  - Login form with fields for **Username/Email** and **Password**.
  - **"Forgot Password"** link for account recovery (send OTP via registered Email)
- **Workflow:**
  1. User inputs credentials.
  2. Verified credentials redirect:
     - Admins to the admin panel.
     - Customers to the homepage (Every registered account will automatically be assigned the "Customer" role)
     - Invalid details show "Invalid login credentials."
- **Security:** Encrypted passwords using Node's Bcrypt.
![Login](docs/gifs/Login.gif)
 

### Product Categories and Searching 
- Clear classification into categories like Shirts, Pants, Footwear, and Accessories.
- Horizontal navigation bar along with the **Search bar** makes accessing and searching for products intuitive.
  - Quickly search for products by name.
  - Search bar supports filtering results based on user input.
![Products](docs/gifs/Products.gif)

### Product Detail Page
- Displays detailed product information: high-quality images, name, price, description, size, and user reviews.
- User can add the item to cart via **"Add to Cart"** Button. If user is not logged in then the button will redirect to the **Login** page 
![Product-View](docs/gifs/Product-View.gif)

### Shopping Cart
- Allows users to add, adjust quantity, remove items, and view the total price.
- Pop-up displays detailed information about items in the cart for quick review.
![Shopping-cart](docs/gifs/Shopping-cart.gif)

### Checkout
- Simplified, fast, and secure checkout process.
- Supports multiple payment methods, including cash and ZaloPay.
- Sends a confirmation email with order details after successful payment.
![Purchasing](docs/gifs/Purchasing.gif)

### Product and Order Management (Admin)
- Admin can add, edit, delete products, and update order statuses.
- Efficient system control through an intuitive interface.
- **Admin dashboard** displays the number of delivered orders, total revenue, customer accounts, and products in the database.
![Admin](docs/gifs/Admin.gif)

### Logic Testing
- Unauthenticated or "Customer" accounts are redirected to a 404 page when attempting to access "Admin" pages.
- "Add to Cart" and "Shopping Bag" buttons redirect unauthenticated users to the login page.
![Testing](docs/gifs/Testing.gif)
- Recovering an account requires an email for OTP; invalid emails show an alert.
- After completing an order, the Shopping Bag is automatically cleared of previous items.
![Testing2](docs/gifs/Testing2.gif)

### A Step-by-Step Guide to Purchasing a Product 
https://github.com/user-attachments/assets/b75f80ce-28e8-499a-8883-73d82ba11216


---
## Technologies Used

### Frontend
- **HTML, CSS, JavaScript**: Build a user-friendly, cross-device compatible interface.
- **EJS (Embedded JavaScript)**: Create dynamic web pages and integrate backend data into the frontend.

### Backend
- **Node.js**: Develop a flexible and high-performance server.
- **Express.js**: Framework for building APIs and handling HTTP requests.

### Additional Libraries and Tools
- **Axios**: HTTP client for API calls.
- **Bcrypt/Bcryptjs**: Password hashing for security.
- **Body-Parser**: Parse incoming request bodies.
- **Cookie-Parser**: Handle cookies.
- **CORS**: Enable Cross-Origin Resource Sharing.
- **Crypto-JS**: Data encryption.
- **Dotenv**: Manage environment variables.
- **Express-Session**: Manage user sessions.
- **Moment.js**: Format and manipulate dates.
- **Nodemailer**: Send emails (e.g., OTP for password reset or Confirmation after a purchase).
- **OTP-Generator**: Generate one-time passwords.

### Database
- **MySQL**: Store product, user, order, and related information. ORM tools like **Sequelize** was used

### Project Management Tools
- **Google Drive**: Document storage and sharing.
- **Microsoft Planner**: Task assignment and progress tracking.
- **Microsoft Teams**: Online communication and meetings.
- **Git/GitHub**: Source code management.

### Design and Development Tools
- **Figma**: Design website interfaces.
- **VSCode (Visual Studio Code)**: Code editor.
- **XAMPP**: Development and testing environment setup.

---

## Installation Guide

### 1. Set up the Development Environment
- Install **Node.js** and **npm (Node Package Manager)**.
- Install **MySQL** and **XAMPP** to manage the database.

### 2. Download the Source Code
- Clone the source code from the GitHub repository to your local machine.

### 3. Install Dependencies
- Open a terminal or command prompt.
- Navigate to the project directory and run:
  ```bash
  npm install
  ```

### 4. Configure the Database
- Create a MySQL database ( **shopping_web_db** ).
- Configure connection details in the project’s configuration file.

### 5. Run the Application
- Start the server using:
  ```bash
  npm start
  ```
- Access the website via a web browser( **localhost:8000** ).

---

## Directory Structure

```
backend/
├── env/                       
│   ├── .env                   # Contains sensitive environment variables and configurations.
│   ├── .env.example           # Provides an example of the environment variables.
├── node_modules/              # NPM packages (not tracked by Git).
├── src/                       # Contains all backend source code.
│   ├── config/                # Stores backend configuration files.
│   ├── controllers/           # Contains controllers, which are functions that handle logic for application routes.
│   ├── middlewares/           # Contains application middleware. Middleware are functions that handle requests in the HTTP request pipeline.
│   ├── migrations/            # Stores migration files used to evolve the database schema over time.
│   ├── models/                # Contains data models. These models are classes that represent data from the database.
│   ├── routes/                # Stores files that define application routes.
│   ├── seeders/               # Contains data seeding files, which populate the database with initial data for testing or setup.
│   ├── services/              # Contains business logic of the application.
│   ├── utils/                 # Contains reusable utility functions.
│   ├── server.js              # Configures and starts the application server.
├── .babelrc                   # Configuration for Babel.
├── .gitignore                 # Specifies intentionally untracked files to ignore by Git.
├── .sequelizerc               # Configuration for Sequelize ORM.
├── package-lock.json          # Records exact versions of all installed NPM packages.
├── package.json               # Node.js project configuration, including dependencies and scripts.
├── README.md                  # Provides documentation for the project, installation, and usage instructions.

docs/
├── gifs/                      # GIF files for documentation.
├── videos/                    # Video files for documentation.

frontend/
├── public/                    # Public assets folder.
│   ├── fonts/                 # Font files.
│   ├── icons/                 # Icon files.
│   ├── images/                # Images used in the frontend.
│   ├── scripts/               # JavaScript files.
│   ├── styles/                # CSS files.
├── src/                       # Source code for the frontend.
│   ├── pages/                 # React components for full pages.
│   ├── partials/              # React components for parts of pages.
├── .gitignore                 # Specifies files to be ignored by Git.
├── README.md                  # Documentation for the frontend part of the project.
```

---
