import Layout from '../components/layout';

const About = () => {
    const pageConfig = {
        title: 'About',
    };
    return (
        <Layout pageConfig={pageConfig}>
            <h2>About Us</h2>
            <p>
                Sunt nisi ad magna in ex cillum dolor consequat culpa cillum
                duis voluptate. Exercitation id ad dolore ea nisi laboris amet.
                Eu nostrud labore voluptate et pariatur consectetur ea ullamco.
            </p>
        </Layout>
    );
}

export default About;