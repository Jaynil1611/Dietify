import { actions } from "../../reducers";
import { useProduct } from "../../contexts";
import "./Toast.css";

export const handleToast = (dispatch, text) => {
  dispatch({
    type: actions.OPEN_OR_CLOSE_TOAST,
    payload: { show: true, text },
  });
  setTimeout(() => closeToast(dispatch), 1000);
};

const closeToast = (dispatch) => {
  dispatch({
    type: actions.OPEN_OR_CLOSE_TOAST,
    payload: { show: false, text: "" },
  });
};

const Toast = () => {
  const {
    state: { showToast, toastMessage },
    dispatch,
  } = useProduct();

  return (
    <>
      {showToast && (
        <div className="toast toast--position text--white">
          <span className="toast__content content--padding">
            {toastMessage}
          </span>
          <button
            type="button"
            className="toast--close close--align text--white"
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
