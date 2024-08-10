'use server';
import styles from '@/src/css/nav.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default async function NavBar() {
    return (
        <nav className={styles.nav}>
            <div className={styles.logocontainer}>
                <Image
                    className={styles.logo}
                    src='https://cdn.polarlab.app/src/img/polarlogo.png'
                    alt='alt'
                    width='128'
                    height='128'
                />
                <Link className={styles.logolink} href='https://polarlab.app/'>
                    Polar Lab
                </Link>
            </div>
            <div className={styles.navlinkcontainer}>
                <Link className={styles.navlink} href='/'>
                    Home
                </Link>
                <Link className={styles.navlink} href='https://docs.polarlab.app' prefetch={false}>
                    Docs
                </Link>
                <Link className={styles.navlink} href='https://polarlab.app/blog'>
                    Blog
                </Link>
                <Link className={styles.navlink} href='https://polarlab.app/discord'>
                    Discord
                </Link>
            </div>
            <div className={styles.usercontainer}>
                <Link className={styles.button} href='https://core.polarlab.app'>
                    Dashboard
                </Link>
            </div>
        </nav>
    );
}
