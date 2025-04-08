import { useState, useEffect, useRef } from 'react';
import './css/Chatbot.css';
import { config } from './Config.js';
import MessageParser from './MessageParser.js';
import ActionProvider from './ActionProvider.js';
import botAvatar from './botAvatar.jpg';
import Celebration from './celebration.js';
import Lose from './lose.js';

const Chatbot = ({ isVisible, onClose, ws }) => {
    const [messages, setMessages] = useState(config.initialMessage);
    const [inputText, setInputText] = useState('');
    const [gameStatus, setGameStatus] = useState(null);
    const [isCelebrationActive, setIsCelebrationActive] = useState(false);
    const [isLoseActive, setIsLoseActive] = useState(false);
    const [quickReplyOptions, setQuickReplyOptions] = useState(['Play', 'Help']);
    const [isHelpClicked, setIsHelpClicked] = useState(false);
    const [isGameSelected, setIsGameSelected] = useState(false);
    const [gameType, setGameType] = useState(null);
    const chatContainerRef = useRef(null);
    const actions = ActionProvider(setMessages, setGameStatus, setIsCelebrationActive, setIsLoseActive);
    const messageParser = MessageParser();

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if ((gameStatus === 'Play' || gameStatus === 'Restarted') && isGameSelected) {
            setQuickReplyOptions(['Restart', 'Quit']);
        } else if (gameStatus === 'Play' || gameStatus === 'Restarted') {
            setQuickReplyOptions(['Wordle', 'Adverswordle']);
        } else if (gameStatus === 'Quit') {
            handleOnClose() ;
        } else if (isHelpClicked) {
            setQuickReplyOptions(['Play', 'Rules']);
        } else {
            setQuickReplyOptions(['Play', 'Help']);
        }
    }, [gameStatus, isHelpClicked, isGameSelected]);

    if (!isVisible) {
        return null;
    }

    const sendMessage = (e) => {
        e.preventDefault();
        const date = new Date();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const strTime = `${hour}:${minute}`;

        const userMessage = {
            text: inputText,
            time: strTime,
            sender: 'user',
        };

        setMessages((prevMessages) => [...prevMessages, userMessage]);
        if ((gameStatus === 'Play' || gameStatus === 'Restarted') && ws && ws.readyState === WebSocket.OPEN) {
            ws.send(inputText);
            ws.onmessage = (event) => {
                actions.handleServer(event.data);
            };
        }

        messageParser.parse(inputText, actions, gameStatus);

        setInputText('');
    };

    const handleQuickReply = (reply) => {
        const date = new Date();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const strTime = `${hour}:${minute}`;

        const userMessage = {
            text: reply,
            time: strTime,
            sender: 'user',
        };

        setMessages((prevMessages) => [...prevMessages, userMessage]);
        if ((gameStatus === 'Play' || gameStatus === 'Restarted') && ws && ws.readyState === WebSocket.OPEN) {
            ws.send(reply);
        }

        if (reply.toLowerCase() === 'help') {
            setIsHelpClicked(true);
        } else if (reply.toLowerCase() === 'play' || reply.toLowerCase() === 'restart') {
            setIsHelpClicked(false);
            setIsGameSelected(false);
        } else if (reply.toLowerCase() === 'adverswordle' && ws && ws.readyState === WebSocket.OPEN) {
            ws.send(reply); 
            ws.onmessage = (event) => {
                actions.handleServer(event.data);
            };
            setIsGameSelected(true);
            setGameType('adverswordle');
        } else if (reply.toLowerCase() === 'wordle') {
            setIsGameSelected(true);
            setGameType('wordle');
            const botMessage = {
                text: 'Kick off the game by guessing a five-letter word! 🔠🕵️‍♂️',
                time: strTime,
                sender: 'bot',
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }

        messageParser.parse(reply, actions, gameStatus);
    };

    const renderMessages = (messages) => {
        return messages.map((msg, index) => (
            <div key={index} className={`msg-container-${msg.sender}`}>
                <div className={`msg-${msg.sender}`}>
                    {msg.text}
                    <span className="msg-time">{msg.time}</span>
                </div>
            </div>
        ));
    };

    const renderQuickReplyButtons = (options) => {
        return (
            <div className="quick-reply-buttons">
                {options.map((option, index) => (
                    <button
                        key={index}
                        className="quick-reply-button"
                        onClick={() => handleQuickReply(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        );
    };

    const handleOnClose = () => {
        setMessages(config.initialMessage);
        onClose();
    };

    const handleOverlayClick = () => {
        setIsCelebrationActive(false);
        setIsLoseActive(false);
    };

    return (
        <div className="chatbot-overlay" onClick={handleOverlayClick}>
            <div className="chatbot-fullscreen">
                <div className="chatbot-header">
                    <div className='chatbot--sub'>
                        <img src={botAvatar} alt="Bot Avatar" className="bot-avatar" />
                        <h2>Gopher</h2>
                    </div>
                    <button onClick={handleOnClose} className="close-btn">&times;</button>
                </div>
                <div className="chatbot-body" ref={chatContainerRef}>
                    {renderMessages(messages)}
                    {renderQuickReplyButtons(quickReplyOptions)}
                </div>
                <div className='chatbot-footer'>
                    <div className='footer-content'>
                        <form className='input-group' onSubmit={sendMessage}>
                            <input
                                type='text'
                                placeholder="Type your message..."
                                className="form-type_msg"
                                value={inputText}
                                autoComplete='off'
                                onChange={(e) => setInputText(e.target.value)}
                                required />
                            <div className='input-group-append'>
                                <button type='submit' className='send_btn'>SEND</button>
                            </div>
                        </form>
                    </div>
                </div>
                <Celebration isActive={isCelebrationActive} gameType={gameType}/>
                <Lose isActive={isLoseActive} gameType = { gameType } />
            </div>
        </div>
    );
}

export default Chatbot;
