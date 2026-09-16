"use client";

import { useEffect, useId, useRef, useState } from "react";

import { Button, ButtonAnchor } from "@/components/ui/Button";
import { CopyIcon, InstagramIcon } from "@/components/ui/icons";
import { site } from "@/content/site";
import { event as analytics } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { format } from "@/lib/i18n/format";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";

type NeedKey = "new" | "redesign" | "unsure";
type GoalKey = "contact" | "services" | "appointment" | "work";

const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/[^\s]*)?$/i;

/**
 * Prepares a message the visitor sends themselves on Instagram.
 *
 * It never claims to send anything: there is no backend, no email service and
 * no secret key involved. Copying is copying — the step list says so, the note
 * under the buttons says so, and the event it reports is `copy_message`, never
 * `lead_submit`. What gets reported is the two fixed choices and a length
 * bucket; the message itself, and anything the visitor typed into it, stays in
 * the browser.
 */
export function BriefBuilder({
  locale,
  dict,
  tone = "light",
}: {
  locale: Locale;
  dict: Dictionary;
  tone?: "light" | "dark";
}) {
  const uid = useId().replace(/[:]/g, "");
  const b = dict.brief;

  const [business, setBusiness] = useState("");
  const [need, setNeed] = useState<NeedKey | null>(null);
  const [goal, setGoal] = useState<GoalKey | null>(null);
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [edited, setEdited] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const startedRef = useRef(false);

  /** One `contact_start` per visit, on the first answer of any kind. */
  const noteStart = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    analytics("contact_start", { locale });
  };

  const businessRef = useRef<HTMLInputElement>(null);
  const needRef = useRef<HTMLInputElement>(null);
  const goalRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const complete = business.trim().length > 0 && need !== null && goal !== null;

  const composed = complete
    ? [
        b.messageGreeting,
        "",
        format(b.messageBusiness, { business: business.trim() }),
        format(b.messageNeed, { need: b.needText[need] }),
        url.trim() ? format(b.messageUrl, { url: url.trim() }) : null,
        format(b.messageGoal, { goal: b.goalText[goal] }),
        "",
        b.messageClosing,
      ]
        .filter((line) => line !== null)
        .join("\n")
    : "";

  // Regenerate while the visitor is still answering. Once they edit the text
  // themselves their wording wins and is never overwritten — but then the
  // preview has stopped following the answers, so say so and offer the way
  // back rather than letting it drift silently.
  const shownMessage = edited ? message : composed;
  const stale = edited && composed.length > 0 && composed !== message;

  useEffect(() => {
    if (copyState === "idle") return;
    const timer = window.setTimeout(() => setCopyState("idle"), 6000);
    return () => window.clearTimeout(timer);
  }, [copyState]);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!business.trim()) next.business = b.errors.q1;
    if (!need) next.need = b.errors.q2;
    if (!goal) next.goal = b.errors.q3;
    if (url.trim() && !urlPattern.test(url.trim())) next.url = b.errors.url;
    setErrors(next);

    if (next.business) businessRef.current?.focus();
    else if (next.need) needRef.current?.focus();
    else if (next.goal) goalRef.current?.focus();

    return Object.keys(next).length === 0;
  };

  /** Two fixed choices and a size bucket. Never the message. */
  const reportCopy = () => {
    analytics("copy_message", {
      locale,
      need: need ?? "unset",
      goal: goal ?? "unset",
      length: shownMessage.length > 400 ? "long" : "short",
    });
  };

  const handleCopy = async () => {
    if (!validate()) return;
    const text = shownMessage;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopyState("copied");
        reportCopy();
        return;
      }
      throw new Error("clipboard unavailable");
    } catch {
      // Fallback for browsers or contexts where the async API is blocked.
      const node = messageRef.current;
      if (node) {
        node.focus();
        node.select();
        try {
          const ok = document.execCommand("copy");
          if (ok) {
            setCopyState("copied");
            reportCopy();
            return;
          }
        } catch {
          /* falls through to the manual instruction below */
        }
      }
      setCopyState("failed");
    }
  };

  const reset = () => {
    setBusiness("");
    setNeed(null);
    setGoal(null);
    setUrl("");
    setMessage("");
    setEdited(false);
    setErrors({});
    setCopyState("idle");
    startedRef.current = false;
    businessRef.current?.focus();
  };

  const dark = tone === "dark";
  const fieldClass = cn(
    "w-full rounded-xl border px-4 py-3 text-base transition-colors",
    dark
      ? "border-mist/30 bg-ink/40 text-paper placeholder:text-mist/70 focus:border-lime"
      : "border-line-light bg-white text-ink placeholder:text-slate/70 focus:border-forest",
  );
  const labelClass = cn("block text-sm font-semibold", dark ? "text-paper" : "text-ink");
  const helpClass = cn("mt-1.5 text-sm", dark ? "text-mist" : "text-slate");
  const errorClass = "mt-1.5 text-sm font-medium text-[#c0392b]";
  const errorClassDark = "mt-1.5 text-sm font-medium text-[#ffb4a2]";

  const optionClass = (active: boolean) =>
    cn(
      "flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-[0.9375rem] transition-colors",
      "peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3",
      dark
        ? active
          ? "border-lime bg-lime/12 text-paper peer-focus-visible:outline-lime"
          : "border-mist/25 text-mist hover:border-mist/60 peer-focus-visible:outline-lime"
        : active
          ? "border-forest bg-forest/6 text-ink peer-focus-visible:outline-forest"
          : "border-line-light text-slate hover:border-forest/50 peer-focus-visible:outline-forest",
    );

  const dot = (active: boolean) =>
    cn(
      "size-3.5 shrink-0 rounded-full border",
      active
        ? dark
          ? "border-lime bg-lime"
          : "border-forest bg-forest"
        : dark
          ? "border-mist/50"
          : "border-slate/50",
    );

  return (
    <div className={cn(dark && "on-dark")}>
      {/* The route, stated before the form rather than discovered after it.
          Step 3 is a link out, not a send: nothing on this page can deliver a
          message, and the list is written so that is obvious from the start. */}
      <ol
        aria-label={b.stepsLabel}
        className={cn(
          "grid gap-px overflow-hidden rounded-2xl sm:grid-cols-3",
          dark ? "bg-mist/20" : "bg-line-light",
        )}
      >
        {[
          { n: 1, title: b.step1, body: b.step1Body, done: complete },
          { n: 2, title: b.step2, body: b.step2Body, done: copyState === "copied" },
          { n: 3, title: b.step3, body: b.step3Body, done: false },
        ].map((step) => (
          <li key={step.n} className={cn("p-4 sm:p-5", dark ? "bg-ink" : "bg-paper")}>
            <p className="flex items-center gap-2.5">
              <span
                className={cn(
                  "inline-flex size-6 shrink-0 items-center justify-center rounded-full text-[0.8125rem] font-bold",
                  step.done
                    ? dark
                      ? "bg-lime text-ink"
                      : "bg-forest text-paper"
                    : dark
                      ? "border border-mist/40 text-mist"
                      : "border border-slate/40 text-slate",
                )}
              >
                {step.n}
              </span>
              <span className={cn("font-semibold", dark ? "text-paper" : "text-ink")}>{step.title}</span>
              {step.done && (
                <span className={cn("text-[0.8125rem] font-semibold", dark ? "text-lime" : "text-forest")}>
                  {b.stepDone}
                </span>
              )}
            </p>
            <p className={cn("mt-2 text-sm leading-relaxed", dark ? "text-mist" : "text-slate")}>{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="space-y-7">
        {/* 1 — what do you do */}
        <div>
          <label htmlFor={`${uid}-business`} className={labelClass}>
            <span className={cn("mr-2", dark ? "text-lime" : "text-forest")}>01</span>
            {b.q1Label}
          </label>
          <input
            ref={businessRef}
            id={`${uid}-business`}
            type="text"
            value={business}
            onChange={(event) => {
              setBusiness(event.target.value);
              setErrors((current) => ({ ...current, business: "" }));
              noteStart();
            }}
            placeholder={b.q1Placeholder}
            aria-describedby={`${uid}-business-help`}
            aria-invalid={errors.business ? true : undefined}
            className={cn(fieldClass, "mt-2.5")}
          />
          <p id={`${uid}-business-help`} className={helpClass}>
            {b.q1Help}
          </p>
          {errors.business && <p className={dark ? errorClassDark : errorClass}>{errors.business}</p>}
        </div>

        {/* 2 — new or redesign */}
        <fieldset>
          <legend className={labelClass}>
            <span className={cn("mr-2", dark ? "text-lime" : "text-forest")}>02</span>
            {b.q2Label}
          </legend>
          <div className="mt-2.5 grid gap-2 sm:grid-cols-3">
            {(Object.keys(b.q2Options) as NeedKey[]).map((key, index) => {
              const id = `${uid}-need-${key}`;
              const active = need === key;
              return (
                <div key={key}>
                  <input
                    ref={index === 0 ? needRef : undefined}
                    type="radio"
                    id={id}
                    name={`${uid}-need`}
                    checked={active}
                    onChange={() => {
                      setNeed(key);
                      noteStart();
                      setErrors((current) => ({ ...current, need: "" }));
                    }}
                    className="peer sr-only"
                  />
                  <label htmlFor={id} className={optionClass(active)}>
                    <span aria-hidden="true" className={dot(active)} />
                    {b.q2Options[key]}
                  </label>
                </div>
              );
            })}
          </div>
          {errors.need && <p className={dark ? errorClassDark : errorClass}>{errors.need}</p>}
        </fieldset>

        {/* 3 — what should the visitor do */}
        <fieldset>
          <legend className={labelClass}>
            <span className={cn("mr-2", dark ? "text-lime" : "text-forest")}>03</span>
            {b.q3Label}
          </legend>
          <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
            {(Object.keys(b.q3Options) as GoalKey[]).map((key, index) => {
              const id = `${uid}-goal-${key}`;
              const active = goal === key;
              return (
                <div key={key}>
                  <input
                    ref={index === 0 ? goalRef : undefined}
                    type="radio"
                    id={id}
                    name={`${uid}-goal`}
                    checked={active}
                    onChange={() => {
                      setGoal(key);
                      noteStart();
                      setErrors((current) => ({ ...current, goal: "" }));
                    }}
                    className="peer sr-only"
                  />
                  <label htmlFor={id} className={optionClass(active)}>
                    <span aria-hidden="true" className={dot(active)} />
                    {b.q3Options[key]}
                  </label>
                </div>
              );
            })}
          </div>
          {errors.goal && <p className={dark ? errorClassDark : errorClass}>{errors.goal}</p>}
        </fieldset>

        {/* optional url */}
        <div>
          <label htmlFor={`${uid}-url`} className={labelClass}>
            {b.urlLabel}{" "}
            <span className={cn("font-normal", dark ? "text-mist" : "text-slate")}>({dict.common.optional})</span>
          </label>
          <input
            id={`${uid}-url`}
            type="text"
            inputMode="url"
            value={url}
            onChange={(event) => {
              setUrl(event.target.value);
              setErrors((current) => ({ ...current, url: "" }));
            }}
            placeholder={b.urlPlaceholder}
            aria-describedby={`${uid}-url-help`}
            aria-invalid={errors.url ? true : undefined}
            className={cn(fieldClass, "mt-2.5")}
          />
          <p id={`${uid}-url-help`} className={helpClass}>
            {b.urlHelp}
          </p>
          {errors.url && <p className={dark ? errorClassDark : errorClass}>{errors.url}</p>}
        </div>
      </div>

      {/* Preview + actions */}
      <div>
        <label htmlFor={`${uid}-message`} className={labelClass}>
          {b.messageLabel}
        </label>
        <p className={helpClass}>{b.messageHint}</p>
        <textarea
          ref={messageRef}
          id={`${uid}-message`}
          value={shownMessage}
          onChange={(event) => {
            setMessage(event.target.value);
            setEdited(true);
          }}
          rows={10}
          placeholder={complete ? undefined : b.lead}
          className={cn(fieldClass, "mt-3 min-h-60 resize-y leading-relaxed")}
        />

        {stale && (
          <div
            className={cn(
              "mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl px-4 py-3 text-[0.9375rem]",
              dark ? "bg-lime/12 text-paper" : "bg-paper-dim text-ink",
            )}
          >
            <span>{b.editedNotice}</span>
            <button
              type="button"
              onClick={() => {
                setEdited(false);
                setMessage(composed);
              }}
              className={cn(
                "min-h-9 font-semibold underline underline-offset-4",
                dark ? "text-lime" : "text-forest",
              )}
            >
              {b.regenerate}
            </button>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-3">
          <Button onClick={handleCopy} tone={tone} className="gap-2">
            <CopyIcon className="size-5" />
            {copyState === "copied" ? b.copied : b.copy}
          </Button>
          <ButtonAnchor
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            tone={tone}
            withArrow={false}
            onClick={() => analytics("outbound_instagram", { locale, from: "brief" })}
            className="gap-2"
          >
            <InstagramIcon className="size-5" />
            {b.openInstagram}
          </ButtonAnchor>
          <Button variant="quiet" tone={tone} onClick={reset} className="px-2">
            {b.reset}
          </Button>
        </div>

        {/* Opening Instagram with nothing on the clipboard leaves the visitor
            in a chat with nothing to paste, so say which order works. */}
        {complete && copyState !== "copied" && (
          <p className={cn("mt-3 text-body leading-relaxed", dark ? "text-mist" : "text-slate")}>{b.copyFirst}</p>
        )}

        <p aria-live="polite" className="sr-only">
          {copyState === "copied" ? b.copied : copyState === "failed" ? b.copyFailed : ""}
        </p>

        {copyState === "failed" && (
          <div
            className={cn(
              "mt-4 rounded-xl border p-4 text-sm",
              dark ? "border-[#ffb4a2]/50 text-[#ffd9cf]" : "border-[#c0392b]/40 text-[#8c2a1e]",
            )}
          >
            <p>{b.copyFailed}</p>
            <Button
              variant="secondary"
              tone={tone}
              onClick={() => {
                messageRef.current?.focus();
                messageRef.current?.select();
              }}
              className="mt-3 px-4 py-2 text-sm"
            >
              {b.selectAll}
            </Button>
          </div>
        )}

        <p className={cn("mt-5 text-body leading-relaxed", dark ? "text-mist" : "text-slate")}>{b.sendNote}</p>
        <p
          className={cn(
            "mt-2 rounded-xl px-4 py-3 text-body leading-relaxed",
            dark ? "bg-lime/12 text-paper" : "bg-paper-dim text-ink",
          )}
        >
          {b.notSentWarning}
        </p>
      </div>
      </div>
    </div>
  );
}
