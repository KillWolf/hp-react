import React, { useState, useEffect } from 'react';
import { ErrorMessage } from '../../../utility/Global/Error/ServiceHandling/Error/ErrorHandling'
import { getToken } from '../../../utility/Auth/Token';
import Aux from '../../../hoc/Aux'
import axios from '../../../axios-instances/axios-firebase'
import classes from './Messages.module.css';
import Spinner from '../../UI/Spinner/Spinner'

const Messages = (props) => {

    const [messages, setMessages] = useState({ error: false, loading: true, messages: null })
    const rootClasses = [classes.Messages].join(' ');
    let content;

    const getMessages = () => {
        setMessages({ error: false, loading: true, messages: null })

        axios.get(`/contact.json?auth=${getToken()}`)
            .then(response => {
                if (response.data !== null) {
                    const entries = Object.entries(response.data);
                    const messagesArray = entries.map(entry => {
                        return { id: entry[0], ...entry[1] }
                    })
                    setMessages({ error: false, loading: false, messages: messagesArray })
                } else {
                    setMessages({ error: false, loading: false, messages: 'empty' })
                }
            })
            .catch(error => {
                console.log(error);
                setMessages({ error: true, loading: false, messages: null })
            })
    }

    const deleteMessage = (messageId) => {
        axios.delete(`/contact/${messageId}.json`)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getMessages();
    }, [])

    content = <div className={rootClasses}><Spinner /></div>;

    if (messages.error || messages.messages === 'empty') {
        if (messages.messages === 'empty') {
            content = 'Der er intet vise, din indbakke er tom!'
        } else {
            content = <div className={classes.Error}>{ErrorMessage('Der opstod en fejl med at hente beskeder.', { message: 'Prøv igen', method: getMessages })}</div>
        }
    } else if (!messages.loading) {
        content = (
            <Aux>
                {messages.messages.map(message => {
                    return (
                        <div className={classes.Message} key={message.id} >
                            <button onClick={() => deleteMessage(message.id)}>Delete</button>
                            <h2 className={classes.TitleNoMargin}>{message.subject}</h2>
                            <i>Email: <a href={`mailto:${message.email}`}>{message.email}</a></i>
                            <div className={classes.MessageContent}>
                                <p>{message.message}</p>
                                <i className={classes.MessageSender}>Fra: {message.name}</i>
                            </div>
                        </div>
                    )
                })
                }
            </Aux >
        )
    }


    return (
        <div className={rootClasses}>
            {content}
        </div>
    )
};

export default Messages;