// @ts-nocheck
const AppReducer = (state, action) => {
  switch(action.type) {
    case 'ADD_ITEM_NAMES': {
      return {
        ...state,
        itemNames: action.payload
      }
    }
    case 'ADD_MOB_NAMES': {
      return {
        ...state,
        mobNames: action.payload
      }
    }
    case 'ADD_DROP': {
      return {
        ...state,
        dropList: action.payload
      }
    }
    case 'ADD_MOB_TO_DROP':
      state.dropList.unshift({
        mob: action.payload.mob.value,
        level: {
          min: action.payload.level.min,
          max: action.payload.level.max
        },
        items: [],
        gold: [{
          "min": 36,
          "max": 84,
          "chance": 40
        }],
      })
      return {
        ...state,
        dropList: state.dropList
      }
    case 'ADD_ITEM_TO_MOB':
    {
      const drop = state.dropList.map(drop => {
        if(drop.mob === action.payload.mob){
          drop.items.unshift(action.payload.item)
        }

        return drop
      })
      return {
        ...state,
        dropList: drop
      }
    }
    case 'CHANGE_ACTIVE_LIST':
      return {
        ...state,
        activeList: action.payload
      }
    case 'CHANGE_FIRST_RUN_STATUS':
      return {
        ...state,
        firstRun: true
      }
    case 'CHANGE_HAMBURGER_STATUS': {
      return {
        ...state,
        isHamburgerOpen: !state.isHamburgerOpen
      }
    }
    case 'DELETE_MOB': {
      return {
        ...state,
        dropList: state.dropList.filter(drop => drop.mob !== action.payload)
      }
    }
    case 'DELETE_ITEM_FROM_MOB':
    {
      const drop = state.dropList.map(drop => {
        if(drop.mob === action.payload.mob)
          drop.items = drop.items.filter(item => JSON.stringify(item) !== JSON.stringify(action.payload.item))
        return drop
      })
      return {
        ...state,
        dropList: drop
      }
    }
    case 'EDIT_ITEM_FROM_MOB':
    {
      const drop = state.dropList.map(drop => {
        if(drop.mob === action.payload.mob)
          drop.items = drop.items.map(item => {
            if(JSON.stringify(item) === JSON.stringify(action.payload.item))
              return action.payload.updatedItem;
            else
              return item
          })
        return drop
      })
      return {
        ...state,
        dropList: drop
      }
    }

    default:
      return state;
  }
}

export default AppReducer;
