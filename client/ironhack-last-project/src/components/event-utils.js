let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    resourceId: "6006e2c13e4ab249cee2fb66",
    type: "shift",
    title: "test",
    start: "2021-01-19T10:30",
    end: "2021-01-19T16:30",
    id: "60071c1b10a4c758ad2baa2a",
  },

  {
    color: "#00bcd4",
    end: "2021-01-20T17:41",
    id: "60072f270387d15d1a120f2d",
    resourceId: "6006e2ba3e4ab249cee2fb64",
    start: "2021-01-20T01:15",
    title: "test",
    type: "shift",
  },
  {
    color: "#00bcd4",
    end: "2021-01-20T17:41",
    id: "3",
    resourceId: "6006e2ba3e4ab249cee2fb64",
    start: "2021-01-20T01:15",
    title: "test2",
    type: "shift",
  },
];

export function createEventId() {
  return String(eventGuid++);
}
