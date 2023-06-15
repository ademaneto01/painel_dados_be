import React, { createContext } from "react";
import { useUserProvider } from "@/hook";

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext({});

export function UserProvider(props: UserProviderProps): JSX.Element {
  const userProvider = useUserProvider();
  return (
    <UserContext.Provider value={userProvider}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;