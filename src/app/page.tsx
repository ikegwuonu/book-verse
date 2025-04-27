import { Discover } from "@/components/Discover";
import { Footer } from "@/components/Footer";
import Hero from "@/components/Hero";
import { InfiniteBookScroll } from "@/components/InfiniteScroll";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Hero />
      <InfiniteBookScroll />
      <Discover />
      <Footer />
    </>
  );
}
