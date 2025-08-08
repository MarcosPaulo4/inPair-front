
import { LogoutButton } from "@/app/components/AnimatedButton/LogoutButton"
import { Avatar, Box, Typography } from "@mui/material"

export const PrivateHeader = () => {

  return (
    <Box
      display="flex"
      width="100%"
      height={60}
      borderBottom="1px solid"
      borderColor="#E5E5E5"
      justifyContent="space-between"
    >
      <Box
        display="flex"
        alignItems="center"
        paddingLeft={4}
      >
        <Box
          component="img"
          src="/svg/InPairSVG2.svg"
          alt="Logo Inpair"
          sx={{ width: { xs: "80px", sm: "100px" }, }}
        />
      </Box>

      <Box
        display="flex"
        alignItems="center"
        paddingRight={4}
        gap={4}
      >
        <Typography variant="h6">
        </Typography>
        <Avatar alt="Upload new avatar" />
        <LogoutButton />
      </Box>
    </Box >
  )
}