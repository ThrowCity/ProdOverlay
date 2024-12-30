import React, {useEffect, useState} from 'react';
import {AbstractReplicant} from '@nodecg/types/shared/replicants.shared';

export function useReplicant<T>(id: string): [T | undefined, React.Dispatch<React.SetStateAction<T>>, () => void] {
	let data = nodecg.Replicant<T>(id);
	// @ts-ignore
	const [localData, setLocalData] = useState<T>(undefined);

	useEffect(() => {
		NodeCG.waitForReplicants(data).then(() => {
			// @ts-ignore
			setLocalData(data.value);
		});
	}, []);

	return [localData, setLocalData, () => {
		data.value = localData;
	}];
}

export function useUnloadedReplicant<T>(id: string): [T | undefined, React.Dispatch<React.SetStateAction<T>>, () => void, AbstractReplicant<'client', T, any, false>, () => void] {
	let data = nodecg.Replicant<T>(id);
	// @ts-ignore
	const [localData, setLocalData] = useState<T>(undefined);

	return [localData, setLocalData, () => {
		data.value = localData;
	}, data, () => {
		// @ts-ignore
		setLocalData(data.value)
	}];
}
