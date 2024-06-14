import { Link } from 'react-router-dom';

const AuthSelection = () => {
  return (
    <div>
      <h2>Movie Reconds</h2>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  );
};

export default AuthSelection;
