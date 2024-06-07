import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ErrorPage } from './routes/ErrorPage.tsx'
import Access from './routes/access/Access.tsx'
import { ReadBooks } from './routes/PrivateRoutes/ReadBooks.tsx'
import { HomePage } from './routes/PrivateRoutes/HomePage.tsx'
import { Book } from './routes/PrivateRoutes/Book.tsx'
import { FinishBook } from './routes/PrivateRoutes/Modals/FinishBook.tsx'
import { PendingBooks } from './routes/PrivateRoutes/PendingBooks.tsx'
import { BooksInProgress } from './routes/PrivateRoutes/BooksInProgress.tsx'
import { AddBook } from './routes/PrivateRoutes/AddBook.tsx'
import { ReadingSessions } from './routes/PrivateRoutes/ReadingSessions.tsx'
import { PrivateRoute } from './routes/PrivateRoutes/PrivateRoute.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <PrivateRoute />,
        children: [
          {
            path: "/",
            element: <HomePage/>
          },
          {
            path: "read-books",
            element: <ReadBooks/>,
          },
          {
            path: "books-in-progress",
            element: <BooksInProgress/>,
          },
          {
            path: "pending-books",
            element: <PendingBooks/>,
          },
          {
            path: "add-book",
            element: <AddBook />,
          },
          {
            path: "reading-sessions",
            element: <ReadingSessions/>,
          },
          {
            path: "/book/:id/:state",
            element: <Book/>,
            children: [{
              path: "/book/:id/:state/finish",
              element: <FinishBook />
            }]
          }
        ]
      },
    ]
  },
  {
    path: "access",
    element: <Access />,
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)