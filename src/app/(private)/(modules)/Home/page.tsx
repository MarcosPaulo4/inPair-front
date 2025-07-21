"use client"

import { useAuth } from "@/app/contexts/auth-context";
import { Box, Button, Container } from "@mui/material";

export default function Home() {
  const { user, logout } = useAuth()

  const onLogout = async () => {
    try {
      await logout()
    } catch {
      throw new Error('Logout failed');
    }
  }

  return (
    <Container>
      <Box>
        Parabens vc esta logado como {user?.name} ou {user?.email}
      </Box>
      <Button onClick={onLogout} variant="text" color="success">Logout</Button>
    </Container>

  );
}
