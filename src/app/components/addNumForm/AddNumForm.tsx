"use client";

import { FormEvent, useCallback, useState } from "react";
import { InputField } from "../shared/InputField";
import { addNum } from "@/app/utils/add";

interface FormValues {
  firstNum: string;
  secondNum: string;
}
interface FieldErrors {
  firstNum: string;
  secondNum: string;
}

export function AddNumForm() {
  const [formValues, setFormValues] = useState<FormValues>({
    firstNum: "",
    secondNum: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({
    firstNum: "",
    secondNum: "",
  });
  const [sum, setSum] = useState<string>("");

  const handleChange = useCallback((key: keyof FormValues, value: string) => {
    const { isError, message } = validateInput(
      value,
      /[^0-9]/g,
      "Please enter a valid number",
    );

    setFieldErrors((prev) => {
      return { ...prev, [key]: message };
    });

    setFormValues((prev) => {
      return { ...prev, [key]: value };
    });

    setSum("");
  }, []);

  const validateInput = useCallback(
    (value: string, pattern: RegExp, message: string) => {
      const error = { message: "", isError: false };
      if (pattern.test(value.trim())) {
        error.isError = true;
        error.message = message;
      } else {
        error.isError = false;
        error.message = "";
      }
      return error;
    },
    [],
  );

  function calculateSum(e: any) {
    e.preventDefault();

    const hasAnyError = Object.values(fieldErrors).some(
      (msg) => msg.length > 0,
    );

    if (hasAnyError) return;

    const { firstNum, secondNum } = formValues;

    const result = addNum(Number(firstNum), Number(secondNum));

    setSum(String(result));
  }

  return (
    <div className="m-2 border shadow rounded-lg flex flex-col gap-4 items-center justify-center p-4 w-100">
      <form>
        <fieldset>
          <legend className="w-full text-center font-bold text-amber-600 mb-5">
            Sum Two Numbers
          </legend>

          <div className="flex flex-col items-center gap-2">
            <InputField
              className={{
                labelClasses: "text-pink-600",
                inputClasses: "border-pink-600 focus-within:outline-pink-600",
              }}
              label="Enter First Number:"
              placeholder="e.g 3"
              value={formValues.firstNum}
              onChange={(value) => {
                handleChange("firstNum", value);
              }}
              errorMessage={fieldErrors.firstNum}
            />

            <InputField
              className={{
                labelClasses: "text-pink-600",
                inputClasses: "border-pink-600 focus-within:outline-pink-600",
              }}
              label="Enter Second Number:"
              placeholder="e.g 2"
              value={formValues.secondNum}
              onChange={(value) => {
                handleChange("secondNum", value);
              }}
              errorMessage={fieldErrors.secondNum}
            />

            <button
              onClick={(e) => calculateSum(e)}
              type="submit"
              className="p-1 px-4 rounded-full cursor-pointer shadow bg-amber-300 hover:bg-amber-400 w-fit"
            >
              Calculate Sum
            </button>
          </div>
        </fieldset>
      </form>
      <output className="border-2 border-dotted p-2 w-full text-center">
        {sum ? sum : "Number sum will be displayed here"}
      </output>
    </div>
  );
}
