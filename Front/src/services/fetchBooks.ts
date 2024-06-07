
export const fetchBooks = async (email: string) => {

    try {
        const res = await fetch("http://localhost:3000/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email})
        })

        if (!res.ok) {
           throw new Error("Failed to fetch books");
        }

        const response = await res.json()
        const {books} = response

        return books
    } catch(err) {
        console.error(err)
        return []
    }

}