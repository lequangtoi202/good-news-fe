import { ReactNode, createContext, useState, useContext, useEffect } from 'react';
import { User } from '../model/User';
import Cookies from 'universal-cookie';

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cookie = new Cookies();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    const userFromCookie = cookie.get('user');
    if (userFromCookie) {
      setCurrentUser(userFromCookie);
    }
  }, []);
  return <UserContext.Provider value={{ currentUser, setCurrentUser }}>{children}</UserContext.Provider>;
};

function useAuth() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { UserContext, AuthProvider, useAuth };
