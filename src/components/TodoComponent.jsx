import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createTodoApi,
  retrieveTodoApi,
  updateTodoApi,
} from "../api/TodoApiService";
import { useAuth } from "../security/AuthContext";
import { ErrorMessage, Field, Form, Formik } from "formik";

const TodoComponent = () => {
  const { id } = useParams();
  const { username, showAlert } = useAuth();

  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const retrieveTodo = () => {
    if (id != -1) {
      retrieveTodoApi(username, id)
        .then((res) => {
          setDescription(res.data.description);
          setTargetDate(res.data.targetDate);
        })
        .catch(console.log);
    }
  };

  const onSubmit = (values) => {
    const todoDetails = {
      id,
      username,
      description: values.description,
      targetDate: values.targetDate,
      done: false,
    };

    if (id == -1) {
      createTodoApi(username, todoDetails)
        .then((res) => {
          navigate("/todos");
          showAlert("Todo Added", "success");
          console.log(res);
        })
        .catch((err) => {
          showAlert("Cannot Add Todo", "danger");
          console.log(err);
        });
      return;
    }

    updateTodoApi(username, id, todoDetails)
      .then((res) => {
        showAlert("Todo Updated", "success");
        navigate("/todos");
      })
      .catch(() => {
        showAlert("Cannot Update Todo", "danger");
        console.log();
      });
  };

  const validate = (values) => {
    let errors = {};

    if (values.description.length < 5)
      errors.description = "Enter alteast 5 characters";

    if (values.targetDate === null || values.targetDate === "")
      errors.targetDate = "Enter a valid Target Date";
    return errors;
  };

  useEffect(() => {
    retrieveTodo();
  }, [id]);

  return (
    <div className="container">
      <h3>Enter Todo Details:</h3>
      <div>
        <Formik
          initialValues={{ description, targetDate }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <Form>
              <fieldset className="form-group">
                <label>Description</label>
                <Field
                  type="text"
                  className="form-control"
                  name="description"
                />
              </fieldset>

              <fieldset className="form-group">
                <label>Target Date</label>
                <Field type="date" className="form-control" name="targetDate" />
              </fieldset>
              <button className="btn btn-success m-5" type="submit">
                Save
              </button>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />

              <ErrorMessage
                name="targetDate"
                component="div"
                className="alert alert-warning"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TodoComponent;
