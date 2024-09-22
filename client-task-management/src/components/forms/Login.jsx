import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate successful login
        dispatch(login({ email }));
        navigate('/dashboard');
    };

    return (
        <Container component="main" maxWidth="xs">
        <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Login
            </Typography>
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Login
            </Button>
            <Typography variant="body2" align="center">
                Don&apos;t have an account?{' '}
                <Link to="/register" style={{ textDecoration: 'none', color: 'blue'}}>
                Register
                </Link>
            </Typography>
            </Box>
        </Box>
        </Container>
    );
};

export default Login;
