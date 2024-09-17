import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Typography, Avatar, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Profile = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    // Simulate a profile update request
    setTimeout(() => {
      toast.success('Profile updated successfully!');
      reset();
      setLoading(false);
    }, 2000);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Avatar sx={{ width: 100, height: 100, mx: 'auto' }}>A</Avatar>
        <Typography variant="h5" sx={{ mt: 2 }}>Update Profile</Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              label="Name" 
              {...register('name', { required: true })} 
              variant="outlined" 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              label="Email" 
              {...register('email', { required: true })} 
              variant="outlined" 
              type="email" 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              label="Phone" 
              {...register('phone', { required: true })} 
              variant="outlined" 
              type="tel" 
            />
          </Grid>
          <Grid item xs={12}>
            <Button 
              type="submit" 
              fullWidth 
              variant="contained" 
              color="primary" 
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Profile;
