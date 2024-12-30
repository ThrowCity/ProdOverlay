import {useEffect, useState} from 'react';
import {AbstractReplicant} from '@nodecg/types/shared/replicants.shared';

export function useReplicant<T>(id: string): T | undefined {
	let data = nodecg.Replicant<T>(id);
	let [localData, setLocalData] = useState<T | undefined>(undefined);

	useEffect(() => {
		let handler = () => setLocalData(data.value);
		NodeCG.waitForReplicants(data);
		data.on('change', handler);
		return () => data.off('change', handler);
	}, []);

	return localData;
}

export function useUnloadedReplicant<T>(id: string): [T | undefined, AbstractReplicant<'client', T, any, false>] {
	let data = nodecg.Replicant<T>(id);
	let [localData, setLocalData] = useState<T | undefined>(undefined);

	useEffect(() => {
		let handler = () => setLocalData(data.value);
		data.on('change', handler);
		return () => data.off('change', handler);
	}, []);

	return [localData, data];
}
