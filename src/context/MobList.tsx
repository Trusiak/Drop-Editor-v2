
// @ts-nocheck
import React, { createContext, useReducer } from 'react';
import useUpdateMobDropCopy from '../helpers/useUpdateMobDropCopy';
import { ItemInMob } from '../types/interfaces/ItemInMob';
import MobListReducer from './MobListReducer';

 const initialState = {
    mobDropList: [],
    mobId: 0
} 

interface IinitialState {
  mobDropList: ItemInMob[],
  mobId: number
}

export const MobListContext = createContext<IinitialState>(initialState);

// @ts-ignore
export const MobListProvider = ({children}) => {
    const [state, dispatch] = useReducer(MobListReducer, initialState);

    function addLocalDrop(drop: any){
      dispatch({
          type: 'ADD_LOCAL_DROP',
          payload: drop
      });
    }

    function addItem2(item: any){
      dispatch({
        type: 'ADD_ITEM',
        payload: {item}
    });
    }

    function editItem2(updatedItem: any, item: any){
       dispatch({
          type: 'EDIT_ITEM_IN_MOB',
          payload: {updatedItem, item}
      }); 
    }

    function deleteItem2(item: any){
      dispatch({
          type: 'DELETE_ITEM_FROM_MOB',
          payload: {item}
      });
    }

    function saveLocalDropToSessionStorage(mob: number){
      dispatch({
        type: 'SAVE_LOCAL_DROP_TO_SESSION_STORAGE',
        payload: {mob}
    });
    }

   
  
    return (
        <MobListContext.Provider value={{
            mobDropList: state.mobDropList,
            addLocalDrop,
            editItem2, 
            addItem2,
            deleteItem2,
            saveLocalDropToSessionStorage
          }}>
          {children}
        </MobListContext.Provider>)
}

