import React from 'react';

import lpad from '../../../lib/lpad';

import './CharacterProfile.css';

function friendlyDate(date) {
	return `${date.getFullYear()}-${lpad(date.getMonth() + 1)}-${lpad(date.getDate())} ${lpad(date.getHours())}:${lpad(date.getMinutes())}`;
}

export default ({ region, lastModified, charName, realm, battlegroup, charClass, charRace, charGender, charLevel, achievementPoints, thumbnail, calcClass, faction, totalHonorableKills }) => {
	const lastModifiedText = friendlyDate(new Date(lastModified));
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
			<h1>
				Profile
			</h1>
			<a href={`http://${region}.battle.net/wow/character/${realm}/${charName}/`}>
				<img className="character-thumbnail" src={thumbnail ? `http://render-api-us.worldofwarcraft.com/static-render/us/${thumbnail}` : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='} alt={charName} />
			</a>
			<div className="character-info">
				<div className="character-desc">
					{charLevel} {charGenderName} {charRaceName} <span className={`character-class-${charClass}`}>{charClassName}</span>
				</div>
				<div className="character-date">
					<span className="character-label">Updated:</span> {lastModifiedText}
				</div>
				<div className="character-battlegroup">
					<span className="character-label">Battlegroup:</span> {battlegroup}
				</div>
				<div className="character-realm">
					<span className="character-label">Realm:</span> {realm}
				</div>
				<div className="character-points">
					<span className="character-label">Achievement Points:</span> {achievementPoints}
				</div>
				<div className="character-kills">
					<span className="character-label">Honorable Kills:</span> {totalHonorableKills}
				</div>
			</div>
		</section>
	);
};
