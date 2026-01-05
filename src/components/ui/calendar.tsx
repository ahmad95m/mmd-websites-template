"use client";
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 pointer-events-auto", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-foreground",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "h-7 w-7 p-0 bg-transparent text-muted-foreground rounded-md transition-colors",
          "hover:text-foreground hover:bg-muted/50",
          "focus:outline-none focus:ring-1 focus:ring-border"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          "h-9 w-9 p-0 font-normal rounded-md transition-colors text-foreground",
          "hover:bg-muted/50 hover:text-foreground",
          "focus:bg-muted/50 focus:text-foreground focus:outline-none",
          "aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "!bg-primary !text-primary-foreground rounded-md hover:!bg-primary hover:!text-primary-foreground focus:!bg-primary focus:!text-primary-foreground",
        day_today: "ring-2 ring-inset ring-primary font-semibold rounded-md",
        day_outside:
          "day-outside text-muted-foreground/40",
        day_disabled: "text-muted-foreground/30",
        day_range_middle: "aria-selected:bg-primary/20 aria-selected:text-foreground rounded-md",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
