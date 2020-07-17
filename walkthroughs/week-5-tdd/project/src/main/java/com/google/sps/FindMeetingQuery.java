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
    Collection<TimeRange> options = new ArrayList<>();
    List<Event> eventsSorted = new ArrayList<>();
    eventsSorted.addAll(events);
    Collections.sort(
        eventsSorted,
        new Comparator<Event>() {
          @Override
          public int compare(Event a, Event b) {
            return TimeRange.ORDER_BY_START.compare(a.getWhen(), b.getWhen());
          }
        });
    eventsSorted.removeIf(
        new Predicate<Event>() {
          @Override
          public boolean test(Event e) {
            Collection<String> eventAttendees = new ArrayList<>();
            eventAttendees.addAll(e.getAttendees());
            eventAttendees.removeAll(request.getAttendees());
            return e.getAttendees().size() == eventAttendees.size();
          }
        });

    if (eventsSorted.isEmpty()) {
      options.add(TimeRange.WHOLE_DAY);
    } else {
      Iterator<Event> eventsIter = eventsSorted.iterator();
      Event event = eventsIter.next();
      TimeRange option =
          TimeRange.fromStartEnd(TimeRange.START_OF_DAY, event.getWhen().start(), false);
      if (option.duration() >= request.getDuration()) {
        options.add(option);
      }
      while (eventsIter.hasNext()) {
        Event nextEvent = eventsIter.next();
        if (!nextEvent.getWhen().overlaps(event.getWhen())) {
          option =
              TimeRange.fromStartEnd(event.getWhen().end(), nextEvent.getWhen().start(), false);
          if (option.duration() >= request.getDuration()) {
            options.add(option);
          }
        }
        event = nextEvent;
      }
      option = TimeRange.fromStartEnd(event.getWhen().end(), TimeRange.END_OF_DAY, true);
      if (option.duration() >= request.getDuration()) {
        options.add(option);
      }
    }
    if (TimeRange.WHOLE_DAY.duration() < request.getDuration()) {
      options.clear();
    }
    return options;
  }
}
