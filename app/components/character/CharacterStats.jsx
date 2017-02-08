import React from 'react';

import decamel from '../../../lib/decamel';

import './CharacterStats.css';

export default ({ stats }) => (
	<section className="character-stats">
		<h1>Stats</h1>
		{Object.entries(stats).map(([key, value], i) => (
			<div key={i} className={`character-stats-${key}`}>
				<span className="character-label">{decamel(key)}:</span> {value}
			</div>
		))}
	</section>
);
