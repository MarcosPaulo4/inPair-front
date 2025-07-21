"use client"

import theme from "@/app/styles/base.theme";
import { StyledTextField } from "@/app/styles/styledComponents/StyledComponents.theme";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Typography } from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as z from "zod";


const schema = z.object({
  email: z.email({ message: 'Email inválido' }),
  password: z.string().min(1, { message: 'Senha obrigatória' }),
});
type ScheduleFormData = z.infer<typeof schema>

export default function Home() {

  const onSubmit = async (data: ScheduleFormData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) console.log('Login failed');
    window.location.href = '/Home';
  }

  const methods = useForm<ScheduleFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  return (
    <Container >
      <Box sx={{ backgroundColor: theme.palette.background.paper }} padding={2} borderRadius={2} boxShadow={3}>
        <FormProvider {...methods}>
          <Box component="form" onSubmit={methods.handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={2}>
            <Typography>
              Email
            </Typography>
            <Controller
              name='email'
              control={methods.control}
              render={({ field, fieldState }) => (
                <StyledTextField
                  {...field}
                  type="email"
                  label='email'
                  variant="outlined"
                  size="small"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Typography>
              Password
            </Typography>
            <Controller
              name='password'
              control={methods.control}
              render={({ field, fieldState }) => (
                <StyledTextField
                  {...field}
                  type='password'
                  label='password'
                  variant="outlined"
                  size="small"
                  name='email'
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Button type="submit" variant="contained" >
              Submit
            </Button>
          </Box>

        </FormProvider>
      </Box >
    </Container >

  );
}
