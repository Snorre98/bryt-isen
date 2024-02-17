import { useContext, createContext, Dispatch, SetStateAction, ReactNode, useState, useEffect } from 'react';
import { getUser } from '~/api';
import { UserDto } from '~/dto';

/**
 * A context providers are used to manage data/state accross the entier page.
 * This autorisation context provider manages data related to user login status.
 * In practise it it is a component that wrapps the app in main.tx
 * Context providers can be used to manage themes like darkmode/lightmode or like here, defining the state(data) of login-status
 */

export type SetState<T> = Dispatch<SetStateAction<T>>;
/**
 * types for useAuthContext props
 */
type AuthContextProps = {
  user: UserDto | undefined;
  setUser: SetState<UserDto | undefined>;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
/**
 * Custom hook for Bryt-Isen: gives authorization context
 * @returns authorization context state
 */
export function useAuthContext() {
  const authContext = useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error('useAuthContext must be used within an AuthContextProvider');
  }
  return authContext;
}

/**
 * Properties(types) of the AuthContextProvider
 */
type AuthContextProviderProps = {
  enabled?: boolean;
  children: ReactNode; //The AuthContextProvider-component has to contain react nodes, which basicly are other "react-objects" like components
};

export function AuthContextProvider({ children, enabled = true }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDto>();
  //useEffet is one of the react hooks, it executes when the page loads,
  //or when the variable(s) in the dependencie array updates (here on line 53)
  useEffect(() => {
    if (!enabled) return; // if authcontext provider is not enabled, do nothing.
    getUser()
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [enabled]);

  const contextValue: AuthContextProps = {
    user: user,
    setUser: setUser,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
