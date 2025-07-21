import { useLocation, useMatches, useMatch, Link, Outlet } from 'react-router';

const LayoutNavigation = () => {
  const location = useLocation();

  const matches = useMatches();

  console.log('matches', matches);

  const match = useMatch(location.pathname);

  console.log('match', match);

  console.log('location', location);

  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/myremote1">Myremote1</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default LayoutNavigation;
