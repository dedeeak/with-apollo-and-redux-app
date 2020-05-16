import React from 'react';
import gql from 'graphql-tag';
import { withApollo } from '../lib/apollo';
import Layout from '../components/layout';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';

const CATEGORIES_QUERY = gql`
    {
        categoryList {
            children {
                id
                name
                children {
                    id
                    name
                    children {
                        id
                        name
                    }
                }
            }
        }
    }
`;

const Index = () => {
    const pageConfig = {
        title: "Homepage"
    }

    const { loading, data } = useQuery(CATEGORIES_QUERY, {
        fetchPolicy: 'network-only',
    });

    if(loading) {
        return <div>Loading...</div>
    }
    const categories = data.categoryList[0].children;
    
    return (
        <Layout pageConfig={pageConfig}>
            <div>
                <h1>Homepage</h1>
                <p>
                    Ut ea deserunt laborum aliqua anim deserunt quis do mollit
                    labore proident nisi. Elit ipsum non duis ipsum aute. Culpa
                    id minim occaecat elit eiusmod consequat elit mollit. Sit id
                    Lorem dolor veniam officia minim ipsum pariatur aute esse eu
                    duis qui ipsum.
                </p>
                <p>Categories:</p>
                <ul>
                    {categories.map((catLvl1) => (
                        <li key={catLvl1.id}>
                            <Link
                                href="/category/[id]"
                                as={`/category/${catLvl1.id}`}
                            >
                                <a>{catLvl1.name}</a>
                            </Link>
                            <ul>
                                {catLvl1.children.map((catLvl2) => (
                                    <li key={catLvl2.id}>
                                        <Link
                                            href="/category/[id]"
                                            as={`/category/${catLvl2.id}`}
                                        >
                                            <a>{catLvl2.name}</a>
                                        </Link>
                                        <ul>
                                            {catLvl2.children.map((catLvl3) => (
                                                <li key={catLvl3.id}>
                                                    <Link
                                                        href="/category/[id]"
                                                        as={`/category/${catLvl3.id}`}
                                                    >
                                                        <a>{catLvl3.name}</a>
                                                    </Link>
                                                    <ul></ul>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
}

export default (withApollo)(Index);