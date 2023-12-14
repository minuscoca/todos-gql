import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { initializeApollo } from '../apollo/client'

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
    <li>
      <div>
        {data.name}
        {data.completed ? 'DONE' : 'TODO'}
      </div>
    </li>
  )
}

function TodoList() {
  const { data: { todos }, } = useQuery<{ todos: Todo[] }>(TodosQuery)
  return (
    <ul>
      {todos.map(todo => <TodoItem key={todo.id} data={todo} />)}
    </ul>
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
