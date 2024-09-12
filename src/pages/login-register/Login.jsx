import  { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField, Button, IconButton, InputAdornment, Box, Typography, Container, 
} from '@mui/material';
import { Visibility, VisibilityOff, Google } from '@mui/icons-material';
import useAuth from '../../hook/useAuth';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } ,reset} = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { signIn,  googleLogin ,user,loading} = useAuth();
  const navigate = useNavigate();
    const location = useLocation()
  const onSubmit = async (data) => {
    try {
       
        signIn(data.email,data.password)
        .then(() => {
            toast.success("Login successful");
            navigate('/');
            reset(); 
            console.log('login');
            
        });
    } catch (error) {
        console.error('Error during registration:', error);
        toast.error("Registration failed. Please try again later.");
    }
};
useEffect(() => {
  if (user) {
      navigate(location.state ? location.state : '/');
  }
}, [navigate,user ,location.state]);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
  
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '1rem' }}>
          {/* Email */}
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email format',
              },
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />

          {/* Password */}
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ?<Visibility />  : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>

          {/* Continue with Google */}
          <Button
          loading={loading}
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            onClick={googleLogin}
            sx={{ mt: 1 }}
          >
            Continue with Google
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
