import { styled, TextField } from "@mui/material";


export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: theme.palette.background.paper,
    fontFamily: theme.typography.h6.fontFamily,
    height: "45px",
  },
  '& label': {
    color: '#999',
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
  },
  '& label.Mui-focused': {
    color: theme.palette.primary.contrastText,
  }
}));


