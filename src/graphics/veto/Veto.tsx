// @ts-ignore

import {Ban} from './components/Ban';

import './veto.css';

import {Pick} from './components/Pick';

// @ts-ignore
import abyssImg from './maps/abyss.jpg';
// @ts-ignore
import ascentImg from './maps/ascent.jpg';
// @ts-ignore
import bindImg from './maps/bind.jpg';
// @ts-ignore
import breezeImg from './maps/breeze.jpg';
// @ts-ignore
import fractureImg from './maps/fracture.jpg';
// @ts-ignore
import havenImg from './maps/haven.jpg';
// @ts-ignore
import iceboxImg from './maps/icebox.jpg';
// @ts-ignore
import lotusImg from './maps/lotus.jpg';
// @ts-ignore
import pearlImg from './maps/pearl.jpg';
// @ts-ignore
import splitImg from './maps/split.jpg';
// @ts-ignore
import sunsetImg from './maps/sunset.jpg';
import React from 'react';
import {useReplicant} from '../replicant';
import {MapBan} from '../../types/schemas';

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

function resolveFooterWidth(bestOf?: number): string {
	if (bestOf) {
		// @ts-ignore
		switch (bestOf) {
			case 1:
				return '900px';
			case 3:
				return '1150px';
			case 5:
				return '1400px';
		}
	}
	return '0px';
}

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


function Veto() {
	let data = useReplicant<MapBan>('mapBan');

	if (data === undefined) {
		return <p>Loading...</p>;
	}

	return (
		<div className="maps">
			<div className="grid">
				<div className="double-cell">
					<Ban teamName={data.teamA} mapName={data.map1} img={resolveImage(data.map1)} shown={data.map1 !== undefined}/>
					<Ban teamName={data.teamB} mapName={data.map2} img={resolveImage(data.map2)} shown={data.map2 !== undefined}/>
				</div>

				{data.bestOf === 1 && (
					<div className="double-cell">
						<Ban teamName={data.teamA} mapName={data.map3} img={resolveImage(data.map3)}
								 shown={data.map3 !== undefined}/>
						<Ban teamName={data.teamB} mapName={data.map4} img={resolveImage(data.map4)}
								 shown={data.map4 !== undefined}/>
					</div>
				)}
				{data.bestOf !== 1 && (
					<>
						<Pick teamName={data.teamA} mapName={data.map3} img={resolveImage(data.map3)}
									side={resolveSide(data.teamB, data.side1)} shown={data.map3 !== undefined}/>
						<Pick teamName={data.teamB} mapName={data.map4} img={resolveImage(data.map4)}
									side={resolveSide(data.teamA, data.side2)} shown={data.map4 !== undefined}/>
					</>
				)}

				{data.bestOf !== 5 && (
					<div className="double-cell">
						<Ban teamName={data.teamA} mapName={data.map5} img={resolveImage(data.map5)}
								 shown={data.map5 !== undefined}/>
						<Ban teamName={data.teamB} mapName={data.map6} img={resolveImage(data.map6)}
								 shown={data.map6 !== undefined}/>
					</div>
				)}
				{data.bestOf === 5 && (
					<>
						<Pick teamName={data.teamA} mapName={data.map5} img={resolveImage(data.map5)}
									side={resolveSide(data.teamB, data.side3)} shown={data.map5 !== undefined}/>
						<Pick teamName={data.teamB} mapName={data.map6} img={resolveImage(data.map6)}
									side={resolveSide(data.teamA, data.side4)} shown={data.map6 !== undefined}/>
					</>
				)}

				<Pick teamName="Decider" mapName={data.map7} img={resolveImage(data.map7)}
							side={resolveSide(data.teamA, data.bestOf === 1 ? data.side1 : (data.bestOf === 3 ? data.side3 : data.side5))}
							shown={data.map7 !== undefined}/>
			</div>
			<div className="footer" style={{width: resolveFooterWidth(data.bestOf)}}></div>
		</div>
	);
}

export default Veto;
