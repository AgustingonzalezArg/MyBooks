export const decodePayload = (token: string) => {
    const payload = token.split(".")[1]
    const decodePayload = JSON.parse(atob(payload));

    return decodePayload
}