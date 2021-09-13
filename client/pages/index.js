import Link from 'next/link';
const  Index = ({ currentUser, tickets }) => {
  const ticketsList = tickets.map(ticket => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
        <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
          <a className="nav-link">View</a>
        </Link>
        </td>
      </tr>
    )
  });

  return <>
    <h1>Tickets</h1>
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {ticketsList}
      </tbody>
    </table>
  </>
}

Index.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets');
  return { tickets: data }
}

export default Index;
