import React from 'react';
import {useReplicant} from './replicant';
import {MapBan} from '../types/schemas';

export function Index() {
	let data = useReplicant<MapBan>('mapBan');
	if (data === undefined) {
		return <p>Loading...</p>;
	}
	return (
		<>
			<p>{data.teamA}</p>
		</>
	);
}
