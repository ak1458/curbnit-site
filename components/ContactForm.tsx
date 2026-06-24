"use client";

import { useEffect, useRef, useState } from "react";
import { contact } from "@/lib/content";
import { form as formConfig, business, telHref } from "@/lib/config";
import { validateForm, validateField, type ContactFields, type Errors } from "@/lib/validate";
import { Button } from "./Button";
import { Icon } from "./Icon";

const EMPTY: ContactFields = { name: "", address: "", contact: "", message: "", education: "", driversLicense: "", lookingFor: "", startNextWeek: "", sales: "", rejection: "", personality: "", referredBy: "", heardAbout: "" };
type Status = "idle" | "loading" | "success" | "error";

interface ContactFormProps {
  defaultMode?: "contact" | "join";
}

export function ContactForm({ defaultMode = "contact" }: ContactFormProps) {
  const [fields, setFields] = useState<ContactFields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFields, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [mode, setMode] = useState<"contact" | "join">(defaultMode);
  const honeypot = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const type = params.get("type");
      if (type === "join") {
        setMode("join");
      } else if (type === "contact") {
        setMode("contact");
      }
    }
  }, []);

  const set = (k: keyof ContactFields, v: string) => {
    setFields((f) => ({ ...f, [k]: v }));
    if (touched[k]) setErrors((e) => ({ ...e, [k]: validateField(k, v, mode) }));
  };

  const blur = (k: keyof ContactFields) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors((e) => ({ ...e, [k]: validateField(k, fields[k] ?? "", mode) }));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    // Honeypot: bots fill this hidden field → pretend success, send nothing.
    if (honeypot.current?.value) {
      setStatus("success");
      return;
    }

    const v = validateForm(fields, mode);
    setErrors(v);
    setTouched({ name: true, address: true, contact: true });
    if (Object.keys(v).length > 0) {
      const first = formRef.current?.querySelector<HTMLElement>("[data-invalid='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      first?.focus();
      return;
    }

    setStatus("loading");
    
    let finalMessage = fields.message;
    if (mode === "join") {
      finalMessage = [
        fields.education ? `Educational Background: ${fields.education}` : "",
        fields.driversLicense ? `Drivers license and car: ${fields.driversLicense}` : "",
        fields.lookingFor ? `Looking For: ${fields.lookingFor}` : "",
        fields.startNextWeek ? `Start Next Week: ${fields.startNextWeek}` : "",
        fields.sales ? `Open to Sales: ${fields.sales}` : "",
        fields.rejection ? `Handle Rejection: ${fields.rejection}` : "",
        fields.personality ? `Personality: ${fields.personality}` : "",
        fields.referredBy ? `Referred By: ${fields.referredBy}` : "",
        fields.heardAbout ? `Heard About Us: ${fields.heardAbout}` : "",
        fields.message ? `\nAdditional Note:\n${fields.message}` : ""
      ].filter(Boolean).join("\n");
    }

    const payload = { ...fields, message: finalMessage };
    const ok = await sendLead(payload);
    setStatus(ok ? "success" : "error");
  }

  if (status === "success") {
    const tel = telHref();
    return (
      <div style={{ textAlign: "center", padding: "30px 10px" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--accent)", color: "var(--on-accent)", display: "grid", placeItems: "center", margin: "0 auto 18px" }}>
          {Icon.check({ s: 28 })}
        </div>
        <h3 className="display" style={{ fontSize: "1.7rem", fontWeight: 800 }}>{contact.success.heading}</h3>
        <p className="body-p" style={{ margin: "12px auto 22px" }}>
          {contact.success.subPrefix}
          {tel ? <a className="tlink" href={tel}>{business.phone}</a> : <span style={{ fontWeight: 600 }}>{business.phone}</span>}
        </p>
        <Button kind="ghost" onClick={() => { setStatus("idle"); setFields(EMPTY); setTouched({}); }}>Send another</Button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={submit} noValidate>
      <div style={{ display: "flex", gap: "16px", marginBottom: "24px", justifyContent: "center" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: 600 }}>
          <input type="radio" name="formMode" checked={mode === "contact"} onChange={() => { setMode("contact"); setErrors({}); setTouched({}); }} />
          Get a Quote
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: 600 }}>
          <input type="radio" name="formMode" checked={mode === "join"} onChange={() => { setMode("join"); setErrors({}); setTouched({}); }} />
          Join the Team
        </label>
      </div>

      <Field id="name" label={contact.labels.name} error={touched.name ? errors.name : undefined}>
        <input
          id="name" name="name" type="text" autoComplete="name" placeholder="First and last"
          value={fields.name} onChange={(e) => set("name", e.target.value)} onBlur={() => blur("name")}
          data-invalid={!!(touched.name && errors.name)}
          className={"input" + (touched.name && errors.name ? " err" : "")}
        />
      </Field>

      <Field id="address" label={mode === "join" ? "Your city or neighborhood" : contact.labels.address} error={touched.address ? errors.address : undefined}>
        <input
          id="address" name="address" type="text" autoComplete="street-address" placeholder={mode === "join" ? "e.g. Beaverton, OR" : "Street, city, OR"}
          value={fields.address} onChange={(e) => set("address", e.target.value)} onBlur={() => blur("address")}
          data-invalid={!!(touched.address && errors.address)}
          className={"input" + (touched.address && errors.address ? " err" : "")}
        />
      </Field>

      <Field id="contact" label={contact.labels.contact} error={touched.contact ? errors.contact : undefined}>
        <input
          id="contact" name="contact" type="text" autoComplete="email" placeholder="So Curb'n IT can get back to you"
          value={fields.contact} onChange={(e) => set("contact", e.target.value)} onBlur={() => blur("contact")}
          data-invalid={!!(touched.contact && errors.contact)}
          className={"input" + (touched.contact && errors.contact ? " err" : "")}
        />
      </Field>

      {mode === "join" && (
        <>
          <Field id="education" label="Educational Background">
            <select id="education" name="education" value={fields.education} onChange={(e) => set("education", e.target.value)} className="input" style={{ appearance: "auto" }}>
              <option value="">Select...</option>
              <option value="Graduated High School">Graduated High School</option>
              <option value="Some College">Some College</option>
              <option value="College Student">College Student</option>
              <option value="College Graduate">College Graduate</option>
              <option value="Other">Other</option>
            </select>
          </Field>

          <Field id="driversLicense" label="Do you have a drivers license and a car?">
            <div style={{ display: "flex", gap: "16px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}><input type="radio" name="driversLicense" checked={fields.driversLicense === "YES"} onChange={() => set("driversLicense", "YES")} /> YES</label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}><input type="radio" name="driversLicense" checked={fields.driversLicense === "NO"} onChange={() => set("driversLicense", "NO")} /> NO</label>
            </div>
          </Field>

          <Field id="lookingFor" label="Looking For">
            <select id="lookingFor" name="lookingFor" value={fields.lookingFor} onChange={(e) => set("lookingFor", e.target.value)} className="input" style={{ appearance: "auto" }}>
              <option value="">Select...</option>
              <option value="Part Time Work">Part Time Work</option>
              <option value="Full Time Work">Full Time Work</option>
              <option value="Either">Either</option>
            </select>
          </Field>

          <Field id="startNextWeek" label="Are you available to start next week?">
            <div style={{ display: "flex", gap: "16px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}><input type="radio" name="startNextWeek" checked={fields.startNextWeek === "YES"} onChange={() => set("startNextWeek", "YES")} /> YES</label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}><input type="radio" name="startNextWeek" checked={fields.startNextWeek === "NO"} onChange={() => set("startNextWeek", "NO")} /> NO</label>
            </div>
          </Field>

          <Field id="sales" label="Are you open to doing sales?">
            <div style={{ display: "flex", gap: "16px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}><input type="radio" name="sales" checked={fields.sales === "YES"} onChange={() => set("sales", "YES")} /> YES</label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}><input type="radio" name="sales" checked={fields.sales === "NO"} onChange={() => set("sales", "NO")} /> NO</label>
            </div>
          </Field>

          <Field id="rejection" label="How do you handle rejection?">
            <select id="rejection" name="rejection" value={fields.rejection} onChange={(e) => set("rejection", e.target.value)} className="input" style={{ appearance: "auto" }}>
              <option value="">Select...</option>
              <option value="Very well">Very well</option>
              <option value="Well">Well</option>
              <option value="Neutral">Neutral</option>
              <option value="Not well">Not well</option>
              <option value="Hate it">Hate it</option>
            </select>
          </Field>

          <Field id="personality" label="Are you introverted or extroverted?">
            <div style={{ display: "flex", gap: "16px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}><input type="radio" name="personality" checked={fields.personality === "Introverted"} onChange={() => set("personality", "Introverted")} /> Introverted</label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}><input type="radio" name="personality" checked={fields.personality === "Extroverted"} onChange={() => set("personality", "Extroverted")} /> Extroverted</label>
            </div>
          </Field>

          <Field id="referredBy" label="Who referred you?">
            <input id="referredBy" name="referredBy" type="text" placeholder="Name of referrer" value={fields.referredBy} onChange={(e) => set("referredBy", e.target.value)} className="input" />
          </Field>

          <Field id="heardAbout" label="How did you hear about us?">
            <input id="heardAbout" name="heardAbout" type="text" placeholder="e.g. Facebook, Indeed, Friend" value={fields.heardAbout} onChange={(e) => set("heardAbout", e.target.value)} className="input" />
          </Field>
        </>
      )}

      <Field id="message" label={mode === "join" ? "Why do you want to join?" : contact.labels.message}>
        <textarea
          id="message" name="message" rows={4} placeholder={mode === "join" ? "Tell us a bit about yourself and why you'd be a great fit." : "Reflective vs standard, multiple houses, timing…"}
          value={fields.message} onChange={(e) => set("message", e.target.value)}
          className="textarea"
        />
      </Field>

      {/* Honeypot (hidden from humans) */}
      <input ref={honeypot} type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden style={{ position: "absolute", left: "-9999px", height: 0, width: 0, opacity: 0 }} />

      <Button kind="primary" size="lg" block arrow type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : (mode === "join" ? "Submit Application" : contact.labels.submit)}
      </Button>

      {status === "error" && (
        <p className="err-msg" style={{ textAlign: "center", marginTop: 12 }}>
          Something went wrong. Try again, or text Curb&apos;n IT directly at {business.phone}.
        </p>
      )}
      <p className="muted" style={{ textAlign: "center", fontSize: "0.85rem", marginTop: 12, marginBottom: 0 }}>{contact.labels.helper}</p>
    </form>
  );
}

/* ── transport ─────────────────────────────────────────── */
async function post(url: string, payload: object): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function sendLead(payload: ContactFields): Promise<boolean> {
  // In dev there is no backend runtime → simulate success so the UI is testable.
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.info("[dev] lead (not actually sent):", payload);
    await new Promise((r) => setTimeout(r, 600));
    return true;
  }

  const { mode, phpEndpoint, formspreeEndpoint, web3formsEndpoint, web3formsKey } = formConfig;

  // Web3Forms: no backend needed. Leads arrive in the inbox tied to the key.
  if (mode === "web3forms" && web3formsKey) {
    return post(web3formsEndpoint, {
      ...payload,
      access_key: web3formsKey,
      subject: "New Curb'n IT website lead",
      from_name: "Curb'n IT Website",
    });
  }

  const primary = mode === "formspree" && formspreeEndpoint ? formspreeEndpoint : phpEndpoint;
  if (await post(primary, payload)) return true;

  // Fallback to the other transport if configured.
  const fallback = primary === phpEndpoint ? formspreeEndpoint : phpEndpoint;
  if (fallback && (await post(fallback, payload))) return true;
  return false;
}

/* ── presentational helpers ───────────────────────────── */
function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <span className="err-msg">{error}</span>}
    </div>
  );
}
