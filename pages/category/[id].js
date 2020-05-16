import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '../../lib/apollo';
import Link from 'next/link';

const CATEGORY_QUERY = gql`
    query getCategoryById($id: String!) {
        categoryList(filters: { ids: { eq: $id } }) {
            name
            url_key
            image_path
            description
            products {
                items {
                    id
                    name
                    url_key
                    description {
                        html
                    }
                    small_image {
                        url
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
    }
`;

const Category = () => {
    const router = useRouter();
    const { id } = router.query;

    const { loading, data } = useQuery(CATEGORY_QUERY, {
        fetchPolicy: 'network-only',
        variables: {
            id: id
        }
    });

    if(loading) {
        return <div>Loading...</div>
    }

    const categoryData = data.categoryList[0];
    const categoryProducts = data.categoryList[0].products.items;

    const pageConfig = {
        title: 'Category ' + categoryData.name
    };

    return (
        <Layout pageConfig={pageConfig}>
            <div className="catalog-product-list">
                <h2>{ categoryData.name }</h2>
                <img className="category-banner" src={categoryData.image_path} />
                <ul className="product-list">
                    {categoryProducts.map((product) => (
                        <li key={product.id}>
                            <img src={product.small_image.url} />
                            <Link
                                href="/pdp/[id]"
                                as={`/pdp/${product.url_key}`}
                            >
                                <a>{product.name}</a>
                            </Link>
                            <p>
                                {product.price_range.minimum_price.final_price.currency}&nbsp;
                                {product.price_range.minimum_price.final_price.value}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
}

export default (withApollo)(Category);