import React from 'react';

import './CharacterStats.css';

export default ({ str, agi, int, sta }) => (
	<section className="character-stats">
		<h1>Stats</h1>
		<div className="character-stats-attributes">
			<h2>Attributes</h2>
			<div className="character-stats-stat">
				<span className="character-field-key">Strength:</span> {str}
			</div>
			<div className="character-stats-stat">
				<span className="character-field-key">Agility:</span> {agi}
			</div>
			<div className="character-stats-stat">
				<span className="character-field-key">Intellect:</span> {int}
			</div>
			<div className="character-stats-stat">
				<span className="character-field-key">Stamina:</span> {sta}
			</div>
		</div>
		{/*<div className="character-stats-attributes">
			<h2>Attack</h2>
			<div className="character-stats-stat">
				<span className="character-field-key">Strength:</span> {str}
			</div>
			<div className="character-stats-stat">
				<span className="character-field-key">Agility:</span> {agi}
			</div>
			<div className="character-stats-stat">
				<span className="character-field-key">Intellect:</span> {int}
			</div>
			<div className="character-stats-stat">
				<span className="character-field-key">Stamina:</span> {sta}
			</div>
		</div>
		<div className="character-stats-attributes">
			<h2>Spell</h2>
			<div className="character-stats-stat">
				<span className="character-field-key">Strength:</span> {str}
			</div>
			<div className="character-stats-stat">
				<span className="character-field-key">Agility:</span> {agi}
			</div>
			<div className="character-stats-stat">
				<span className="character-field-key">Intellect:</span> {int}
			</div>
			<div className="character-stats-stat">
				<span className="character-field-key">Stamina:</span> {sta}
			</div>
		</div>
		<div className="character-stats-attributes">
			<h2>Defense</h2>
			<div className="character-stats-stat">
				<span className="character-field-key">Strength:</span> {str}
			</div>
			<div className="character-stats-stat">
				<span className="character-field-key">Agility:</span> {agi}
			</div>
			<div className="character-stats-stat">
				<span className="character-field-key">Intellect:</span> {int}
			</div>
			<div className="character-stats-stat">
				<span className="character-field-key">Stamina:</span> {sta}
			</div>
		</div>
		<div className="character-stats-attributes">
			<h2>Enhancements</h2>
			<div className="character-stats-stat">
				<span className="character-field-key">Strength:</span> {str}
			</div>
			<div className="character-stats-stat">
				<span className="character-field-key">Agility:</span> {agi}
			</div>
			<div className="character-stats-stat">
				<span className="character-field-key">Intellect:</span> {int}
			</div>
			<div className="character-stats-stat">
				<span className="character-field-key">Stamina:</span> {sta}
			</div>
		</div>*/}
	</section>
);
