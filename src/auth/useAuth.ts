// import { useContext } from 'react'
// import AuthContext from './AuthContext'

// const useAuth = () => {
//     const context = useContext(AuthContext)

//     if (context === undefined) {
//         throw new Error('useAuth must be used under a AuthProvider')
//     }

//     return context
// }

// export default useAuth

// src/auth/useAuth.ts (overwrite the Firebase one)
export default function useAuth() {
    return {
        user: {
            authority: ['admin'], // or whatever your app expects
            name: 'Dev User',
        },
        authenticated: true,
        isAuthenticated: true, // some templates check this instead
        signOut: () => {},
        signIn: () => {},
    }
}
