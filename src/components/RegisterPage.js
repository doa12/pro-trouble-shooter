import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../_actions/user_action";
import { withRouter } from "react-router-dom";

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Nickname, setNickname] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호가 다릅니다.");
    }

    let body = {
      email: Email,
      password: Password,
      nickname: Nickname,
    };

    dispatch(signupUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push("/api/login");
      } else {
        alert("Failed to sign-up");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>Nickname</label>
        <input type="text" value={Nickname} onChange={onNicknameHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>Confirm Password</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />

        <br />
        <button>Sign-up</button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);