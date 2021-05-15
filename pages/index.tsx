import React from 'react';

import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'

import styles from './index.module.scss';

import { decode, encode, NewBase } from '../utils/new-numeric-base';

interface PropsHome { }
interface StateHome {
	number: number;
	base: string;
}

class Home extends React.Component<PropsHome, StateHome>{

	constructor(props: PropsHome) {
		super(props);

		this.state = {
			number: 0,
			base: ''
		}
	}

	render() {
		return (
			<Layout>
				<Head>
					<title>{siteTitle}</title>
				</Head>
				<div className={styles.home}>
					<div>
						<label>Base 10</label>
						<input
							value={this.state.number}
							onChange={(e) => {
								const value = Number.parseInt(e.target.value.replace(/\D/g, '') || '0');
								this.setState({
									number: value,
									base: encode(value)
								})
							}}
						/>
					</div>
					<div>
						<label>Base {NewBase.base.length}</label>
						<input
							value={this.state.base}
							onChange={(e) => {
								const r = new RegExp('[^' + NewBase.base + ']', 'g');
								let value = e.target.value.replace(r, '');
								this.setState({
									number: decode(value),
									base: value
								})
							}}
						/>
					</div>
				</div>
			</Layout>
		)
	}
}

export default Home;
