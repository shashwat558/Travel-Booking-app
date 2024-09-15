import axios from 'axios';
import React, { createContext, useState, ReactNode, useEffect } from 'react';


export interface User {
    __v: number;
    _id: string;
    email: string;
    name: string;
   password: string;
}


export interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    ready: boolean
}


export const UserContext = createContext<UserContextType | undefined>(undefined);


type ChildrenProps = {
    children: ReactNode;
};


export const UserContextProvider: React.FC<ChildrenProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [ready, setReady] = useState<boolean>(false)
    useEffect(() =>{
         axios.get<{user:User}>('/user/profile')
          .then((({data}) => {
            setUser(data.user)
            setReady(true)
            
          }))
          
        
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
};
