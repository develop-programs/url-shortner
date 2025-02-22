# URL Shortener Application

A modern URL shortening service built with Node.js, Express, MongoDB, and EJS templating.

## 🚀 Features

- Shorten long URLs to manageable links
- Copy shortened URLs with a single click
- View history of shortened URLs
- Automatic HTTPS protocol addition
- Responsive design with Tailwind CSS

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running
- npm or yarn package manager

## 🛠️ Setup & Installation

### Standard Setup

1. **Clone the repository**

   ```bash
   git clone [repository-url]
   cd url_shortner
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Build CSS**

   ```bash
   npm run build:css
   ```

5. **Start the application**

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

### Docker Setup

1. **Build and Run with Docker Compose**

   ```bash
   # Build and start containers
   docker-compose up --build

   # Run in detached mode
   docker-compose up -d
   ```

2. **Stop Docker Containers**

   ```bash
   docker-compose down
   ```

3. **View Logs**
   ```bash
   docker-compose logs -f
   ```

The application will be available at `http://localhost:3000`

### Docker Container Management

- MongoDB data is persisted in a named volume
- Application runs on an Alpine-based Node.js image
- Non-root user is used for security
- Automatic container restart on failure

## 🗂️ Project Structure

```
url_shortner/
├── src/
│   ├── config/       # Database configuration
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API routes
│   ├── styles/       # Tailwind CSS input
│   └── index.js      # Application entry point
├── views/            # EJS templates
├── public/           # Static files
└── package.json      # Project dependencies
```

## 💻 Code Overview

### Key Components

1. **URL Model (`src/models/url.model.js`)**

   - Manages URL data structure
   - Stores original URL, shortened code, and visit history
   - Uses MongoDB schema with timestamps

2. **Routes (`src/routes/shortner.routes.js`)**

   - `/api/shorten`: Creates shortened URLs
   - `/api/data`: Retrieves URL history
   - `/:code`: Handles URL redirections

3. **Frontend (`views/index.ejs`)**
   - Responsive UI with Tailwind CSS
   - URL submission form
   - Real-time URL history display
   - Copy-to-clipboard functionality

## 🔄 API Endpoints

### POST `/api/shorten`

- **Purpose**: Create shortened URL
- **Body**: `{ "url": "https://example.com" }`
- **Response**: `{ "shortUrl": "http://localhost:3000/api/abc123" }`

### GET `/api/data`

- **Purpose**: Fetch all shortened URLs
- **Response**: Array of URL objects

### GET `/api/:code`

- **Purpose**: Redirect to original URL
- **Response**: HTTP redirect

## 🎨 Styling

- Uses Tailwind CSS for styling
- Run `npm run build:css` to compile CSS changes
- Styles are processed from `src/styles/input.css` to `public/styles/output.css`

## 🛠️ Development Guidelines

1. **Adding New Features**

   - Create new routes in `shortner.routes.js`
   - Update the URL model if new data fields are needed
   - Add frontend components in `index.ejs`

2. **Error Handling**

   - All API endpoints include try-catch blocks
   - Frontend displays user-friendly error messages
   - Check server logs for detailed error information

3. **Best Practices**
   - Use async/await for database operations
   - Validate URLs before processing
   - Implement proper error handling
   - Keep the UI responsive and user-friendly

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
