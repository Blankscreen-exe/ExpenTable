import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

// Constants
import appConstants from "../appConstants";

// Lazy-loaded Components
const Home = lazy(() => import("./home"));
const About = lazy(() => import("./about"));
const Form = lazy(() => import("./form/FormContainer"));
const Error404 = lazy(() => import("./common/Error404"));

function RoutesList() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path={appConstants.routes.home} element={<Home />} />
        <Route path={appConstants.routes.about} element={<About />} />
        <Route path={appConstants.routes.form} element={<Form />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  );
}

RoutesList.propTypes = {};
export default RoutesList;
