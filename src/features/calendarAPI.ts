export async function getItems() {
  return await window.gapi.client.calendar.events
    .list({
      calendarId: "primary",
      // timeMin: new Date("01-06-2021").toISOString(),
      timeMin: new Date("1-1-2020").toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 100000,
      orderBy: "startTime",
    })
    .then(function (response) {
      // return response.result.items;
      return response.result.items.map((item) => {
        return {
          start: item.start.dateTime || item.start.date || "",
          end: item.end.dateTime || item.end.date || "",
          summary: item.summary,
          description: item.description,
          id: item.id,
        };
      });
    })
    .catch((error) => {
      return [];
    });
}

export async function insertEvent(
  start: string,
  end: string,
  description: string,
  summary: string
) {
  const newUniqueId = String(Date.now());
  const event = {
    start: { dateTime: start, timeZone: "Europe/Athens" },
    end: { dateTime: end, timeZone: "Europe/Athens" },
    description: description,
    summary: summary,
    id: newUniqueId,
  };
  return await window.gapi.client.calendar.events
    .insert({
      calendarId: "primary",
      resource: event,
    })
    .then(() => {
      return {
        start: event.start.dateTime,
        end: event.end.dateTime,
        description: description,
        summary: summary,
        id: newUniqueId,
      };
    })
    .catch((error) => {
      return null;
    });
}

export async function updateEvent(
  start: string,
  end: string,
  description: string,
  summary: string,
  id: string
) {
  const event = {
    start: { dateTime: start, timeZone: "Europe/Athens" },
    end: { dateTime: end, timeZone: "Europe/Athens" },
    description: description,
    summary: summary,
    id: id,
  };
  return await window.gapi.client.calendar.events
    .update({
      calendarId: "primary",
      eventId: id,
      resource: event,
    })
    .then(() => {
      return {
        start: event.start.dateTime,
        end: event.end.dateTime,
        description: description,
        summary: summary,
        id: id,
      };
    })
    .catch((error) => {
      return null;
    });
}

export async function deleteEvent(id: string) {
  return await window.gapi.client.calendar.events
    .delete({
      calendarId: "primary",
      eventId: id,
    })
    .then(() => {
      return {
        id: id,
      };
    })
    .catch((error) => {
      return null;
    });
}
