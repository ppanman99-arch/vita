import HeroBanner from '../components/HeroBanner';
import TransformationStory from '../components/TransformationStory';
import VitaEcosystem from '../components/VitaEcosystem';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <TransformationStory />
      <VitaEcosystem />
      <BlogSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
