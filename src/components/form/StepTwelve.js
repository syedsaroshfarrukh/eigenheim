import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import ProgressBar from "../progress-bar/ProgressBar";
import Slider from "../slider/Slider";
import { Form, Col } from "react-bootstrap";
import formImageTwo from "../../images/tuev_500.png";
import axios from "axios";
import { TextField } from "./TextField";
import * as Yup from "yup";

const StepThree = ({ setForm, formData, navigation }) => {
  const {
    firstName,
    lastName,
    address,
    postcode,
    place,
    email,
    phone,
  } = formData;

  const { previous, next } = navigation;
  const [validated, setValidated] = useState(false);

  const [value, setValue] = useState(91.3);

  useEffect(() => {
    const interval = setTimeout(() => {
      setValue((oldValue) => {
        const newValue = oldValue + 8.7;

        return newValue;
      });
    }, 200);
  }, []);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    if (form.checkValidity() === true) {
      console.log(formData);
      event.preventDefault();
      next();
      await axios.post(
        "https://eigenheim-backend.herokuapp.com/create-form/",
        formData
      );
    }

    console.log(form.checkValidity());
  };

  return (
    <div className="form">
      <p className="text_form_step_2">
        Erhalten Sie jetzt 3 unverbindliche<br></br> Finanzierungsangebote aus
        Ihrer Region:
      </p>

      <div className="btn_container">
        <Form
          className="form_container"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Row>
            <Form.Group as={Col} controlId="formGridFrau">
              <Form.Check
                className="form_checkbox"
                type="checkbox"
                label="Frau"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridHerr">
              <Form.Check
                className="form_checkbox"
                type="checkbox"
                label="Herr"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridFname">
              <Form.Control
                required
                type="text"
                label="Vorname"
                placeholder="Vorname"
                onChange={(event) => (formData.firstName = event.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLName">
              <Form.Control
                required
                label="Nachname"
                placeholder="Nachname"
                onChange={(e) => {
                  formData.lastName = e.target.value;
                }}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridAddress1">
            <Form.Control
              required
              label="Straße und Hausnummer"
              placeholder="Straße und Hausnummer"
              onChange={(e) => {
                formData.address = e.target.value;
              }}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Control
                required
                label="PLZ"
                placeholder="PLZ"
                onChange={(e) => {
                  formData.postcode = e.target.value;
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Control
                required
                label="Ort"
                placeholder="Ort"
                onChange={(e) => {
                  formData.place = e.target.value;
                }}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Control
                required
                type="email"
                label="Email"
                placeholder="E-Mail"
                onChange={(e) => {
                  formData.email = e.target.value;
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPhone">
              <Form.Control
                required
                type="text"
                label="Telefon"
                placeholder="Telefon"
                onChange={(e) => {
                  formData.phone = e.target.value;
                }}
              />
            </Form.Group>
          </Form.Row>

          <div className="align_btn">
            <Button
              type="submit"
              variant="primary"
              value="Weiter"
              className="btn-last"
            >
              <span>Angebote erhalten</span>
              <br></br>
              <span className="btn_text">100% unverbindlich</span>
            </Button>
          </div>
        </Form>
      </div>

      <div className="progress_bar_container">
        <div className="progress_align">
          <ProgressBar
            color={"#577B0A"}
            width={"300px"}
            value={value}
            max={100}
          />
        </div>
      </div>

      <img src={formImageTwo} alt="img" className="imageCover" />
    </div>
  );
};

export default StepThree;
