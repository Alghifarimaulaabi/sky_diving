'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Navbar } from '@/components/Navbar';
import { DepthIndicator } from '@/components/DepthIndicator';
import { Hero } from '@/components/Hero';
import { DisciplinesSection } from '@/components/DisciplinesSection';
import { LearnSection } from '@/components/LearnSection';
import { GearSection } from '@/components/GearSection';
import { SafetySection } from '@/components/SafetySection';
import { AboutBacSection } from '@/components/AboutBacSection';
import { EventsSection } from '@/components/EventsSection';
import { GallerySection } from '@/components/GallerySection';
import { FaqSection } from '@/components/FaqSection';
import { JoinFormSection } from '@/components/JoinFormSection';
import { Footer } from '@/components/Footer';
import { MobileTabBar } from '@/components/MobileTabBar';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { KitBar } from '@/components/KitBar';
import { KitSheet } from '@/components/KitSheet';
import { ProductSheet } from '@/components/ProductSheet';
import { Toast } from '@/components/Toast';
import { useKit } from '@/context/KitContext';

function PageContent() {
  useScrollReveal();
  const { activeProductId, isKitOpen } = useKit();

  return (
    <>
      {/* Skip to content */}
      <a className="skip" href="#main">
        Lompat ke konten
      </a>

      {/* Fixed depth gauge (tablet+) */}
      <DepthIndicator />

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main id="main">
        <Hero />
        <DisciplinesSection />
        <LearnSection />
        <GearSection />
        <SafetySection />
        <AboutBacSection />
        <EventsSection />
        <GallerySection />
        <FaqSection />
        <JoinFormSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile bottom tab bar */}
      <MobileTabBar />

      {/* Floating WhatsApp button */}
      <WhatsAppFloat />

      {/* Kit bar (muncul saat ada item di kit) */}
      <KitBar />

      {/* Toast notification */}
      <Toast />

      {/* Product detail sheet */}
      {activeProductId && <ProductSheet />}

      {/* Kit summary sheet */}
      {isKitOpen && <KitSheet />}
    </>
  );
}

export default function HomePage() {
  return <PageContent />;
}
