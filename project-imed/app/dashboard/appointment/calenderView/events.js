const now = new Date();

export default [
  {
    id: 1,
    title: "Metting 1",
    start: new Date(2024, 0, 20, 19, 30, 0),
    end: new Date(2024, 0, 20, 22, 0, 0)
  },
  {
    id: 2,
    title: "Metting 2",
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3))
  },
  {
    id: 3,
    title: "Metting 3",
    start: now,
    end: now
  },
  {
    id:4,
    title: "Metting 4",
    start: new Date(2024, 0, 10, 1, 30, 0),
    end: new Date(2024, 0, 10, 2, 30, 0)
  },
  {
    id: 5,
    title: "Metting 5",
    start: new Date(2024, 0, 5, 14, 0, 0),
    end: new Date(2024, 0, 5, 14, 30, 0)
  },
  {
    id: 6,
    title: "Metting 6",
    start: new Date(2024, 0, 6, 10, 30, 0),
    end: new Date(2024, 0, 6, 10, 11, 0)
  },
  {
    id: 7,
    title: "Metting 7",
    start: new Date(2024, 0, 6, 12, 30, 0),
    end: new Date(2024, 0, 6, 14, 0, 0)
  },
  {
    id: 8,
    title: "Metting 8",
    start: new Date(2024, 1, 1, 9, 30, 0),
    end: new Date(2024, 1, 1, 10, 30, 0)
  },
  {
    id: 9,
    title: "Metting 9",
    start: new Date(2024, 1, 1, 9, 30, 0),
    end: new Date(2024, 1, 1, 10, 30, 0)
  },
  {
    id: 10,
    title: "Metting 11",
    start: new Date(2024, 1, 1, 11, 30, 0),
    end: new Date(2024, 1, 1, 12, 30, 0)
  },
  {
    id: 11,
    title: "Metting 12",
    start: new Date(2024, 1, 1, 11, 30, 0),
    end: new Date(2024, 1, 1, 12, 30, 0)
  }
];
