import { useEffect, useState } from "react"
import Form from "./Form"
import { useSesion } from "../../store/useSession"
import { Navigate, useNavigate } from "react-router-dom"


 export const Access = () => {

  const navigate = useNavigate();
  const [name, setName] = useState('Login')
  const {Isloggin} = useSesion()
  
  useEffect(() => {
    if(Isloggin) {
      navigate("/")
    } 
  }, [Isloggin])

  const handleChange = (option: string) => {
    if(name !== option) {
      setName(option)
    } return
  }

  if(Isloggin) return (
    <Navigate to={"/"} />
  )

  return (
    <div>
        <div className="container_access">
            <Form name={name} />
            <button onClick={() => handleChange("Login")}>Iniciar Sesion </button>
            <button onClick={() => handleChange("SignUp")}>Registrarse</button>
        </div>
    </div>
  )
}

export default Access