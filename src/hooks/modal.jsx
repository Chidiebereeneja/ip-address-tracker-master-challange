import { cloneElement, createContext, useContext, useReducer } from "react";
import { createPortal } from "react-dom";
import Overlay from "../components/overlay";
import styled from "styled-components";

const WindowDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-33.333333%);
  z-index: 500;
  background-color: #ffffff;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  border-radius: 0.5rem;

  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;

  width: 95%;
  max-width: 400px;
`;

const modalContext = createContext();

const initialState = {
  id: "",
  name: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "open-modal": {
      const { id, name } = action.payload;
      return { ...state, id, name };
    }

    case "close-modal":
      return { ...state, id: "", name: "" };

    default:
      return state;
  }
}

export default function ModalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { id, name } = state;

  return (
    <modalContext.Provider value={{ id, name, dispatch }}>
      {children}
    </modalContext.Provider>
  );
}

function Modal({ children }) {
  return children;
}

function ModalWindow({ children, modalName, ...props }) {
  const { name, dispatch } = UseModal();

  const onCloseOverlay = function () {
    dispatch({ type: "close-modal" });
  };

  return (
    name === modalName &&
    createPortal(
      <div>
        <Overlay onClick={onCloseOverlay} />
        <WindowDiv {...props}>{children}</WindowDiv>
      </div>,
      document.body
    )
  );
}

function ModalContent({ children, ...props }) {
  return <article {...props}>{children}</article>;
}

function OpenModal({ children, name, id }) {
  const { dispatch } = UseModal();

  return cloneElement(children, {
    onClick: () => dispatch({ type: "open-modal", payload: { name, id } }),
  });
}

function ModalTitle({ children, ...props }) {
  return <h3 {...props}>{children}</h3>;
}

function ModalParagraph({ children, ...props }) {
  return <p {...props}>{children}</p>;
}

function CloseModal({ children }) {
  const { dispatch } = UseModal();
  return cloneElement(children, {
    onClick: () => dispatch({ type: "close-modal" }),
  });
}

function UseModal() {
  const context = useContext(modalContext);

  if (!context)
    throw new Error("You can not use the modal context outside it's root");

  return context;
}

Modal.ModalWindow = ModalWindow;
Modal.ModalContent = ModalContent;
Modal.OpenModal = OpenModal;
Modal.CloseModal = CloseModal;
Modal.ModalTitle = ModalTitle;
Modal.ModalParagraph = ModalParagraph;

export { Modal, UseModal };
