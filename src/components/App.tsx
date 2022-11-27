import Navigation from "./Navigation";
import AppRoutes from "./AppRoutes";

function App() {
 
  return (
    <div className="App">
    <Navigation/>
    <div className="container d-flex w-100 flex-wrap">
        <AppRoutes/>
    </div>
</div>
  );
}

export default App;
