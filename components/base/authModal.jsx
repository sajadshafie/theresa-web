import React, { useState } from "react";
import { Input, Form, Button, notification } from "antd";
import style from "../../styles/auth.module.css";
import Api from "../../config/API";
import Router from "next/router";
import { useContext } from "react";
import { context } from "./contex";
export default function authModal({
  onProcessAuth,
  containerClass = style.fullContainerModal,
}) {
  const [dataDoctor, setDataDoctor] = useState({
    name: "",
    family: "",
    email: "",
  });
  const [loadSubmit, setLoadSubmit] = useState(false);
  const form1 = (event) => {
    const update = { ...dataDoctor, name: event.target.value };
    setDataDoctor(update);
  };
  const form2 = (event) => {
    const update = { ...dataDoctor, family: event.target.value };
    setDataDoctor(update);
  };
  const form3 = (event) => {
    const update = { ...dataDoctor, email: event.target.value };
    setDataDoctor(update);
  };
  const { state, setState } = useContext(context);
  const [errors, setErrors] = useState("");
  const submitData = () => {
    setLoadSubmit(true);
    onProcessAuth(dataDoctor);
    Api.updateProfile({
      name: dataDoctor.name,
      family: dataDoctor.family,
      email: dataDoctor.email,
    })
      .then((res) => {
        setState(false);
        setLoadSubmit(false);
        console.log(res);
        Router.push("/admin/home");
        notification.success({
          message: "Welcome To TERESA",
        });
      })
      .catch((err) => {
        setLoadSubmit(false);
        console.log(err.response);
        let x = null;
        if (err.response.data.errors.name) {
          return notification.error({
            message: err.response.data.errors.name[0],
          });
        }
        if (err.response.data.errors.family) {
          return notification.error({
            message: err.response.data.errors.family[0],
          });
        }
        if (err.response.data.errors.email) {
          return notification.error({
            message: err.response.data.errors.email[0],
          });
        } else {
          return;
        }
      });
  };

  return (
    <div className={containerClass}>
      <div className={style.authModalContainer}>
        <div className={style.contentModalauth}>
          <Form layout="vertical">
            <h1 className={style.titleModalauth}>Welcome to Teresa System</h1>
            <p className={style.desModal}>
              To complete your registration please provide us with the following
              information:
            </p>
            <Form.Item label="Name">
              <Input onChange={form1} />
            </Form.Item>
            <Form.Item label="Family">
              <Input onChange={form2} />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  type: "email",
                },
              ]}
              label="Email"
            >
              <Input type="email" onChange={form3} />
            </Form.Item>
            <Form.Item style={{ textAlign: "right" }}>
              <Button
                loading={loadSubmit}
                disabled={
                  dataDoctor.name.length > 1 &&
                  dataDoctor.family.length > 1 &&
                  dataDoctor.email.length > 1
                    ? false
                    : true
                }
                onClick={submitData}
                style={{ background: "#08979c", color: "white" }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
