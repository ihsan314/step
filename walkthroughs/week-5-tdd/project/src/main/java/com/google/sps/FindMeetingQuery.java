// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;
import java.util.function.Predicate;

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    List<Event> eventsSortedByEnd = sortEvents(events, false);

    clearIrrelevantEvents(eventsSortedByEnd, request.getAttendees());

    return findAvailableTimeSlots(eventsSortedByEnd, request.getDuration());
  }

  private Collection<TimeRange> findAvailableTimeSlots(
      Collection<Event> eventsSortedByEnd, long minDuration) {
    Collection<TimeRange> options = new ArrayList<>();

    if (eventsSortedByEnd.isEmpty()) {
      options.add(TimeRange.WHOLE_DAY);
    } else {
      Event event = getFirstEvent(eventsSortedByEnd);
      addTimeRangeIfPossible(options, TimeRange.START_OF_DAY, event.getWhen().start(), minDuration);

      Iterator<Event> eventsIter = eventsSortedByEnd.iterator();
      while (eventsIter.hasNext()) {
        Event nextEvent = eventsIter.next();
        if (!nextEvent.getWhen().overlaps(event.getWhen())) {
          addTimeRangeIfPossible(
              options, event.getWhen().end(), nextEvent.getWhen().start(), minDuration);
        }
        event = nextEvent;
      }

      addTimeRangeIfPossible(options, event.getWhen().end(), TimeRange.END_OF_DAY, minDuration);
    }

    if (TimeRange.WHOLE_DAY.duration() < minDuration) {
      options.clear();
    }
    return options;
  }

  private void addTimeRangeIfPossible(
      Collection<TimeRange> options, int beginTime, int endTime, long minDuration) {
    TimeRange option = TimeRange.fromStartEnd(beginTime, endTime, endTime == TimeRange.END_OF_DAY);
    if (option.duration() >= minDuration) {
      options.add(option);
    }
  }

  private Event getFirstEvent(Collection<Event> events) {
    List<Event> eventsSorted = sortEvents(events, true);
    return eventsSorted.get(0);
  }

  private List<Event> sortEvents(Collection<Event> events, boolean sortByStart) {
    List<Event> eventsSorted = new ArrayList<>();
    eventsSorted.addAll(events);

    Collections.sort(
        eventsSorted,
        new Comparator<Event>() {
          @Override
          public int compare(Event a, Event b) {
            return sortByStart
                ? TimeRange.ORDER_BY_START.compare(a.getWhen(), b.getWhen())
                : TimeRange.ORDER_BY_END.compare(a.getWhen(), b.getWhen());
          }
        });

    return eventsSorted;
  }

  private void clearIrrelevantEvents(
      Collection<Event> events, Collection<String> meetingAttendees) {
    events.removeIf(
        new Predicate<Event>() {
          @Override
          public boolean test(Event e) {
            Collection<String> eventAttendees = new ArrayList<>();
            eventAttendees.addAll(e.getAttendees());
            eventAttendees.removeAll(meetingAttendees);
            return e.getAttendees().size() == eventAttendees.size();
          }
        });
  }
}
