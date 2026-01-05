"use client";

import { useState } from 'react';
import { Layout3 } from '../layout/Layout3';
import { SEOHead } from '@/components/SEOHead';
import { useContentStore } from '@/store/useContentStore';
import { format, isSameDay, parseISO, startOfWeek, addDays, addWeeks, subWeeks, isToday, isSameWeek } from 'date-fns';
import { ChevronLeft, ChevronRight, Clock, User, Zap, Calendar, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  program: string;
  description: string;
  instructor: string;
}

const CalendarPage3 = () => {
  const { content } = useContentStore();
  const events: CalendarEvent[] = (content as any)?.calendarEvents || [];
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [activeDay, setActiveDay] = useState<Date>(new Date());

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(parseISO(event.date), date));
  };

  const activeDayEvents = getEventsForDate(activeDay);

  return (
    <Layout3>
      <SEOHead
        canonicalUrl="https://apexmartialarts.com/calendar"
      />
      
      {/* Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.4) 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/20 border border-primary/30">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <span className="text-primary font-bold text-sm uppercase tracking-wider">Weekly Schedule</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-foreground mb-4">
            CLASS <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">SCHEDULE</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Browse our weekly training sessions. Click any class for full details.
          </p>
        </div>
      </section>

      {/* Week View */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Week Navigation */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Previous</span>
            </button>
            
            <div className="text-center">
              <h2 className="text-xl md:text-2xl font-black text-foreground">
                {format(currentWeek, 'MMM d')} - {format(addDays(currentWeek, 6), 'MMM d, yyyy')}
              </h2>
              {isSameWeek(currentWeek, new Date()) && (
                <span className="text-xs text-primary font-bold uppercase tracking-wider">Current Week</span>
              )}
            </div>
            
            <button
              onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <span className="text-sm font-medium">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day Selector */}
          <div className="grid grid-cols-7 gap-2 mb-8">
            {weekDays.map((day) => {
              const dayEvents = getEventsForDate(day);
              const isActive = isSameDay(day, activeDay);
              const isCurrent = isToday(day);
              
              return (
                <button
                  key={day.toString()}
                  onClick={() => setActiveDay(day)}
                  className={cn(
                    'relative p-4 rounded-xl border transition-all duration-300',
                    isActive 
                      ? 'bg-primary border-primary shadow-lg shadow-primary/20' 
                      : 'bg-card/50 border-border hover:border-primary/50 hover:bg-card'
                  )}
                >
                  <span className={cn(
                    'block text-xs uppercase tracking-wider mb-1',
                    isActive ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  )}>
                    {format(day, 'EEE')}
                  </span>
                  <span className={cn(
                    'block text-2xl font-black',
                    isActive ? 'text-primary-foreground' : 'text-foreground'
                  )}>
                    {format(day, 'd')}
                  </span>
                  {isCurrent && !isActive && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
                  )}
                  {dayEvents.length > 0 && (
                    <div className={cn(
                      'mt-2 text-xs font-bold',
                      isActive ? 'text-primary-foreground' : 'text-primary'
                    )}>
                      {dayEvents.length} {dayEvents.length === 1 ? 'class' : 'classes'}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Day's Events */}
          <div className="bg-card/30 backdrop-blur-sm rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-black text-foreground">
                  {format(activeDay, 'EEEE')}
                </h3>
                <p className="text-muted-foreground">{format(activeDay, 'MMMM d, yyyy')}</p>
              </div>
              <div className="px-4 py-2 rounded-full bg-primary/20 border border-primary/30">
                <span className="text-primary font-bold">
                  {activeDayEvents.length} {activeDayEvents.length === 1 ? 'Session' : 'Sessions'}
                </span>
              </div>
            </div>

            {activeDayEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {activeDayEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className="group relative p-5 rounded-xl bg-background/50 border border-border hover:border-primary/50 cursor-pointer transition-all duration-300 overflow-hidden"
                  >
                    {/* Gradient accent */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br from-primary to-accent" />
                    
                    <div className="relative">
                      <div className="flex items-start justify-between mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-primary-foreground bg-gradient-to-r from-primary to-accent">
                          {event.program.replace('-', ' ')}
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                      
                      <h4 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {event.title}
                      </h4>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-4">
                  <Zap className="w-8 h-8 text-muted-foreground" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">Rest Day</h4>
                <p className="text-muted-foreground">No classes scheduled. Recovery is part of training!</p>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {['little-champions', 'junior-warriors', 'teen-elite', 'adult'].map((program) => {
              const count = events.filter(e => e.program === program).length;
              return (
                <div key={program} className="bg-card/30 rounded-xl border border-border p-4 text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-2 bg-gradient-to-br from-primary to-accent">
                    <Zap className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <p className="text-2xl font-black text-foreground">{count}</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {program.replace('-', ' ')}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-background/90 backdrop-blur-md"
            onClick={() => setSelectedEvent(null)}
          />
          <div className="relative bg-card border border-border rounded-2xl max-w-lg w-full p-8 animate-scale-in">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <span className="sr-only">Close</span>
              ×
            </button>
            
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-primary-foreground bg-gradient-to-r from-primary to-accent mb-4">
              {selectedEvent.program.replace('-', ' ')}
            </span>
            
            <h3 className="text-3xl font-black text-foreground mb-6">{selectedEvent.title}</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Date & Time</p>
                  <p className="font-medium text-foreground">
                    {format(parseISO(selectedEvent.date), 'EEEE, MMMM d')} · {selectedEvent.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <User className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Instructor</p>
                  <p className="font-medium text-foreground">{selectedEvent.instructor}</p>
                </div>
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">{selectedEvent.description}</p>
          </div>
        </div>
      )}
    </Layout3>
  );
};

export default CalendarPage3;