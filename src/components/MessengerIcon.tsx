import type { Messenger } from "@/lib/message";

const colors: Record<Messenger | "phone", string> = {
  whatsapp: "#25d366",
  telegram: "#2aabee",
  max: "#7a5cff",
  vk: "#0077ff",
  phone: "#bda38b",
};

function Glyph({ name }: { name: Messenger | "phone" }) {
  switch (name) {
    case "whatsapp":
      return (
        <path
          fill="#fff"
          d="M16.6 14.2c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.8-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.9-2.1-.2-.5-.5-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.3.3-1 .9-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 4.9 4.3 2.4 1 2.9.8 3.4.7.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z"
        />
      );
    case "telegram":
      return (
        <path
          fill="#fff"
          d="M5.4 11.6 17 7.1c.5-.2 1 .1.8 1l-2 9.3c-.1.6-.6.8-1.1.5l-3-2.2-1.5 1.4c-.2.2-.3.3-.6.3l.2-3.1 5.6-5c.2-.2 0-.3-.3-.1l-6.9 4.3-3-.9c-.6-.2-.6-.6.2-.9z"
        />
      );
    case "vk":
      return (
        <path
          fill="#fff"
          d="M12.8 16.5c-4.4 0-6.9-3-7-8h2.2c.1 3.7 1.7 5.2 3 5.5V8.5h2.1v3.2c1.3-.1 2.6-1.6 3.1-3.2h2.1c-.4 2-1.8 3.5-2.9 4.1 1 .5 2.6 1.8 3.3 3.9h-2.3c-.5-1.5-1.7-2.6-3.3-2.8v2.8h-.3z"
        />
      );
    case "max":
      return (
        <path
          fill="#fff"
          d="M6.5 16.5v-9h2.1l3.4 4.6 3.4-4.6h2.1v9h-2.2v-5.6L12 15.2l-3.3-4.3v5.6z"
        />
      );
    case "phone":
      return (
        <path
          fill="#1c150d"
          d="M8.6 5.5c.4 0 .7.2.9.6l1.1 2.6c.2.4.1.8-.2 1.1l-1.2 1.1c.8 1.6 2 2.8 3.6 3.6l1.1-1.2c.3-.3.7-.4 1.1-.2l2.6 1.1c.4.2.6.5.6.9v2.1c0 .7-.6 1.3-1.3 1.3C10.7 18.5 5.5 13.3 5.5 6.8c0-.7.6-1.3 1.3-1.3z"
        />
      );
  }
}

export function MessengerIcon({ name }: { name: Messenger | "phone" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill={colors[name]} />
      <Glyph name={name} />
    </svg>
  );
}
