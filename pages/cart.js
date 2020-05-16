import React from 'react';
import { withRedux } from '../lib/redux';
import Layout from '../components/layout';
import { useSelector } from 'react-redux';

const Cart = () => {
    const pageConfig = {
        title: "Shopping Cart"
    }

    const cart = useSelector(state => state.cart);

    console.log(cart);
    
    return (
        <Layout pageConfig={pageConfig}>
            <div className="checkout-cart-index">
                <h3>Shopping Cart</h3>
                <div className="cart-items">
                    <table>
                        <thead>
                            <td className="width-half">Product</td>
                            <td className="width-half">Price</td>
                        </thead>
                        <tbody>
                            {cart.map(item => (
                                <tr>
                                    <td>
                                        <img className="cart-item-image" src={item.image} /><br />
                                        <p>{item.name}</p>
                                        <p>{item.sku}</p>
                                    </td>
                                    <td>
                                        <p>{item.price.currency}&nbsp;{item.price.value}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}

export default (withRedux)(Cart);