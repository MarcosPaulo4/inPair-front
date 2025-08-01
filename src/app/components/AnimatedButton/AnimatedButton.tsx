import { Box, Button, CircularProgress, Typography } from "@mui/material";

interface AnimatedButtonProps {
  loading: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "contained" | "outlined" | "text";
  text?: string;
}

export const AnimatedButton = ({ loading, type, variant, text }: AnimatedButtonProps) => {
  return (
    <>
      {loading ? (
        <Box display="flex" justifyContent="center" height="45px">
          <CircularProgress />
        </Box>
      ) : (
        <Button type={type} variant={variant} sx={{ borderRadius: "20px", height: "45px" }}>
          <Typography>{text}</Typography>
        </Button>
      )}
    </>
  )

}