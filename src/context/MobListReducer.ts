// @ts-nocheck
const MobListReducer = (state, action) => {
    switch(action.type) {
      case 'ADD_LOCAL_DROP': {
        return {
          ...state,
          mobDropList: action.payload
        }
      }
      
      case 'ADD_ITEM': {
        const tempArray = state.mobDropList;
        tempArray.push(action.payload.item)
        return {
          ...state,
          mobDropList: tempArray
        }
      }
      case 'EDIT_ITEM_IN_MOB':
      {
        const drop = state.mobDropList.map(item => {
              if(JSON.stringify(item) === JSON.stringify(action.payload.item))
                return action.payload.updatedItem;
              else
                return item
            })
        
        return {
          ...state,
          mobDropList: drop
        }
      }
      case 'DELETE_ITEM_FROM_MOB':
    {
        let drop = state.mobDropList;
        drop = drop.filter(item => JSON.stringify(item) !== JSON.stringify(action.payload.item))
      return {
        ...state,
        mobDropList: drop
      }
    }

    case 'SAVE_LOCAL_DROP_TO_SESSION_STORAGE': {
      sessionStorage.setItem(`${action.payload.mob}`, JSON.stringify(state.mobDropList));
      return {
        ...state
      }
    }


      default:
        return state;
    }
  }
  
  export default MobListReducer;
  