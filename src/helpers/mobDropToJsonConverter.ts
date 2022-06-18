// @ts-nocheck
// @ts-ignore
export const convertMobDroptoJSON = (mobDrop: any) => {
    const tempResult: any = [];
    let actualMob = 0;
    let startReadDrop = false;
    mobDrop
            .split('\n')
            .map(el => {
                if(el.includes('}')){
                    startReadDrop = false;
                }
                if(startReadDrop){
                    let itemTab = el.split('\t');
                    tempResult.push({mob: parseInt(actualMob), item: {id: parseInt(itemTab[2]), amount: parseInt(itemTab[3]), chance: parseFloat(itemTab[4])}}) 
                }
                if(el.includes('Mob')){
                    actualMob = el.slice(5);
                    startReadDrop = true;
                }
            })

    const finalResult = tempResult
                        .reduce((p,n)=>{
                            try{
                                if(p[p.length-1].mob === n.mob)
                                    p[p.length-1].items.push(n.item);
                                else
                                    p.push({mob: n.mob, items:[n.item], level: {min: 1, max: 99}, gold: {min: 1, max: 99, chance: 10}})
                            }catch(e){
                                p.push({mob: n.mob, items:[n.item], level: {min: 1, max: 99}, gold: {min: 1, max: 99, chance: 10}})
                            }
                            
                            return p
                        }, [])
    return finalResult;
                        
}