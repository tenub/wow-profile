import React, { Component } from 'react';

import {
	CharacterProfile,
	CharacterStats,
	CharacterProfessions,
	CharacterKeystone
} from './';

import './Character.css';

class Character extends Component {
	constructor(props) {
		super(props);

		this.charCriteriaQuantity = this.charCriteriaQuantity.bind(this);
	}

	charCriteriaQuantity(id) {
		return (this.props.achievements && this.props.achievements.criteriaQuantity) ? this.props.achievements.criteriaQuantity[this.props.achievements.criteria.indexOf(id)] || 0 : 0;
	}

	render() {
		return (
			<div className={`character ${this.props.status}`}>
				<CharacterProfile
					region={this.props.region}

					lastModified={this.props.lastModified}
					charName={this.props.name}
					realm={this.props.realm}
					battlegroup={this.props.battlegroup}
					charClass={this.props.class}
					charRace={this.props.race}
					charGender={this.props.gender}
					charLevel={this.props.level}
					achievementPoints={this.props.achievementPoints}
					thumbnail={this.props.thumbnail}
					calcClass={this.props.calcClass}
					faction={this.props.faction}
					totalHonorableKills={this.props.totalHonorableKills} />
				<CharacterStats
					stats={this.props.stats} />
				<CharacterProfessions
					{...this.props.professions} />
				<CharacterKeystone
					charCriteriaQuantity={this.charCriteriaQuantity} />
			</div>
		);
	}
}

export default Character;
