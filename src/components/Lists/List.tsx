import React, {useContext, useEffect, useLayoutEffect, useMemo, useState} from 'react';
import MobList from './MobList/MobList';
import ItemList from "./ItemList/ItemList"
import { GlobalContext } from './../../context/GlobalState';
import { Route, Switch } from 'react-router-dom';
import { Drop } from '../../types/interfaces/Drop';
import { MobListProvider } from '../../context/MobList';


interface ListProps {
    dropList: Drop[]
}
const List: React.FC<ListProps> = React.memo(({dropList}) => {
    const { firstRun } = useContext(GlobalContext) as any;
    const mobLists = firstRun ?
    dropList
        .map((drop: Drop, index:number) => {
         return (
            <MobListProvider>
                <MobList level={drop.level} items={drop.items} key={drop.mob} index={index+1} id={drop.mob}/>
            </MobListProvider>
         )
        })
    :
    dropList
        .sort((a:Drop, b:Drop)=>a.mob-b.mob)
        .map((drop: Drop, index:number) => {
            return (
                <MobListProvider>
                    <MobList level={drop.level} items={drop.items} key={drop.mob} index={index+1} id={drop.mob}/>
                </MobListProvider>
            )
        })

        return (
            <>
                <div className="List">
                    {console.log("★ LISTA GŁÓWNA ZOSTAŁA WYRENDEROWANA ★")}
                    <div className="wrapper">
                        <Switch>
                            <Route path="/" exact render={()=>mobLists} />
                            <Route path="/items/:id" component={ItemList} />
                            {<Route render={() => (
                                <>
                                    <div style={{color: 'gray', textAlign: 'center', fontSize: '55px'}}>404</div>
                                    <div style={{color: 'white',  textAlign: 'center', fontSize: '55px'}}>Nie ma takiej strony!</div>
                                    <div style={{color: 'white', textAlign: 'center', fontSize: '25px'}}>Coś Ci się pomyliło.</div>
                                </>
                            )} />}
                        </Switch>
                    </div>
                </div>
            </>
        )
  
}, (prevProps, nextProps) => { return (
    prevProps.dropList.length === nextProps.dropList.length)})

export default List;
