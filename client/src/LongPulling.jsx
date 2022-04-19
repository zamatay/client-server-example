import React, {useEffect, useState} from 'react';
import axios from "axios";

const LongPulling = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    useEffect(()=>{
        console.log('useEffect');
        subscribe()
    }, [])

    const subscribe = async ()=>{
        try {
            const {data} = await axios.get('http://localhost:5000/get-messages');
            setMessages((prev)=>[data, ...prev])
            await subscribe();
        } catch (e) {
            setTimeout(()=>{subscribe()}, 5000)
            console.log(e.messages);
        }
    }

    async function senMessage() {
        await axios.post('http://localhost:5000/new-messages', {
            messages: value,
            id: Math.random().toString().substring(2)
        })
    }

    return (
        <div>
            <div>
                <div className="form">
                    <input value={value} onChange={e=>setValue(e.target.value)} type="text"/>
                    <button onClick={senMessage}>Отправить</button>
                </div>
                <div className="messages">
                    {messages.map(item=>
                        <div className="message" key={item.id}>
                            {item.messages}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LongPulling;