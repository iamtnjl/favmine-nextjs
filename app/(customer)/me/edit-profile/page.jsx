"use client";
import { useState } from "react";

import { inject, observer } from "mobx-react";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { object, string } from "yup";
import TextInputField from "@/components/from/TextInputField";
import FormikErrorBox from "@/components/from/FormikErrorBox";
import Button from "@/components/shared/Button";
import APIKit from "@/common/helpers/APIKit";
import { pickDifference } from "@/common/helpers/UtilKit";
import PhoneInputField from "@/components/from/PhoneInputField";
import PasswordInputField from "@/components/from/PasswordInputField";

const formValidationSchema = object({
  first_name: string().required("Please enter your first name"),
  last_name: string().required("Please enter your last name"),
  email: string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
});

function EditProfile({
  firstName,
  lastName,
  email,
  bengali_name,
  setOpenProfileEditDrawer,
  refetchProfile,
  phone,
  ...props
}) {
  const [backendErrors, setBackendErrors] = useState({});
  const [passwordChangeDrawer, setPasswordChangeDrawer] = useState(false);
  const initialValues = {
    first_name: firstName || "",
    last_name: lastName || "",
    email: email || "",
    bengali_name: bengali_name || "",
    phone: phone || "",
  };

  const { setMe } = props.meStore;

  const formik = useFormik({
    initialValues,
    validationSchema: formValidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      const handleSuccess = ({ data }) => {
        setBackendErrors({});
        setMe(data);
        refetchProfile();
        setOpenProfileEditDrawer(false);
      };
      const handleFailure = (error) => {
        console.warn(error?.response);
        setBackendErrors(error?.response?.data);
        throw new Error(error?.response?.data, { cause: error });
      };

      const payload = pickDifference(initialValues, values);

      if (Object.keys(payload).length === 0) {
        return toast("Change some information first");
      }

      const promise = APIKit.me
        .patchProfile(payload)
        .then(handleSuccess)
        .catch(handleFailure)
        .finally(() => setSubmitting(false));

      return toast.promise(promise, {
        loading: "Loading...",
        success: "Profile Changed Successfully!",
        error: "Something went wrong!",
      });
    },
  });

  return (
    <>
      <form className="px-2 py-4" onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <TextInputField
            placeholder="Enter your name"
            label="Name"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          <FormikErrorBox formik={formik} field="name" />
        </div>

        <div className="mb-4">
          <TextInputField
            placeholder="Enter your email"
            label="Email"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <FormikErrorBox formik={formik} field="email" />
        </div>
        <div className="mb-4">
          <PhoneInputField
            placeholder="Enter your phone"
            label="Phone"
            id="phone"
            name="phone"
            type="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          <FormikErrorBox formik={formik} field="phone" />
        </div>
        <div className="mb-4">
          <PasswordInputField
            placeholder="Enter your password"
            label="Password"
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <FormikErrorBox formik={formik} field="password" />
        </div>
        <div className="mb-4">
          <PasswordInputField
            placeholder="Enter your password"
            label="Retype Password"
            id="retype_password"
            name="retype_password"
            type="retype_password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.retype_password}
          />
          <FormikErrorBox formik={formik} field="retype_password" />
        </div>

        <div className="px-4 text-center">
          <Button type="submit" extraClassName="w-full mt-9" variant="primary">
            Update
          </Button>
        </div>
      </form>
    </>
  );
}

export default inject("meStore")(observer(EditProfile));
