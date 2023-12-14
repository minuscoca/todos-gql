import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import type { Todo } from '../../apollo/type-defs';

function TodoItem({ data }: { data: Todo }) {
  return (
    <ListItem disablePadding    >
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

export default function TodoList({ data }: { data: Todo[] }) {
  return (
    <List>
      {data.map(todo => <TodoItem key={todo.id} data={todo} />)}
    </List>
  )
}