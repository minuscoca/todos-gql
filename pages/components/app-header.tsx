import { gql, useMutation } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { Todo } from "../../db/schema/todos";

const ADD_TODO = gql`
  mutation AddTodo($title: String!)  {
    addTodo(title: $title) {
      todo {
        id
        title
      }
    }
  }
`

function AddTodoDialog({ open, onClose }: { open: boolean, onClose: () => void }) {
  const [input, setInput] = useState('')
  const [addTodo] = useMutation<Todo>(
    ADD_TODO, {
    variables: { title: input },
    onCompleted: (data) => { console.log(data) }
  })

  const handleSave = async () => {
    await addTodo()
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add todo</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="todo"
          label="Todo"
          type="text"
          fullWidth
          variant="standard"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default function AppHeader() {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  return (
    <>
      <AppBar>
        <Toolbar>
          <Box flex={1}>
            <Typography variant="h6" component="div">
              Todos
            </Typography>
          </Box>
          <Tooltip title="Add todo">
            <IconButton
              size="large"
              edge="end"
              color="primary"
              aria-label="add-todo"
              onClick={handleOpen}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <AddTodoDialog open={open} onClose={handleClose} />
    </>
  )
}