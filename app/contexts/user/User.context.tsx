'use client';

import { ResolvedUser } from '@/types';
import { createContext } from '@/utils/context-abstraction.util';
import { PropsWithChildren, useState } from 'react';

interface UserState {
  user: ResolvedUser | null;
  isAuthenticated: boolean;
}

interface UserValue extends UserState {}

const [UserContext, useContext] = createContext<UserValue>({
  name: 'UserContext',
});

export const useUserContext = () => {
  return useContext();
};

interface UserProviderProps extends UserState {}
const UserProvider = ({ user, children }: PropsWithChildren<UserProviderProps>) => {
  const [u] = useState(user);

  return <UserContext.Provider value={{ user: u, isAuthenticated: !!u }}>{children}</UserContext.Provider>;
};
export default UserProvider;
