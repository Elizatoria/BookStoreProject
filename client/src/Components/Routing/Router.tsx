import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import NavBar from "../NavBar/NavBar";

import Login from "../Login/Login";
import Bookshelf from "../Home/Bookshelf";

import Search from "../Search/Search";

import FileNotFound from "../FileNotFound/FileNotFound";

function Router() {
  return (
    <>
      <ProtectedRoute>
      <NavBar />
      </ProtectedRoute>

    <Routes>
    <Route path="/login" element={<Login />} />

      {/* The ProtectedRoute will redirect the user to the login form if they haven't logged in. */}
      <Route
        path="/bookshelf"
        element={
          <ProtectedRoute>
            <Bookshelf />
          </ProtectedRoute>
        }
      />

      <Route path="/search" 
      element={
        <ProtectedRoute>
          <Search />
        </ProtectedRoute>
      }
      />

      {/* If no matches, display a 404 File Not Found page if logged in. If not logged in, the <ProtectedRoute /> will redirect to the login form. */}
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <FileNotFound />
          </ProtectedRoute>
        }
      />
    </Routes>
    </>
  );
}

export default Router;