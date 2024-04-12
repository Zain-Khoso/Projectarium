// Lib Imports.
import Image from "next/image";
import Link from "next/link";

// Local Imports.
import ColoredText from "@/components/ColoredText";
import FeatureCard, { FeatureT } from "@/components/FeatureCard";
import { ButtonPrimary, ButtonSecondary } from "@/components/Button";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

// Component.
export default function Home() {
  const features: FeatureT[] = [
    {
      title: "Manga Trench",
      link: "https://manga-trench.vercel.app",
      external: true,
      desc: "A swift, user-friendly, and dependable manga reading application, ensuring an enjoyable and seamless experience.",
    },
    {
      title: "Belly Brains",
      link: "https://belly-brains.vercel.app",
      external: true,
      desc: "Belly Brains is more than just a recipe center; it's a dynamic platform that showcases my journey in ReactJS, continually incorporating new features and best practices.",
    },
    {
      title: "Chatto",
      link: "https://chatto-chatto.vercel.app",
      external: true,
      desc: "Chatto is a personal project aimed at building a user-friendly, real-time messaging platform. It utilizes a stack of modern technologies to provide a seamless chatting experience.",
    },
    {
      title: "SOE",
      link: "https://soe-sukkur.netlify.app",
      external: true,
      desc: "This project includes various features to enhance user experience, such as responsiveness, animation on scroll using the Intersection Observer API.",
    },
    {
      title: "SOE",
      link: "https://weeb-web-zain.netlify.app",
      external: true,
      desc: "Weeb Web is a delightful front-end web project tailored for anime and manga enthusiasts.",
    },
    {
      title: "Projectify Legacy",
      link: "https://projectify-v1.netlify.app",
      external: true,
      desc: "Projectify Legacy is a curated collection of diverse projects designed to inspire and facilitate the generation of innovative ideas.",
    },
  ];
  return (
    <>
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
            <Link href="#projects">
              <ButtonPrimary>Explore Projects</ButtonPrimary>
            </Link>
            <Link
              href="https://github.com/Zain-Khoso/Projectify"
              target="_blank"
            >
              <ButtonSecondary>Explore Source Code</ButtonSecondary>
            </Link>
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
              users can explore a curated collection of projects spanning
              various disciplines and industries. With a user-friendly interface
              and a commitment to fostering community engagement, Projectify
              empowers users to discover,
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

      <Footer />
    </>
  );
}
