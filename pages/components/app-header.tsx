import { AppBar, Toolbar, Typography } from "@mui/material";

export default function AppHeader() {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div">
          Todos
        </Typography>
      </Toolbar>
    </AppBar>
  )
}