import React, { createContext, useState, ReactNode } from 'react';


export interface User {
    __v: number;
    id: string;
    email: string;
     name: string;
   password: string;
}


export interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}


export const UserContext = createContext<UserContextType | undefined>(undefined);


type ChildrenProps = {
    children: ReactNode;
};


export const UserContextProvider: React.FC<ChildrenProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
