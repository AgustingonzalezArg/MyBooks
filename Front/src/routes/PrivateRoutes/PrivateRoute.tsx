import { Outlet } from "react-router-dom"
import { Nav } from "./Nav"

export const PrivateRoute = () => {

  return (
    <div>
        <Nav />
        <Outlet />
    </div>
  )
}