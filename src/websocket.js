const StartConnection = ( url ) => {
  const websocket = new WebSocket( url ) ;

  websocket.onopen = () => {
    console.log( 'Connected to the WebSocket server' ) ;
  } ;

  websocket.onmessage = ( event ) => {
    console.log( `Received message: ${event.data}` ) ;
   
  } ;

  websocket.onerror = ( event ) => {
    console.error( 'Error occurred while connecting to the WebSocket server:', event ) ;
  } ;

  websocket.onclose = () => {
    console.log( 'Disconnected from the WebSocket server' ) ;
  } ;

  return websocket ;
} ;

export default StartConnection ;