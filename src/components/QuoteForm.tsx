"use client";

import { useRef, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2, Mail, Phone, Send } from "lucide-react";

import { Button } from "@/components/Button";
import { company } from "@/lib/site";
import {
  emptyQuote,
  formatQuoteText,
  serviceOptions,
  validateQuote,
  type QuoteErrors,
  type QuoteField,
  type QuoteRequest,
} from "@/lib/quote";

type Status = "idle" | "submitting" | "sent" | "manual" | "error";

const inputBase =
  "min-h-12 w-full border bg-white px-4 text-[0.9375rem] text-peak-950 " +
  "placeholder:text-peak-950/60 transition-colors focus:border-peak-700 " +
  "focus:outline-none focus:ring-2 focus:ring-gold-400/40";

function fieldClass(hasError: boolean) {
  return `${inputBase} ${hasError ? "border-red-500" : "border-peak-950/20"}`;
}

export default function QuoteForm() {
  const [values, setValues] = useState<QuoteRequest>(emptyQuote);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);

  const update = (field: QuoteField, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear a field's error as soon as the visitor edits it.
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const mailtoHref = () => {
    const subject = `Quote request — ${values.service || "Logistics"} — ${values.fullName}`;
    return `${company.email.href}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(formatQuoteText(values))}`;
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validateQuote(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Move focus to the first field with a problem.
      const first = Object.keys(found)[0];
      document.getElementById(first)?.focus();
      return;
    }

    setStatus("submitting");
    setServerMessage("");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.status === "sent") {
        setStatus("sent");
      } else if (response.status === 422 && data.errors) {
        setErrors(data.errors as QuoteErrors);
        setStatus("idle");
      } else if (data.status === "not_configured") {
        setStatus("manual");
      } else {
        setServerMessage(
          typeof data.message === "string"
            ? data.message
            : "Something went wrong. Please email or call us instead.",
        );
        setStatus("error");
      }
    } catch {
      setStatus("manual");
    }

    summaryRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  /* ----------------------------- success state ----------------------------- */
  if (status === "sent") {
    return (
      <div className="border border-peak-800/25 bg-peak-50 p-8 text-center lg:p-12">
        <CheckCircle2 aria-hidden className="mx-auto size-12 text-peak-700" />
        <h2 className="mt-5 text-2xl font-bold text-peak-950">
          Your request has been sent
        </h2>
        <p className="mx-auto mt-3 max-w-md text-peak-950/70">
          Thank you, {values.fullName.split(" ")[0]}. Our team will review your
          shipment details and get back to you at {values.email}.
        </p>
      </div>
    );
  }

  const busy = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      {/* --------------------------- status summary --------------------------- */}
      <div ref={summaryRef} aria-live="polite">
        {status === "manual" && (
          <div className="border border-gold-500/40 bg-gold-100/60 p-6">
            <div className="flex gap-3">
              <AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0 text-gold-700" />
              <div>
                <h2 className="font-display font-bold text-peak-950">
                  Send this request directly
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-peak-950/70">
                  Online submission is not connected on this site yet, so your
                  details were not transmitted. Your answers are preserved
                  below — use either option and they will travel with you.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={mailtoHref()}
                    className="inline-flex min-h-11 items-center justify-center gap-2 bg-peak-800 px-5 text-sm font-semibold text-white transition-colors hover:bg-peak-700"
                  >
                    <Mail aria-hidden className="size-4" />
                    Email this request
                  </a>
                  <a
                    href={company.phone.href}
                    className="inline-flex min-h-11 items-center justify-center gap-2 border border-peak-950/25 px-5 text-sm font-semibold text-peak-900 transition-colors hover:bg-white"
                  >
                    <Phone aria-hidden className="size-4" />
                    {company.phone.display}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="flex gap-3 border border-red-300 bg-red-50 p-5">
            <AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0 text-red-600" />
            <p className="text-sm leading-relaxed text-red-900">{serverMessage}</p>
          </div>
        )}

        {Object.keys(errors).length > 0 && (
          <div className="flex gap-3 border border-red-300 bg-red-50 p-5">
            <AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0 text-red-600" />
            <p className="text-sm leading-relaxed text-red-900">
              Please check the highlighted fields below.
            </p>
          </div>
        )}
      </div>

      {/* ------------------------------ contact ------------------------------ */}
      <fieldset className="space-y-5" disabled={busy}>
        <legend className="mb-5 flex items-center gap-3">
          <span className="h-px w-6 rule-gold" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-ink">
            Your details
          </span>
        </legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id="fullName"
            label="Full name"
            required
            value={values.fullName}
            error={errors.fullName}
            onChange={update}
            autoComplete="name"
            placeholder="e.g. Musu Kollie"
          />
          <Field
            id="companyName"
            label="Company name"
            value={values.companyName}
            error={errors.companyName}
            onChange={update}
            autoComplete="organization"
            placeholder="Optional"
          />
          <Field
            id="email"
            label="Email"
            type="email"
            required
            value={values.email}
            error={errors.email}
            onChange={update}
            autoComplete="email"
            inputMode="email"
            placeholder="you@company.com"
          />
          <Field
            id="phone"
            label="Phone"
            type="tel"
            required
            value={values.phone}
            error={errors.phone}
            onChange={update}
            autoComplete="tel"
            inputMode="tel"
            placeholder="+231 ..."
          />
        </div>
      </fieldset>

      {/* ------------------------------ shipment ----------------------------- */}
      <fieldset className="space-y-5 border-t border-peak-950/10 pt-7" disabled={busy}>
        <legend className="mb-5 flex items-center gap-3">
          <span className="h-px w-6 rule-gold" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-ink">
            Your shipment
          </span>
        </legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="service" required>
              Service needed
            </Label>
            <select
              id="service"
              name="service"
              value={values.service}
              onChange={(e) => update("service", e.target.value)}
              aria-invalid={Boolean(errors.service)}
              aria-describedby={errors.service ? "service-error" : undefined}
              className={`${fieldClass(Boolean(errors.service))} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%23032013%22 stroke-width=%222%22><path d=%22M3 6l5 5 5-5%22/></svg>')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-11`}
            >
              <option value="">Select a service…</option>
              {serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FieldError id="service-error" message={errors.service} />
          </div>

          <Field
            id="cargoType"
            label="Cargo type"
            value={values.cargoType}
            error={errors.cargoType}
            onChange={update}
            placeholder="e.g. General cargo, vehicles, equipment"
          />
          <Field
            id="shipmentDate"
            label="Estimated shipment date"
            type="date"
            value={values.shipmentDate}
            error={errors.shipmentDate}
            onChange={update}
          />
          <Field
            id="origin"
            label="Origin"
            required
            value={values.origin}
            error={errors.origin}
            onChange={update}
            placeholder="City / port of loading"
          />
          <Field
            id="destination"
            label="Destination"
            required
            value={values.destination}
            error={errors.destination}
            onChange={update}
            placeholder="City / final delivery point"
          />

          <div className="sm:col-span-2">
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              placeholder="Weight and dimensions, incoterms, special handling, deadlines — anything that helps us quote accurately."
              className={`${fieldClass(Boolean(errors.message))} min-h-32 resize-y py-3 leading-relaxed`}
            />
            <FieldError id="message-error" message={errors.message} />
          </div>
        </div>
      </fieldset>

      <div className="flex flex-col gap-4 border-t border-peak-950/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-peak-950/70">
          Fields marked <span className="text-red-600">*</span> are required.
          We use your details only to prepare your quote.
        </p>
        <Button type="submit" variant="gold" size="lg" disabled={busy}>
          {busy ? (
            <>
              <Loader2 aria-hidden className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send aria-hidden className="size-4" />
              Request a Quote
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */

function Label({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-sm font-semibold text-peak-950"
    >
      {children}
      {required && (
        <span aria-hidden className="ml-0.5 text-red-600">
          *
        </span>
      )}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-xs font-medium text-red-600">
      {message}
    </p>
  );
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  required,
  ...rest
}: {
  id: QuoteField;
  label: string;
  value: string;
  error?: string;
  onChange: (field: QuoteField, value: string) => void;
  type?: string;
  required?: boolean;
} & Omit<React.ComponentProps<"input">, "id" | "value" | "onChange" | "type">) {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        {...rest}
        id={id}
        name={id}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(id, e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={fieldClass(Boolean(error))}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
