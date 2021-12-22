function isNumeric(value: string): boolean {
  return /^[0-9]+$/.test(value);
}

function formatDate(value: string): Date {
  let date = new Date(value);

  // In case its IOS, parse the fulldate parts and re-create the date object.
  if (Number.isNaN(date.getMonth())) {
    let arr = value.split(/[- :]/);
    date = new Date(
      Number(arr[0]),
      Number(arr[1]) - 1,
      Number(arr[2]),
      Number(arr[3]),
      Number(arr[4]),
      Number(arr[5])
    );
    return date;
  }
  return date;
}
export async function getItems(minTime?: string, maxTime?: string) {
  const min = formatDate(minTime || "");
  const max = formatDate(maxTime || "");

  return window.gapi.client.calendar.events
    .list({
      calendarId: "primary",
      // timeMin: new Date().toISOString(),
      timeMin: !minTime
        ? formatDate("2020-01-01 00:00:00").toISOString()
        : min.toISOString(),
      timeMax: !maxTime ? undefined : max.toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 1000000,
      orderBy: "startTime",
    })
    .then(function (response) {
      // return response.result.items;
      console.log("in getItems");
      console.log(response);
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
      console.log("error getItems");
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
