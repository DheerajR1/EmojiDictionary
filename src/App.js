import React, { useState } from "react";

var apiUrl = "https://emoticonList.dheerajr11.repl.co/getgroup/groupName.json";
var apiEmojiUrl =
  "https://emoticonList.dheerajr11.repl.co/getEmoji/emoji.json?text=";
var apiEmojiMeaningUrl =
  "https://emoticonList.dheerajr11.repl.co/getEmojiName/emojiName.json?text=";

export default function App() {
  const [items, setItems] = React.useState([]);
  const [emojiList, GetItems] = React.useState([]);
  const [emoji, setEmoji1] = useState("");
  const [meaning1, setMeaning1] = useState("Meaning will appear here..");

  const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      console.log("mobile")
      return "mobile";
    }
    console.log("PC");
    return "desktop";
  };

  React.useEffect(() => {
    async function fetchData() {
      var data = await fetch(apiUrl).then((res) => {
        return res.json();
      });
      console.log(data.contents.text);
      if (getDeviceType() === "desktop") {
        var testStr = data.contents.text;
        testStr.pop();
      }
      setItems(data.contents.text);
    }
    fetchData();
  }, []);

  async function emojiGroupClickHandler(emojiGroup) {
    var data = await fetch(apiEmojiUrl + emojiGroup).then((res) => {
      return res.json();
    });
    GetItems(data.contents.emojis);
  }

  async function getInputEmojiMeaning(emojiUserInput) {
    var data = await fetch(apiEmojiMeaningUrl + emojiUserInput).then((res) => {
      return res.json();
    });
    setMeaning1(data.contents.emojiName);
  }

  function getEmojiMeaning(event) {
    const inputEmoji = event.target.value;
    setEmoji1(inputEmoji);
    getInputEmojiMeaning(inputEmoji);
  }

  function getEmojiName(selectedEmoji) {
    document.getElementById("inputTextBox").value = selectedEmoji;
    console.log();
    var userInput = selectedEmoji;
    var meaning = "";
    for (var i = 0; i < emojiList.length; i++) {
      if (emojiList[i].emoji === userInput) {
        meaning = emojiList[i].name;
        break;
      } else {
        meaning = "we don't how it got there :(";
      }
    }
    if (meaning === undefined) {
      meaning = "we don't have this in our database";
    }
    setMeaning1(meaning); // react call to show output
  }

  return (
    <div className="App">
      <h1>Emoji Dictionary</h1>

      <div className="span">
        {items.map(function (emojiTaken1) {
          return (
            <span
              className="genre"
              onClick={() => emojiGroupClickHandler(emojiTaken1)}
              key={emojiTaken1}
            >
              <a className="btn-action" href="#">
                {emojiTaken1}
              </a>
            </span>
          );
        })}
      </div>
      <div
        style={{
          padding: "1em",
          minWidth: "80%",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <input
          onChange={getEmojiMeaning}
          minLength="0"
          maxLength="2"
          size="2"
          pattern="[^a-zA-Z0-9]"
          placeholder={"Emoji..."}
          id="inputTextBox"
          style={{
            textAlign: "center"
          }}
        />
        <div className="meaningDisp">{meaning1}</div>
      </div>

      <div id="dispTable" className="wrapper">
        {emojiList.map(function (emojiDB) {
          emojiDB = emojiDB.emoji;
          return (
            <span
              onClick={() => getEmojiName(emojiDB)}
              key={emojiDB}
              className="emojiSpan"
            >
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
