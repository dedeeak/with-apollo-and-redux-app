import Link from 'next/link';

const Navigation = () => {
    return (
        <div className="navigation-wrapper">
            <Link href="/">
                <a>Home</a>
            </Link>
            &nbsp; | &nbsp;
            <Link href="/category/[id]" as="/category/26">
                <a>Bras &amp; Tanks</a>
            </Link>
            &nbsp; | &nbsp;
            <Link href="/about-us">
                <a>About Us</a>
            </Link>
            &nbsp; | &nbsp;
            <Link href="/cart">
                <a>Cart</a>
            </Link>
        </div>
    );
}

export default Navigation;