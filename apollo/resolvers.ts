export const resolvers = {
  Query: {
    todos: async () => {
      return [
        { id: 1, title: 'Milk', completed: false },
        { id: 2, title: 'Apple', completed: false },
        { id: 3, title: 'Orange', completed: false },
        { id: 4, title: 'Egg', completed: true },
        { id: 5, title: 'Egg', completed: true },
        { id: 6, title: 'Egg', completed: true },
        { id: 7, title: 'Egg', completed: true },
        { id: 8, title: 'Egg', completed: true },
        { id: 9, title: 'Egg', completed: true },
        { id: 10, title: 'Egg', completed: true },
        { id: 11, title: 'Egg', completed: true },
        { id: 12, title: 'Egg', completed: true },
        { id: 13, title: 'Egg', completed: true },
        { id: 14, title: 'Egg', completed: true },
        { id: 15, title: 'Egg', completed: true },
      ];
    },
  },
};
