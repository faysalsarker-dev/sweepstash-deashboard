/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const ShowCard = ({ title, contentCount }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = contentCount > 0 ? contentCount : 0;
    if (start === end) return;

    const incrementTime = Math.abs(Math.floor(2000 / end)); // Timing calculation
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [contentCount]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
     
    >
      <Card
        sx={{
          width: 'auto', // Auto width based on content
          // Max width for responsiveness
          padding: '8px',
          background: 'rgba(255, 255, 255, 0.1)', // Transparent background
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', // Subtle shadow
          backdropFilter: 'blur(10px)', // Backdrop blur for frosted effect
          borderRadius: '15px', // Rounded corners
          border: '1px solid rgba(255, 255, 255, 0.3)', // Slight border for glass effect
          color: 'white', // White text color
          textAlign: 'center',
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 'bold',
              textAlign: 'left',
              fontSize: '1.25rem',
              color: '#BB86FC', // Light accent color for title
            }}
          >
            {title}
          </Typography>
          <Box mt={2}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Typography
                variant="h2"
                component="div"
                sx={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: '3rem', // Large font size for number
                  color: '#000000', // White color for the number
                }}
              >
                {count}
              </Typography>
            </motion.div>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ShowCard;
