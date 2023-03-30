import {store} from "../redux/store";
import {useDispatch} from "react-redux";

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()