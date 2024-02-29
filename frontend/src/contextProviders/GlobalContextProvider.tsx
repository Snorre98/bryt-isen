import axios from 'axios';
import { useContext, createContext, SetStateAction, Dispatch, ReactNode, useEffect } from 'react';
import { getCsrfToken } from '~/api';

export type setState<T> = Dispatch<SetStateAction<T>>;

type GlobalContextProps = {
  // TODO: Implement darkmode/lightmode
  // theme: 'darkmode' | 'ligthmode';
  // setTheme: setState<'darkmode' | 'ligthmode'>;
  // switchTheme: () => ThemeValue;
};

export const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);
export function useGlobalContext() {
  const globalContext = useContext(GlobalContext);
  if (globalContext === undefined) {
    throw new Error('useGlobalContext must be used within GlobalContextProvider');
  }
  return globalContext;
}

type GlobalContextProviderProps = {
  enabled?: boolean;
  children: ReactNode;
};

export function GlobalContextProvider({ children, enabled = true }: GlobalContextProviderProps) {
  // Before page load do this:
  useEffect(() => {
    if (!enabled) return;

    // Fetch and set fresh csrf token for future requests.
    getCsrfToken()
      .then((token) => {
        // Update axios globally with new token.
        axios.defaults.headers.common['X-CSRFToken'] = token;
      })
      .catch((error) => {
        console.log(error);
      });
  }, [enabled]);
  const globalContextValues: GlobalContextProps = {
    // theme,
    // setTheme,
    // switchTheme,
  };
  return <GlobalContext.Provider value={globalContextValues}>{children}</GlobalContext.Provider>;
}
