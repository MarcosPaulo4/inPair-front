import { useAlert } from "@/app/components/Alert/useAlertProvider"
import { StyledTextField } from "@/app/styles/styledComponents/StyledComponents.theme"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Typography } from "@mui/material"
import { useLocale, useTranslations } from "next-intl"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { ScheduleFormData, schema } from "../schema/signIn.schema"
import { submitLogin } from "../services/sign-in"

export default function ControlForm() {
  const { showAlert } = useAlert()
  const translate = useTranslations("Global");


  const methods = useForm<ScheduleFormData>({
    resolver: zodResolver(schema(translate)),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const locale = useLocale()
  console.log(locale)
  const handleSubmit = async (data: ScheduleFormData) => {
    try {
      const result = await submitLogin(data, locale)
      return result;
    } catch {
      showAlert("Erro ao fazer login", "error");
    }

  }

  return (
    <>
      <FormProvider {...methods}>
        <Box component="form" onSubmit={methods.handleSubmit(handleSubmit)} display="flex" flexDirection="column" gap={2} width="70%">
          <Typography>
            {translate('email')}
          </Typography>
          <Controller
            name='email'
            control={methods.control}
            render={({ field, fieldState }) => (
              <StyledTextField
                {...field}
                label="a***@***.com"
                type="email"
                variant="outlined"
                size="small"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Typography >
            {translate("password")}
          </Typography>
          <Controller
            name='password'
            control={methods.control}
            render={({ field, fieldState }) => (
              <StyledTextField
                {...field}
                label="*******"
                type='password'
                variant="outlined"
                size="small"
                name='email'
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Box display="flex" justifyContent="center" alignItems="center" paddingTop={8}>
            <Button type="submit" variant="contained">
              {translate("send")}
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </>


  )

}