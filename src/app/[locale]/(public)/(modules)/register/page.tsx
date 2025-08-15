"use client"

import { Box, Button, Divider, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import AlertMessage from "../../../../components/Alert/AlertMessage";
import RegisterForm from "./components/RegisterForm";


export default function Register() {
  const translate = useTranslations("Global.form");

  return (
    <>
      <AlertMessage />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        flex={1}
      >
        <Box
          component="img"
          src="/svg/InPairSVG300x66.svg"
          alt="Logo Inpair"
          sx={{ width: { xs: "150px", sm: "200px" }, pb: 5 }}
        />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="24px"
          flexDirection="column"
          border="1px solid"
          borderColor="#E5E5E5"
          boxShadow={10}
          sx={{
            width: { xs: "90%", sm: "80%", md: "50%", lg: "40%" },
            maxWidth: 480,
            minHeight: 430,
            px: { xs: 3, sm: 5 },
          }}
        >
          <Box paddingBottom={5}>
            <Typography variant="h4">{translate("createAccount")}</Typography>
          </Box>
          <Box width="100%">
            <RegisterForm />
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: "90%", sm: "80%", md: "50%", lg: "40%" },
            maxWidth: 480,
          }}
          justifyContent="center"
          paddingTop={5}
        >
          <Divider >
            <Typography variant="body2" color="textSecondary">
              {translate('haveAccount')}
            </Typography>
          </Divider>
        </Box>
        <Box
          paddingTop={4}
          sx={{
            width: { xs: "90%", sm: "80%", md: "50%", lg: "40%" },
            maxWidth: 480,
          }}>
          <Button
            sx={{
              borderRadius: "20px",
              height: "45px",
              width: "100%"
            }}
            type="submit"
            variant="contained"
          >
            {translate("login")}
          </Button>
        </Box>

      </Box >
    </>

  );
}
