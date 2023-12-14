export const resolvers = {
  Query: {
    todos: async () => {
      return [
        { id: 1, name: 'Milk', completed: false },
        { id: 2, name: 'Apple', completed: false },
        { id: 3, name: 'Orange', completed: false },
        { id: 4, name: 'Egg', completed: true },
        { id: 5, name: 'Egg', completed: true },
        { id: 6, name: 'Egg', completed: true },
        { id: 7, name: 'Egg', completed: true },
        { id: 8, name: 'Egg', completed: true },
        { id: 9, name: 'Egg', completed: true },
        { id: 10, name: 'Egg', completed: true },
        { id: 11, name: 'Egg', completed: true },
        { id: 12, name: 'Egg', completed: true },
        { id: 13, name: 'Egg', completed: true },
        { id: 14, name: 'Egg', completed: true },
        { id: 15, name: 'Egg', completed: true },
      ];
    },
  },
};
