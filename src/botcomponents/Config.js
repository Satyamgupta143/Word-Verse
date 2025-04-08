const botName = "Gopher" ;
const date = new Date() ;
const hour = date.getHours() ;
const minute = date.getMinutes() ;
const strTime = `${hour}:${minute}` ;
export const config = {
    botName : botName ,
    initialMessage : [
        {
            text :` Welcome to WordVerse, the game! 😀`,
            time: strTime,
            sender: 'bot'
        }
    ]
}
