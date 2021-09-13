const OrderIndex = ({ orders }) => {
    const ordersList = orders.map(order => {
        return (
          <tr key={order.id}>
            <td>{order.ticket.title}</td>
            <td>{order.ticket.price}</td>
            <td>{order.status}</td>
          </tr>
        )
      });
    return <>
        <h1>Orders</h1>
        <table className="table">
        <thead>
            <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {ordersList}
        </tbody>
        </table>
    </>
}

OrderIndex.getInitialProps = async (context, client) => {
    const { data } = await client.get('/api/orders');
    return { orders: data };
}

export default OrderIndex;