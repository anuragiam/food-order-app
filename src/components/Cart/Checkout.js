import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = isFiveChars(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name:enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity
    })
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formInputValidity.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!formInputValidity.name && <p>PLease entere a valid name!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street" />
        {!formInputValidity.street && <p>PLease entere a valid street!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.postal ? "":classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalInputRef} type="text" id="postal" />
        {!formInputValidity.postal && (
          <p>PLease entere a valid postal code!(5 characters long)</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>PLease entere a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};
export default Checkout;
