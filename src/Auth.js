// FOR SAVING AUTHENTICATION STATUS
// i.e LOGGED IN OR NOT

import React, { useEffect, useState } from 'react'
import fireb from './FirebaseConfig'

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        fireb.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            setPending(false)
            console.log(user.email)
        });
    }, []);

    // AUTHENTICATION DETAILS LOADING
    if (pending) {
        return <>Loading...</>
    }

    return (
        // MAKING currentUser AVAILABLE TO children
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};