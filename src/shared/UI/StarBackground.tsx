import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

const StarBackground: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [stars, setStars] = useState<number[]>([]);

  useEffect(() => {
    setStars(Array.from({ length: 100 }, () => Math.random() * 100));
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "#000",
      }}
    >
      {stars.map((left, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${left}%`,
            width: 2,
            height: 2,
            backgroundColor: "#fff",
            borderRadius: "50%",
            animation: `twinkle ${Math.random() * 3 + 1}s infinite alternate`,
          }}
        />
      ))}
      {children}
      <style>{`
        @keyframes twinkle {
          0% { opacity: 0.2; }
          50% { opacity: 1; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </Box>
  );
};

export default StarBackground;
