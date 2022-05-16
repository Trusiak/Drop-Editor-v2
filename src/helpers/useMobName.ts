import { useContext } from 'react';
import { removeIdFromName } from "./idRemover";
import { MobName } from '../types/interfaces/MobName';
import { GlobalContext } from "../context/GlobalState"

export const useMobName = (value: number) => {
    const { mobNames } = useContext(GlobalContext) as any;
    let mobName;

    try {
        mobName = mobNames.find((mob: MobName) => mob.value === value).label}
    catch(e){
        return `Potwór nieznany`}
        
    return removeIdFromName(mobName)
 }
