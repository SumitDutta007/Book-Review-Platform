# 📮 Postman Collection Guide

## 🚀 How to Import the Postman Collection

### Method 1: Import from File

1. **Open Postman** (download from [postman.com](https://www.postman.com/) if you don't have it)
2. Click **"Import"** button (top left)
3. Click **"Upload Files"** or drag and drop
4. Select `Book-Review-Platform.postman_collection.json`
5. Click **"Import"**

### Method 2: Import from Link (if hosted on GitHub)

1. Open Postman
2. Click **"Import"**
3. Select **"Link"** tab
4. Paste the raw GitHub URL of the collection file
5. Click **"Continue"** → **"Import"**

---

## 🔧 Setup & Configuration

### 1. **Set Environment Variables**

The collection uses variables for flexibility:

| Variable | Default Value | Description |
|----------|--------------|-------------|
| `baseUrl` | `https://book-review-platform-pjx2.onrender.com` | Production API URL |
| `localUrl` | `http://localhost:5000` | Local development URL |
| `token` | (empty) | Auto-populated after login |

**To switch between environments:**
- Production: Use `{{baseUrl}}`
- Local: Change to `{{localUrl}}` in requests

### 2. **Authentication Flow**

The collection automatically saves your JWT token after login/register:

1. **Register** or **Login** first
2. Token is automatically saved to `{{token}}` variable
3. All protected routes use `Bearer {{token}}` in headers

---

## 📋 API Endpoints Overview

### 🔐 Authentication

| Request | Method | Endpoint | Auth Required |
|---------|--------|----------|---------------|
| Register User | POST | `/api/auth/register` | ❌ |
| Login User | POST | `/api/auth/login` | ❌ |
| Logout User | POST | `/api/auth/logout` | ❌ |

**Register/Login Body:**
```json
{
  "username": "Test User",
  "email": "testuser@example.com",
  "password": "password123"
}
```

---

### 📚 Books

| Request | Method | Endpoint | Auth Required |
|---------|--------|----------|---------------|
| Get All Books | GET | `/api/books` | ❌ |
| Get Book by ID | GET | `/api/books/:id` | ✅ |
| Get Highest Rated | GET | `/api/books/highest-rated` | ✅ |
| Create Book | POST | `/api/books` | ✅ |
| Update Book | PUT | `/api/books/:id` | ✅ |
| Delete Book | DELETE | `/api/books/:id` | ✅ |

**Create/Update Book (Form Data):**
- `title`: string
- `description`: string
- `genre`: string (can add multiple)
- `image`: file (image upload)

---

### ⭐ Reviews

| Request | Method | Endpoint | Auth Required |
|---------|--------|----------|---------------|
| Add Review | POST | `/api/reviews` | ✅ |
| Update Review | PUT | `/api/reviews/:reviewId` | ✅ |
| Delete Review | DELETE | `/api/reviews/:reviewId` | ✅ |

**Add Review Body:**
```json
{
  "bookId": "BOOK_ID_HERE",
  "rating": 5,
  "comment": "Amazing book!"
}
```

**Update Review Body:**
```json
{
  "comment": "Updated comment"
}
```

---

### 👤 Users

| Request | Method | Endpoint | Auth Required |
|---------|--------|----------|---------------|
| Get User Profile | GET | `/api/users/profile` | ✅ |
| Get User by ID | GET | `/api/users/:id` | ✅ |
| Update User | PUT | `/api/users/:id` | ✅ |

**Update User Body:**
```json
{
  "username": "New Username",
  "email": "newemail@example.com"
}
```

---

## 🎯 Testing Workflow

### Step 1: Authentication
1. ✅ Run **"Register User"** (creates account + saves token)
   - Or use **"Login User"** if already registered
2. ✅ Token is automatically saved for subsequent requests

### Step 2: Create a Book
1. ✅ Run **"Create Book"**
2. ✅ Use **form-data** (not JSON)
3. ✅ Add an image file
4. ✅ Copy the returned `_id` for next steps

### Step 3: Add a Review
1. ✅ Run **"Add Review"**
2. ✅ Replace `BOOK_ID_HERE` with your book's `_id`
3. ✅ Copy the review `_id` if you want to edit/delete

### Step 4: Get Data
1. ✅ Run **"Get All Books"**
2. ✅ Run **"Get User Profile"** to see your books and reviews

### Step 5: Update/Delete
1. ✅ Update book/review using their IDs
2. ✅ Delete if needed

---

## 🔑 Important Notes

### 🔒 **Protected Routes**
Routes with ✅ require the `Authorization: Bearer {{token}}` header. The collection handles this automatically after login.

### 📁 **File Uploads**
For creating/updating books:
- Use **Body → form-data** (not raw JSON)
- Add `image` field as **File** type
- Select an image from your computer

### 🆔 **Replace Placeholders**
Before running requests, replace:
- `BOOK_ID_HERE` → actual book `_id`
- `REVIEW_ID_HERE` → actual review `_id`
- `USER_ID_HERE` → actual user `_id`

### 🔄 **Auto-Token Management**
The collection includes test scripts that automatically:
- Extract JWT token from login/register responses
- Save it to `{{token}}` variable
- Use it in all protected requests

---

## 🐛 Troubleshooting

### ❌ "401 Unauthorized"
- Make sure you've logged in first
- Check if `{{token}}` variable is set
- Token may have expired (re-login)

### ❌ "CORS Error"
- Only affects browser, not Postman
- Postman doesn't enforce CORS

### ❌ "404 Not Found"
- Check the endpoint URL
- Verify `baseUrl` variable is correct
- Make sure backend server is running

### ❌ "Validation Error"
- Check request body format
- Ensure all required fields are present
- Use correct data types (string, number, etc.)

---

## 📝 Example Test Sequence

```plaintext
1. POST /api/auth/register
   → Returns: { token: "...", msg: "User registered" }
   → Token saved automatically

2. POST /api/books (with form-data)
   → Returns: { _id: "abc123", title: "...", ... }
   → Copy the _id

3. POST /api/reviews (with bookId: "abc123")
   → Returns: { _id: "xyz789", rating: 5, ... }

4. GET /api/books/abc123
   → Shows book with your review

5. GET /api/users/profile
   → Shows your authored books and reviews
```

---

## 🌐 Switch to Local Development

To test against your local backend:

1. Start your local backend: `cd Backend && node app.js`
2. In Postman, edit requests:
3. Change `{{baseUrl}}` to `{{localUrl}}`
4. Or update `baseUrl` variable to `http://localhost:5000`

---

## 💡 Pro Tips

✨ **Use Collections Runner** for automated testing
✨ **Create Environments** for dev/staging/prod
✨ **Save responses** to extract IDs automatically
✨ **Use Pre-request Scripts** for dynamic data
✨ **Add Tests** to validate responses

---

> 🎉 Happy Testing! For issues, check the [API Documentation](../README.md)
