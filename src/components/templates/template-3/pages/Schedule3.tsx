"use client";

import { useState } from 'react';
import { Layout3 } from '../layout/Layout3';
import { SEOHead } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useContentStore } from '@/store/useContentStore';
import { useToast } from '@/hooks/use-toast';
import { Clock, Check, Sparkles } from 'lucide-react';

const SchedulePage3 = () => {
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
      title: "Request Received!",
      description: "We'll contact you shortly to schedule your free class.",
    });
    setFormData({ name: '', email: '', phone: '', program: '', message: '' });
  };

  return (
    <Layout3>
      <SEOHead
        canonicalUrl="https://apexmartialarts.com/template-3/schedule"
      />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-background to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-primary font-bold uppercase tracking-widest text-sm mb-4">
            GET STARTED
          </span>
          <h1 className="text-5xl lg:text-7xl font-black text-foreground">
            SCHEDULE{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              & PRICING
            </span>
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </section>

      {/* Content */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Schedule */}
            <div>
              <h2 className="text-3xl font-black text-secondary-foreground mb-8">Class Schedule</h2>
              
              <div className="space-y-6">
                {programs.map((program, index) => (
                  <div 
                    key={program.id}
                    className="bg-muted border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{program.name}</h3>
                        <p className="text-xs text-primary uppercase tracking-widest">{program.ageRange}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {program.schedule.map((slot, i) => (
                        <div key={i} className="flex justify-between py-2 border-b border-border last:border-0">
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
            <div>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-25" />
                <div className="relative bg-muted border border-border rounded-3xl p-8 lg:p-10">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-full px-4 py-2 mb-6">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground font-medium">FREE Trial Class</span>
                  </div>
                  
                  <h2 className="text-3xl font-black text-foreground mb-4">Book Your Free Class</h2>
                  <p className="text-muted-foreground mb-8">
                    Ready to start your martial arts journey? Fill out the form below and we'll be in touch.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="text-xs tracking-widest text-muted-foreground uppercase mb-2 block">NAME</label>
                      <Input 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs tracking-widest text-muted-foreground uppercase mb-2 block">EMAIL</label>
                      <Input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs tracking-widest text-muted-foreground uppercase mb-2 block">PHONE</label>
                      <Input 
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs tracking-widest text-muted-foreground uppercase mb-2 block">PROGRAM</label>
                      <select 
                        value={formData.program}
                        onChange={(e) => setFormData({...formData, program: e.target.value})}
                        className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                        required
                      >
                        <option value="" className="bg-background">Select a program</option>
                        {programs.map((program) => (
                          <option key={program.id} value={program.slug} className="bg-background">
                            {program.name} ({program.ageRange})
                          </option>
                        ))}
                      </select>
                    </div>
                    <Button 
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-bold uppercase tracking-wider py-6 border-0"
                    >
                      <Check className="w-5 h-5 mr-2" />
                      Submit Request
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout3>
  );
};

export default SchedulePage3;