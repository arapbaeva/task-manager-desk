import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false,
}
type InitialStateType = typeof initialState

export const authReducer = (state:InitialStateType = initialState, action:ActionsType): InitialStateType=>{
    switch(action.type){
        case 'login/SET-IS-LOGGED-IN':
            return {
                ...state, isLoggedIn: action.value
            }
        default:
            return state
}
}

export const setIsLoggedInAC = (value: boolean) =>({
    type: 'login/SET-IS-LOGGED-IN',
    value
})

export const loginTC = (data: LoginParamsType) =>(dispatch: Dispatch<ActionsType>) =>{
dispatch(setAppStatusAC("loading"))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}



export const logOutTC = () =>(dispatch: Dispatch<ActionsType>) =>{
    dispatch(setAppStatusAC("loading"))
    authAPI.logout().then((res) => {
            if (res.data.resultCode === 0) {
                debugger
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

 type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType