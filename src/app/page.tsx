import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Furniture } from "@/components/Furniture";
import { Header } from "@/components/Header";
import { Letter } from "@/components/Letter";
import { Materials } from "@/components/Materials";
import { Motion } from "@/components/Motion";
import { Order } from "@/components/Order";
import { Process } from "@/components/Process";
import { Workshop } from "@/components/workshop/Workshop";

export default function Home() {
  return (
    <>
      <a className="skip" href="#order">
        Перейти к заявке
      </a>
      <Header />
      <main>
        <Workshop />
        <Letter />
        <Furniture />
        <Process />
        <Materials />
        <Faq />
        <Order />
      </main>
      <Footer />
      <Motion />
    </>
  );
}
