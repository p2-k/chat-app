/** @jsxImportSource theme-ui */
import React from "react";
import firebase from '../firebase';
import { Card, Text, Box } from 'theme-ui';

class Chatbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
        };
    }
    componentDidMount() {
        const chatRef = firebase.database().ref('general');
        chatRef.on('value', snapshot => {
            const getChats = snapshot.val();
            let ascChats = [];
            for (let chat in getChats) {
                if (getChats[chat].message !== '') {
                    ascChats.push({
                        id: chat,
                        message: getChats[chat].message,
                        user: getChats[chat].user,
                        date: getChats[chat].timestamp,
                    });
                }
            }
            const chats = ascChats.reverse();
            this.setState({ chats });
        });
    }

    render() {
        return (
            <div className="chatbox">
                <ul className="chat-list" sx={{ listStyle: 'none', mx: 2, p: 2 }}>
                    {this.state.chats.map(chat => {
                        const postDate = new Date(chat.date);
                        return (
                            <li key={chat.id}>
                                <Card sx={{
                                    display: 'grid',
                                    gridGap: 1,
                                    gridTemplateColumns: ['auto', '6rem 1fr 3fr', '6rem 1fr 5fr'],
                                    mb:3,
                                }}>
                                    <Text sx={{ color: "purple", fontSize: 1, textAlign: ['right', 'center'], mr:[2,0] }}>
                                        {postDate.getDate() + '/' +
                                            (postDate.getMonth() + 1) + ' at ' +
                                            postDate.getHours() + ':' +
                                            postDate.getMinutes()}</Text>
                                    <Box sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        maxHeight:'6rem',
                                        color: "secondary", bg: "transparent", border: 'solid',
                                        borderColor: 'muted',
                                        fontSize: [3, 2], fontWeight: ['body', 'bold'],
                                        textAlign: ['left', 'right'],
                                        px: 2, py: [2, 1]
                                    }}>{chat.user}</Box>
                                    <Text sx={{ px:2, py: [1, 2],fontWeight: ['body', 'light']}}>{chat.message}</Text>
                                </Card>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default Chatbox;