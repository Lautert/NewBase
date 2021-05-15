import Head from 'next/head'
import styles from './layout.module.scss'

export const siteTitle = 'New Numeric Base'

export default function Layout({ children }) {
	return (
		<div className={styles.container}>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta name="og:title" content={siteTitle} />
			</Head>
			<main>{children}</main>
		</div>
	)
}
