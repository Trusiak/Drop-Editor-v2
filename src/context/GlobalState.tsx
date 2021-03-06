// @ts-nocheck
import React, { createContext, useReducer } from 'react';
import { ItemInMob } from '../types/interfaces/ItemInMob';
import AppReducer from './AppReducer';

 const initialState = {
    activeList: "",
    addDrop: (dropList: any) => {},
    itemNames: [],
    mobNames: [],
    firstRun: false,
    firstRenderMobList: true,
    dropList: JSON.parse(localStorage.getItem("drop"))  || [
      {
        "mob": 101,
        "level": {
          "min": 1,
          "max": 15
        },
        "items": [
          {
            "id": 25040,
            "amount": 1,
            "chance": 20
          },
          {
            "id": 50513,
            "amount": 1,
            "chance": 1
          },
          {
            "id": 13087,
            "amount": 1,
            "chance": 1
          },
          {
            "id": 14221,
            "amount": 1,
            "chance": 1
          },
          {
            "id": 12396,
            "amount": 1,
            "chance": 1
          },
          {
            "id": 71045,
            "amount": 1,
            "chance": 3
          },
          {
            "id": 71044,
            "amount": 1,
            "chance": 1
          },
        ],
        "gold": 
          {
            "min": 36,
            "max": 84,
            "chance": 40
          }
        
      },
      {
        "mob": 102,
        "level": {
          "min": 2,
          "max": 16
        },
        "items": [
          {
            "id": 3079,
            "amount": 1,
            "chance": 1
          },
          {
            "id": 25040,
            "amount": 5,
            "chance": 33
          },
        ],
        "gold": 
          {
            "min": 36,
            "max": 84,
            "chance": 40
          }
        
      },
      {
        "mob": 104,
        "level": {
          "min": 2,
          "max": 16
        },
        "items": [
          {
            "id": 30061,
            "amount": 1,
            "chance": 1
          },
          {
            "id": 25040,
            "amount": 12,
            "chance": 1
          },
          {
            "id": 30019,
            "amount": 5,
            "chance": 0.3
          },
      
        ],
        "gold": 
          {
            "min": 36,
            "max": 84,
            "chance": 40
          },
      },
      {
        "mob": 1901,
        "level": {
          "min": "1",
          "max": "32"
        },
        "items": [
          {
            "id": 50050,
            "amount": 1,
            "chance": 1
          },
          {
            "id": 11299,
            "amount": 1,
            "chance": 0.05
          },
          {
            "id": 50513,
            "amount": 1,
            "chance": 0.3
          },
          {
            "id": 50114,
            "amount": 1,
            "chance": 35
          }
        ],
        "gold": 
          {
            "min": 36,
            "max": 84,
            "chance": 40
          }
        
      },
      {
        "mob": 2206,
        "level": {
          "min": 2,
          "max": 16
        },
        "items": [
          {
            "id": 283,
            "amount": 1,
            "chance": 1
          },
          {
            "id": 50513,
            "amount": 1,
            "chance": 1
          },
          {
            "id": 71032,
            "amount": 1,
            "chance": 1
          },
          {
            "id": 25040,
            "amount": 1,
            "chance": 1
          },
        ],
        "gold": 
          {
            "min": 36,
            "max": 84,
            "chance": 40
          },
        
      }
    ],
    dropListCopy: [],
    isHamburgerOpen: false,
}  

interface IinitialState {
  activeList: string,
  addDrop: (drop: any) => {},
  itemNames: ItemName[],
  mobNames: MobName[],
  dropList: Drop[],
  dropListCopy: Drop[],
  isHamburgerOpen: boolean,
  firstRun: boolean,
  firstRenderMobList: boolean,
}

export const GlobalContext = createContext<IinitialState>(initialState);

// @ts-ignore
export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function addDrop(drop: any){
      dispatch({
          type: 'ADD_DROP',
          payload: drop
      });
    }

    function addItemNames(itemNames: any){
      dispatch({
          type: 'ADD_ITEM_NAMES',
          payload: itemNames
      });
    }

    function addItem(item: any, mob: any){
      dispatch({
          type: 'ADD_ITEM_TO_MOB',
          payload: {item, mob}
      });
    }

    function addMob(mob: any){
      dispatch({
          type: 'ADD_MOB_TO_DROP',
          payload: mob
      });
    }

    function createDeepDropCopy(){
      dispatch({
          type: 'CREATE_DEEP_DROP_COPY'
      });
    }

    function updateDeepDropCopy(mobId: number){
      dispatch({
          type: 'UPDATE_DEEP_DROP_COPY',
          payload: {mobId}
      });
    }

    function deleteMob(mobId: any){
      dispatch({
          type: 'DELETE_MOB',
          payload: mobId
      });
    }

    function addMobNames(mobNames: any){
      dispatch({
        type: 'ADD_MOB_NAMES',
        payload: mobNames
    });
    }

    function changeActiveList(listType: any){
      dispatch({
          type: 'CHANGE_ACTIVE_LIST',
          payload: listType
      });
    }

    function deleteItem(item: any, mob: any){
      dispatch({
          type: 'DELETE_ITEM_FROM_MOB',
          payload: {item, mob}
      });
    }

    function editItem(updatedItem: any, item: any, mob: any){
      console.log(updatedItem, item, mob)
       dispatch({
          type: 'EDIT_ITEM_FROM_MOB',
          payload: {updatedItem, item, mob}
      }); 
    }

    function changeFirstRunStatus(){
      dispatch({
          type: 'CHANGE_FIRST_RUN_STATUS',
      });
    }

    function changeFirstRenderMobListStatus(){
      dispatch({
          type: 'CHANGE_FIRST_RENDER_MOB_LIST_STATUS',
      });
    }

    function toogleHamburgerMenu(){
      dispatch({
          type: 'CHANGE_HAMBURGER_STATUS',
      });
    }
  
    return (
        <GlobalContext.Provider value={{
            activeList: state.activeList, 
            firstRun: state.firstRun,
            firstRenderMobList: state.firstRenderMobList,
            dropList: state.dropList, 
            itemNames: state.itemNames, 
            mobNames: state.mobNames, 
            isHamburgerOpen: state.isHamburgerOpen,
            dropListCopy: state.dropListCopy,
            createDeepDropCopy,
            updateDeepDropCopy,
            addDrop,
            addItem, 
            changeActiveList, 
            deleteItem, 
            editItem, 
            addItemNames, 
            addMobNames, 
            addMob, 
            deleteMob, 
            changeFirstRunStatus,
            toogleHamburgerMenu,
            changeFirstRenderMobListStatus
          }}>
          {children}
        </GlobalContext.Provider>)
}

