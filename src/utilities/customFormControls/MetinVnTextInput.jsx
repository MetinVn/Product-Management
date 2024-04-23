import { useField } from "formik";
import React from "react";
import { FormField, Label } from "semantic-ui-react";
export default function UndefinedTextInput({ ...props }) {
  const [field, meta] = useField(props);
  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <input {...field} {...props} />
      {meta.touched && !!meta.error ? (
        <div className="blockzero">
          <Label
            pointing="above"
            basic={true}
            color="red"
            content={meta.error}></Label>
        </div>
      ) : null}
    </FormField>
  );
}
