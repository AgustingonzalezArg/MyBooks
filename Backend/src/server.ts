import { app } from "./app";

const PORT: string = process.env.PORT || "3000"

app.listen(PORT, () => {
    console.log("Escuchando en el puerto"+ PORT)
})