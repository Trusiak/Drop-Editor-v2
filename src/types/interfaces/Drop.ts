import { ItemInMob } from "./ItemInMob";
import { GoldDrop } from "./GoldDrop";
import { LevelDrop } from "./LevelDrop";

export interface Drop {
    /** Gold */
    gold: GoldDrop,
    /** Level of drops occurs */
    level: LevelDrop,
    /** Array of item in mob */
    items: ItemInMob[],
    /** ID of mob*/
    mob: number
}