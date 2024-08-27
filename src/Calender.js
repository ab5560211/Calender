import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());

  useEffect(() => {
    fetchEvents();
  }, [selectedDate]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `https://calendarific.com/api/v2/holidays?api_key=tV9hIURQPjVevMRZWu825SsKxw2GBFZ2&country=US&year=2024`
      );
      setEvents(response.data.response.holidays);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const renderDays = () => {
    const startDay = selectedDate.clone().startOf('month').startOf('week');
    const endDay = selectedDate.clone().endOf('month').endOf('week');
    const day = startDay.clone().subtract(1, 'day');

    const days = [];
    while (day.isBefore(endDay, 'day')) {
      const currentDay = day.add(1, 'day').clone();
      const isToday = moment().isSame(currentDay, 'day');

      days.push(
        <div
          className={`day ${isToday ? 'today' : ''}`}
          key={currentDay.format('YYYY-MM-DD')}
        >
          {currentDay.format('D')}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="calendar">
      <header>
        <button onClick={() => setSelectedDate(selectedDate.clone().subtract(1, 'month'))}>&lt;</button>
        <h2>{selectedDate.format('MMMM YYYY')}</h2>
        <button onClick={() => setSelectedDate(selectedDate.clone().add(1, 'month'))}>&gt;</button>
      </header>
      <div className="week">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="days">{renderDays()}</div>
    </div>
  );
};

export default Calendar;
