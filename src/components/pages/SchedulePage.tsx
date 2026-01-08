"use client";
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/SEOHead';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useContentStore } from '@/store/useContentStore';
import heroImage from '@/assets/hero-home.jpg';
import { useSubmitContact } from '@/hooks/useSubmitContact';

const SchedulePage = () => {
  const { getPrograms, getSiteInfo } = useContentStore();
  const programs = getPrograms();
  const site = getSiteInfo();
  const { submit } = useSubmitContact();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    program: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedProgram = programs.find(p => p.id === formData.program);
    
    await submit(
      {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        program: formData.program,
        programLabel: selectedProgram?.name,
        message: formData.message,
      },
      'Schedule Page Form',
      formData.program,
      {
        onSuccess: () => {
          setFormData({ fullName: '', email: '', phone: '', program: '', message: '' });
        },
        successMessage: "We'll contact you shortly to schedule your free class.",
      }
    );
  };

  return (
    <Layout>
      <SEOHead
        canonicalUrl="https://apexmartialarts.com/schedule"
        breadcrumbs={[
          { name: 'Home', url: 'https://apexmartialarts.com/' },
          { name: 'Schedule', url: 'https://apexmartialarts.com/schedule' }
        ]}
        faq={[
          { question: 'Is the trial class really free?', answer: 'Yes! Your first introductory class is completely free with no obligation to sign up.' },
          { question: 'What should I wear?', answer: 'Comfortable athletic clothing is recommended. We provide uniforms for enrolled students.' },
          { question: 'Do I need any experience?', answer: 'No prior experience is needed. Our programs welcome students of all skill levels.' }
        ]}
      />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage.src})` }}
        />
        <div className="absolute inset-0 bg-secondary/90" />
        <div className="relative z-10 container-wide px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-primary/20 rounded-full text-primary font-semibold text-sm mb-4">
            LIMITED TIME OFFER
          </span>
          <h1 className="font-heading text-5xl md:text-7xl text-primary-foreground mb-4">
            SCHEDULE YOUR <span className="text-primary">FREE CLASS</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Take the first step toward building confidence, discipline, and lifelong skills. Fill out the form below to get started!
          </p>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-card rounded-2xl p-8 shadow-lg">
            <h2 className="font-heading text-3xl text-foreground mb-2">GET STARTED TODAY</h2>
            <p className="text-muted-foreground mb-8">
              Complete the form below and our team will contact you to schedule your free introductory class.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="mt-2"
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2"
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-2"
                  placeholder="Enter your phone number"
                  autoComplete="tel"
                />
              </div>
              
              <div>
                <Label htmlFor="program">Program of Interest *</Label>
                <Select
                  value={formData.program}
                  onValueChange={(value) => setFormData({ ...formData, program: value })}
                  required
                >
                  <SelectTrigger className="mt-2 w-full bg-background">
                    <SelectValue placeholder="Select a program" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border z-50">
                    {programs.map((program) => (
                      <SelectItem key={program.id} value={program.id}>
                        {program.name} ({program.ageRange})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="message">Additional Message (Optional)</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-2 min-h-[100px] resize-y bg-background"
                  placeholder="Tell us more about your goals..."
                />
              </div>
              
              <Button variant="cta" size="xl" className="w-full" type="submit">
                SCHEDULE MY FREE CLASS
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                By submitting this form, you agree to receive communications from {site.name}. 
                Standard message rates may apply.
              </p>
            </form>
          </div>
          
          {/* Info */}
          <div>
            <h2 className="font-heading text-3xl text-foreground mb-6">WHAT TO EXPECT</h2>
            
            <ol className="space-y-6 mb-10">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground font-heading text-xl" aria-hidden="true">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Submit Your Request</h3>
                  <p className="text-muted-foreground">
                    Fill out the form with your information and preferred program.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground font-heading text-xl" aria-hidden="true">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">We'll Contact You</h3>
                  <p className="text-muted-foreground">
                    Our team will reach out within 24 hours to schedule your free class.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground font-heading text-xl" aria-hidden="true">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Attend Your Free Class</h3>
                  <p className="text-muted-foreground">
                    Experience our training firsthand with no obligation.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground font-heading text-xl" aria-hidden="true">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Start Your Journey</h3>
                  <p className="text-muted-foreground">
                    Join our family and begin your transformation!
                  </p>
                </div>
              </li>
            </ol>
            
            {/* Contact */}
            <div className="bg-muted rounded-xl p-6">
              <h3 className="font-heading text-xl text-foreground mb-4">PREFER TO CALL?</h3>
              <p className="text-muted-foreground mb-4">
                Our team is available to answer your questions and help you get started.
              </p>
              <a 
                href={`tel:${site.phone}`}
                className="inline-flex items-center gap-2 text-primary font-semibold text-lg hover:underline"
              >
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export { SchedulePage };
