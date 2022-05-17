import React, { useRef, useLayoutEffect} from 'react';
import amountIcon from "../../img/icon-amount.svg";
import chanceIcon from "../../img/icon-chance.svg";
import { createListElementAnimation } from "../../helpers/animations";
import { ItemMobProps } from './ItemMob.interface';
import { useMobName } from '../../helpers/useMobName';
import { HashLink } from 'react-router-hash-link';


const ItemMob: React.FC<ItemMobProps> = ({mobData}) => {
    const itemMob = useRef(null);

    useLayoutEffect(()=>{
        createListElementAnimation(itemMob.current)
    }, [])
    
    return (
        <HashLink to={`/#${mobData.id}`} 
          ref={itemMob} 
          scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'center' })}
          className="ItemMob">
                <div className="ItemMob__text-content">
                    <h3 className="ItemMob__mob-title">{useMobName(mobData.id)}</h3>
                    <p className="ItemMob__mob-id">({mobData.id})</p>
                </div>
                <div className="ItemMob__link">
                    <img className="ItemMob__mob-image"  alt="ikona moba" src={`/../mobs/${mobData.id}.png`} onError={(e: any)=>{e.target.onerror = null; e.target.src="/images/unknown-icon.png"}}></img>
                </div>
                <div className="ItemMob__stats">
                    <div className="ItemMob__amount">
                        <img className="ItemMob__amount-icon"  alt="ikona ilosci" src={amountIcon}/>
                        <p className="ItemMob__amount-text">{mobData.amount}x</p>
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
