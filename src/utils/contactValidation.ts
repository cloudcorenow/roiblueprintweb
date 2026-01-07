import { ContactFormData, ContactFormErrors } from "../types/contact";

export const validateContactForm = (data: ContactFormData): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  if (!data.firstName.trim()) errors.firstName = "First name is required";
  if (!data.lastName.trim()) errors.lastName = "Last name is required";
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = "Email is invalid";
  if (!data.phone.trim()) errors.phone = "Phone number is required";
  if (!data.company.trim()) errors.company = "Practice name is required";
  if (!data.industry.trim()) errors.industry = "Practice type is required";
  if (!data.message.trim()) errors.message = "Message is required";

  return errors;
};
