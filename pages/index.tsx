import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { initializeApollo } from '../apollo/client'
import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

type Todo = {
  id: string
  name: string
  completed: boolean
}

const TodosQuery = gql`
  query TodosQuery {
    todos {
      id
      name
      completed
    }
  }
`

function TodoItem({ data }: { data: Todo }) {
  return (
    <ListItem>
      <ListItemButton role={undefined} dense>
        <ListItemIcon>
          <Checkbox
            edge='start'
            checked={data.completed}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': `todo-item-${data.id}-label` }}
          />
        </ListItemIcon>
        <ListItemText>
          {data.name}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  )
}

function TodoList() {
  const { data: { todos }, } = useQuery<{ todos: Todo[] }>(TodosQuery)
  return (
    <List>
      {todos.map(todo => <TodoItem key={todo.id} data={todo} />)}
    </List>
  )
}

export default function Home() {
  return (
    <TodoList />
  )
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: TodosQuery,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}
