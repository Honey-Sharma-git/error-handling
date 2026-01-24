"use client";

import { useId } from "react";

interface Props {
  type?: string;
  label?: string;
  placeholder?: string;
  className?: ClassName;
  errorMessage?: string;
  value: string;
  onChange: (value: string) => void;
}

interface ClassName {
  inputClasses?: string;
  labelClasses?: string;
  containerClasses?: string;
  errorMessageClasses?: string;
}

/**
 * **<InputField />**
 *
 * A shared input field UI component.
 *
 * Features:
 * - It has optional label and input field.
 * - The container, label and input filed styling is customizable.
 * - It can display error message under input field.
 *
 * @param props
 * @returns JSX
 */
export function InputField(props: Props) {
  const { type, label, placeholder, className, errorMessage, value, onChange } =
    props;
  const { inputClasses, labelClasses, containerClasses, errorMessageClasses } =
    className ?? {};

  const inputId = useId();

  return (
    <div className={`flex flex-col w-full ${containerClasses ?? ""}`}>
      {label && (
        <label htmlFor={inputId} className={`${labelClasses ?? ""}`}>
          {label.trim()}
        </label>
      )}

      <input
        type={type ?? "text"}
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder && placeholder.trim()}
        className={`border rounded p-1 px-2 mt-2 ${inputClasses ?? ""}`}
      />

      {errorMessage && (
        <p
          className={`text-xs mt-px text-red-500 ${errorMessageClasses ?? ""}`}
        >
          {errorMessage.trim()}
        </p>
      )}
    </div>
  );
}
