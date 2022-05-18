/** @jsxImportSource theme-ui */
import { ThemeProvider, Card, Text, Box, Container, Button, Input, Label, Alert } from 'theme-ui';
import theme from '../theme';

import React from 'react';
import firebase from '../firebase.js';
import { Link } from 'react-router-dom';
import Login from './Login';

class Register extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            error: null
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit = e => {
        e.preventDefault();
        const { email, username, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            const user = firebase.auth().currentUser;
            user.updateProfile({ displayName: username }).then(() => {
                this.props.history.push('/');
            })
                .catch(error => {
                    this.setState({ error });
                });
        })
            .catch(error => {
                this.setState({ error });
            });
    }
    render() {
        const { email, username, password, error } = this.state;
        return (
            <ThemeProvider theme={theme}>

                <Container sx={{ maxWidth: ['100%', '80%', '1200px'], bg: 'muted', p: 4 }} className='auth-container'>
                    <h1>Register your account</h1>
                    {error && <Alert className='error-message'>{error.message}</Alert>}
                    <Card p={4}>
                        <form onSubmit={this.handleSubmit}>
                            <Label htmlFor="username" sx={{ fontWeight: 'bold' }}>Username</Label>
                            <Input
                                type="text"
                                name="username"
                                id="username"
                                value={username}
                                onChange={this.handleChange}
                                sx={{ width: ['95%', '36em'], mb: 2 }}>
                            </Input>
                            <Label htmlFor="email" sx={{ fontWeight: 'bold' }}>Email address</Label>
                            <Input
                                type="text"
                                name="email"
                                id="email"
                                value={email}
                                onChange={this.handleChange}
                                sx={{ width: ['95%', '36em'], mb: 2 }}>
                            </Input>
                            <Label htmlFor="password" sx={{ fontWeight: 'bold' }}>Choose a password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={this.handleChange}
                                sx={{ width: ['95%', '36em'], mb: 2 }}>
                            </Input>
                            <Button className='submit'>Get started</Button>
                            <p>
                                Already have an account?
                                <Link className="login-btn" to="/login" sx={{ color: 'purple', ml: 2 }}>
                                    Log in here
                                </Link>
                            </p>
                        </form>
                    </Card>
                </Container>
            </ThemeProvider>
        );
    }

}

export default Register;