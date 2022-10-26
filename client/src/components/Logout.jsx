import { Container } from 'react-bootstrap';
import { DetailsContext } from '../App';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Logout() {
  const [message, setMessage] = useState('');
  const { user, setUser, setGroup, setMeals, setRecipes } =
    useContext(DetailsContext);
  const navigate = useNavigate();

  useEffect(() => {
    submitLogout();
  }, []);

  async function submitLogout(body) {
    const res = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const json = await res.json();

    setMessage(json.message);

    if (res.ok) {
      localStorage.removeItem('user');
      localStorage.removeItem('group');

      setUser(null);
      setGroup(null);
      setMeals([]);
      setRecipes([]);
      navigate('/');
      // localStorage.setItem('loggedIn', true);

      return true;
    }
    throw json;
  }

  return (
    <Container>
      <h2>Logged Out</h2>
    </Container>
  );
}

export default Logout;
