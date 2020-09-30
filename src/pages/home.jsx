import React from "react";
import { info } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import * as Confirm from "@pnotify/confirm";
import "@pnotify/confirm/dist/PNotifyConfirm.css";

export default function App() {
  function click() {
    info({     
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
      
    </div>
  );
}
