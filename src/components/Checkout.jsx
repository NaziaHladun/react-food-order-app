import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import UserProgressContext from "../store/UserProgressContext";
import CartContext from "../store/CartContext";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import Button from "./UI/Button";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleClose = () => {
    userProgressCtx.hideCheckout();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customData = Object.fromEntries(fd.entries());
  };

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="tex" id="full-name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street" type="tex" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="tex" id="postal-code" />
          <Input label="City" type="tex" id="city" />
        </div>

        <p className="modal-actions">
          <Button type="button" onClick={handleClose} textOnly>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
