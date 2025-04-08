const MessageParser = () => {
    const parse = (message, actions, gameStatus) => {
        if ((message.toLowerCase().includes("hello") || message.toLowerCase().includes("hi") || message.toLowerCase().includes("hey")) && (gameStatus !== 'Play' && gameStatus !== 'Restarted')) {
            actions.handleGreeting();
        } else if ((message.toLowerCase().includes("rules") || message.toLowerCase().includes("how to play")) && (gameStatus !== 'Play' && gameStatus !== 'Restarted')) {
            actions.handleFAQ();
        } else if ((message.toLowerCase().includes("help")) && (gameStatus !== 'Play' && gameStatus !== 'Restarted')) {
            actions.handleHelp();
        } else if ((message.toLowerCase().includes("play") || message.toLowerCase().includes("begin")) && (gameStatus !== 'Play' && gameStatus !== 'Restarted')) {
            actions.handleGameStart();
            actions.handleGameChoice();
        } else if (message.toLowerCase().includes("restart")) {
            actions.handleGameRestart();
            actions.handleGameChoice();
        } else if (message.toLowerCase().includes("quit") || message.toLowerCase().includes("exit")) {
            actions.handleGameQuit();
        } else if (gameStatus !== 'Play' && gameStatus !== 'Restarted') {
            actions.handleUnknown();
        }
    };

    return {
        parse
    };
};

export default MessageParser;
