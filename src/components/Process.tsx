import { process } from "@/content/site";
import { pictures } from "@/content/media";
import { asset } from "@/lib/asset";
import { AssemblyDrawing, ChatDrawing, ContractDrawing, TapeDrawing } from "./drawings";
import { SectionTitle } from "./SectionTitle";
import styles from "./Process.module.css";

const photos = {
  samples: pictures.woodSamples,
  planks: pictures.planks,
} as const;

function StepPicture({ name, title }: { name: string; title: string }) {
  if (name in photos) {
    const photo = photos[name as keyof typeof photos];
    return <img src={asset(photo.src)} width={photo.width} height={photo.height} alt={photo.alt} loading="lazy" />;
  }
  switch (name) {
    case "chat":
      return <ChatDrawing title={title} />;
    case "tape":
      return <TapeDrawing title={title} />;
    case "contract":
      return <ContractDrawing title={title} />;
    default:
      return <AssemblyDrawing title={title} />;
  }
}

export function Process() {
  return (
    <section id="process" className={styles.section} aria-labelledby="process-title">
      <SectionTitle id="process-title">{process.title}</SectionTitle>
      <ol className={styles.steps}>
        {process.steps.map((step, i) => (
          <li key={step.title} className={styles.step}>
            <div className={styles.picture} data-reveal-media style={{ "--i": i % 3 } as React.CSSProperties}>
              <StepPicture name={step.picture} title={step.title} />
            </div>
            <h3 className={styles.title} data-reveal style={{ "--i": (i % 3) + 1 } as React.CSSProperties}>
              {step.title}
            </h3>
            <p className={styles.text} data-reveal style={{ "--i": (i % 3) + 2 } as React.CSSProperties}>
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
