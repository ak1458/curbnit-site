"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ai, flags, form } from "@/lib/config";
import { matchFaq, isQuoteIntent } from "@/lib/faq";
import { Icon } from "./Icon";

type Msg = { role: "bot" | "user"; text: string; cta?: boolean };

const GREETING =
  "Hey — I'm the Curb'n IT assistant. Ask me about pricing, areas, or how curb painting works.";

const SUGGESTIONS = ["Get a quote", "How much does it cost?", "What's reflective?", "Do you cover my area?"];

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "bot", text: GREETING }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, loading, open]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const seen = localStorage.getItem("ai_first_visit");
      if (!seen) {
        const timer = setTimeout(() => {
          setOpen(true);
          localStorage.setItem("ai_first_visit", "1");
        }, 2500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  if (!flags.showChat) return null;

  async function respond(question: string) {
    const quote = isQuoteIntent(question);

    // If no AI key, fallback to local FAQ matching
    if (!ai.hasKey) {
      const faq = matchFaq(question);
      if (faq) {
        pushBot(faq, quote);
        return;
      }
      pushBot(
        "I don't have that one handy — Curb'n IT can answer for sure. Send it through the contact form and you'll get a text back, usually within a few hours.",
        true,
      );
      return;
    }

    // 3) Live provider call (client-side; key from env)
    setLoading(true);
    try {
      const history = messages
        .filter((m) => !m.cta)
        .map((m) => ({ role: m.role === "bot" ? "assistant" : "user", content: m.text }));

      const res = await fetch(ai.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ai.apiKey}`,
        },
        body: JSON.stringify({
          model: ai.model,
          max_tokens: ai.maxTokens,
          temperature: ai.temperature,
          messages: [
            { role: "system", content: ai.systemPrompt },
            ...history,
            { role: "user", content: question },
          ],
        }),
      });
      const data = await res.json();
      let reply = data?.choices?.[0]?.message?.content?.trim() || "";
      
      if (reply.includes("[ACTION: SUBMIT]")) {
        reply = reply.replace("[ACTION: SUBMIT]", "").trim();
        pushBot(reply || "Got it! I've sent your details to Jimmy. He'll reach out shortly.", false);
        
        const transcript = [...history, { role: "user", content: question }].map(m => `${m.role === "assistant" ? "AI" : "User"}: ${m.content}`).join("\n");
        const lead = { name: "AI Lead Capture", address: "See Chat", contact: "See Chat", message: "--- AI CHAT TRANSCRIPT ---\n\n" + transcript };
        const useWeb3 = form.mode === "web3forms" && form.web3formsKey;
        const leadUrl = useWeb3 ? form.web3formsEndpoint : form.phpEndpoint;
        const leadBody = useWeb3
          ? { ...lead, access_key: form.web3formsKey, subject: "New Curb'n IT chat lead", from_name: "Curb'n IT Chatbot" }
          : lead;
        fetch(leadUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(leadBody)
        }).catch(console.error);
        return;
      }

      pushBot(reply || "I'll have Curb'n IT reach out on that one.", quote || !reply);
    } catch {
      pushBot("Something glitched on my end. Use the contact form and Curb'n IT will get right back to you.", true);
    } finally {
      setLoading(false);
    }
  }

  function pushBot(text: string, cta = false) {
    setMessages((prev) => [...prev, { role: "bot", text }, ...(cta ? [{ role: "bot" as const, text: "", cta: true }] : [])]);
  }

  function send(q?: string) {
    const question = (q ?? input).trim();
    if (!question || loading) return;
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    if (taRef.current) taRef.current.style.height = "auto";
    void respond(question);
  }

  return (
    <>
      {!open && (
        <button className="ai-fab" onClick={() => setOpen(true)} aria-label="Open the Curb'n IT assistant">
          <span className="ai-fab__pulse">{Icon.chat({ s: 20 })}</span>
          <span className="ai-fab__txt">
            <b>Ask the assistant</b>
            <span>Quotes · FAQs · 24/7</span>
          </span>
        </button>
      )}

      {open && (
        <div className="ai-panel" role="dialog" aria-label="Curb'n IT assistant">
          <div className="ai-head">
            <div className="ai-head__av">IT</div>
            <div className="ai-head__t">
              <b>Curb&apos;n IT Assistant</b>
              <span>{ai.hasKey ? "Online · answers instantly" : "FAQ answers · we reply personally"}</span>
            </div>
            <button className="ai-x" onClick={() => setOpen(false)} aria-label="Close">{Icon.x({})}</button>
          </div>

          <div className="ai-body" ref={bodyRef}>
            {messages.map((m, i) =>
              m.cta ? (
                <Link
                  key={i}
                  href="/contact/"
                  onClick={() => setOpen(false)}
                  className="btn btn--primary btn--sm"
                  style={{ alignSelf: "flex-start" }}
                >
                  Get a quote from Curb&apos;n IT {Icon.arrow({ s: 15 })}
                </Link>
              ) : (
                <div key={i} className={"ai-msg " + (m.role === "user" ? "me" : "bot")}>
                  <div className="ai-msg__b">{m.text}</div>
                </div>
              ),
            )}
            {loading && (
              <div className="ai-msg bot">
                <div className="ai-msg__b" style={{ padding: 0 }}>
                  <span className="ai-typing"><i /><i /><i /></span>
                </div>
              </div>
            )}
          </div>

          <div className="ai-foot">
            <textarea
              ref={taRef}
              rows={1}
              value={input}
              placeholder="Ask anything…"
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 90) + "px";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
            />
            <button className="ai-send" disabled={!input.trim() || loading} onClick={() => send()} aria-label="Send">
              {Icon.send({ s: 18 })}
            </button>
          </div>
          <div className="ai-note">
            AI assistant · By interacting or submitting your details, you agree to our <Link href="/terms" style={{textDecoration: "underline"}}>Terms</Link> & <Link href="/privacy" style={{textDecoration: "underline"}}>Privacy Policy</Link> and consent to receive text messages regarding your quote.
          </div>
        </div>
      )}
    </>
  );
}
