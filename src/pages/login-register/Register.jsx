import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField, Button, IconButton, InputAdornment, Box, Typography, Container,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import useAuth from './../../hook/useAuth';
import useAxios from '../../hook/useAxios';

const Register = () => {
  const { setUser, setLoading, loading } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [img, setImg] = useState(null);
  const axiosSecure = useAxios();



  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      if (img) {
        formData.append("image", img);
      }
      
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);  
      formData.append('role', 'editor');
  
      const { data: userResponse } = await axiosSecure.post('/user/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (userResponse) {
        setUser(userResponse);  
        localStorage.setItem('user', JSON.stringify(userResponse));  
        toast.success("Registration successful!");
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error("Registration failed. Please try again later.");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleImg = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      setImg(file);
    }
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
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '1rem' }}>
          {/* Image Upload */}
          <div className="text-center relative">
            <label
              htmlFor="fileInput"
              className="mx-auto flex flex-col items-center justify-center w-24 h-24 bg-gray-200 rounded-full cursor-pointer"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="w-full h-full rounded-full"
                />
              ) : (
                <>
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                    alt="Default Avatar"
                    className="w-full h-full rounded-full"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 absolute bottom-0 ml-12 text-primary font-extrabold"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </>
              )}
              <input
                id="fileInput"
                type="file"
                name="image"
                onChange={handleImg}
                className="hidden"
              />
            </label>
          </div>

          {/* Name */}
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            variant="outlined"
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ''}
          />

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
            sx={{ mt: 3, mb: 2 }}
            disabled={loading} // Disable when loading
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;

