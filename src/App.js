/** @jsxImportSource theme-ui */
import { ThemeProvider, Box, Container, Text, Button, Input, Label, Card } from 'theme-ui';
import {mytheme} from './theme.ts';

import React from 'react';
import Chatbox from './components/Chatbox';
import { Link } from 'react-router-dom';
import firebase from './firebase';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.message !== '') {
      const chatRef = firebase.database().ref('general');
      const chat = {
        message: this.state.message,
        user: this.props.user.displayName,
        timestamp: new Date().getTime()
      }

      chatRef.push(chat);
      this.setState({ message: '' });
    }
  }

  render() {
    return (
      <ThemeProvider theme={mytheme}>
        <Container sx={{maxWidth:['100%','80%','1200px']}} bg="white" className="App">
        <Box p={2} color="white" bg="gray"><h1 sx={{fontSize:[32,48], m:[0,2], fontWeight:'heading', textAlign:'center', mb:0}}>p2's chat room </h1> 
        <h2 sx={{color:'highlight', fontSize:[16,24], textAlign:'center', pt:0,mt:0}}>for cool people only</h2></Box>
          {this.props.user &&
            <div className='allow-chat' >
              <Box p={4} bg="muted" as="form" className="message-form" onSubmit={this.onSubmit}>
              <Label htmlFor="message">Don't be rude and stuff...</Label>
                <Input bg="white" mb={2}
                  type="text"
                  name="message"
                  id="message"
                  value={this.state.message}
                  placeholder="Enter a message..."
                  onChange={this.onChange} />
                <Button sx={{ fontWeight:'bold', p: 'body' }}>Send</Button>
              </Box>
              <Chatbox />
            </div>
          }
          {!this.props.user &&
            <div className='disallow-chat'>
              <Box sx={{ p:4, bg:"muted", textAlign:'center' }}>
                <Card p={4} pb={2} mt={3}>
                  <Link to="/login"><Button variant='primary'>Log in</Button></Link> 
                  <Text p={[1,4]}>or</Text>
                  <Link to="/register"><Button variant='secondary'>Register</Button></Link>
                  <p>to start chatting!</p>
                  </Card>
              </Box>
            </div>
          }
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;
