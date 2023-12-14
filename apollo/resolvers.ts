export const resolvers = {
  Query: {
    todos() {
      return [
        { id: 1, name: 'Milk', completed: false },
        { id: 2, name: 'Apple', completed: false },
        { id: 3, name: 'Orange', completed: false },
        { id: 4, name: 'Egg', completed: true },
      ];
    },
  },
};
