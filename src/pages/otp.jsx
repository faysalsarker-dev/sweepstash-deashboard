import  { useState } from "react";
import { Box, Button, Typography, TextField, Grid, IconButton, Link } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const OTPPage = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next field if value entered
      if (value && index < 3) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = () => {
    // Handle OTP Verification Logic here
    console.log("OTP Entered:", otp.join(""));
  };

  const handleResend = () => {
    // Handle resend OTP logic here
    console.log("OTP Resent");
  };

  return (
    <Box
      sx={{
        maxWidth: "400px",
        margin: "auto",
        padding: "2rem",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center"
      }}
    >
      <IconButton disableRipple sx={{ color: "green", fontSize: "50px" }}>
        <CheckCircleOutlineIcon fontSize="large" />
      </IconButton>
      <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
        Please check your email
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: "1rem", color: "gray" }}>
        We've sent a code to contact@curfcode.com
      </Typography>
      
      <Grid container spacing={2} justifyContent="center">
        {otp.map((_, index) => (
          <Grid item key={index} xs={3}>
            <TextField
              id={`otp-input-${index}`}
              inputProps={{ maxLength: 1, style: { textAlign: 'center', fontSize: '24px' } }}
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              variant="outlined"
              sx={{
                "& fieldset": { borderColor: "green", borderRadius: "8px" },
                "& input": { padding: "0.5rem" },
              }}
            />
          </Grid>
        ))}
      </Grid>
      
      <Typography variant="body2" sx={{ margin: "1rem 0" }}>
        Didn't get the code? <Link onClick={handleResend} sx={{ cursor: "pointer" }}>Click to resend</Link>
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem" }}>
        <Button variant="outlined" sx={{ flex: 1, marginRight: "1rem" }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
          sx={{ flex: 1 }}
        >
          Verify
        </Button>
      </Box>
    </Box>
  );
};

export default OTPPage;
