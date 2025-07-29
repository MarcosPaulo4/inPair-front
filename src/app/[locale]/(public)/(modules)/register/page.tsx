"use client"

import AlertMessage from "@/app/components/Alert/AlertMessage";
import theme from "@/app/styles/base.theme";
import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export default function Register() {
  const translate = useTranslations("Global");

  return (
    <>
      <AlertMessage />
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" >
        <Box
          padding={2}
          borderRadius={4}
          border="1px solid"
          borderColor={theme.palette.primary.main}
          boxShadow={10}
          height="60vh"
          width="40%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          sx={{ backgroundColor: theme.palette.background.paper }}
        >
          <Box paddingBottom={8}>
            <Typography variant="h3">
              {translate("inPair")}
            </Typography>
          </Box>
        </Box >
      </Box >
    </>

  );
}
