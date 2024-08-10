'use client';
import styles from './page.module.css';
import Earth from '@/components/earth';
import Sparkles from '@/components/sparkles';

export default function Page() {
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>The Polar Lab</h1>
            <h1 className={styles.header}>Content Delivery Network</h1>
            <div className={styles.earthwrapper} onClick={() => (window.location.href = '/browse')}>
                <div className={styles.inner}></div>
                <Earth />
            </div>
            <Sparkles />
        </div>
    );
}
