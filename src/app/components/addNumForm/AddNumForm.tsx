"use client";

import { useCallback, useState } from "react";
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
  // Form value, error and sum states:
  const [formValues, setFormValues] = useState<FormValues>({
    firstNum: "",
    secondNum: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({
    firstNum: "",
    secondNum: "",
  });
  const [sum, setSum] = useState<string>("");

  /**
   * **handleChange()**
   * - Tracks values changes to show error on invalid input
   * - Reset calculated value on value change.
   * - Update form value state.
   *
   * @params form field key and its value
   * @returns void
   *
   */
  const handleChange = useCallback((key: keyof FormValues, value: string) => {
    let msg = "";
    const { message } = validateInput(
      value,
      /[^0-9]/,
      "Please enter a valid number",
    );
    msg = message;

    if (value.trim() === "") {
      msg = "This field is required";
    }

    setFieldErrors((prev) => {
      return { ...prev, [key]: msg };
    });

    setFormValues((prev) => {
      return { ...prev, [key]: value };
    });

    setSum("");
  }, []);

  /**
   * **validateInput()**
   * - Checks if field is empty
   * - Tests whether value passes the pattern.
   * - Sets error message on test failure.
   *
   * @params value, pattern and message
   * @returns error obj
   */
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

  /**
   * **calculateSum()**
   * - Return early if filed errors are present
   * - Extracts 1st and 2nd numbers.
   * - Add 2 number and update the result
   */
  const calculateSum = useCallback(() => {
    const hasAnyError = Object.values(fieldErrors).some(
      (msg) => msg.length > 0,
    );

    if (hasAnyError) return;

    const { firstNum, secondNum } = formValues;

    const result = addNum(Number(firstNum), Number(secondNum));

    setSum(String(result));
  }, [fieldErrors, formValues]);

  /**
   * **reset()**
   * - Resets form values and field errors
   */
  const reset = useCallback(() => {
    setFormValues({
      firstNum: "",
      secondNum: "",
    });

    setFieldErrors({
      firstNum: "",
      secondNum: "",
    });

    setSum("");
  }, []);

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

            <div className="flex flex-row gap-4">
              <button
                onClick={calculateSum}
                type="button"
                className="p-1 px-4 rounded-full cursor-pointer shadow bg-green-300 hover:bg-green-400 w-fit"
              >
                Calculate Sum
              </button>

              <button
                onClick={reset}
                type="button"
                className="p-1 px-4 rounded-full cursor-pointer shadow bg-red-300 hover:bg-red-400 w-fit"
              >
                Reset
              </button>
            </div>
          </div>
        </fieldset>
      </form>

      <output className="border-2 border-dotted p-2 w-full text-center">
        {sum ? sum : "Number sum will be displayed here"}
      </output>
    </div>
  );
}
