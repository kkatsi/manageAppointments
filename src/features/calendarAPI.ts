export async function getItems() {
  return await window.gapi.client.calendar.events
    .list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
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
          end: item.start.dateTime || item.start.date || "",
          summary: item.summary,
          description: item.description,
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
  const event = {
    start: { dateTime: start, timeZone: "Europe/Athens" },
    end: { dateTime: end, timeZone: "Europe/Athens" },
    description: description,
    summary: summary,
  };
  return await window.gapi.client.calendar.events
    .insert({
      calendarId: "primary",
      resource: event,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
