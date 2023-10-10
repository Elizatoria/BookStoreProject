import { useContext, useState, FormEvent, ChangeEvent } from "react";
import { AccessTokenContext } from "../../Contexts/AccessTokenContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  /**
   * Handling authentication
   */
  const { login } = useContext(AccessTokenContext);
  const navigate = useNavigate();

  /**
   * User input
   */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  /**
   * Handling AJAX loading and errors
   */
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await axios.request({
        method: "POST",
        url: "/api/signin",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          username,
          password,
        },
      });
      /**
       * If login is successful,
       * getting the JWT token and expiry time from the response
       */
      const { token } = response.data;
      if (!token) throw Error("Missing JWT token");
      login(token);
      /**
       * And redirecting to the home page
       */
      navigate("/bookshelf", { replace: true });
    } catch (error) {
      console.error(error);
      /**
       * If the response returns an HTTP status of 401 when loggin in, this means that username or password is incorrect
       */
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setErrorMessage("Invalid username or password");
      } else setErrorMessage("We are sorry. Unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-2 mb-5">
      <h2 className="page-title">A room without books is like a body without a soul. – Marcus Tullius Cicero</h2>
      <form className="form-inline mb-2" method="POST" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="mr-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form-control mr-3"
            required={true}
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="mr-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control mr-3"
            required={true}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>
        <div className="form-group">
        <button type="submit" className="btn btn-primary button-64" disabled={isLoading}>
          <span className="text">Login</span>
        </button>
        </div>
      </form>
      <p className="form-text">
        <small>
          The username is <em>hermione</em> and the password is{" "}
          <em>granger</em>
        </small>
      </p>
      <p className="form-text">
        <small>
          The username is <em>harry</em> and the password is{" "}
          <em>potter</em>
        </small>
          </p>
      {isLoading && <p>Loading ...</p>}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default Login;