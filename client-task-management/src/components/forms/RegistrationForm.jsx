import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../slices/registerSlice';
import { useNavigate, Link } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Avatar,
} from '@mui/material';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            // Dispatch the registerUser action
            const resultAction = await dispatch(registerUser({ email, password }));

            // Check if registration was successful
            if (registerUser.fulfilled.match(resultAction)) {
                // Alert success message
                alert('Sign up successful! Please log in to continue.');
                navigate('/login'); // Navigate to login page
            } else {
                // Handle errors if registration failed
                const error = resultAction.payload?.message || 'Registration failed';
                setErrorMessage(error);
            }
        } catch (error) {
            // Handle unexpected errors
            setErrorMessage('An unexpected error occurred. Please try again.');
        }
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
                    <PersonAddAltOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
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
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errorMessage && (
                        <Typography color="error" variant="body2">
                            {errorMessage}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                    <Typography variant="body2" align="center">
                        Already have an account?{' '}
                        <Link to="/login" style={{ textDecoration: 'none', color: 'blue' }}>
                            Login
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default RegistrationForm;
