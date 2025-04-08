const ActionProvider = (setMessages, setGameStatus, setIsCelebrationActive, setIsLoseActive) => {
  const handleGreeting = () => {
      const botMessage = {
          text: "Hello! 😊 How can I assist you today?",
          sender: 'bot',
          time: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  const handleFAQ = () => {
      const botMessage = {
          text: "Feel free to ask me about the game rules or how to play! 🎮✨",
          sender: 'bot',
          time: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  const handleHelp = () => {
      const botMessage = {
          text: "Absolutely, I'd be happy to help you with that! 😊",
          sender: 'bot',
          time: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  const handleGameStart = () => {
      const botMessage = {
          text: "Great! Let's get started! 🎉 Choose between 'Wordle' or 'Adverswordle' and let's have some fun! 😃",
          sender: 'bot',
          time: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setGameStatus('Play');
  };

  const handleGameChoice = () => {
      const botMessage = {
          text: "Wordle - Show off your word skills! 🌟 Try to guess the mystery word in just six attempts. 🧠 Adverswordle - Flip the roles! 🔄 Think of a secret word and watch me try to guess it in six tries. 🤖🎯",
          sender: 'bot',
          time: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  const handleGameRestart = () => {
      const botMessage = {
          text: "Game restarted! 🎉 Choose your adventure: 'Wordle' or 'Adverswordle'? 🕵️‍♂️✨",
          sender: 'bot',
          time: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setGameStatus('Play');
  };

  const handleGameQuit = () => {
      const botMessage = {
          text: "You've exited the game. 😔 If you'd like to play again, just let me know! 🎮✨",
          sender: 'bot',
          time: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setGameStatus('Quit');
  };

  const handleUnknown = () => {
      const botMessage = {
          text: "I'm not sure how to respond to that.",
          sender: 'bot',
          time: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  const handleServer = (message) => {
      const botMessage = {
          text: message,
          sender: 'bot',
          time: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      if (message.includes('won')){
        setIsCelebrationActive(true) ;
        setTimeout(() => {
            setIsCelebrationActive(false);
        }, 5000) ;
    } else if (message.includes('give up') || message.includes('lost')){
        setIsLoseActive( true ) ;
        setTimeout(() => {
            setIsLoseActive( false );
        }, 5000) ;
    }
  };

  return {
      handleGreeting,
      handleFAQ,
      handleHelp,
      handleGameStart,
      handleGameChoice,
      handleGameRestart,
      handleGameQuit,
      handleUnknown,
      handleServer,
  };
};

export default ActionProvider;
