import { useNavigate } from "react-router-dom";

export const Error = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    }

    return (
        <div className="d-flex align-items-center justify-content-center">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
                <p className="lead">
                    The page you’re looking for doesn’t exist.
                  </p>
                  <button className="btn btn-info" onClick={handleClick} type="button">Go Home </button>
            </div>
        </div>
    );
}