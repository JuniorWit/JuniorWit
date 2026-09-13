import React, { useState, useEffect } from 'react';
import { CHECKLIST_TASKS } from './data/landingData';
import { Navbar } from './components/Navbar';
import { HeroVideoBanner } from './components/HeroVideoBanner';
import { ProblemStatsSection } from './components/ProblemStatsSection';
import { WorkChecklistCalculator } from './components/WorkChecklistCalculator';
import { ComparisonTableSection } from './components/ComparisonTableSection';
import { BenefitsSection } from './components/BenefitsSection';
import { LeadFormSection } from './components/LeadFormSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FreeTrialModal } from './components/FreeTrialModal';
import { PolicyModal } from './components/PolicyModal';
import { QuoteModal } from './components/QuoteModal';
import { initScrollDepthTracking, initSectionViewTracking } from './utils/analytics';

export default function App() {
  // GA4 Scroll Depth and Section View Tracking
  useEffect(() => {
    const cleanupScroll = initScrollDepthTracking();
    const cleanupSection = initSectionViewTracking();

    return () => {
      cleanupScroll();
      cleanupSection();
    };
  }, []);

  // Initially check the 4 tasks matching the reference design (total 25h)
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([
    'tax_invoice',
    'contracts_admin',
    'customer_requests',
    'proposals_quotes',
  ]);

  const [isFreeTrialModalOpen, setIsFreeTrialModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

  const handleToggleTask = (id: string) => {
    setSelectedTaskIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedTaskIds(CHECKLIST_TASKS.map((t) => t.id));
  };

  const handleClearAll = () => {
    setSelectedTaskIds([]);
  };

  const scrollToCalculator = () => {
    const el = document.getElementById('work-calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSubscription = () => {
    const el = document.getElementById('subscription-section') || document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const input = document.getElementById('lead-email-input');
        if (input) {
          input.focus({ preventScroll: true });
        }
      }, 600);
    }
  };

  const handleProceedToQuote = () => {
    setIsQuoteModalOpen(true);
  };

  const selectedTasks = CHECKLIST_TASKS.filter((t) => selectedTaskIds.includes(t.id));
  const totalSavedHours = selectedTasks.reduce((acc, t) => acc + t.hours, 0);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* 1. Sticky Navigation Bar */}
      <Navbar />

      {/* Main Landing Page Content */}
      <main className="flex-1">
        {/* 2. Hero Section with Loop Video Main Banner */}
        <HeroVideoBanner
          onScrollToSubscription={scrollToSubscription}
          onScrollToCalculator={scrollToCalculator}
        />

        {/* 3. Problem Statistics Section */}
        <ProblemStatsSection />

        {/* 4. Interactive Work Checklist & Saved Hours Calculator */}
        <WorkChecklistCalculator
          tasks={CHECKLIST_TASKS}
          selectedTaskIds={selectedTaskIds}
          onToggleTask={handleToggleTask}
          onSelectAll={handleSelectAll}
          onClearAll={handleClearAll}
          onProceedToQuote={handleProceedToQuote}
        />

        {/* 5. Alternatives Comparison Table */}
        <ComparisonTableSection />

        {/* 6. Subscription Benefits (Hourly Flexibility, Pause, Cancel) */}
        <BenefitsSection />

        {/* 7. Lead Consultation Form & Workspace Preview */}
        <LeadFormSection
          selectedTasks={selectedTasks}
          selectedCount={selectedTasks.length}
        />

        {/* 8. FAQ Accordion */}
        <FaqSection />
      </main>

      {/* 9. Footer */}
      <Footer
        onOpenPrivacyPolicy={() => setIsPrivacyPolicyOpen(true)}
      />

      {/* Interactive Modals */}
      <FreeTrialModal
        isOpen={isFreeTrialModalOpen}
        onClose={() => setIsFreeTrialModalOpen(false)}
      />

      <PolicyModal
        isOpen={isPrivacyPolicyOpen}
        onClose={() => setIsPrivacyPolicyOpen(false)}
      />

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        selectedTasks={selectedTasks}
        totalSavedHours={totalSavedHours}
      />
    </div>
  );
}
