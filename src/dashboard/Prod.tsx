import React from 'react';
import {MapBan} from '../types/schemas';
import {useReplicant} from './replicant';

const mapOptions = [
	'',
	'abyss',
	'ascent',
	'bind',
	'breeze',
	'fracture',
	'haven',
	'icebox',
	'lotus',
	'pearl',
	'split',
	'sunset'
];

const sideOptions = [
	'',
	'ATK',
	'DEF'
];

const bestOfOptions = [1, 3, 5];

function capitalize(s: string): string {
	return s.charAt(0).toUpperCase() + s.slice(1);
}

export function Prod() {
	let [data, setData, updateData] = useReplicant<MapBan>('mapBan');

	if (!data) {
		return <p>Loading...</p>;
	}

	let resetData = () => {
		setData(prev => ({
			...prev,
			map1: undefined,
			map2: undefined,
			map3: undefined,
			map4: undefined,
			map5: undefined,
			map6: undefined,
			map7: undefined,
			side1: undefined,
			side2: undefined,
			side3: undefined,
			side4: undefined,
			side5: undefined,
		}));
	};

	let rounds: {
		label: string;
		mapField: keyof MapBan;
		sideField?: keyof MapBan;
	}[] = [];

	if (data.bestOf === 1) {
		rounds = [
			{ label: 'Team A Ban', mapField: 'map1' },
			{ label: 'Team B Ban', mapField: 'map2' },
			{ label: 'Team A Ban', mapField: 'map3' },
			{ label: 'Team B Ban', mapField: 'map4' },
			{ label: 'Team A Ban', mapField: 'map5' },
			{ label: 'Team B Ban', mapField: 'map6' },
			{ label: 'Decider', mapField: 'map7', sideField: 'side1' }
		];
	} else if (data.bestOf === 3) {
		rounds = [
			{ label: 'Team A Ban', mapField: 'map1' },
			{ label: 'Team B Ban', mapField: 'map2' },
			{ label: 'Team A Pick', mapField: 'map3', sideField: 'side1' },
			{ label: 'Team B Pick', mapField: 'map4', sideField: 'side2' },
			{ label: 'Team A Ban', mapField: 'map5' },
			{ label: 'Team B Ban', mapField: 'map6' },
			{ label: 'Decider', mapField: 'map7', sideField: 'side3' }
		];
	} else if (data.bestOf === 5) {
		rounds = [
			{ label: 'Team A Ban', mapField: 'map1' },
			{ label: 'Team B Ban', mapField: 'map2' },
			{ label: 'Team A Pick', mapField: 'map3', sideField: 'side1' },
			{ label: 'Team B Pick', mapField: 'map4', sideField: 'side2' },
			{ label: 'Team A Pick', mapField: 'map5', sideField: 'side3' },
			{ label: 'Team B Pick', mapField: 'map6', sideField: 'side4' },
			{ label: 'Decider', mapField: 'map7', sideField: 'side5' }
		];
	}

	return (
		<div style={{ padding: '1rem' }}>
			{/* Teams */}
			<div>
				<label>
					Team A:&nbsp;
					<input
						type="text"
						maxLength={4}
						value={data.teamA}
						onChange={(e) =>
							setData((prev) => ({
								...prev,
								teamA: e.target.value.toUpperCase()
							}))
						}
					/>
				</label>
			</div>
			<div>
				<label>
					Team B:&nbsp;
					<input
						type="text"
						maxLength={4}
						value={data.teamB}
						onChange={(e) =>
							setData((prev) => ({
								...prev,
								teamB: e.target.value.toUpperCase()
							}))
						}
					/>
				</label>
			</div>

			{/* Best Of Selection */}
			<div style={{ marginTop: '1rem' }}>
				<label>Best Of:&nbsp;</label>
				{bestOfOptions.map((option) => (
					<label key={option} style={{ marginRight: '1rem' }}>
						<input
							type="radio"
							name="bestOf"
							checked={data.bestOf === option}
							onChange={() =>
								setData((prev) => ({
									...prev,
									bestOf: option
								}))
							}
						/>{' '}
						{option}
					</label>
				))}
			</div>

			<hr />

			{/* Rounds */}
			{rounds.map((round, index) => (
				<div key={index} style={{ marginBottom: '1rem' }}>
					<h3>
						Round {index + 1}: {round.label}
					</h3>
					<div>
						<label>
							Map:&nbsp;
							<select
								value={data[round.mapField] || ''}
								onChange={(e) =>
									setData((prev) => ({
										...prev,
										[round.mapField]: e.target.value || undefined
									}))
								}
							>
								{mapOptions.map((map) => (
									<option key={map} value={map}>
										{map === '' ? 'Select Map' : capitalize(map)}
									</option>
								))}
							</select>
						</label>
					</div>
					{round.sideField && (
						<div>
							<label>
								Side:&nbsp;
								<select
									value={data[round.sideField] || ''}
									onChange={(e) =>
										setData((prev) => ({
											...prev,
											[round.sideField as string]: e.target.value || undefined
										}))
									}
								>
									{sideOptions.map((side) => (
										<option key={side} value={side}>
											{side === '' ? 'Select Side' : side}
										</option>
									))}
								</select>
							</label>
						</div>
					)}
				</div>
			))}

			{/* Update Button */}
			<button onClick={updateData}>Update</button>
			<button onClick={resetData}>Reset</button>
		</div>
	);
}
