import React from 'react';
import {ExampleReplicant} from '../types/schemas';
import {useReplicant} from './replicant';

export function Index() {
	let data = useReplicant<ExampleReplicant>('exampleReplicant');
	if (data === undefined) {
		return <p>Loading...</p>;
	}
	return (
		<>
			<p>{data.name}</p>
		</>
	);
}
