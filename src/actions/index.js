export const fetchTrucks = async (dispatch) => {
  try {
    const response = await fetch(
      `https://api.mystral.in/tt/mobile/logistics/searchTrucks?auth-company=PCH&companyId=33&deactivated=false&key=g2qb5jvucg7j8skpu5q7ria0mu&q-expand=true&q-include=lastRunningState,lastWaypoint`
    );
    const { data: jsonData } = await response.json();
    return dispatch({
      type: "SAVE_TRUCKS",
      payload: jsonData,
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

export const setTrucks = async (dispatch, payload) => {
  try {
    return dispatch({
      type: "SET_TRUCKS",
      payload,
    });
  } catch (error) {
    console.error("Error:", error);
  }
};
