import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomeAdmin from './Pages/HomeAdmin';
import HomeCommunity from './Pages/HomeCommunity';
import AddBook from './Pages/AddBook';
import DeleteBook from './Pages/DeleteBook';
import ShowBook from './Pages/ShowBook';
import UpdateBook from './Pages/UpdateBook';
import LoginPage from './Pages/LoginPage';
import BookLendManagement from './Pages/BookLendManagement';
import LogBook from './Pages/LogBook';
import UserAccounts from './Pages/UserAccounts';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const HomeRedirect = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  if (user?.role === 'Admin') {
    return <Navigate to="/home-admin" replace />;
  }
  return <Navigate to="/home-community" replace />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={<HomeRedirect />} />

      <Route path="/home-community" element={
        <ProtectedRoute>
          <HomeCommunity />
        </ProtectedRoute>
      } />

      <Route path="/home-admin" element={
        <ProtectedRoute requiredRole="Admin">
          <HomeAdmin />
        </ProtectedRoute>
      } />

      <Route path="/Book/AddBook" element={
        <ProtectedRoute requiredRole="Admin">
          <AddBook />
        </ProtectedRoute>
      } />

      <Route path="/Book/:book_ID" element={
        <ProtectedRoute requiredRole="Admin">
          <ShowBook />
        </ProtectedRoute>
      } />

      <Route path="/Book/delete/:book_ID" element={
        <ProtectedRoute requiredRole="Admin">
          <DeleteBook />
        </ProtectedRoute>
      } />

      <Route path="/Book/details/:book_ID" element={
        <ProtectedRoute requiredRole="Admin">
          <ShowBook />
        </ProtectedRoute>
      } />

      <Route path="/Book/edit/:book_ID" element={
        <ProtectedRoute requiredRole="Admin">
          <UpdateBook />
        </ProtectedRoute>
      } />

      <Route path="/Book/Lending" element={
        <ProtectedRoute requiredRole="Admin">
          <BookLendManagement />
        </ProtectedRoute>
      } />

      <Route path="/Book/Lending/Logs" element={
        <ProtectedRoute requiredRole="Admin">
          <LogBook />
        </ProtectedRoute>
      } />

      <Route path="/Book/Lending/Logs/:book_ID" element={
        <ProtectedRoute requiredRole="Admin">
          <LogBook />
        </ProtectedRoute>
      } />

      <Route path="/user-accounts" element={
        <ProtectedRoute requiredRole="Admin">
          <UserAccounts />
        </ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;