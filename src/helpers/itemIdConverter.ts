export const convertItemId = (id: any, name: any) => {
    const idlength = id.toString().length;
    let tempId = "";
    let itemId = ""
    let checkIfItemHaveUpgradeLevel = name.indexOf("+") + 1;

    if(checkIfItemHaveUpgradeLevel){
        if(id >= 28030 && id < 28443)
            itemId = checkIsStoneOfSoul(id)
        else
            itemId = removeItemUpgradeSystemPostfix(id)
    }
    else
        itemId = id

    if(idlength < 5){
        for(let i=0; i<5-idlength;i++){
            tempId += 0
        }
        tempId += itemId
        return tempId;
    }
    else
        return itemId;
}

function removeItemUpgradeSystemPostfix(id: any){
    let newId = id.toString().split("")
    newId[newId.length-1] = "0"
    return newId.join("");
}

function checkIsStoneOfSoul(id: any){
    if(id >= 28030 && id < 28443){
        if(id >= 28030 && id < 28044)
            id -= 30;
        else if (id >= 28130 && id < 28144)
            id -= 130;
        else if (id >= 28230 && id < 28244)
            id -= 230;
        else if (id >= 28330 && id < 28344)
            id -= 330;
        else if (id >= 28430 && id < 28444)
            id -= 430;

        return id
    }
    else {
        return id
    }
        
}
