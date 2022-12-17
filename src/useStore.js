import { useContext } from "react";
import {StoreContext} from './provider/provider';

/**
 * Mynotepad global Store
 * @returns \{ state, dispatch \} object
 */
export default function useStore()
{
    return useContext(StoreContext);
}