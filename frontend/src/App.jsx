import { Routes, Route } from "react-router-dom";
import { Layout } from "./Layout";
import { Toaster } from "react-hot-toast";

import { AuthorPage } from "./pages/AuthorPage";
import { EditAuthor } from "./components/EditAuthor";
import { AddAuthor } from "./components/AddAuthor";
import { Chart } from "./components/Chart";
import { NotFound } from "./pages/NotFound";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/charts" element={<Chart />} />
          <Route path="/authors" element={<AuthorPage />} />
          <Route path="/authors/add" element={<AddAuthor />} />
          <Route path="/authors/edit/:id" element={<EditAuthor />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
