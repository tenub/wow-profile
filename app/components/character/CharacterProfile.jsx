import React from 'react';

import './CharacterProfile.css';

export default ({ lastModified, charName, realm, battlegroup, charClass, charRace, charGender, charLevel, achievementPoints, thumbnail, calcClass, faction, totalHonorableKills }) => {
	const charGenderName = charGender > 0 ? 'female' : 'male';
	const charFactionName = faction > 0 ? 'horde' : 'alliance';
	const charRaceName = (() => {
		switch (charRace) {
			case 1:
				return 'Human';
			case 2:
				return 'Orc';
			case 3:
				return 'Dwarf';
			case 4:
				return 'Night Elf';
			case 5:
				return 'Undead';
			case 6:
				return 'Tauren';
			case 7:
				return 'Gnome';
			case 8:
				return 'Troll';
			case 9:
				return 'Goblin';
			case 10:
				return 'Blood Elf';
			case 11:
				return 'Draenei';
			case 22:
				return 'Worgen';
			case 24:
			case 25:
			case 26:
				return 'Pandaren';
			default:
				return '{race}';
		}
	})();
	const charClassName = (() => {
		switch (charClass) {
			case 1:
				return 'Warrior';
			case 2:
				return 'Paladin';
			case 3:
				return 'Hunter';
			case 4:
				return 'Rogue';
			case 5:
				return 'Priest';
			case 6:
				return 'Death Knight';
			case 7:
				return 'Shaman';
			case 8:
				return 'Mage';
			case 9:
				return 'Warlock';
			case 10:
				return 'Monk';
			case 11:
				return 'Druid';
			case 12:
				return 'Demon Hunter';
			default:
				return '{class}';
		}
	})();

	return (
		<section className="character-profile">
			<h1>Profile</h1>
			<div className="character-date">
				{new Date(lastModified).toLocaleString()}
			</div>
			<div className="character-name">
				{charName}
			</div>
			<div className="character-realm">
				{realm}
			</div>
			<div className="character-battlegroup">
				{battlegroup}
			</div>
			<div className="character-extra">
				{charLevel} {charRaceName} <span className={`character-class-${charClass}`}>{charClassName}</span>
			</div>
			<div className="character-points">
				{achievementPoints}
			</div>
			<div className="character-kills">
				{totalHonorableKills}
			</div>
			<img className="character-thumbnail" src={thumbnail ? `http://render-api-us.worldofwarcraft.com/static-render/us/${thumbnail}a` : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='} alt={charName} />
		</section>
	);
};
