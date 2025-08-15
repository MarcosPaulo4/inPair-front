import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocale, useTranslations } from "use-intl";
import { useAlert } from "../../../../../components/Alert/useAlertProvider";
import { AnimatedButton } from "../../../../../components/AnimatedButton/AnimatedButton";
import { FormField } from "../../../../../components/Form/FormField";
import { PasswordField } from "../../../../../components/Form/PasswordField";
import { RegisterScheduleFormData, registerSchema } from "../schema/register.schema";
import { submitRegister } from "../services/register";

export default function RegisterForm() {
  const { showAlert } = useAlert()
  const translate = useTranslations("Global.form");
  const locale = useLocale()
  const [isLoading, setIsLoading] = useState(false)

  const fields: {
    text: string;
    name: keyof RegisterScheduleFormData;
    type?: string;
  }[] = [
      { text: translate("name"), name: "name", type: "text" },
      { text: translate("surname"), name: "surname", type: "text" },
      { text: translate("email"), name: "email", type: "email" },
      { text: translate("password"), name: "password" },
    ];

  const methods = useForm<RegisterScheduleFormData>({
    resolver: zodResolver(registerSchema(translate)),
    defaultValues: {
      email: '',
      name: '',
      surname: '',
      password: ''
    }
  })

  const handleSubmit = async (data: RegisterScheduleFormData) => {
    setIsLoading(true)
    try {
      const result = await submitRegister(data, locale, translate("loginError"))
      return result;
    } catch {
      showAlert(translate("loginError"), "error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <FormProvider {...methods}>
        <Box
          component="form"
          display="flex"
          onSubmit={methods.handleSubmit(handleSubmit)}
          flexDirection="column"
          gap={2}
        >
          {fields.map((field) => (
            <Box key={field.name}>
              {field.name === "password" ? (
                <PasswordField<RegisterScheduleFormData>
                  label={field.text}
                  name={field.name}
                  control={methods.control}
                />
              ) : (
                <FormField<RegisterScheduleFormData>
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
    </>
  )
}