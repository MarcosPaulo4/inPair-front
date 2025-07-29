import { useAlert } from "@/app/components/Alert/useAlertProvider"
import { FormField } from "@/app/components/Form/FormField"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button } from "@mui/material"
import { useLocale, useTranslations } from "next-intl"
import { FormProvider, useForm } from "react-hook-form"
import { ScheduleFormData, schema } from "../schema/signIn.schema"
import { submitLogin } from "../services/sign-in"

export default function ControlForm() {
  const { showAlert } = useAlert()
  const translate = useTranslations("Global");
  const locale = useLocale()

  const fields: {
    text: string;
    name: keyof ScheduleFormData;
    type?: string;
  }[] = [
      { text: "signIn.email", name: "email", type: "email" },
      { text: "signIn.password", name: "password", type: "password" },
    ];

  const methods = useForm<ScheduleFormData>({
    resolver: zodResolver(schema(translate)),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleSubmit = async (data: ScheduleFormData) => {
    try {
      const result = await submitLogin(data, locale)
      return result;
    } catch {
      showAlert("Erro ao fazer login", "error");
    }
  }

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={methods.handleSubmit(handleSubmit)}
        display="flex"
        flexDirection="column"
        width="55%"
        gap={4}
      >
        {fields.map((field) => (
          <Box key={field.name} >
            <FormField<ScheduleFormData>
              label={translate(field.text)}
              control={methods.control}
              name={field.name}
              type={field.type}
            />
          </Box>
        ))}
        <Box display="flex" justifyContent="center" alignItems="center" >
          <Button type="submit" variant="contained">
            {translate("signIn.send")}
          </Button>
        </Box>
      </Box>
    </FormProvider>
  )
}