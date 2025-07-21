// src/app/ThemeRegistry.tsx
"use client";

import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { PropsWithChildren } from "react";
import theme from "./base.theme";

export default function ThemeRegistry({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: { scrollBehavior: "smooth", width: "100%", height: "100%" },
          body: {
            margin: 0,
            padding: 0,
            backgroundColor: theme.palette.background.default,
            minHeight: "100vh",
            width: "100%",
          },
        }}
      />
      {children}
    </ThemeProvider>
  );
}
