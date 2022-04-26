import React, {useEffect, useState} from 'react';
import axios from "axios";
let unMount;

const LongPulling = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    useEffect(()=>{
        unMount = false;
        setTimeout(()=>{subscribe()}, 0);
        return ()=>{
            unMount = true;
        }
    }, [])

    const subscribe = React.useCallback(async ()=>{
        while (!unMount){
            try {
                const {data} = await axios.get('http://localhost:5000/get-messages');
                setMessages((prev)=>[data, ...prev])
            } catch (e) {
            }
        }
    }, []);

    const senMessage = async () => {
        await axios.post('http://localhost:5000/new-messages', {
            messages: value,
            id: Math.random().toString().substring(2)
        })
    }

    return (
        <div className="center">
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