"use client"

import { useAuth } from "@/app/contexts/auth-context";
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from "@mui/material";

export const LogoutButton = () => {
  const { logout } = useAuth()

  const onClick = async () => {
    try {
      await logout()
    } catch {
      console.error('erro')
    }
  }

  return (
    <IconButton onClick={onClick}>
      <LogoutIcon />
    </IconButton>

  )
}