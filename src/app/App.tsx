import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import {selectAppStatus, selectIsInitialized} from "./../../src/app/app.selectors";
import {ErrorSnackbar} from "./../../src/common/components";
import {selectIsLoggedIn} from "./../../src/features/auth/auth.selectors";
import {useActions} from "./../../src/common/hooks";
import {TodolistsList} from "./../../src/features/todolists-list/todolists-list";
import {authThunks} from "./../../src/features/auth/auth.reducer";
import {Login} from "./../../src/features/auth/Login/Login";


function App() {
  const status = useSelector(selectAppStatus);
  const isInitialized = useSelector(selectIsInitialized);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { initializeApp, logout } = useActions(authThunks);

  useEffect(() => {
    initializeApp({});
  }, []);

  const logoutHandler = () => logout({});

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <HashRouter>
      <div className="App">
        <ErrorSnackbar />
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
            <Typography variant="h6">News</Typography>
            {isLoggedIn && (
              <Button color="inherit" onClick={logoutHandler}>
                Log out
              </Button>
            )}
          </Toolbar>
          {status === "loading" && <LinearProgress />}
        </AppBar>
        <Container fixed>
          <Routes>
            <Route path={"/"} element={<TodolistsList />} />
            <Route path={"/login"} element={<Login />} />
          </Routes>
        </Container>
      </div>
    </HashRouter>
  );
}

export default App;
