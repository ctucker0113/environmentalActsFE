import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '20vh',
        padding: '30px',
        maxWidth: '700px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >

      <h1>Hello {user.fbUser.displayName}! </h1>
      <h2>Welcome to *website name*!</h2>
      <p>This website is for scheduleing and applying for events online</p>
    </div>
  );
}

export default Home;
