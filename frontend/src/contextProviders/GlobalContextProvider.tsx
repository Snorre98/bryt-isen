import axios from 'axios';
import { useContext, createContext, SetStateAction, Dispatch, ReactNode, useEffect, useState } from 'react';
import { getCsrfToken } from '~/api';
import { FILTER_OPTIONS } from '~/constants';

export type SetState<T> = Dispatch<SetStateAction<T>>;

type GlobalContextProps = {
  activityFilter: Set<string>;
  setActivityFilter: SetState<Set<string>>;
  isFilterOn: boolean;
  setIsFilterOn: SetState<boolean>;
};

export const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

/**
 * Hook to retrieve values from GlobalContext.
 */
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
  const [activityFilter, setActivityFilter] = useState<Set<string>>(new Set());
  const [isFilterOn, setIsFilterOn] = useState(false);

  useEffect(() => {
    // Before page load do this:
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
    activityFilter,
    setActivityFilter,
    isFilterOn,
    setIsFilterOn,
  };
  return <GlobalContext.Provider value={globalContextValues}>{children}</GlobalContext.Provider>;
}
