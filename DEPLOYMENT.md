# Deployment Configuration

## 🌐 Deployed URLs

- **Backend API**: https://book-review-platform-pjx2.onrender.com
- **Frontend**: https://book-review-platform-git-main-sumitdutta007s-projects.vercel.app

## 📝 Environment Variables Setup

### Backend (.env)

Create a `.env` file in the `Backend` directory with the following variables:

```env
# MongoDB Connection
MONGO_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server Port
PORT=5000

# Frontend URL (for CORS)
FRONTEND_URL=https://book-review-platform-git-main-sumitdutta007s-projects.vercel.app

# Node Environment
NODE_ENV=production
```

### Frontend (.env)

Create a `.env` file in the `Frontend` directory with the following variable:

```env
# Backend API URL
VITE_API_URL=https://book-review-platform-pjx2.onrender.com
```

## 🔧 Configuration Changes Made

### 1. Backend CORS Configuration

Updated `Backend/app.js` to include the deployed frontend URL in CORS origins:

```javascript
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://book-review-platform-git-main-sumitdutta007s-projects.vercel.app", // Production
  process.env.FRONTEND_URL, // Environment variable
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
```

### 2. Frontend API Configuration

Created `Frontend/src/config/api.ts` to centralize API endpoints:

```typescript
export const API_URL = import.meta.env.VITE_API_URL || "https://book-review-platform-pjx2.onrender.com";

export const API_ENDPOINTS = {
  LOGIN: `${API_URL}/api/auth/login`,
  REGISTER: `${API_URL}/api/auth/register`,
  BOOKS: `${API_URL}/api/books`,
  REVIEWS: `${API_URL}/api/reviews`,
  USER_PROFILE: `${API_URL}/api/users/profile`,
  // ... and more
};
```

### 3. Environment Files Created

- `Backend/.env.example` - Template for backend environment variables
- `Frontend/.env.example` - Template for frontend environment variables

## 🚀 Deployment Instructions

### Backend (Render)

1. Push your code to GitHub
2. Connect your repository to Render
3. Add environment variables in Render dashboard
4. Deploy

### Frontend (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add `VITE_API_URL` environment variable in Vercel dashboard
4. Deploy

## 📌 Important Notes

- Never commit `.env` files to version control
- Use `.env.example` as a template for required variables
- Update CORS origins in backend when deploying to new domains
- Ensure all API calls in frontend use the centralized config

## 🔄 Future Improvements

To use the centralized API configuration, update frontend files to import from `config/api.ts`:

```typescript
import { API_ENDPOINTS } from '../config/api';

// Instead of hardcoded URLs
axios.get(API_ENDPOINTS.BOOKS);
axios.get(API_ENDPOINTS.BOOK_BY_ID(bookId));
```
