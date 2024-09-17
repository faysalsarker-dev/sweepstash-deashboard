import { useEffect, useState } from 'react'; 
import { useForm } from 'react-hook-form';
import {
  TextField, Button, IconButton, InputAdornment, Box, Typography, Container
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import useAuth from '../../hook/useAuth';
import useAxios from './../../hook/useAxios';


const Login = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { user, loading, setLoading, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxios();

  const onSubmit = async (data) => {
    const { email, password } = data;
    setLoading(true);
    
    try {
      const response = await axiosSecure.post('/user/login', { email, password });
      const { user } = response.data;

      if (user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Login successful!');
        reset(); // reset form after successful login
        navigate(location.state ? location.state : '/');
      }

    } catch (error) {
      console.error("Login error:", error);
      toast.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate(location.state ? location.state : '/');
    }
  }, [navigate, user, location.state]);

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
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
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
            disabled={loading} // disable button during loading
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
