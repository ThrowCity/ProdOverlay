import React from 'react';
import {useReplicant} from '../replicant';
import {MapBan} from '../../types/schemas';

import { Ban } from './components/Ban';

import './styles.css';

import { Pick } from './components/Pick';

// @ts-ignore
import abyssImg from './maps/abyss_pick.png';
// @ts-ignore
import ascentImg from './maps/ascent_pick.png';
// @ts-ignore
import bindImg from './maps/bind_pick.png';
// @ts-ignore
import breezeImg from './maps/breeze_pick.png';
// @ts-ignore
import fractureImg from './maps/fracture_pick.png';
// @ts-ignore
import havenImg from './maps/haven_pick.png';
// @ts-ignore
import iceboxImg from './maps/icebox_pick.png';
// @ts-ignore
import lotusImg from './maps/lotus_pick.png';
// @ts-ignore
import pearlImg from './maps/pearl_pick.png';
// @ts-ignore
import splitImg from './maps/split_pick.png';
// @ts-ignore
import sunsetImg from './maps/sunset_pick.png';

export interface Images {
	abyss: string;
	ascent: string;
	bind: string;
	breeze: string;
	fracture: string;
	haven: string;
	icebox: string;
	lotus: string;
	pearl: string;
	split: string;
	sunset: string;
}

export const images: Images = {
	abyss: abyssImg,
	ascent: ascentImg,
	bind: bindImg,
	breeze: breezeImg,
	fracture: fractureImg,
	haven: havenImg,
	icebox: iceboxImg,
	lotus: lotusImg,
	pearl: pearlImg,
	split: splitImg,
	sunset: sunsetImg,
};

function resolveImage(image?: string): string {
	if (image) {
		// @ts-ignore
		return images[image] || '';
	}
	return '';
}

function resolveSide(team: string, side?: string): string {
	if (side) {
		return `${team} ${side}`;
	}
	return '';
}

export function Index() {
	let data = useReplicant<MapBan>('mapBan');

	if (data === undefined) {
		return <p>Loading...</p>;
	}

	let b3 = data.bestOf === 3;

	return (
		<div className="maps">
			<div className="grid">
				<div className="double-cell">
					<Ban teamName={data.teamA} img={resolveImage(data.map1)} shown={data.map1 !== undefined} />
					<Ban teamName={data.teamB} img={resolveImage(data.map2)} shown={data.map2 !== undefined} />
				</div>

				{data.bestOf === 1 && (
					<div className="double-cell">
						<Ban teamName={data.teamA} img={resolveImage(data.map3)} shown={data.map3 !== undefined} />
						<Ban teamName={data.teamB} img={resolveImage(data.map4)} shown={data.map4 !== undefined} />
					</div>
				)}
				{data.bestOf !== 1 && (
					<>
						<Pick teamName={data.teamA} img={resolveImage(data.map3)} side={resolveSide(data.teamB, data.side1)} shown={data.map3 !== undefined} />
						<Pick teamName={data.teamB} img={resolveImage(data.map4)} side={resolveSide(data.teamA, data.side2)} shown={data.map4 !== undefined} />
					</>
				)}

				{data.bestOf !== 5 && (
					<div className="double-cell">
						<Ban teamName={data.teamA} img={resolveImage(data.map5)} shown={data.map5 !== undefined} />
						<Ban teamName={data.teamB} img={resolveImage(data.map6)} shown={data.map6 !== undefined} />
					</div>
				)}
				{data.bestOf === 5 && (
					<>
						<Pick teamName={data.teamA} img={resolveImage(data.map5)} side={resolveSide(data.teamB, data.side3)} shown={data.map5 !== undefined} />
						<Pick teamName={data.teamB} img={resolveImage(data.map6)} side={resolveSide(data.teamA, data.side4)} shown={data.map6 !== undefined} />
					</>
				)}

				<Pick teamName="Decider" img={resolveImage(data.map7)} side={resolveSide(data.teamA, data.bestOf === 1 ? data.side1 : (data.bestOf === 3 ? data.side3 : data.side5))} shown={data.map7 !== undefined} />
			</div>
		</div>
	);
}
