import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import ItemModal from "./components/ItemModal";
import ShoppingList from "./components/ShoppingList";
import { ItemProvider } from "./contexts/ItemContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import { ErrorProvider } from "./contexts/ErrorContext";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ErrorProvider>
          <UserProvider>
            <LoadingProvider>
              <ItemProvider>
                <AppNavbar />
                <ItemModal />
                <ShoppingList />
              </ItemProvider>
            </LoadingProvider>
          </UserProvider>
        </ErrorProvider>
      </header>
    </div>
  );
}

export default App;
