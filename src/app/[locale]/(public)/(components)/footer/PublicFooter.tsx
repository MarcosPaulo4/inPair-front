import { Box, Typography } from "@mui/material"

export const PublicFooter = () => {
  return (
    <Box
      display="flex"
      width="100%"
      height={60}
      justifyContent="center"
      borderTop="1px solid"
      borderColor="#E5E5E5"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
        </Box>
        <Box display="flex" gap={10}>
          <Typography variant="body2" color="textSecondary">
            Terms of service
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Privacy policy
          </Typography>
        </Box>

      </Box>

    </Box>
  )

}