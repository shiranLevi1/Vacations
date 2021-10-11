import { AppState } from "./AppState";
import { ActionType } from "./ActionType";
import { Action } from "./Action";

// This function is NOT called direcrtly by you
export function reduce(oldAppState: AppState = new AppState(), action: Action): AppState {
  // Cloning the oldState (creating a copy)
  const newAppState = { ...oldAppState };

  switch (action.type) {
    case ActionType.ShowAllVacations:
      newAppState.vacations = action.payload;
      break;

      case ActionType.DeleteVacation:                  
      newAppState.vacations = oldAppState.vacations                 
      .filter(vacation =>                      
        vacation.id !== action.payload.id                     
        );                     
        break;

      case ActionType.GetVacationDetails:  
      newAppState.currentlyUpdatedVacation = action.payload                
        break;

      case ActionType.GetUserDetails:  
      newAppState.currentlyUpdatedUser = action.payload                
        break;
        
      case ActionType.GetVacationId:  
      newAppState.vacations = oldAppState.vacations                 
      .filter(vacation =>                      
        vacation.id !== action.payload.id                     
        );              
        break;
    }
    return newAppState;
}
