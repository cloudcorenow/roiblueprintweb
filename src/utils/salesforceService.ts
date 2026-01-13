import { ContactFormData } from "../types/contact";

const SALESFORCE_WEB_TO_LEAD_URL = "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00Dfo000005V72K";

const PRACTICE_TYPE_MAPPING: Record<string, string> = {
  "aba": "ABA Practice",
  "medical": "Medical Practice",
  "dental": "Dental Practice",
  "other": "Other Healthcare",
};

export const submitToSalesforce = async (
  formData: ContactFormData,
  recaptchaToken: string
): Promise<void> => {
  const formDataToSubmit = new FormData();

  formDataToSubmit.append("oid", "00Dfo000005V72K");
  formDataToSubmit.append("retURL", window.location.origin + "/thank-you");

  formDataToSubmit.append("first_name", formData.firstName);
  formDataToSubmit.append("last_name", formData.lastName);
  formDataToSubmit.append("email", formData.email);
  formDataToSubmit.append("phone", formData.phone);
  formDataToSubmit.append("company", formData.company);

  const practiceType = PRACTICE_TYPE_MAPPING[formData.industry] || formData.industry;
  formDataToSubmit.append("00NVp0000060P2z", practiceType);

  formDataToSubmit.append("description", formData.message);

  const captchaSettings = {
    keyname: "SalesforceWebtoLead",
    fallback: "true",
    orgId: "00Dfo000005V72K",
    ts: JSON.stringify(new Date().getTime())
  };
  formDataToSubmit.append("captcha_settings", JSON.stringify(captchaSettings));

  formDataToSubmit.append("g-recaptcha-response", recaptchaToken);

  const response = await fetch(SALESFORCE_WEB_TO_LEAD_URL, {
    method: "POST",
    body: formDataToSubmit,
    mode: "no-cors",
  });

  return;
};
