"use client";

import type { ChangeEvent, FocusEvent, FormEvent } from "react";
import { useState } from "react";

type ContactInquiryFormProps = {
  emailAddress: string;
};

type FormValues = {
  name: string;
  email: string;
  projectType: string;
  timeline: string;
  message: string;
};

type ValidatedFieldName = "name" | "email" | "message";

type FormErrors = Partial<Record<ValidatedFieldName, string>>;

const projectTypeOptions = ["Film Music", "Game Music", "Concert Commission", "Collaboration", "Other"] as const;

const initialValues: FormValues = {
  name: "",
  email: "",
  projectType: "",
  timeline: "",
  message: ""
};

const inputClassName =
  "h-12 w-full rounded-[10px] border border-neutral-200 bg-white px-4 text-[0.98rem] text-neutral-900 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/15 md:text-[1rem]";

const labelClassName = "font-heading text-[0.76rem] uppercase leading-none tracking-[0.18em] text-neutral-800 md:text-[0.84rem]";

const errorClassName = "text-[0.84rem] leading-relaxed text-accent";

function isValidatedField(fieldName: string): fieldName is ValidatedFieldName {
  return fieldName === "name" || fieldName === "email" || fieldName === "message";
}

function validateField(fieldName: ValidatedFieldName, value: string) {
  const trimmedValue = value.trim();

  if (fieldName === "name") {
    return trimmedValue ? "" : "Please include your name.";
  }

  if (fieldName === "email") {
    if (!trimmedValue) {
      return "Please include your email.";
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue);
    return isValidEmail ? "" : "Please enter a valid email address.";
  }

  return trimmedValue ? "" : "Please include a message.";
}

function validateForm(values: FormValues) {
  return {
    name: validateField("name", values.name),
    email: validateField("email", values.email),
    message: validateField("message", values.message)
  } satisfies FormErrors;
}

function buildMailtoHref(emailAddress: string, values: FormValues) {
  const name = values.name.trim();
  const email = values.email.trim();
  const projectType = values.projectType.trim();
  const timeline = values.timeline.trim();
  const message = values.message.trim();

  const subject = ["Contact Inquiry", projectType, name].filter(Boolean).join(" | ");

  const detailLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    projectType ? `Project Type: ${projectType}` : null,
    timeline ? `Timeline: ${timeline}` : null
  ].filter(Boolean);

  const body = [
    ...detailLines,
    "",
    "Message:",
    message
  ].join("\n");

  return `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactInquiryForm({ emailAddress }: ContactInquiryFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showHandoffMessage, setShowHandoffMessage] = useState(false);

  const updateField = (fieldName: keyof FormValues, value: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [fieldName]: value
    }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;

    updateField(name as keyof FormValues, value);
    setShowHandoffMessage(false);

    if (isValidatedField(name) && errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;

    if (!isValidatedField(name)) {
      return;
    }

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: validateField(name, value)
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm(values);

    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      setShowHandoffMessage(false);
      return;
    }

    const mailtoHref = buildMailtoHref(emailAddress, values);

    setShowHandoffMessage(true);
    window.location.assign(mailtoHref);
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="mx-auto max-w-[35rem] space-y-4 sm:space-y-5">
      <div className="space-y-2">
        <label htmlFor="name" className={labelClassName}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={values.name}
          onBlur={handleBlur}
          onChange={handleChange}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputClassName}
        />
        {errors.name ? (
          <p id="name-error" className={errorClassName}>
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className={labelClassName}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClassName}
        />
        {errors.email ? (
          <p id="email-error" className={errorClassName}>
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="projectType" className={labelClassName}>
          Project Type
        </label>
        <select
          id="projectType"
          name="projectType"
          value={values.projectType}
          onChange={handleChange}
          className={inputClassName}
        >
          <option value="">
            Select a project type
          </option>
          {projectTypeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="timeline" className={labelClassName}>
          Timeline
        </label>
        <input
          id="timeline"
          name="timeline"
          type="text"
          autoComplete="off"
          value={values.timeline}
          onChange={handleChange}
          className={inputClassName}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className={labelClassName}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={8}
          value={values.message}
          onBlur={handleBlur}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="min-h-[168px] w-full rounded-[10px] border border-neutral-200 bg-white px-4 py-3.5 text-[0.98rem] leading-relaxed text-neutral-900 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/15 md:min-h-[184px] md:text-[1rem]"
        />
        {errors.message ? (
          <p id="message-error" className={errorClassName}>
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2.5 pt-1">
        <button
          type="submit"
          className="w-full rounded-full bg-accent px-8 py-3.5 text-center font-heading text-[0.78rem] uppercase tracking-[0.16em] text-black transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-auto sm:min-w-[9.5rem] md:text-[0.82rem]"
        >
          Send Inquiry
        </button>
        <p className="max-w-[26rem] text-[0.76rem] leading-relaxed text-neutral-500 md:text-[0.8rem]">
          Sending opens your default email app with a drafted inquiry.
        </p>
        {showHandoffMessage ? (
          <p aria-live="polite" className="max-w-[26rem] text-[0.76rem] leading-relaxed text-neutral-600 md:text-[0.8rem]">
            Your draft should open in your email app. If not, you can email{" "}
            <a
              href={`mailto:${emailAddress}`}
              className="text-neutral-800 transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {emailAddress}
            </a>{" "}
            directly.
          </p>
        ) : null}
      </div>
    </form>
  );
}
