/** @jsxImportSource theme-ui */
import { ThemeProvider, Card, Container, Button, Input, Label, Alert } from 'theme-ui';
import { mytheme } from '../theme.ts';
import React from 'react';
import firebase from '../firebase.js';
import { Link } from 'react-router-dom';
import { isWhiteSpaceLike } from 'typescript';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null,
        }
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            this.props.history.push('/');
        })
            .catch(error => {
                this.setState({ error });
            });
    }
    render() {
        const { email, password, error } = this.state;
        return (
            <ThemeProvider theme={mytheme}>
                <Container sx={{ maxWidth: ['100%', '80%', '1200px'], bg: 'muted', p: 4 }} className='auth-container'>
                    <h1>Log in</h1>
                    <p>Enter your details to access your account</p>
                    {error && <Alert className='error-message'>{error.message}</Alert>}
                    <Card p={4}>
                        <form onSubmit={this.handleSubmit}>
                            <Label htmlFor="email" sx={{ fontWeight: 'bold' }}>Email address</Label>
                            <Input
                                type="text"
                                name="email"
                                id="email"
                                value={email}
                                onChange={this.handleChange}
                                sx={{ width: ['95%', '36em'], mb: 2 }}>
                            </Input>
                            <Label htmlFor="password" sx={{ fontWeight: 'bold' }}>Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={this.handleChange}
                                sx={{ width: ['95%', '36em'], mb: 2 }}>
                            </Input>
                            <Button mt={2} className='submit'>Log in</Button>
                            <p>
                                Don't have an account?
                                <Link className="login-btn" to="/register" sx={{ color: 'purple', ml:2, whiteSpace: 'nowrap'}}>
                                Register here</Link>
                            </p>
                        </form>
                    </Card>
                </Container>
            </ThemeProvider>
        );
    }
}

export default Login;
