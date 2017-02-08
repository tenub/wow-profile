import Promise from 'bluebird';
import React, { Component } from 'react';
import 'normalize.css';

import { Character } from '../components/character';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		let cachedState;

		try {
			cachedState = JSON.parse(localStorage.getItem('wowProfile'));

			console.log(cachedState);

			if (cachedState) {
				this.state = cachedState;
			}
		} catch (e) {
			cachedState = null;
		}

		this.state = cachedState || {
			menuOpen: false,
			input: {
				region: '',
				realm: '',
				name: ''
			},
			character: {
				status: 'idle',
				lastModified: null,
				name: '',
				realm: '',
				battlegroup: '',
				class: '',
				race: '',
				gender: '',
				level: null,
				achievementPoints: null,
				thumbnail: '',
				calcClass: '',
				faction: '',
				totalHonorableKills: null,
				achievements: {},
				feed: {},
				guild: {},
				items: {},
				professions: {},
				progression: {},
				pvp: {},
				stats: {},
				talents: {}
			},
			realms: []
		};

		this.handleMenuOpen = this.handleMenuOpen.bind(this);
		this.handleChangeRegion = this.handleChangeRegion.bind(this);
		this.handleChangeRealm = this.handleChangeRealm.bind(this);
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleCharReset = this.handleCharReset.bind(this);
		this.handleCharSubmit = this.handleCharSubmit.bind(this);
	}

	componentDidUpdate() {
		const { menuOpen, ...saveState } = this.state;
		localStorage.setItem('wowProfile', JSON.stringify(saveState));
	}

	handleMenuOpen() {
		this.setState({ menuOpen: !this.state.menuOpen });
	}

	handleChangeRegion(event) {
		this.setState({ input: Object.assign({}, this.state.input, { region: event.target.value }) }, () => {
			fetch(`/api/realm?region=${this.state.input.region}`)
				.then((res) => (
					!res.ok ? Promise.reject(new Error('Response not ok')) : res.json()
				))
				.then(({ realms }) => {
					this.setState({ realms });
				})
				.catch((err) => {
					console.error(err);
				});
		});
	}

	handleChangeRealm(event) {
		this.setState({ input: Object.assign({}, this.state.input, { realm: event.target.value }) });
	}

	handleChangeName(event) {
		this.setState({ input: Object.assign({}, this.state.input, { name: event.target.value }) });
	}

	handleCharReset(event) {
		event.preventDefault();
		this.setState({
			menuOpen: false,
			input: {
				region: '',
				realm: '',
				name: ''
			},
			character: {
				status: 'idle'
			}
		});
	}

	handleCharSubmit(event) {
		event.preventDefault();
		this.setState({ character: Object.assign({}, { status: 'loading' }) }, () => {
			fetch(`/api/character/${this.state.input.realm}/${this.state.input.name}?region=${this.state.input.region}&fields=achievements,feed,guild,items,professions,progression,pvp,stats,talents`)
				.then((res) => (
					!res.ok ? Promise.reject(new Error('Response not ok')) : res.json()
				))
				.then((character) => {
					console.info(character);
					this.setState({ character: Object.assign({}, character, { status: 'loaded' }) });
				})
				.catch(() => {
					this.setState({ character: Object.assign({}, { status: 'error' }) });
				});
		});
	}

	render() {
		return (
			<div className="app">
				<header>
					<div className={!this.state.menuOpen ? 'menu-opener fa fa-bars' : 'menu-opener fa fa-remove menu-opener-open'} onClick={this.handleMenuOpen}></div>
					<nav className={!this.state.menuOpen ? 'menu menu-closed' : 'menu'}>
						<h1>Menu</h1>
						<div className="menu-item user-input-reset" onClick={this.handleCharReset}>
							<span className="fa fa-trash"></span>
							Clear cache
						</div>
					</nav>
				</header>
				<main>
					<form className="user-input" onSubmit={this.handleCharSubmit}>
						<select className="user-input-region" value={this.state.input.region} onChange={this.handleChangeRegion}>
							<option value="" disabled>Region</option>
							<option value="us">US</option>
							<option value="eu">EU</option>
						</select>
						<select className="user-input-realm" value={this.state.input.realm} onChange={this.handleChangeRealm} disabled={!this.state.input.region.length}>
							<option value="" disabled>Realm</option>
							{this.state.realms.map(({ name: realmName, slug: realmSlug }, i) => (
								<option key={i} value={realmSlug}>{realmName}</option>
							))}
						</select>
						<input className="user-input-name" type="text" value={this.state.input.name} placeholder="Name" onChange={this.handleChangeName} disabled={!this.state.input.realm.length}/>
					</form>
					<Character {...this.state.input} {...this.state.character} />
				</main>
				<footer></footer>
			</div>
		);
	}
}

export default App;
