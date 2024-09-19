import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField, Button, IconButton, InputAdornment, Box, Typography, Container, Grid, CircularProgress, Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import useAuth from './../../hook/useAuth';
import useAxios from '../../hook/useAxios';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { setUser, setLoading, loading } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [img, setImg] = useState(null);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpView, setOtpView] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(60); // 60 seconds countdown for resend
  const [otpTimer, setOtpTimer] = useState(120); // 120 seconds for OTP entry
  const axiosSecure = useAxios();
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState(null); 
  const otpRefs = useRef([]);
  const navigate = useNavigate();

  const { mutateAsync: registerUser } = useMutation({
    mutationFn: async () => {
      const { data: userResponse } = await axiosSecure.post('/user/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (userResponse) {
        setUser(userResponse);
        setFormData(null);
        localStorage.setItem('user', JSON.stringify(userResponse));
        toast.success("Registration successful!");
        navigate('/');
      } else {
        throw new Error('Registration failed!');
      }
    },
    onError: () => {
      toast.error("Registration failed. Please try again.");
    },
  });

  const { mutateAsync: verifyOtp } = useMutation({
    mutationFn: async () => {
      const otpCode = otp.join("");
      const info = { email, otp: otpCode };
      const { data: otpConfirm } = await axiosSecure.post("user/verify-otp", info);
      
      if (otpConfirm) {
        registerUser();
      } else {
        toast.error("OTP verification failed.");
      }
    },
    onError: () => {
      toast.error("OTP verification failed.");
    },
    onSuccess: () => {
      setOtpLoading(false);
    },
  });

  const handleOtpSubmit = async () => {
    setOtpLoading(true);
    await verifyOtp();
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) otpRefs.current[index + 1].focus();
    }
  };

  const handleResend = () => {
    onSubmit();
    setResendDisabled(true);
    setResendTimer(60);
    setOtpTimer(120); // Reset OTP timer on resend
    toast.success("OTP resent. Please check your email.");
  };

  useEffect(() => {
    if (resendDisabled && resendTimer > 0) {
      const timerInterval = setInterval(() => setResendTimer(prev => prev - 1), 1000);
      return () => clearInterval(timerInterval);
    } else if (resendTimer === 0) {
      setResendDisabled(false);
    }
  }, [resendDisabled, resendTimer]);

  useEffect(() => {
    if (otpView && otpTimer > 0) {
      const otpInterval = setInterval(() => setOtpTimer(prev => prev - 1), 1000);
      return () => clearInterval(otpInterval);
    } else if (otpTimer === 0) {
      toast.error("Time expired! Please resend OTP.");
    }
  }, [otpView, otpTimer]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      if (img) formData.append("image", img);
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('role', 'editor');
      setEmail(data.email);

      const { data: verify } = await axiosSecure.post('/user/verify', { email: data.email });
      if (verify) {
        setOtpView(true);
        setFormData(formData);
        setOtpTimer(120); // Reset OTP timer
        toast.success(`Verification email sent to ${data.email}. Please check your email.`);
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleImg = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      setImg(file);
    }
  };

  useEffect(() => {
    if (otpView) otpRefs.current[0]?.focus();
  }, [otpView]);

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {!otpView ? (
          <>
            <Typography component="h1" variant="h5">Register</Typography>
            <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '1rem' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <label htmlFor="fileInput">
                  <img
                    src={imageUrl || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'}
                    alt="Profile"
                    style={{ width: '120px', height: '120px', borderRadius: '50%', cursor: 'pointer' }}
                  />
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImg}
                />
              </Box>

              <TextField
                margin="normal"
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoFocus
                {...register('name', { required: true })}
              />
              {errors.name && <Alert severity="error">Name is required.</Alert>}

              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email"
                name="email"
                {...register('email', { required: true })}
              />
              {errors.email && <Alert severity="error">Email is required.</Alert>}

              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                {...register('password', { required: true })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errors.password && <Alert severity="error">Password is required.</Alert>}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Register'}
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography component="h1" variant="h5">OTP Verification</Typography>
            <Typography sx={{ mt: 2, mb: 2 }}>Please enter the OTP sent to <strong>{email}</strong></Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Time remaining: {otpTimer}s
            </Typography>
            <Grid container spacing={2} sx={{ marginTop: '16px' }}>
              {otp.map((value, index) => (
                <Grid item xs={3} key={index}>
                  <TextField
                    id={`otp-input-${index}`}
                    inputRef={el => otpRefs.current[index] = el}
                    inputProps={{ maxLength: 1, style: { textAlign: 'center', fontSize: '24px' } }}
                    value={value}
                    onChange={(e) => handleChange(e, index)}
                    variant="outlined"
                  />
                </Grid>
              ))}
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleOtpSubmit}
              disabled={otpLoading || otpTimer === 0}
            >
              {otpLoading ? <CircularProgress size={24} /> : 'Submit OTP'}
            </Button>
            <Button
              type="button"
              fullWidth
              variant="text"
              disabled={resendDisabled || otpTimer === 0}
              onClick={handleResend}
            >
              {resendDisabled ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Register;
