
import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Shield, AlertTriangle, CheckSquare, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, parseISO } from 'date-fns';
import initialExtendedCompliance from '../data/complianceData'; // Import from new file
import { risks } from '../data/mockData'; // Using mockData for risks
import { actions } from '../data/mockData'; // Using mockData for actions

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventTypeFilter, setEventTypeFilter] = useState('all');

  // Combine events from different sources
  const allEvents = [];

  // Add Compliance events (using nextReview as event date)
  initialExtendedCompliance.forEach(comp => {
    allEvents.push({
      id: comp.id,
      title: comp.name,
      date: parseISO(comp.nextReview),
      type: 'compliance',
      status: comp.status,
    });
  });

  // Add Risk Assessment events (using nextReview as event date)
  risks.forEach(risk => {
    allEvents.push({
      id: risk.id,
      title: risk.title,
      date: parseISO(risk.nextReview),
      type: 'risk',
      level: risk.level,
    });
  });

  // Add Actions events (using dueDate as event date)
  actions.forEach(action => {
    allEvents.push({
      id: action.id,
      title: action.title,
      date: parseISO(action.dueDate),
      type: 'action',
      status: action.status,
    });
  });

  const filteredEvents = allEvents.filter(event => {
    if (eventTypeFilter === 'all') return true;
    return event.type === eventTypeFilter;
  });

  const header = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>Previous</Button>
          <h2 className="text-xl font-semibold">{format(currentMonth, 'MMMM yyyy')}</h2>
          <Button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>Next</Button>
        </div>
        <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="compliance">Compliance</SelectItem>
            <SelectItem value="risk">Risk Assessment</SelectItem>
            <SelectItem value="action">Actions</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  };

  const days = () => {
    const dateFormat = 'EEEE';
    const days = [];
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 }); // Monday start

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-sm font-medium text-gray-500 text-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="grid grid-cols-7 gap-2 mb-2">{days}</div>;
  };

  const cells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const dateFormat = 'd';
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const dayEvents = filteredEvents.filter(event => isSameDay(event.date, cloneDay));

        days.push(
          <div
            className={`p-2 border rounded-md h-28 relative overflow-hidden ${
              !isSameMonth(cloneDay, currentMonth)
                ? 'bg-gray-50 text-gray-400' : isSameDay(cloneDay, selectedDate)
                ? 'bg-blue-100 border-blue-500' : 'bg-white'
            }`}
            key={cloneDay}
            onClick={() => setSelectedDate(cloneDay)}
          >
            <span className={`text-sm font-semibold ${
              isSameDay(cloneDay, new Date()) ? 'text-blue-600' : ''
            }`}>
              {formattedDate}
            </span>
            <div className="mt-1 space-y-1">
              {dayEvents.map(event => (
                <div
                  key={event.id}
                  className={`text-xs truncate px-1 py-0.5 rounded-sm flex items-center ${
                    event.type === 'compliance' ? 'bg-green-100 text-green-800' :
                    event.type === 'risk' ? 'bg-red-100 text-red-800' :
                    'bg-purple-100 text-purple-800'
                  }`}
                >
                  {event.type === 'compliance' && <Shield className="h-3 w-3 mr-1" />}
                  {event.type === 'risk' && <AlertTriangle className="h-3 w-3 mr-1" />}
                  {event.type === 'action' && <CheckSquare className="h-3 w-3 mr-1" />}
                  {event.title}
                </div>
              ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-2" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Audit Calendar</h1>
      <Card className="p-4">
        <CardContent>
          {header()}
          {days()}
          {cells()}
        </CardContent>
      </Card>

      <Card className="mt-6 p-4">
        <CardHeader>
          <CardTitle>Events for {format(selectedDate, 'PPP')}</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredEvents.filter(event => isSameDay(event.date, selectedDate)).length > 0 ? (
            <div className="space-y-3">
              {filteredEvents.filter(event => isSameDay(event.date, selectedDate)).map(event => (
                <div key={event.id} className="flex items-center space-x-3 p-3 border rounded-md shadow-sm">
                  {event.type === 'compliance' && <Shield className="h-5 w-5 text-green-600" />}
                  {event.type === 'risk' && <AlertTriangle className="h-5 w-5 text-red-600" />}
                  {event.type === 'action' && <CheckSquare className="h-5 w-5 text-purple-600" />}
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-500">Type: {event.type.charAt(0).toUpperCase() + event.type.slice(1)}</p>
                    {event.status && <p className="text-sm text-gray-500">Status: {event.status}</p>}
                    {event.level && <p className="text-sm text-gray-500">Level: {event.level}</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No events on this date.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;


