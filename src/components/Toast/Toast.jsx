import { Actions } from "../../reducers";
import { useProduct } from "../../contexts";
import "./Toast.css";

export const handleToast = (dispatch, text) => {
  dispatch({
    type: Actions.OPEN_OR_CLOSE_TOAST,
    payload: { show: true, text }
  });
  // setTimeout(() => closeToast(dispatch), 3000);
};

const closeToast = (dispatch) => {
  dispatch({
    type: Actions.OPEN_OR_CLOSE_TOAST,
    payload: { show: false, text: "" }
  });
};

const Toast = () => {
  const {
    state: { showToast, toastMessage },
    dispatch
  } = useProduct();

  return (
    <>
      {showToast && (
        <div className="toast toast--position text-white">
          <span className="toast__content content--padding">
            {toastMessage}
          </span>
          <button
            type="button"
            className="toast--close close--align"
            onClick={() => closeToast(dispatch)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default Toast;