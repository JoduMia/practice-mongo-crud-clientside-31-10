const { createBrowserRouter, createRoutesFromElements, Route } = require("react-router-dom");
const { default: Home } = require("../pages/Home/Home");

export const routes = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route index element={ <Home /> }
        loader={() => fetch('http://localhost:5000/foods')}
        />
    </Route>
))