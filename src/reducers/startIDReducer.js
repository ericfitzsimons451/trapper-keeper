export const startID = (state = 0, action) => {
    switch (action.type){
        case "START_ID":
            return action.id;
        default:
            return state;
    }
} 