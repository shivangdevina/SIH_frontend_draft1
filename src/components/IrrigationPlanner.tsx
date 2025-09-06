import { useState } from 'react';
import { Droplets, Calendar as CalendarIcon, AlertCircle } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format, isSameDay } from 'date-fns';

const IrrigationPlanner = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  
  // Mock irrigation schedule - dates when irrigation is scheduled
  const irrigationDates = [
    new Date(2024, 6, 5),   // July 5, 2024
    new Date(2024, 6, 10),  // July 10, 2024
    new Date(2024, 6, 16),  // July 16, 2024
    new Date(2024, 6, 22),  // July 22, 2024
    new Date(2024, 6, 29),  // July 29, 2024
    new Date(2024, 7, 2),   // August 2, 2024
    new Date(2024, 7, 7),   // August 7, 2024
    new Date(2024, 7, 13),  // August 13, 2024
    new Date(2024, 7, 19),  // August 19, 2024
    new Date(2024, 7, 25),  // August 25, 2024
  ];

  const isIrrigationDay = (date: Date) => {
    return irrigationDates.some(irrigationDate => isSameDay(date, irrigationDate));
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Irrigation Planning
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your irrigation schedule efficiently with AI-powered suggestions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="card-agricultural">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Irrigation Schedule</h2>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Irrigation Day</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-muted rounded-full"></div>
                    <span className="text-muted-foreground">Regular Day</span>
                  </div>
                </div>
              </div>

              {/* Calendar */}
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="w-full"
                modifiers={{
                  irrigation: irrigationDates,
                }}
                modifiersStyles={{
                  irrigation: {
                    backgroundColor: 'hsl(var(--primary) / 0.2)',
                    color: 'hsl(var(--primary))',
                    border: '2px solid hsl(var(--primary))',
                    fontWeight: 'bold',
                  },
                }}
              />

              {selectedDate && (
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">
                    {format(selectedDate, 'MMMM d, yyyy')}
                  </h3>
                  {isIrrigationDay(selectedDate) ? (
                    <div className="flex items-center space-x-2 text-primary">
                      <Droplets className="w-4 h-4" />
                      <span className="text-sm">Scheduled irrigation day</span>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      No irrigation scheduled for this day
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div className="card-agricultural">
                <div className="flex items-center space-x-3 mb-4">
                  <Droplets className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">AI Suggestions</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Based on current weather data and soil moisture levels, our AI recommends irrigating every 3-4 days during this season.
                  </p>
                  <div className="bg-primary-light p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CalendarIcon className="w-4 h-4 text-primary" />
                      <span className="font-medium text-primary">Next Suggested Irrigation</span>
                    </div>
                    <p className="text-sm text-primary">August 2, 2024</p>
                  </div>
                </div>
              </div>

              <div className="card-agricultural">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-warning" />
                  <h3 className="font-semibold text-foreground">Weather Alert</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Rain expected on July 28-30. Consider adjusting your irrigation schedule accordingly.
                </p>
                <button className="text-sm text-primary hover:text-primary-hover transition-fast">
                  View Full Weather Forecast →
                </button>
              </div>

              <div className="card-agricultural">
                <h3 className="font-semibold text-foreground mb-3">Irrigation Tips</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Water early morning or late evening</li>
                  <li>• Check soil moisture before irrigating</li>
                  <li>• Adjust frequency based on crop stage</li>
                  <li>• Monitor weather conditions regularly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IrrigationPlanner;