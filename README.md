# React User Form App

A simple React application with a form to collect user information and display registered users.

## 🚀 Quick Start

### Development
```bash
npm install
npm start
```

Runs on `http://localhost:3000`

### Production Build
```bash
npm run build
```

## 🔧 Environment Variables

Create a `.env.local` file for local development:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

For production deployment, set in your hosting platform (Netlify):
```env
REACT_APP_API_URL=https://your-backend.netlify.app/.netlify/functions/api
```

## ✨ Features

- Collects Name, Mobile Number, and Email
- Form validation
- Real-time form preview
- Success message on submission
- Display all registered users in a table
- Delete users functionality
- Auto-refresh list after submission
- Responsive design

## 📁 Project Structure

```
src/
├── components/
│   ├── UserForm.js         # Registration form
│   ├── UserForm.css
│   ├── UsersList.js        # Users list display
│   └── UsersList.css
├── config.js               # API URL configuration
├── App.js                  # Main app component
└── index.js                # Entry point
```

## 🌐 Deployment to Netlify

See [../DEPLOYMENT.md](../DEPLOYMENT.md) for complete deployment instructions.

**Quick deploy:**
1. Push code to GitHub
2. Connect repository to Netlify
3. Set environment variable: `REACT_APP_API_URL`
4. Deploy!

