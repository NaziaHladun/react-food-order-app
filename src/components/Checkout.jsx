import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import UserProgressContext from "../store/UserProgressContext";
import CartContext from "../store/CartContext";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import Button from "./UI/Button";
import useHttp from "../hooks/useHttp";

const requestConfig = {
  method: "Post",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleClose = () => {
    userProgressCtx.hideCheckout();
  };

  const handleFinish = () => {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customData,
        },
      })
    );

    let actions = (
      <>
        <Button type="button" onClick={handleClose} textOnly>
          Close
        </Button>
        <Button>Submit Order</Button>
      </>
    );

    if (isSending) {
      actions = <pan>Sending Order Data...</pan>;
    }

    if (data && !error) {
      return (
        <h1>Azaza 2</h1>
        // <Modal
        //   open={userProgressCtx.progress === "checkout"}
        //   onClose={handleFinish}
        // >
        //   <h2>Success!</h2>
        //   <p>Your order war submitted!</p>
        //   <p>Check your Email.</p>
        //   <p className="modal-actions">
        //     <Button onClick={handleFinish}>Okay</Button>
        //   </p>
        // </Modal>
      );
    }

    // open={userProgressCtx.progress === "checkout"}
    return (
      <h1>Azaza 1</h1>
      // <Modal
      //   open={true}
      //   onClose={userProgressCtx.progress === "checkout" ? handleClose : null}
      // >
      //   <form onSubmit={handleSubmit}>
      //     <h2>Checkout</h2>
      //     <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

      //     <Input label="Full Name" type="tex" id="name" />
      //     <Input label="Email Address" type="email" id="email" />
      //     <Input label="Street" type="tex" id="street" />
      //     <div className="control-row">
      //       <Input label="Postal Code" type="tex" id="postal-code" />
      //       <Input label="City" type="tex" id="city" />
      //     </div>

      //     {error && <Error title="Failed to submit order" message={error} />}

      //     <p className="modal-actions">{actions}</p>
      //   </form>
      // </Modal>
    );
  };
}
