"use client";

import { useState } from 'react';
import { Layout2 } from '../layout/Layout2';
import { SEOHead } from '@/components/SEOHead';
import { useContentStore } from '@/store/useContentStore';
import { format, isSameDay, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight, Clock, User, X } from 'lucide-react';
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

const CalendarPage2 = () => {
  const { content } = useContentStore();
  const events: CalendarEvent[] = (content as any)?.calendarEvents || [];
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startingDayOfWeek = getDay(monthStart);

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(parseISO(event.date), date));
  };

  const hasEvents = (date: Date) => {
    return events.some(event => isSameDay(parseISO(event.date), date));
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Layout2>
      <SEOHead
        canonicalUrl="https://apexmartialarts.com/calendar"
      />
      
      {/* Minimal Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-primary tracking-[0.4em] text-xs uppercase mb-6 block">Schedule</span>
          <h1 className="font-light text-6xl md:text-8xl text-foreground tracking-tight mb-4">
            Calendar
          </h1>
          <div className="w-24 h-px bg-primary mx-auto" />
        </div>
      </section>

      {/* Full Calendar Grid */}
      <section className="pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-12">
            <button
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="p-3 hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <h2 className="text-3xl font-light text-foreground tracking-wide">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-3 hover:bg-muted transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="border border-border">
            {/* Week Headers */}
            <div className="grid grid-cols-7 border-b border-border">
              {weekDays.map((day) => (
                <div key={day} className="p-4 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7">
              {/* Empty cells for days before month start */}
              {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                <div key={`empty-${index}`} className="min-h-[120px] border-b border-r border-border bg-muted/30" />
              ))}
              
              {/* Days of month */}
              {daysInMonth.map((day, index) => {
                const dayEvents = getEventsForDate(day);
                const isCurrentDay = isToday(day);
                
                return (
                  <div
                    key={day.toString()}
                    className={cn(
                      'min-h-[120px] border-b border-r border-border p-2 transition-colors',
                      isCurrentDay && 'bg-primary/5'
                    )}
                  >
                    <span className={cn(
                      'inline-flex items-center justify-center w-8 h-8 text-sm',
                      isCurrentDay && 'bg-primary text-primary-foreground rounded-full font-medium'
                    )}>
                      {format(day, 'd')}
                    </span>
                    
                    {/* Events */}
                    <div className="mt-1 space-y-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <button
                          key={event.id}
                          onClick={() => setSelectedEvent(event)}
                          className="w-full text-left px-2 py-1 text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors truncate"
                        >
                          {event.time.split(' - ')[0]} · {event.title}
                        </button>
                      ))}
                      {dayEvents.length > 2 && (
                        <span className="text-xs text-muted-foreground px-2">
                          +{dayEvents.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming List */}
          <div className="mt-20">
            <h3 className="text-2xl font-light text-foreground mb-8 tracking-wide">Upcoming Classes</h3>
            <div className="space-y-px">
              {events
                .filter(event => parseISO(event.date) >= new Date())
                .slice(0, 6)
                .map((event) => (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className="w-full flex items-center justify-between p-6 bg-card hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-center gap-8">
                      <div className="text-center w-16">
                        <span className="block text-3xl font-light text-foreground">{format(parseISO(event.date), 'd')}</span>
                        <span className="text-xs uppercase tracking-wider text-muted-foreground">{format(parseISO(event.date), 'MMM')}</span>
                      </div>
                      <div className="text-left">
                        <h4 className="text-lg font-light text-foreground group-hover:text-primary transition-colors">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.time} · {event.instructor}</p>
                      </div>
                    </div>
                    <span className="text-xs uppercase tracking-[0.15em] text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details →
                    </span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedEvent(null)}
          />
          <div className="relative bg-card border border-border max-w-lg w-full p-8 animate-fade-in">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 p-2 hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
            
            <span className="text-xs uppercase tracking-[0.3em] text-primary block mb-4">
              {selectedEvent.program.replace('-', ' ')}
            </span>
            <h3 className="text-3xl font-light text-foreground mb-6">{selectedEvent.title}</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{format(parseISO(selectedEvent.date), 'EEEE, MMMM d, yyyy')} · {selectedEvent.time}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <User className="w-4 h-4" />
                <span>Instructor: {selectedEvent.instructor}</span>
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">{selectedEvent.description}</p>
          </div>
        </div>
      )}
    </Layout2>
  );
};

export default CalendarPage2;