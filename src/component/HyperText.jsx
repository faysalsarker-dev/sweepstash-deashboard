import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"; // Characters to cycle through

const HyperText = ({ text, duration = 0.05, color = "#6200EE" }) => {
  const [displayText, setDisplayText] = useState(text.split("").map(() => ""));
  const [finalText] = useState(text.split("")); // No need to set finalText again.

  // Function to generate random characters while cycling
  const generateRandomCharacters = (index) => {
    setDisplayText((prevText) => {
      const updatedText = [...prevText];
      updatedText[index] = characters[Math.floor(Math.random() * characters.length)];
      return updatedText;
    });
  };

  useEffect(() => {
    // Array to store intervals for cleanup
    const intervals = finalText.map((char, index) => {
      const interval = setInterval(() => generateRandomCharacters(index), duration * 1000);

      // Set a timeout to reveal the final character after 2 seconds + slight delay per char
      setTimeout(() => {
        clearInterval(interval); // Stop random generation
        setDisplayText((prevText) => {
          const updatedText = [...prevText];
          updatedText[index] = char;
          return updatedText;
        });
      }, 2000 + index * 100); // Staggered delay for each character reveal

      return interval;
    });

    // Cleanup intervals on unmount
    return () => intervals.forEach((interval) => clearInterval(interval));
  }, [finalText, duration]);

  return (
    <div style={{ display: "flex", justifyContent: "center", fontSize: "2rem", fontWeight: "bold", color }}>
      {displayText.map((letter, index) => (
        <motion.span
          key={index}
          animate={{ opacity: [0, 1], y: [10, 0] }} // Fade and slide up effect
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ margin: "0 0.1rem" }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
};

export default HyperText;
