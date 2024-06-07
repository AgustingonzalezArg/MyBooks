import { Navigate, Outlet } from "react-router-dom"
import { useSesion } from "./store/useSession"
import Access from "./routes/access/Access"
import { useEffect, useState } from "react"
function App() {
  const {Isloggin, refreshToken} = useSesion();
  const [Loading, setLoading] = useState(true)

  useEffect(() => {
    if(!Isloggin) {
      refreshToken()
    }

    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [Isloggin, refreshToken])

  if(Loading) return (
    <div>
      Loading...
    </div>
  )

  if(!Isloggin) return (
      // <Access />
      <Navigate to={"access"} />
  )

  return (
    <Outlet />
  )
}

export default App
