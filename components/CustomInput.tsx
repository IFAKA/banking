import { camelToTitleCase, getAuthFormSchema } from "@/lib/utils";
import { HTMLInputTypeAttribute } from "react";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

const authFormSchema = getAuthFormSchema("sign-up");

interface CustomInput {
  control: Control<z.infer<typeof authFormSchema>>;
  name: FieldPath<z.infer<typeof authFormSchema>>;
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}

const getInputType = (name: string): HTMLInputTypeAttribute => {
  const itHasName = (str: HTMLInputTypeAttribute) =>
    name.toLowerCase().includes(str);
  if (itHasName("password")) return "password";
  if (itHasName("email")) return "email";
  if (itHasName("phone")) return "tel";
  if (itHasName("price") || itHasName("number")) return "number";
  if (itHasName("url")) return "url";
  if (itHasName("date")) return "date";
  if (itHasName("time")) return "time";
  return "text";
};

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  type,
}: CustomInput) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item w-full">
          <FormLabel className="form-label">
            {label || camelToTitleCase(name)}
          </FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={
                  placeholder ||
                  `Enter your ${camelToTitleCase(name).toLocaleLowerCase()}`
                }
                className="input-class"
                type={type || getInputType(name)}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-1.5" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
