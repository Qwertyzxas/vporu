import { contacts } from "@/content/site";

export type OrderDraft = {
  type: string;
  width: string;
  height: string;
  place: string;
  name: string;
};

export type Messenger = "whatsapp" | "telegram" | "max" | "vk";

export function composeMessage(draft: OrderDraft) {
  const size = [draft.width, draft.height].filter(Boolean).join(" × ");
  const lines = [
    `Здравствуйте, ${contacts.name.split(" ")[0]}! Заявка с сайта «Впору».`,
    draft.type && `Что нужно: ${draft.type}`,
    size && `Размеры: ${size} мм`,
    draft.place && `Где: ${draft.place}`,
    draft.name && `Имя: ${draft.name}`,
  ];
  return lines.filter(Boolean).join("\n");
}

export function messengerLink(messenger: Messenger, text = "") {
  const encoded = encodeURIComponent(text);
  switch (messenger) {
    case "whatsapp":
      return `https://wa.me/${contacts.whatsapp}${text ? `?text=${encoded}` : ""}`;
    case "telegram":
      return `https://t.me/${contacts.telegram}${text ? `?text=${encoded}` : ""}`;
    case "vk":
      return `https://vk.me/${contacts.vk}`;
    case "max":
      return contacts.maxUrl;
  }
}

export const messengers: { id: Messenger; label: string }[] = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "telegram", label: "Telegram" },
  { id: "max", label: "MAX" },
  { id: "vk", label: "ВКонтакте" },
];

export const phoneLink = `tel:${contacts.phone}`;

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
