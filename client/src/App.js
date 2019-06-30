import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "reactstrap";
import AppNavbar from "./components/AppNavbar";
import ItemModal from "./components/ItemModal";
import ShoppingList from "./components/ShoppingList";
import { ItemProvider } from "./contexts/ItemContext";
import { LoadingProvider } from "./contexts/LoadingContext";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LoadingProvider>
          <ItemProvider>
            <AppNavbar />
            <Container>
              <ItemModal />
              <ShoppingList />
            </Container>
          </ItemProvider>
        </LoadingProvider>
      </header>
    </div>
  );
}

export default App;
