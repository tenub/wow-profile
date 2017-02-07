import React from 'react';

import './CharacterKeystone.css';

export default ({ charCriteriaQuantity }) => (
	<section className="character-keystone">
		<h1>Keystone</h1>
		<div className="character-keystone-2">2+: {charCriteriaQuantity(33096)}</div>
		<div className="character-keystone-5">5+: {charCriteriaQuantity(33097)}</div>
		<div className="character-keystone-10">10+: {charCriteriaQuantity(33098)}</div>
		<div className="character-keystone-15">15+: {charCriteriaQuantity(32028)}</div>
	</section>
);
