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

// … now import the .mp4 videos the same way:
// @ts-ignore
import abyssVid from './cinematics/abyss.mp4';
// @ts-ignore
import ascentVid from './cinematics/ascent.mp4';
// @ts-ignore
import bindVid from './cinematics/bind.mp4';
// @ts-ignore
import breezeVid from './cinematics/breeze.mp4';
// @ts-ignore
import fractureVid from './cinematics/fracture.mp4';
// @ts-ignore
import havenVid from './cinematics/haven.mp4';
// @ts-ignore
import iceboxVid from './cinematics/icebox.mp4';
// @ts-ignore
import lotusVid from './cinematics/lotus.mp4';
// @ts-ignore
import pearlVid from './cinematics/pearl.mp4';
// @ts-ignore
import splitVid from './cinematics/split.mp4';
// @ts-ignore
import sunsetVid from './cinematics/sunset.mp4';

import React, {useEffect, useRef, useState} from 'react';
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

export interface Videos {
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

export const videos: Videos = {
	abyss: abyssVid,
	ascent: ascentVid,
	bind: bindVid,
	breeze: breezeVid,
	fracture: fractureVid,
	haven: havenVid,
	icebox: iceboxVid,
	lotus: lotusVid,
	pearl: pearlVid,
	split: splitVid,
	sunset: sunsetVid,
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

const videoDelay = 0;

function Veto() {
	// ── ALL HOOKS AT THE TOP ────────────────────────────────────────────────────────

	// 1) replicant data
	const data = useReplicant<MapBan>('mapBan');

	// 2) two refs for the double‐buffered <video> elements
	const videoRefs = [
		useRef<HTMLVideoElement>(null),
		useRef<HTMLVideoElement>(null),
	];

	// 3) which <video> (0 or 1) is currently visible
	const [activeIdx, setActiveIdx] = useState<0 | 1>(0);

	// 4) track which URL (if any) each ref has already loaded
	const [loadedUrls, setLoadedUrls] = useState<[string | null, string | null]>([
		null,
		null,
	]);

	// ── NOW COMPUTE “rounds” EXACTLY AS IN YOUR CONTROL PANEL ───────────────────────
	let rounds: {
		label: string;
		mapField: keyof MapBan;
		sideField?: keyof MapBan;
	}[] = [];

	if (data) {
		if (data.bestOf === 1) {
			rounds = [
				{ label: 'Team A Ban', mapField: 'map1' },
				{ label: 'Team B Ban', mapField: 'map2' },
				{ label: 'Team A Ban', mapField: 'map3' },
				{ label: 'Team B Ban', mapField: 'map4' },
				{ label: 'Team A Ban', mapField: 'map5' },
				{ label: 'Team B Ban', mapField: 'map6' },
				{ label: 'Decider',    mapField: 'map7', sideField: 'side1' }
			];
		} else if (data.bestOf === 3) {
			rounds = [
				{ label: 'Team A Ban',  mapField: 'map1' },
				{ label: 'Team B Ban',  mapField: 'map2' },
				{ label: 'Team A Pick', mapField: 'map3', sideField: 'side1' },
				{ label: 'Team B Pick', mapField: 'map4', sideField: 'side2' },
				{ label: 'Team A Ban',  mapField: 'map5' },
				{ label: 'Team B Ban',  mapField: 'map6' },
				{ label: 'Decider',     mapField: 'map7', sideField: 'side3' }
			];
		} else if (data.bestOf === 5) {
			rounds = [
				{ label: 'Team A Ban',  mapField: 'map1' },
				{ label: 'Team B Ban',  mapField: 'map2' },
				{ label: 'Team A Pick', mapField: 'map3', sideField: 'side1' },
				{ label: 'Team B Pick', mapField: 'map4', sideField: 'side2' },
				{ label: 'Team A Pick', mapField: 'map5', sideField: 'side3' },
				{ label: 'Team B Pick', mapField: 'map6', sideField: 'side4' },
				{ label: 'Decider',     mapField: 'map7', sideField: 'side5' }
			];
		}
	}

	// ── FIND THE LATEST‐DEFINED “mapN” AND WHETHER IT’S A BAN OR PICK ───────────────
	let latestMap: string | undefined = undefined;
	let isBan = false; // default

	if (data) {
		for (let i = rounds.length - 1; i >= 0; i--) {
			const round = rounds[i];
			const val = data[round.mapField] as string | undefined;
			if (val) {
				latestMap = val;
				// If sideField is undefined, that round was a ban. Otherwise it's a pick/decider.
				isBan = round.sideField === undefined;
				break;
			}
		}
	}

	// ── LOOK UP “nextVideoUrl” BASED ON latestMap ───────────────────────────────────
	let nextVideoUrl: string | null = null;
	if (latestMap) {
		// @ts-ignore
		nextVideoUrl = videos[latestMap] || null;
	}

	// ── DOUBLE‐BUFFERING EFFECT: preload into inactive ref, then cut after 0.3 s ──────
	useEffect(() => {
		// If there’s no replicant data or no nextVideoUrl, do nothing:
		if (!data || !nextVideoUrl) {
			return;
		}

		// If the URL is already playing in the “active” video, skip:
		if (loadedUrls[activeIdx] === nextVideoUrl) {
			return;
		}

		// Which index is currently inactive?
		const inactiveIdx: 0 | 1 = activeIdx === 0 ? 1 : 0;
		const inactiveRef = videoRefs[inactiveIdx].current;
		if (!inactiveRef) {
			return;
		}

		// 1) Assign src to the inactive <video> so it starts buffering
		inactiveRef.src = nextVideoUrl;
		inactiveRef.preload = 'auto';
		inactiveRef.load();

		// 2) Once it’s fully buffered (“canplaythrough”), wait 300ms then swap
		const onCanPlay = () => {
			inactiveRef
				.play()
				.catch(() => {
					/* ignore autoplay errors */
				});

			setTimeout(() => {
				setActiveIdx(inactiveIdx);
				setLoadedUrls((prev) => {
					const copy: [string | null, string | null] = [prev[0], prev[1]];
					copy[inactiveIdx] = nextVideoUrl;
					return copy;
				});
			}, videoDelay);
		};

		inactiveRef.addEventListener('canplaythrough', onCanPlay, { once: true });

		return () => {
			inactiveRef.removeEventListener('canplaythrough', onCanPlay);
		};
	}, [nextVideoUrl, activeIdx, data, loadedUrls, videoRefs]);

	// ── IF DATA STILL LOADING, SHOW A PLACEHOLDER ─────────────────────────────────
	if (!data) {
		return <p>Loading...</p>;
	}

	return (
		<div className="veto-container">
			<video
				ref={videoRefs[0]}
				className="background-video"
				muted
				autoPlay
				loop
				playsInline
				style={{
					opacity: activeIdx === 0 ? 1 : 0,
					filter: isBan ? 'grayscale(100%)' : 'none'
				}}
			/>
			<video
				ref={videoRefs[1]}
				className="background-video"
				muted
				autoPlay
				loop
				playsInline
				style={{
					opacity: activeIdx === 1 ? 1 : 0,
					filter: isBan ? 'grayscale(100%)' : 'none'
				}}
			/>
			<div className="maps">
				<div className="grid">
					<div className="double-cell">
						<Ban teamName={data.teamA} mapName={data.map1 || ''} img={resolveImage(data.map1)} shown={data.map1 !== undefined}/>
						<Ban teamName={data.doubleABan ? data.teamA : data.teamB} mapName={data.map2 || ''} img={resolveImage(data.map2)} shown={data.map2 !== undefined}/>
					</div>

					{data.bestOf === 1 && (
						<div className="double-cell">
							<Ban teamName={data.teamA} mapName={data.map3 || ''} img={resolveImage(data.map3)}
									 shown={data.map3 !== undefined}/>
							<Ban teamName={data.teamB} mapName={data.map4 || ''} img={resolveImage(data.map4)}
									 shown={data.map4 !== undefined}/>
						</div>
					)}
					{data.bestOf !== 1 && (
						<>
							<Pick teamName={data.teamA} mapName={data.map3 || ''} img={resolveImage(data.map3)}
										side={resolveSide(data.teamB, data.side1)} shown={data.map3 !== undefined}/>
							<Pick teamName={data.teamB} mapName={data.map4 || ''} img={resolveImage(data.map4)}
										side={resolveSide(data.teamA, data.side2)} shown={data.map4 !== undefined}/>
						</>
					)}

					{data.bestOf !== 5 && (
						<div className="double-cell">
							<Ban teamName={data.teamA} mapName={data.map5 || ''} img={resolveImage(data.map5)}
									 shown={data.map5 !== undefined}/>
							<Ban teamName={data.teamB} mapName={data.map6 || ''} img={resolveImage(data.map6)}
									 shown={data.map6 !== undefined}/>
						</div>
					)}
					{data.bestOf === 5 && (
						<>
							<Pick teamName={data.teamA} mapName={data.map5 || ''} img={resolveImage(data.map5)}
										side={resolveSide(data.teamB, data.side3)} shown={data.map5 !== undefined}/>
							<Pick teamName={data.teamB} mapName={data.map6 || ''} img={resolveImage(data.map6)}
										side={resolveSide(data.teamA, data.side4)} shown={data.map6 !== undefined}/>
						</>
					)}

					<Pick teamName="Decider" mapName={data.map7 || ''} img={resolveImage(data.map7)}
								side={resolveSide(data.teamA, data.bestOf === 1 ? data.side1 : (data.bestOf === 3 ? data.side3 : data.side5))}
								shown={data.map7 !== undefined}/>
				</div>
				<div className="footer" style={{width: resolveFooterWidth(data.bestOf)}}></div>
			</div>
		</div>
	);
}

export default Veto;
