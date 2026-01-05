"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { FAQItem } from '@/types/content';

interface ProgramFAQProps {
  faqs: FAQItem[];
  programName: string;
}

export const ProgramFAQ = ({ faqs, programName }: ProgramFAQProps) => {
  return (
    <section className="section-padding bg-muted">
      <div className="container-wide">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mt-2">
            {programName} PROGRAM FAQ
          </h2>
        </div>
        
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
      </div>
    </section>
  );
};
