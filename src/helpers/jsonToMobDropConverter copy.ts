import React from 'react';
import { dropdownIndicatorCSS } from 'react-select/src/components/indicators';
import { Drop } from '../types/interfaces/Drop';
import { ItemInMob } from '../types/interfaces/ItemInMob';

const jsonToMobDropConverter = (dropList: any) => {
    
   let dropToWrite: string = "";
     dropList.forEach((drop: Drop, index: number) => {
    dropToWrite += 
`
Group	monster_${index}
{
	Level_limit	${drop.level.min}
	Type	limit
	max_level	${drop.level.max}
	Mob	${drop.mob}
`
    drop.items.forEach((el: ItemInMob, index: number)=>{
        dropToWrite+=`	item	${el.id}	${el.amount}	${el.chance}\n`
    })
    dropToWrite+=`}`
     })
     displayDrop(dropToWrite)
    }

function displayDrop(final: string){
    const newTab = window.open();
    newTab!.document.open();
    newTab!.document.write('<html><body><pre>' + final + '</pre></body></html>');
    newTab!.document.close();
}
 
export default jsonToMobDropConverter;