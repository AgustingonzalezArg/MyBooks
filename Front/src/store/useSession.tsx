import { create } from "zustand";
import { decodePayload } from "../services/atob";
import { fetchBooks } from "../services/fetchBooks";

export const useSesion = create((set, get) => ({
    user: null,
    Isloggin: false,
    accessToken: null,
    books: [],
    numReadingSessions: 0,


    login: async ({email, password}) => {
        try {
            const res = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password}),
                credentials: "include"
            })

            if(!res.ok) throw new Error();

            const {data : {accessToken} } = await res.json()

            if(!accessToken) throw new Error()

            const tokenData = decodePayload(accessToken)
            const books = await fetchBooks(tokenData.email);
            const numReadingSessions = tokenData.readingSessions
            set({accessToken, 
                Isloggin: true, 
                user: tokenData.email, 
                books, 
                numReadingSessions});

        } catch (error) {
            console.error(error)
            alert ("ha ocurrido un error al iniciar sesion, intente de nuevo")
        }
    },

    signUp: async ({email, password}) => {
        try {
            const res = await fetch("http://localhost:3000/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({email, password}),
                credentials: "include"
            })
            
            if(!res.ok) {
                const {message} = await res.json();
                throw new Error(message);
            }
            const {data, message} = await res.json() 
            const tokenData = decodePayload(data);
            set({user: tokenData.email, Isloggin: true, accessToken: data})
            return message
        } catch (err) {
            console.error(err)
            return err
        }
    },
    
    logout: async() => {
        
        
        try {const res = await fetch("http://localhost:3000/auth/logout", {
            method: "POST",
            credentials: "include"
        });

        if(!res.ok) throw new Error();

        set({user: null, Isloggin: false, accessToken: null})
        alert("Su sesion se cerro correctamente");
        } catch(error) {
            console.error(error)
            alert("Ha ocurrido un error al cerrar sesión, intente de nuevo")
        }

        

    },

    refreshToken: async() => {
        
        try {const res = await fetch("http://localhost:3000/auth/refresh-token", {
            method: "POST",
            credentials: "include"
        })

        if(res.status === 401) {
            set({Isloggin: false});
            throw new Error( "Not auth")
        }

        const {data : {accessToken}} = await res.json()

        if(!accessToken) {
            set({Isloggin: false})
            throw new Error( "Not auth")
        }

        const tokenData = decodePayload(accessToken);

        const books = await fetchBooks(tokenData.email);
        const numReadingSessions = tokenData.readingSessions

        set({accessToken, 
            Isloggin: true, 
            user: tokenData.email, 
            books,
            numReadingSessions
        });

        return "auth"
        } catch(err) {
            console.error(err)
            return "Not auth"
        }
    },

    addBook: async (newBook) => {

        const {user, refreshToken} = get()
        const email = user

        try {


            const login = await refreshToken()

            if(login === "auth"){
                const response = await fetch("http://localhost:3000/books/addbook", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({newBook, email})
            })

            const result = await response.json()
            const { book } = result
            console.log("New books created:", book);
            set((state) => ({books: [...state.books, book] }))
            } else {
                throw new Error("Su sesion expiro, debe volver a iniciar sesion");
            }
        } catch (err) {   
            console.error(err)
            alert(err)
            return "NOT AUTH"
        }

    },

    modifyBook: async (bookModify) => {

        const {user, refreshToken} = get()
        
        try {
            
            const login = await refreshToken() 
            
            if(login === "auth") {
                const res = await fetch("http://localhost:3000/books/book", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({bookModify, user})
                });

                if(!res.ok) throw new Error("Algo fallo en el servidor");

                const dataBooks = await res.json()

                set({books: dataBooks})
            } else {
                throw new Error("Su sesion expiro, debe volver a iniciar sesion");
                
            }
        } catch(err) {
            alert(err);
            return("NOT AUTH")
        }
    },

    modifyReadingSessions: async () => {
        const {user, refreshToken} = get();

        try {
            const login = await refreshToken()

            if(login === "auth"){
                const res = await fetch("http://localhost:3000/books/readingSessions", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({user})
                })

                if(!res.ok) throw new Error()
                
                set((state) => ({numReadingSessions: state.numReadingSessions +1}));
                
            } else {
                throw new Error("Su sesion expiro, debe volver a iniciar sesion");
            }
        } catch (err) {
            console.error(err);
        }
    }
}))
