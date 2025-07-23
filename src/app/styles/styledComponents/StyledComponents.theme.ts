import { styled, TextField, Toolbar } from "@mui/material";
import Link from "next/link";

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: "space-around",
  alignItems: 'center',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  color: "#000",
  backgroundColor: theme.palette.background.paper,
  '@media all': {
    minHeight: 50,
  },
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: "none",
  fontSize: theme.typography.h6.fontSize,
  fontFamily: theme.typography.h6.fontFamily,
  fontWeight: theme.typography.h6.fontWeight,
  "&:hover": {
    color: theme.palette.primary.main,
    textDecoration: "none",
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  fontFamily: theme.typography.h6.fontFamily,
  borderRadius: 4,
  label: {
    color: '#999',
    fontSize: theme.typography.h6.fontSize,
    fontFamily: theme.typography.h6.fontFamily,
    fontWeight: theme.typography.h6.fontWeight, 
    "&:focus":{
      color: theme.palette.primary.contrastText,
    }
  }

}))