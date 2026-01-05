"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Section, SectionHeader } from '@/components/ui/Section';
import { useContentStore } from '@/store/useContentStore';

export const HomeFAQSection = () => {
  const { getHomeFaqs } = useContentStore();
  const faqs = getHomeFaqs();
  
  if (!faqs || faqs.length === 0) {
    return null;
  }
  
  return (
    <Section background="default" id="faqs">
      <SectionHeader
        pretitle="FREQUENTLY ASKED QUESTIONS"
        title="Frequently Asked Questions"
      />
      
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`faq-${index}`}
              className="bg-card rounded-xl px-6 border border-border"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
};

