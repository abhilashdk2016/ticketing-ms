import useRequest from '../../hooks/useRequest';
import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Router from 'next/router';

const ShowOrder = ({ order, currentUser }) => {
    const [timeLeft, setTimeLeft] = useState(0);
    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft / 1000));
        }
        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);
        return () => {
            clearInterval(timerId);
        }
    }, [order]);

    const { doRequest, errors } = useRequest({
        url: '/api/payments',
        method: 'post',
        body: { orderId: order.id },
        onSuccess: _ => Router.push('/orders')
    });
    return <>
        {timeLeft < 0 ? <div>Order Expired</div> : <div>
            <h1>Purchasing {order.ticket.title}</h1>
            Time left to pay: {timeLeft} seconds
            <br />
            <StripeCheckout token={({ id }) => doRequest({ token: id })} 
                stripeKey="pk_test_51J8slqSEhLOwuAOD0T5WhnXH0oa8sYDROi0b5ldH1o1XNCDC9LDH7QdC9dTcUA0v1fZG2iiPKVHBS9p22yQMndv400cS6GuGIH"
                amount={order.ticket.price}
                email={currentUser.email}
            />
            {errors}
        </div>}
    </>
}

ShowOrder.getInitialProps = async (context, client) => {
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);
    return { order: data };
}

export default ShowOrder;