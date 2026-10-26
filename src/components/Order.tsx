"use client";

import { useState } from "react";
import { contacts, order, orderTypes } from "@/content/site";
import { composeMessage, copyText, messengerLink, messengers, phoneLink, type Messenger, type OrderDraft } from "@/lib/message";
import { reachGoal } from "@/lib/metrika";
import { MessengerIcon } from "./MessengerIcon";
import { NicheDrawing } from "./NicheDrawing";
import { SectionTitle } from "./SectionTitle";
import styles from "./Order.module.css";

const empty: OrderDraft = { type: "Шкаф-купе", width: "", height: "", place: "", name: "" };

export function Order() {
  const [draft, setDraft] = useState<OrderDraft>(empty);
  const [status, setStatus] = useState("");
  const message = composeMessage(draft);

  const update = (field: keyof OrderDraft) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === "width" || field === "height" ? event.target.value.replace(/\D/g, "").slice(0, 5) : event.target.value;
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const send = async (messenger: Messenger) => {
    reachGoal(`order_${messenger}`);
    const copied = await copyText(message);
    if (messenger === "max") setStatus(`${copied ? order.copied : ""} ${order.maxHint}`.trim());
    else if (messenger === "whatsapp") setStatus("");
    else if (copied) setStatus(order.copied);
  };

  return (
    <section id="order" className={styles.section} aria-labelledby="order-title">
      <div className={styles.intro}>
        <SectionTitle id="order-title">{order.title}</SectionTitle>
        <p className={styles.text} data-reveal style={{ "--i": 1 } as React.CSSProperties}>
          {order.text}
        </p>
        <div className={styles.drawing} data-reveal-media style={{ "--i": 2 } as React.CSSProperties}>
          <NicheDrawing type={draft.type} width={draft.width} height={draft.height} />
        </div>
      </div>

      <form className={styles.form} onSubmit={(event) => event.preventDefault()} data-reveal-media style={{ "--i": 1 } as React.CSSProperties}>
        <fieldset className={styles.types}>
          <legend className={styles.label}>{order.fields.type}</legend>
          <div className={styles.chips}>
            {orderTypes.map((type) => (
              <label key={type} className={styles.chip}>
                <input
                  type="radio"
                  name="type"
                  value={type}
                  checked={draft.type === type}
                  onChange={() => setDraft((current) => ({ ...current, type }))}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className={styles.pair}>
          <label className={styles.field}>
            <span className={styles.label}>{order.fields.width}</span>
            <input inputMode="numeric" autoComplete="off" placeholder={order.placeholders.width} value={draft.width} onChange={update("width")} />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>{order.fields.height}</span>
            <input inputMode="numeric" autoComplete="off" placeholder={order.placeholders.height} value={draft.height} onChange={update("height")} />
          </label>
        </div>

        <div className={styles.pair}>
          <label className={styles.field}>
            <span className={styles.label}>{order.fields.place}</span>
            <input autoComplete="address-level2" placeholder={order.placeholders.place} value={draft.place} onChange={update("place")} />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>{order.fields.name}</span>
            <input autoComplete="given-name" placeholder={order.placeholders.name} value={draft.name} onChange={update("name")} />
          </label>
        </div>

        <div className={styles.send}>
          <span className={styles.label}>{order.send}</span>
          <div className={styles.messengers}>
            {messengers.map(({ id, label }) => (
              <a
                key={id}
                className={styles.messenger}
                href={messengerLink(id, message)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => send(id)}
              >
                <span className={styles.icon}>
                  <MessengerIcon name={id} />
                </span>
                <span className={styles.name}>
                  {label}
                  <small>{order.openChat}</small>
                </span>
                <svg className={styles.arrow} viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
                </svg>
              </a>
            ))}
            <a className={`${styles.messenger} ${styles.phone}`} href={phoneLink} data-goal="phone">
              <span className={styles.icon}>
                <MessengerIcon name="phone" />
              </span>
              <span className={styles.name}>
                {contacts.phoneLabel}
                <small>
                  {order.call}, {contacts.hours.toLowerCase()}
                </small>
              </span>
              <svg className={styles.arrow} viewBox="0 0 16 16" aria-hidden="true">
                <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
              </svg>
            </a>
          </div>
          <p className={styles.status} aria-live="polite">
            {status}
          </p>
        </div>
      </form>
    </section>
  );
}
