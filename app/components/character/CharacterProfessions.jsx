import React from 'react';

import './CharacterProfessions.css';

export default ({ primary }) => (
	<section className="character-professions">
		<h1>Professions</h1>
		{primary.map((profession, i) => (
			<div key={i} className="character-profession">
				<span className="character-label">{profession.name}:</span> <meter min="0" max={profession.max} value={profession.rank}></meter>
			</div>
		))}
	</section>
);
