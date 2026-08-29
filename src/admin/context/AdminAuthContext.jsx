import React, { createContext, useContext, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AdminAuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'libas_admin_auth_session';

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password, rememberMe = true) => {
    setIsLoading(true);
    // Simulate slight network latency for authentic feel
    await new Promise((resolve) => setTimeout(resolve, 350));

    // Authorized credentials check
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (
      (cleanEmail === 'admin@libas.in' && cleanPassword === 'libas2026') ||
      (cleanEmail === 'demo@libas.in' && cleanPassword === 'demo123') ||
      (cleanEmail === 'owner@libas.in' && cleanPassword === 'haldwani2026')
    ) {
      const sessionUser = {
        id: 'usr_admin_01',
        name: 'Store Manager',
        email: cleanEmail,
        role: 'Super Admin',
        store: 'LIBAS Haldwani',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop',
        token: `libas_jwt_${Date.now()}`,
        loginAt: new Date().toISOString(),
      };

      setAdminUser(sessionUser);
      if (rememberMe) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));
      } else {
        sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));
      }
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return {
      success: false,
      error: 'Invalid credentials. Use admin@libas.in / libas2026',
    };
  };

  const logout = () => {
    setAdminUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const forgotPassword = async (email) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      success: true,
      message: `Password reset link sent to ${email}. Check your inbox.`,
    };
  };

  const value = {
    adminUser,
    isAuthenticated: !!adminUser,
    isLoading,
    login,
    logout,
    forgotPassword,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

// Route Guard Component
export const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">
            Verifying Admin Session...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminAuthContext;
