"use client"

import { useAuth } from "@/app/contexts/auth-context";
import { Box, Button, Typography } from "@mui/material";


export default function Home() {
  const { user, logout } = useAuth()

  const onClick = async () => {
    try {
      await logout()
    } catch {
      console.error('erro')
    }
  }


  return (
    <Box display='flex' justifyContent='space-around' padding={2}>
      <Typography>{user?.name}</Typography>
      <Button onClick={onClick}>
        Logout
      </Button>
    </Box>
  );
}
