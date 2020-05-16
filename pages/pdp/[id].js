import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '../../lib/apollo';
import { withRedux } from '../../lib/redux';
import ReactHtmlParser from 'react-html-parser';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';
import Link from 'next/link';


const PRODUCT_QUERY = gql`
query getProduct($urlKey: String!) {
    products(filter: { url_key: { eq: $urlKey } }) {
        items {
            name
            sku
            stock_status
            description {
                html
            }
            image {
                url
                label
            }
            price_range {
                minimum_price {
                    regular_price {
                        currency
                        value
                    }
                    final_price {
                        currency
                        value
                    }
                }
            }
        }
    }
}
`;

const Pdp = () => {
    const router = useRouter();
    const { id } = router.query;

    const dispatch = useDispatch();
    
    const [classCart, setClassCart] = useState('hide');

    const { loading, data } = useQuery(PRODUCT_QUERY, {
        fetchPolicy: 'network-only',
        variables: {
            urlKey: id
        }
    });

    if(loading) {
        return <div>Loading...</div>
    }

    const productData = data.products.items[0];

    const pageConfig = {
        title: productData.name
    };

    const item = {
        sku: productData.sku,
        name: productData.name,
        image: productData.image.url,
        price: productData.price_range.minimum_price.final_price,
    }

    const addToCart = () => {
        dispatch({
            type: 'ADD_TO_CART',
            item
        });
        setClassCart("show");
    }

    return (
        <Layout pageConfig={pageConfig}>
            <div className="catalog-product-view">
                <h3>{productData.name}</h3>
                <img className="product-image" src={productData.image.url} alt={productData.image.label} />
                <p className="price">
                    {productData.price_range.minimum_price.final_price.currency}&nbsp;
                    {productData.price_range.minimum_price.final_price.value}
                </p>
                <p className="sku">
                    SKU : {productData.sku}
                </p>
                <div className="product-description">
                    {ReactHtmlParser(productData.description.html)}
                </div>
                <div className="button-wrapper">
                    <span className={classCart}>Added to&nbsp; 
                        <Link href="/cart">
                            <a className="link-underline">cart</a>
                        </Link>
                    </span>
                    <button onClick={() => addToCart()}>Add to cart</button>
                </div>
            </div>
        </Layout>
    );
}

export default compose(withRedux, withApollo)(Pdp);