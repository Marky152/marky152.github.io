import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      <Loader />
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <Work />
        <Marquee />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
