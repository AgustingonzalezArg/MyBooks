import { useState } from "react";
import { useSesion } from "../../store/useSession"

type Props = {
    name: string
}

const Form = ({name}: Props) => {
    const { login, signUp } = useSesion();
    const [message, setMessage] = useState()


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form  = e.currentTarget;
        const email = (form.elements.namedItem("email")as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;
        const passwordAgain = name === "SignUp" ?
            (form.elements.namedItem("passwordAgain") as HTMLInputElement).value :
            "";

        if(name === "SignUp" && password !== passwordAgain) {
            return alert("las contraseñas no son iguales");
        } 

        if( name === "SignUp" ) {
            const res = await signUp({email, password});
            setMessage(res.message);
        }else {login({email, password})}
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <h3>{name}</h3>
            <p>{message}</p>
            <label> Email
                <input name="email" type="text" id="email"/>
            </label>
            <label> Contraseña
                <input name="password" type="password" id="password" />
            </label>
            {name === "SignUp" && (
            <label> Repetir su Contraseña
                <input name="passwordAgain" type="password" id="passwordAgain"/>
            </label>
            )}
            <input type="submit" value="Enviar" />
        </form>
    </div>
  )
}

export default Form