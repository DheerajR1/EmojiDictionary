import React, { useState, useEffect } from "react";
import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

var apiUrl = "https://emoticonList.dheerajr11.repl.co/getgroup/groupName.json";
var apiEmojiUrl =
  "https://emoticonList.dheerajr11.repl.co/getEmoji/emoji.json?text=";

export default function App() {
  const [items, setItems] = React.useState([]);
  const [emojiList, GetItems] = React.useState([]);
  const [meaning, setMeaning] = useState("");

  React.useEffect(() => {
    async function fetchData() {
      var data = await fetch(apiUrl).then((res) => {
        return res.json();
      });
      console.log(data.contents.text);
      setItems(data.contents.text);
    }
    fetchData();
  }, []);

  async function emojiGroupClickHandler(emojiGroup) {
    document.getElementById("notify-2").checked = true;
    var data = await fetch(apiEmojiUrl + emojiGroup).then((res) => {
      return res.json();
    });
    GetItems(data.contents.emojis);
  }

  function getEmojiName(selectedEmoji) {
    console.log("inside:", selectedEmoji);
    var userInput = selectedEmoji;
    console.log("23t1", { emojiList });

    var meaning = "";
    for (var i = 0; i < emojiList.length; i++) {
      console.log("zxc:", emojiList[i]);
      console.log("init:", emojiList[i].emoji);
      if (emojiList[i].emoji === userInput) {
        meaning = emojiList[i].name;
        break;
      } else {
        meaning = "we don't how it got there :(";
      }
    }

    console.log("meaning", { meaning });
    if (meaning === undefined) {
      meaning = "we don't have this in our database";
    }
    setMeaning(meaning); // react call to show output
  }
  //  console.log("1:", { items });
  console.log("12:", { emojiList });

  return (
    <div className="App">
      <h1>Emoji Dictionary</h1>

      <label for="notify-2">
        <input id="notify-2" type="checkbox" />
        <i className="fa fa-long-arrow-down"></i>
        <div id="notification-bar">
          <div className="container">
            {items.map(function (emojiTaken1) {
              return (
                <p
                  onClick={() => emojiGroupClickHandler(emojiTaken1)}
                  key={emojiTaken1}
                >
                  <a className="btn-action" href="#">
                    {emojiTaken1}
                  </a>
                </p>
              );
            })}
          </div>
        </div>
      </label>
      <div>{meaning}</div>
      <div id="dispTable" className="wrapper">
        {emojiList.map(function (emojiDB) {
          emojiDB = emojiDB.emoji;
          return (
            <span onClick={() => getEmojiName(emojiDB)} key={emojiDB}>
              <a className="btn-action" href="#">
                {emojiDB}
              </a>
            </span>
          );
        })}
      </div>
    </div>
  );
}
