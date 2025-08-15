import { useAlert } from "@/app/components/Alert/useAlertProvider"
import { AnimatedButton } from "@/app/components/AnimatedButton/AnimatedButton"
import { FormField } from "@/app/components/Form/FormField"
import { PasswordField } from "@/app/components/Form/PasswordField"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box } from "@mui/material"
import { useLocale, useTranslations } from "next-intl"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { ScheduleFormData, schema } from "../schema/signIn.schema"
import { submitLogin } from "../services/sign-in"

export default function SignInForm() {
  const { showAlert } = useAlert()
  const translate = useTranslations("Global.form");
  const locale = useLocale()
  const [isLoading, setIsLoading] = useState(false)

  const fields: {
    text: string;
    name: keyof ScheduleFormData;
    type?: string;
  }[] = [
      { text: translate("email"), name: "email", type: "email" },
      { text: translate("password"), name: "password" },
    ];

  const methods = useForm<ScheduleFormData>({
    resolver: zodResolver(schema(translate)),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleSubmit = async (data: ScheduleFormData) => {
    setIsLoading(true)
    try {
      const result = await submitLogin(data, locale, translate("loginError"));
      return result;
    } catch {
      showAlert(translate("loginError"), "error");
    } finally {
      setIsLoading(false);
    }
  }



  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={methods.handleSubmit(handleSubmit)}
        display="flex"
        flexDirection="column"
        gap={4}
      >
        {fields.map((field) => (
          <Box key={field.name}>
            {field.name === "password" ? (
              <PasswordField<ScheduleFormData>
                label={field.text}
                name={field.name}
                control={methods.control}
              />
            ) : (
              <FormField<ScheduleFormData>
                label={field.text}
                control={methods.control}
                name={field.name}
                type={field.type}
              />
            )}
          </Box>
        ))}
        <AnimatedButton
          loading={isLoading}
          text={translate("send")}
          variant="contained"
          type="submit"
        />
      </Box>
    </FormProvider>
  )
}