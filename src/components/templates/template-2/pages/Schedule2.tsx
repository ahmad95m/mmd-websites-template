"use client";

import { useState } from 'react';
import { Layout2 } from '../layout/Layout2';
import { SEOHead } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useContentStore } from '@/store/useContentStore';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-home.jpg';

const SchedulePage2 = () => {
  const { getPrograms, getSeo } = useContentStore();
  const programs = getPrograms();
  const seo = getSeo('schedule');
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    message: ''
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Request Received",
      description: "We'll contact you shortly to schedule your class.",
    });
    setFormData({ name: '', email: '', phone: '', program: '', message: '' });
  };

  return (
    <Layout2>
      <SEOHead
        canonicalUrl="https://apexmartialarts.com/template-2/schedule"
      />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 min-h-[50vh] flex items-end">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage.src})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-secondary/30" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 w-full">
          <p className="text-primary tracking-[0.3em] text-xs mb-4">GET STARTED</p>
          <h1 className="text-5xl lg:text-7xl font-light text-primary-foreground">
            SCHEDULE <span className="text-primary">& PRICING</span>
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Schedule */}
            <div>
              <h2 className="text-3xl font-light text-foreground mb-10">Class Schedule</h2>
              
              <div className="space-y-12">
                {programs.map((program) => (
                  <div key={program.id}>
                    <h3 className="text-xl font-light text-foreground mb-4">{program.name}</h3>
                    <p className="text-xs tracking-widest text-primary mb-4">{program.ageRange}</p>
                    <div className="space-y-2">
                      {program.schedule.map((slot, i) => (
                        <div key={i} className="flex justify-between py-2 border-b border-border">
                          <span className="text-foreground">{slot.day}</span>
                          <span className="text-muted-foreground">{slot.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Form */}
            <div className="bg-muted p-10">
              <h2 className="text-3xl font-light text-foreground mb-6">Book Your Free Class</h2>
              <p className="text-muted-foreground mb-10">
                Ready to start your martial arts journey? Fill out the form below and we'll be in touch.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-xs tracking-widest text-muted-foreground mb-2 block">NAME</label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="rounded-none border-border bg-background"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest text-muted-foreground mb-2 block">EMAIL</label>
                  <Input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="rounded-none border-border bg-background"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest text-muted-foreground mb-2 block">PHONE</label>
                  <Input 
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="rounded-none border-border bg-background"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest text-muted-foreground mb-2 block">PROGRAM</label>
                  <select 
                    value={formData.program}
                    onChange={(e) => setFormData({...formData, program: e.target.value})}
                    className="w-full rounded-none border border-border bg-background px-3 py-2 text-foreground"
                    required
                  >
                    <option value="">Select a program</option>
                    {programs.map((program) => (
                      <option key={program.id} value={program.slug}>
                        {program.name} ({program.ageRange})
                      </option>
                    ))}
                  </select>
                </div>
                <Button 
                  type="submit"
                  variant="outline"
                  size="lg"
                  className="w-full rounded-none border-2 border-foreground text-foreground hover:bg-foreground hover:text-background tracking-widest text-xs"
                >
                  SUBMIT REQUEST
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout2>
  );
};

export default SchedulePage2;
