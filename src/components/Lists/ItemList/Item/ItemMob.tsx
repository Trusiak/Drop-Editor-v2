import React, {useContext, useRef, useLayoutEffect} from 'react';
import { GlobalContext } from "../../../../context/GlobalState";
import amountIcon from "../../../../img/icon-amount.svg";
import chanceIcon from "../../../../img/icon-chance.svg";
import { removeIdFromName } from "../../../../helpers/idRemover";
import { createListElementAnimation } from "../../../../helpers/animations";
import { ItemMobProps } from './ItemMob.interface';
import { MobName } from '../../../../types/interfaces/MobName';
import { HashLink } from 'react-router-hash-link';

const ItemMob: React.FC<ItemMobProps> = ({mobData}) => {
    const {mobNames } = useContext(GlobalContext) as any;
    const itemMob = useRef(null);
    const getMobName = (value: number) => {
        let mobName: string = mobNames.find((mob: MobName) => mob.value === value).label
        return removeIdFromName(mobName)
    }
    useLayoutEffect(()=>{
        createListElementAnimation(itemMob.current)
    }, [])
    return (
        <HashLink to={`/#${mobData.id}`} 
          ref={itemMob} 
          scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'center' })}
          className="ItemMob">
                <h3 className="ItemMob__mob-title">{getMobName(mobData.id)}</h3>
                <p className="ItemMob__mob-id">({mobData.id})</p>
                <div className="ItemMob__link">
                    <img className="ItemMob__mob-image"  alt="ikona moba" src={`/../mobs/${mobData.id}.png`} onError={(e: any)=>{e.target.onerror = null; e.target.src="/images/unknown-icon.png"}}></img>
                </div>
                <div className="ItemMob__stats">
                    <div className="ItemMob__amount">
                        <img className="ItemMob__amount-icon"  alt="ikona ilosci" src={amountIcon}/>
                        <p className="ItemMob__amount-text">{mobData.count}x</p>
                    </div>
                    <div className="ItemMob__percent">
                        <img className="ItemMob__percent-icon"  alt="ikona procent" src={chanceIcon}/>
                        <p className="ItemMob__percent-text">{mobData.chance}%</p>
                    </div>
                </div>
            </HashLink>
    );
};

export default ItemMob;
