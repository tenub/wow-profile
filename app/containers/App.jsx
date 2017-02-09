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
		} catch (e) {
			if (cachedState) {
				cachedState = null;
				localStorage.removeItem('wowProfile');
			}
		}

		this.state = Object.assign({
			menuOpen: false,
			charInput: {
				type: '',

				region: '',
				realm: '',
				name: '',

				faction: '',
				race: '',
				class: ''
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
			realms: [],
			races: [],
			classes: []
		}, cachedState);

		console.log(this.state);

		this.handleMenuOpen = this.handleMenuOpen.bind(this);
		this.handleChangeRegion = this.handleChangeRegion.bind(this);
		this.handleChangeCharInput = this.handleChangeCharInput.bind(this);
		this.handleCharReset = this.handleCharReset.bind(this);
		this.handleCharSubmit = this.handleCharSubmit.bind(this);
	}

	componentDidMount() {
		Promise.all([
			fetch('/api/wow/data/races'),
			fetch('/api/wow/data/classes')
		])
			.then(([r1, r2]) => (
				!r1.ok || !r2.ok ? Promise.reject(new Error('Response not ok')) : Promise.all([
					r1.json(),
					r2.json()
				])
			))
			.then(([{ races }, { classes }]) => {
				this.setState({
					races,
					classes
				});
			})
			.catch((err) => {
				console.error(err);
			});
	}

	componentDidUpdate() {
		const { menuOpen, ...saveState } = this.state;
		localStorage.setItem('wowProfile', JSON.stringify(saveState));
	}

	handleMenuOpen() {
		this.setState({ menuOpen: !this.state.menuOpen });
	}

	handleChangeRegion(event) {
		this.setState({ charInput: Object.assign({}, this.state.charInput, { region: event.target.value }) }, () => {
			fetch(`/api/wow/realm?region=${this.state.charInput.region}`)
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

	handleChangeCharInput(event, key) {
		this.setState({ charInput: Object.assign({}, this.state.charInput, { [key]: event.target.value }) });
	}

	handleCharReset(event) {
		event.preventDefault();
		this.setState(Object.assign({}, this.state, {
			menuOpen: false,
			charInput: {
				region: '',
				realm: '',
				name: '',

				faction: '',
				race: '',
				class: ''
			},
			character: {
				status: 'idle'
			}
		}));
	}

	handleCharSubmit(event) {
		event.preventDefault();
		this.setState({ character: Object.assign({}, { status: 'loading' }) }, () => {
			fetch(`/api/wow/character/${this.state.charInput.realm}/${this.state.charInput.name}?region=${this.state.charInput.region}&fields=achievements,feed,guild,items,professions,progression,pvp,stats,talents`)
				.then((res) => (
					!res.ok ? Promise.reject(new Error('Response not ok')) : res.json()
				))
				.then((character) => {
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
					<div
						className={!this.state.menuOpen ? 'menu-opener fa fa-bars' : 'menu-opener fa fa-remove menu-opener-open'}
						onClick={this.handleMenuOpen}
					/>
					<nav className={!this.state.menuOpen ? 'menu menu-closed' : 'menu'}>
						<h1>Menu</h1>
						<div
							className="menu-item character-reset"
							onClick={this.handleCharReset}
						>
							<span className="fa fa-trash"></span>
							Clear cache
						</div>
					</nav>
				</header>
				<main>
					<div className="character">
						<form className="character-form" onSubmit={this.handleCharSubmit}>
							<fieldset className="character-fieldset">
								<button
									className={this.state.charInput.type === 'import' ? 'character-button character-button-selected' : 'character-button'}
									type="button"
									name="character-type"
									value="import"
									onClick={(e) => this.handleChangeCharInput(e, 'type')}
								>Import</button>
								<button
									className={this.state.charInput.type === 'new' ? 'character-button character-button-selected' : 'character-button'}
									type="button"
									name="character-type"
									value="new"
									onClick={(e) => this.handleChangeCharInput(e, 'type')}
								>New</button>
							</fieldset>
							{this.state.charInput.type === 'import' && <fieldset
								className="character-fieldset"
							>
								<select
									className="character-select"
									name="character-region"
									value={this.state.charInput.region}
									onChange={this.handleChangeRegion}
								>
									<option value="" disabled>Region</option>
									<option value="us">US</option>
									<option value="eu">EU</option>
								</select>
								<select
									className="character-select"
									name="character-realm"
									value={this.state.charInput.realm}
									onChange={(e) => this.handleChangeCharInput(e, 'realm')}
									disabled={!this.state.charInput.region.length}
								>
									<option value="" disabled>Realm</option>
									{this.state.realms.map(({ name: realmName, slug: realmSlug }, i) => (
										<option key={i} value={realmSlug}>{realmName}</option>
									))}
								</select>
								<input
									className="character-input"
									name="character-name"
									type="text"
									value={this.state.charInput.name}
									placeholder="Name"
									onChange={(e) => this.handleChangeCharInput(e, 'name')}
									disabled={!this.state.charInput.realm.length}
								/>
							</fieldset>}
							{this.state.charInput.type === 'new' && <fieldset
								className="character-fieldset"
							>
								<select
									className="character-select"
									name="character-faction"
									value={this.state.charInput.faction}
									onChange={(e) => this.handleChangeCharInput(e, 'faction')}
								>
									<option value="" disabled>Faction</option>
									<option value="alliance">Alliance</option>
									<option value="horde">Horde</option>
								</select>
								<select
									className="character-select"
									name="character-race"
									value={this.state.charInput.race}
									onChange={(e) => this.handleChangeCharInput(e, 'race')}
									disabled={!this.state.charInput.faction.length}
								>
									<option value="" disabled>Race</option>
									{this.state.races.filter(({ side }) => side === this.state.charInput.faction).map(({ id, name }, i) => (
										<option key={i} value={id}>{name}</option>
									))}
								</select>
								<select
									className="character-select"
									name="character-class"
									value={this.state.charInput.class}
									onChange={(e) => this.handleChangeCharInput(e, 'class')}
									disabled={!this.state.charInput.race.length}
								>
									<option value="" disabled>Class</option>
									{this.state.classes.map(({ id, name }, i) => (
										<option key={i} value={id}>{name}</option>
									))}
								</select>
							</fieldset>}
						</form>
						<Character
							{...this.state.charInput}
							{...this.state.character}
						/>
					</div>
				</main>
				<footer></footer>
			</div>
		);
	}
}

export default App;
