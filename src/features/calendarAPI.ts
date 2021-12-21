export async function getItems(minTime?: string, maxTime?: string) {
  function isNumeric(value: string): boolean {
    return /^[0-9]+$/.test(value);
  }
  return await window.gapi.client.calendar.events
    .list({
      calendarId: "primary",
      // timeMin: new Date("01-06-2021").toISOString(),
      timeMin: !minTime
        ? new Date("1-1-2020").toISOString()
        : new Date(minTime).toISOString(),
      timeMax: !maxTime ? undefined : new Date(maxTime).toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 1000000,
      orderBy: "startTime",
    })
    .then(function (response) {
      // return response.result.items;
      const clearEvents = response.result.items.map((item) => {
        if (isNumeric(item.description))
          return {
            start: item.start.dateTime || item.start.date || "",
            end: item.end.dateTime || item.end.date || "",
            summary: item.summary,
            description: item.description,
            id: item.id,
          };
        return {
          start: "",
          end: "",
          summary: "",
          description: "",
          id: "",
        };
      });
      const result = clearEvents.filter((item) => item.start.length);
      return result;
      // return
    })
    .catch((error) => {
      alert(error);
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
