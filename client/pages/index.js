import buildClient from '../api/build-client';

const  Index = ({ currentUser }) => {
  console.log(currentUser)
  return <h1>Landing Page</h1>
}

Index.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
}

export default Index;
