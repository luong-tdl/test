import React from "react";
import "./styles.css";
import { info } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import * as Confirm from "@pnotify/confirm";
import "@pnotify/confirm/dist/PNotifyConfirm.css";

export default function App1() {
  function click() {
    info({
      title: "Button Clicked",
      text:
        "You have clicked the button. You may now complete the process of reading the notice.",
      modules: new Map([
        [
          Confirm,
          {
            confirm: true,
            buttons: [
              {
                text: "Ok",
                primary: true,
                click: notice => {
                  notice.close();
                }
              }
            ]
          }
        ]
      ])
    });
  }

  return (
    <div className="container">
      <h1>PNotify 5 in React!</h1>

      <button type="button" onClick={click}>
        Notify me!
      </button>
    </div>
  );
}
