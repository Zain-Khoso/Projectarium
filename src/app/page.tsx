// Lib Imports.
import Image from "next/image";

// Local Imports.
import ColoredText from "@/components/ColoredText";
import FeatureCard, { FeatureT } from "@/components/FeatureCard";
import { ButtonPrimary, ButtonSecondary } from "@/components/Button";
import ContactForm from "@/components/ContactForm";

// Component.
export default function Home() {
  const features: FeatureT[] = [
    {
      title: "Notes",
      link: "/notes",
      external: false,
      desc: "Efficient, intuitive, and dependable notes application offering swift accessibility and reliability.",
    },
    {
      title: "Dictionary",
      link: "/dictionary",
      external: false,
      desc: "A swift, user-friendly, and dependable dictionary tool, ensuring quick access to accurate definitions.",
    },
    {
      title: "Quiz",
      link: "/quiz",
      external: false,
      desc: "A rapid and engaging quiz application, offering both speed and a stimulating challenge.",
    },
    {
      title: "Manga Trench",
      link: "https://manga-trench.vercel.app",
      external: true,
      desc: "A swift, user-friendly, and dependable manga reading application, ensuring an enjoyable and seamless experience.",
    },
    {
      title: "Foreign Exchange",
      link: "/foreign-exchange",
      external: false,
      desc: "A swift, user-friendly, and reliable foreign exchange rates platform, providing accurate and up-to-date information.",
    },
  ];
  return (
    <main className="w-full flex flex-col gap-16">
      {/* Hero Section */}
      <section className="w-full min-h-[480px] flex flex-col justify-center items-center">
        <h1 className=" max-w-[40ch] text-4xl font-black text-center leading-normal tracking-wider">
          <ColoredText>Find projects</ColoredText> created by other people,
          understand thier idea and
          <ColoredText> build</ColoredText> on that
          <ColoredText> idea</ColoredText> as ground work for
          <ColoredText> yours.</ColoredText>
        </h1>
        <div className="flex items-center gap-8 my-8">
          <ButtonPrimary>Explore Projects</ButtonPrimary>
          <ButtonSecondary>Explore Source Code</ButtonSecondary>
        </div>
      </section>

      {/* Featured Section */}
      <section id="projects" className="w-full">
        <h2 className="text-3xl font-bold tracking-wide mb-8">
          Featured Projects.
        </h2>

        <div className="w-full grid grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      {/* About Us Secttion */}
      <section id="about" className="w-full">
        <h2 className="text-3xl font-bold tracking-wide">About Us.</h2>
        <div className="flex gap-32 items-center justify-center">
          <h3 className="w-full max-w-[60ch] text-xl font-bold tracking-wide text-pretty">
            Projectify is a dynamic platform designed to ignite
            <ColoredText> creativity </ColoredText>
            and innovation by showcasing a diverse array of inspiring projects
            crafted by individuals worldwide. Whether seeking fresh
            <ColoredText> ideas, </ColoredText>
            collaborative
            <ColoredText> opportunities, </ColoredText>
            or simply seeking
            <ColoredText> inspiration, </ColoredText>
            users can explore a curated collection of projects spanning various
            disciplines and industries. With a user-friendly interface and a
            commitment to fostering community engagement, Projectify empowers
            users to discover,
            <ColoredText> learn, </ColoredText>
            and
            <ColoredText> collaborate, </ColoredText>
            driving the next wave of innovation forward.
          </h3>
          <Image
            alt="CEO at Projectify"
            src="/brand/ceo.webp"
            width={400}
            height={400}
          />
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="w-full">
        <h2 className="text-3xl font-bold tracking-wide mb-8">Contact Us.</h2>

        <div className="w-full max-h-screen flex justify-evenly items-center gap-8 py-16">
          <Image
            alt="Girl holding a form."
            src="/illustrations/girl-with-form.svg"
            width={500}
            height={1200}
          />

          <ContactForm />
        </div>
      </section>
    </main>
  );
}
