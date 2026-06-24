/** Pure form-validation helpers (unit-testable, no React). */

export type ContactFields = {
  name: string;
  address: string;
  contact: string; // phone OR email
  message: string;
  education?: string;
  driversLicense?: string;
  lookingFor?: string;
  startNextWeek?: string;
  sales?: string;
  rejection?: string;
  personality?: string;
  referredBy?: string;
  heardAbout?: string;
};

export type Errors = Partial<Record<keyof ContactFields, string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^[+]?[\d][\d\s().-]{6,}$/;

export function isEmail(v: string): boolean {
  return emailRe.test(v.trim());
}

export function isPhone(v: string): boolean {
  return phoneRe.test(v.trim());
}

/** Validates one field; returns an error string or undefined. */
export function validateField(field: keyof ContactFields, value: string, mode: "contact" | "join" = "contact"): string | undefined {
  const v = value.trim();
  switch (field) {
    case "name":
      return v.length < 2 ? "Please enter your name." : undefined;
    case "address":
      return v.length < 5 ? (mode === "join" ? "Enter your city or neighborhood." : "Enter the address where you want the curb painted.") : undefined;
    case "contact":
      return isEmail(v) || isPhone(v) ? undefined : "Enter a valid phone number or email.";
    case "message":
      return undefined; // optional
  }
}

/** Validates the whole form. */
export function validateForm(fields: ContactFields, mode: "contact" | "join" = "contact"): Errors {
  const errors: Errors = {};
  (Object.keys(fields) as (keyof ContactFields)[]).forEach((k) => {
    const err = validateField(k, fields[k] ?? "", mode);
    if (err) errors[k] = err;
  });
  return errors;
}
