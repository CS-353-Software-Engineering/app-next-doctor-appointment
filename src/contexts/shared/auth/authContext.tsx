import React from "react";
import {defaultState, IAuthContext} from "./types";

const AuthContext = React.createContext<IAuthContext>(defaultState);
export default AuthContext
