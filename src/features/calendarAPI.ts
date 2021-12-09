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
        // const { start, end, summary, description } = item;
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
