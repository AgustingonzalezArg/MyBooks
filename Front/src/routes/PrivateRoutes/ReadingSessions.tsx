import { useEffect, useRef, useState } from "react"
import { FinishSession } from "./Modals/FinishSession"
import { useSesion } from "../../store/useSession"


export const ReadingSessions = () => {

    const {books, modifyReadingSessions} = useSesion()
    const [hs, setHs] = useState(0)
    const [min, setMin] = useState(0)
    const [button, setbutton] = useState("Empezar")
    const [finishSession, setFinishSession] = useState(false)
    const idInter = useRef<any>(null)

    const fcContador = () => {
        setMin(min => {
            if(min === 0) {
                if(hs > 0) {
                    setHs(hs => hs - 1)
                    return 59
                } else {
                    clearInterval(idInter.current!)
                    setbutton("Empezar")
                    setFinishSession(true)
                    modifyReadingSessions()
                    return 0
                }
            } else return min - 1
        })
    }

    const contador = () => {
        idInter.current = setInterval(fcContador, 1000 * 60)
    }

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {id, value} = e.target
        switch (id) {
            case "hs":
                setHs(Number(value))
                break;
            case "min":
                setMin(Number(value))
                break;
        }
    }

    const handleClick = (): void => {
        if(button === "Terminar") {
            setbutton("Empezar")
            clearInterval(idInter.current)
            setFinishSession(true)
            modifyReadingSessions()
            return
        }
        setbutton("Terminar")
        contador()
        setFinishSession(false)

    }

    const handleClose = () => {
        setFinishSession(false)
    }

    useEffect(() => {
        if(hs >= 4) setHs(3)
        if(min >= 60) setMin(59)
        if(min < 0) setMin(0)
    }, [hs, min] )
    
  return (
    <div>
        <h1>Sesión de Lectura</h1>
        <p>Duración de la sesión</p>
        <div>
            {button === "Empezar" && <form>
                <input type="number" id="hs" value={hs} onChange={handleChanges}/>
                :
                <input type="number" id="min" value={min} onChange={handleChanges}/>
            </form>}
            {button === "Terminar" && 
            <div> <p>{hs}</p> : <p>{min}</p> </div>}
            <button id="button" onClick={handleClick}>{button}</button>
            {finishSession && <FinishSession books={books} onClickClose={handleClose} />}
        </div>

    </div>
  )
}