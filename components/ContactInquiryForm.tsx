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

const projectTypeOptions = ["Film Music", "Game Music", "Concert Commission", "Creative Collaboration", "Other"] as const;

const initialValues: FormValues = {
  name: "",
  email: "",
  projectType: "",
  timeline: "",
  message: ""
};

const inputClassName =
  "h-12 w-full border border-black/12 bg-white/82 px-4 text-[1.02rem] text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] transition-[border-color,box-shadow,background-color] placeholder:text-ink/34 focus-visible:border-accent focus-visible:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/14 md:text-[1.08rem]";

const labelClassName = "font-heading text-[0.78rem] uppercase leading-none tracking-[0.2em] text-ink/70 md:text-[0.86rem]";

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
    <form noValidate onSubmit={handleSubmit} className="mx-auto max-w-[38rem] space-y-5 sm:space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2.5">
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

        <div className="space-y-2.5">
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
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2.5">
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

        <div className="space-y-2.5">
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
            placeholder="Optional"
            className={inputClassName}
          />
        </div>
      </div>

      <div className="space-y-2.5">
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
          className="min-h-[180px] w-full border border-black/12 bg-white/82 px-4 py-3.5 text-[1.02rem] leading-relaxed text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] transition-[border-color,box-shadow,background-color] placeholder:text-ink/34 focus-visible:border-accent focus-visible:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/14 md:min-h-[208px] md:text-[1.08rem]"
        />
        {errors.message ? (
          <p id="message-error" className={errorClassName}>
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="border-t border-black/10 pt-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
          <button
            type="submit"
            className="w-full rounded-full border border-accent/80 bg-accent px-8 py-3.5 text-center font-heading text-[0.86rem] uppercase tracking-[0.18em] text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.34),0_14px_28px_rgba(0,0,0,0.08)] transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-auto sm:min-w-[10rem] md:order-2 md:text-[0.92rem]"
          >
            Send Inquiry
          </button>
          <div className="space-y-2 md:order-1">
            <p className="max-w-[28rem] text-[0.78rem] leading-relaxed text-ink/52 md:text-[0.82rem]">
              Sending opens your default email app with a drafted inquiry.
            </p>
            {showHandoffMessage ? (
              <p
                aria-live="polite"
                className="max-w-[28rem] text-[0.78rem] leading-relaxed text-ink/62 md:text-[0.82rem]"
              >
                Your draft should open in your email app. If it does not, please try again with your email client
                enabled.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </form>
  );
}
