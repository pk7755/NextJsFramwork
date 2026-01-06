'use client'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

type UserDataContextType = {
  // Define the shape of your user data context here
  user: userType | undefined,
  setUser: (user: userType | undefined) => void

}
type userType = {
  id: string,
  name: string,
  email: string,
  image?: string

};

export const userDataContext = React.createContext<UserDataContextType | undefined>(undefined);

const UserContext = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<userType | undefined>(undefined);
  const { data: session, status } = useSession();

  const data = { user, setUser }

  useEffect(() => {
    if (status === 'loading') return;
    if (status !== 'authenticated') {
      setUser(undefined);
      return;
    }

    // Fetch user data and set it in context
    async function getUser() {
      try {
        const result = await axios.get('/api/user');
        setUser(result.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    getUser();
  }, [status])

  return (
    <userDataContext.Provider value={data}>
      {children}
    </userDataContext.Provider>
  )
}

export default UserContext