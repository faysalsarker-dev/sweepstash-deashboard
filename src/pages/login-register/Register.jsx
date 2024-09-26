import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  IconButton,
  InputAdornment,
  Box,
  Typography,
  Container,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import useAuth from "./../../hook/useAuth";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const { setLoading, loading, createUser, userVerify, verifyOtp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [img, setImg] = useState(null);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpView, setOtpView] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [otpTimer, setOtpTimer] = useState(180);

  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState(null);
  const otpRefs = useRef([]);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      if (img) formData.append("image", img);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("role", "editor");

      setEmail(data.email);
      setLoading(true);
      toast
        .promise(userVerify(data.email), {
          loading: "Sending verification email...",
          success: `Verification email sent to ${data.email}. Please check your email.`,
          error: (err) =>
            err.response && err.response.data && err.response.data.message
              ? err.response.data.message
              : "Registration failed. Please try again.",
        })
        .then(() => {
          setLoading(false);
          setOtpView(true);
          setFormData(formData);
          setOtpTimer(120);
        });
    } catch (error) {
      console.error("An error occurred during registration:", error);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    setOtpLoading(true);

    try {
      setLoading(true);
      await verifyOtp(email, otp);
      await createUser(formData);
      setFormData(null);
      toast.success("Registration successful!");
      navigate("/");
      setTimeout(() => {
        window.location.reload();
      }, 500);
      setLoading(false);
    } catch (err) {
      toast.error(
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "OTP verification failed."
      );
      setLoading(false);
    }
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

  const handleResend = async () => {
    setOtp(["", "", "", ""]);

    toast
      .promise(userVerify(email), {
        loading: "Resending OTP...",
        success: "OTP resent. Please check your email.",
        error: (err) =>
          err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : "Failed to resend OTP. Please try again.",
      })
      .then(() => {
        setResendDisabled(true);
        setResendTimer(60);
        setOtpTimer(180);
      });
  };

  useEffect(() => {
    if (resendDisabled && resendTimer > 0) {
      const timerInterval = setInterval(
        () => setResendTimer((prev) => prev - 1),
        1000
      );
      return () => clearInterval(timerInterval);
    } else if (resendTimer === 0) {
      setResendDisabled(false);
    }
  }, [resendDisabled, resendTimer]);

  useEffect(() => {
    if (otpView && otpTimer > 0) {
      const otpInterval = setInterval(
        () => setOtpTimer((prev) => prev - 1),
        1000
      );
      return () => clearInterval(otpInterval);
    } else if (otpTimer === 0) {
      toast.error("Time expired! Please resend OTP.");
    }
  }, [otpView, otpTimer]);

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
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(to top left, #BB86FC, #6200EE)", // Updated gradient colors
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="xs"
        className="border"
        sx={{
          backdropFilter: "blur(10px)",
          borderRadius: "15px",
          padding: "2rem",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          background: "rgba(255, 255, 255, 0.4)", // Slightly more opaque for better contrast
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {!otpView ? (
            <>
              <Typography
                component="h1"
                variant="h5"
                sx={{ mb: 2, color: "#fff" }}
              >
                Register Youre Deshboard Account
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <div className="relative">
                    <label htmlFor="fileInput">
                      <img
                        src={
                          imageUrl ||
                          "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                        }
                        alt="Profile"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          cursor: "pointer",
                          objectFit: "cover",
                        }}
                      />
                    </label>
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImg}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        padding: "5px",
                        borderRadius: "50%",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "rgba(241, 245, 249, 1)",
                        },
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        style={{
                          width: "22px",
                          height: "22px",
                          color: "#4b5563",
                        }} // Tailwind's text-gray-600
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"
                        />
                      </svg>
                    </Box>
                  </div>
                </Box>

                <TextField
                  margin="normal"
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  variant="standard"
                  autoFocus
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <Alert severity="error">Please enter your full name.</Alert>
                )}

                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email"
                  variant="standard"
                  name="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <Alert severity="error">
                    Please enter a valid email address.
                  </Alert>
                )}

                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  variant="standard"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", { required: true })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.password && (
                  <Alert severity="error">Please enter your password.</Alert>
                )}

                <button
                  type="submit"
                  className="p-3 rounded-lg w-full my-4 bg-primary text-white"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Register"}
                </button>
              </form>
            </>
          ) : (
            <>
              <Typography
                component="h1"
                variant="h5"
                className="font-bold"
                sx={{ mb: 2, color: "#fff" }}
              >
                OTP Verification
              </Typography>
              <Typography
                sx={{ mt: 2, mb: 2, color: "#fff", textAlign: "center" }}
              >
                Please enter the OTP sent to <strong>{email}</strong>
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#fff" }}>
                Time remaining: {otpTimer}s
              </Typography>
              <Grid container spacing={2} sx={{ marginTop: "16px" }}>
                {otp.map((value, index) => (
                  <Grid item xs={3} key={index}>
                    <TextField
                      id={`otp-input-${index}`}
                      inputRef={(el) => (otpRefs.current[index] = el)}
                      inputProps={{
                        maxLength: 1,
                        style: { textAlign: "center", fontSize: "24px" },
                      }}
                      value={value}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </Grid>
                ))}
              </Grid>
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-5 w-full">
                <button
                  type="button"
                  className="border w-full p-3 rounded-lg border-primary text-white"
                  disabled={resendDisabled || otpTimer === 0}
                  onClick={handleResend}
                >
                  {resendDisabled
                    ? `Resend OTP in ${resendTimer}s`
                    : "Resend OTP"}
                </button>

                <button
                  type="button"
                  className="  p-3 w-full  rounded-lg bg-primary text-white"
                  onClick={handleOtpSubmit}
                  disabled={otpLoading || otpTimer === 0}
                >
                  {otpLoading ? <CircularProgress size={24} /> : "Submit OTP"}
                </button>
              </div>
            </>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Register;
