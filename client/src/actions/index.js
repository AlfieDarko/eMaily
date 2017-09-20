import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => async dispatch => {
	const res = await axios.get("/api/current_user");
	dispatch({ type: FETCH_USER, payload: res.data });
};

//redux thunk can do async and dispatch action
// when async is resolved
export const handleToken = token => async dispatch => {
	const res = await axios.post("/api/stripe", token);

	dispatch({ type: FETCH_USER, payload: res.data });
};
