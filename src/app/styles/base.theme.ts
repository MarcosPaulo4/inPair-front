"use client";

import { createTheme } from "@mui/material";
import { Geist_Mono, Raleway } from "next/font/google";


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  style: ["normal", "italic"]
})

const baseTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#500208", 
      contrastText: "#9b010c"
    },
    secondary: {
      main: "#e70011", 
    },
  },
  typography: {
    fontFamily: `${raleway.style.fontFamily}, ${geistMono.style.fontFamily}`,
  },
});


export const theme = createTheme(baseTheme, {
  typography: {
    h1: {
      fontSize: "64px",
      fontWeight: 300,
      [baseTheme.breakpoints.only("md")]: {
        fontSize: "60px",
      },
      [baseTheme.breakpoints.only("sm")]: {
        fontSize: "56px",
      },
      [baseTheme.breakpoints.only("xs")]: {
        fontSize: "52px",
      },
    },
    h3: {
      fontSize: "32px",
      fontWeight: 300,
      [baseTheme.breakpoints.only("md")]: {
        fontSize: "30px",
      },
      [baseTheme.breakpoints.only("sm")]: {
        fontSize: "28px",
      },
      [baseTheme.breakpoints.only("xs")]: {
        fontSize: "26px",
      },
    },
    h4: {
       fontSize: "24px",
      fontWeight: 300,
      [baseTheme.breakpoints.only("md")]: {
        fontSize: "22px",
      },
      [baseTheme.breakpoints.only("sm")]: {
        fontSize: "20px",
      },
      [baseTheme.breakpoints.only("xs")]: {
        fontSize: "18px",
      },
    },
    h5: {
      fontSize: "20px",
      fontWeight: 300,
      [baseTheme.breakpoints.only("md")]: {
        fontSize: "18px",
      },
      [baseTheme.breakpoints.only("sm")]: {
        fontSize: "16px",
      },
      [baseTheme.breakpoints.only("xs")]: {
        fontSize: "14px",
      },
    },
    h6: {
      fontSize: "16px",
      fontWeight: 300,
      [baseTheme.breakpoints.only("md")]: {
        fontSize: "14px",
      },
      [baseTheme.breakpoints.only("sm")]: {
        fontSize: "12px",
      },
      [baseTheme.breakpoints.only("xs")]: {
        fontSize: "10px",
      },
    },

  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          borderRadius: "0px",
          textTransform: "none",
          backgroundColor: baseTheme.palette.primary.main, 
          color: "#ffffff",
          '&:hover': {
          backgroundColor: baseTheme.palette.primary.contrastText, 

          }
        },
        outlinedPrimary: {
          borderRadius: "0px",
          textTransform: "none",
          backgroundColor:"#ffffff", 
          color: baseTheme.palette.primary.main,
          '&:hover': {
            backgroundColor: baseTheme.palette.primary.contrastText, 
            color: "#ffffff"
          }
        }
      }
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          scrollMarginTop: "80px",
          paddingTop: "50px !important",
          paddingBottom: "50px !important",
          paddingLeft: "20px !important",
          paddingRight: "20px !important"
        },
      },
    },

  },
});

export default theme;