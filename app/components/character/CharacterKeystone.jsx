import React from 'react';

import './CharacterKeystone.css';

export default ({ charCriteriaQuantity }) => (
	<section className="character-keystone">
		<h1>Keystone</h1>
		<div className="character-keystone-2">
			<span className="character-label">2+:</span> {charCriteriaQuantity(33096)}
		</div>
		<div className="character-keystone-5">
			<span className="character-label">5+:</span> {charCriteriaQuantity(33097)}
		</div>
		<div className="character-keystone-10">
			<span className="character-label">10+:</span> {charCriteriaQuantity(33098)}
		</div>
		<div className="character-keystone-15">
			<span className="character-label">15+:</span> {charCriteriaQuantity(32028)}
		</div>
	</section>
);
