import { useState, useEffect } from 'react';

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const checkAdmin = async () => {
      try {

        const adminToken = localStorage.getItem('riddleme_admin_token');
        // const isAdminUser = !!adminToken;

        const isAdminUser = true; // for testing purposes only, remove in production

        setIsAdmin(isAdminUser);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  return { isAdmin, loading };
}
