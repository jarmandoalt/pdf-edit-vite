import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <div className='divLoader'>
      <div className="loader">
        <Spinner animation="grow" />
      </div>
    </div>
  );
}

export default Loader;
