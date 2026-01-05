"use client";
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/SEOHead';
import { Section } from '@/components/ui/Section';
import { Calendar } from '@/components/ui/calendar';
import { useContentStore } from '@/store/useContentStore';
import { format, isSameDay, parseISO } from 'date-fns';
import { CalendarDays, Clock, User, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import heroImage from '@/assets/hero-home.jpg';
import { useSectionVisibility } from '@/hooks/useSectionVisibility';

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  program: string;
  description: string;
  instructor: string;
}

const CalendarPage = () => {
  const { content } = useContentStore();
  const events: CalendarEvent[] = (content as any)?.calendarEvents || [];
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [hoveredEvent, setHoveredEvent] = useState<CalendarEvent | null>(null);
  const { isVisible } = useSectionVisibility('calendar');

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(parseISO(event.date), date));
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  const hasEvents = (date: Date) => {
    return events.some(event => isSameDay(parseISO(event.date), date));
  };

  const getProgramColor = (program: string) => {
    const colors: Record<string, string> = {
      'little-champions': 'bg-green-500/20 text-green-600 border-green-500/30',
      'junior-warriors': 'bg-blue-500/20 text-blue-600 border-blue-500/30',
      'teen-elite': 'bg-purple-500/20 text-purple-600 border-purple-500/30',
      'adult': 'bg-orange-500/20 text-orange-600 border-orange-500/30',
      'birthday': 'bg-pink-500/20 text-pink-600 border-pink-500/30',
      'all': 'bg-primary/20 text-primary border-primary/30',
    };
    return colors[program] || 'bg-muted text-muted-foreground border-border';
  };

  return (
    <Layout>
      <SEOHead
        canonicalUrl="https://apexmartialarts.com/calendar"
      />
      
      {/* Hero */}
      {isVisible('hero') && (
        <section className="relative pt-32 pb-20">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage.src})` }}
          />
          <div className="absolute inset-0 bg-secondary/90" />
          <div className="relative z-10 container-wide px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block px-4 py-2 bg-primary/20 rounded-full text-primary font-semibold text-sm mb-4">
              <CalendarDays className="inline w-4 h-4 mr-2" />
              CLASS SCHEDULE
            </span>
            <h1 className="font-heading text-5xl md:text-7xl text-primary-foreground mb-4">
              EVENT <span className="text-primary">CALENDAR</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              View all our classes, events, and special programs. Click on any date to see what's happening!
            </p>
          </div>
        </section>
      )}

      {isVisible('events') && (
        <Section>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 shadow-lg border border-border sticky top-24">
                <h2 className="font-heading text-2xl text-foreground mb-4">Select Date</h2>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md"
                  modifiers={{
                    hasEvents: (date) => hasEvents(date),
                  }}
                  modifiersClassNames={{
                    hasEvents: 'font-bold bg-primary text-primary-foreground rounded-md',
                  }}
                />
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Dates with classes are highlighted
                </p>
              </div>
            </div>

            {/* Events List */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
                <h2 className="font-heading text-2xl text-foreground mb-2">
                  {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'Select a date'}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {selectedDateEvents.length} {selectedDateEvents.length === 1 ? 'event' : 'events'} scheduled
                </p>

                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDateEvents.map((event) => (
                      <div
                        key={event.id}
                        className={cn(
                          'group relative p-5 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:border-primary/50 hover:shadow-md',
                          getProgramColor(event.program)
                        )}
                        onMouseEnter={() => setHoveredEvent(event)}
                        onMouseLeave={() => setHoveredEvent(null)}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <h3 className="font-heading text-xl text-foreground mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4 text-primary" />
                                {event.time}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <User className="w-4 h-4 text-primary" />
                                {event.instructor}
                              </span>
                            </div>
                          </div>
                          <span className={cn(
                            'px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide border',
                            getProgramColor(event.program)
                          )}>
                            {event.program.replace('-', ' ')}
                          </span>
                        </div>
                        
                        {/* Expandable Details */}
                        <div className={cn(
                          'overflow-hidden transition-all duration-300',
                          hoveredEvent?.id === event.id ? 'max-h-32 opacity-100 mt-4 pt-4 border-t border-border' : 'max-h-0 opacity-0'
                        )}>
                          <p className="text-muted-foreground">{event.description}</p>
                          <div className="flex items-center gap-2 mt-3 text-sm text-primary">
                            <MapPin className="w-4 h-4" />
                            <span>APEX Martial Arts Academy - Main Training Floor</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CalendarDays className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="font-heading text-xl text-muted-foreground mb-2">No Events Scheduled</h3>
                    <p className="text-muted-foreground">
                      Select a different date to view scheduled classes and events.
                    </p>
                  </div>
                )}
              </div>

              {/* Upcoming Events */}
              <div className="bg-card rounded-2xl p-6 shadow-lg border border-border mt-8">
                <h2 className="font-heading text-2xl text-foreground mb-6">Upcoming Events</h2>
                <div className="space-y-3">
                  {events
                    .filter(event => parseISO(event.date) >= new Date())
                    .slice(0, 5)
                    .map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                        onClick={() => setSelectedDate(parseISO(event.date))}
                      >
                        <div>
                          <h4 className="font-semibold text-foreground">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {format(parseISO(event.date), 'MMM d')} • {event.time}
                          </p>
                        </div>
                        <span className={cn(
                          'px-2 py-1 rounded text-xs font-medium border',
                          getProgramColor(event.program)
                        )}>
                          {event.program.replace('-', ' ')}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}
    </Layout>
  );
};

export { CalendarPage };
