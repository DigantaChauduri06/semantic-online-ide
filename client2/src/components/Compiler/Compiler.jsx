import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Editor from "@monaco-editor/react";
import toast from "react-hot-toast";

import "./Compiler.css";

const Compiler = () => {
  const [outputDetails, setOutputDetails] = useState(null);
  const [displayOutput, setdisplayOutput] = useState("");
  const [languageName, setLanguageName] = useState("Javascript");
  const [isError, setIsError] = useState(false);
  const [language, setLanguage] = useState(languageName);
  const handleClick = () => {
    const output = {};
    let lang = "cpp";
    if (language === "c++") {
      lang = "cpp";
    }
    if (language === "c") {
      lang = "c";
    }
    if (language === "java") {
      lang = "java";
    }
    if (language.toLowerCase().trim() === "python") {
      lang = "py";
    }
    const body = {
      code: outputDetails,
      language: lang,
    };
    console.log(body);
    axios
      .post("http://127.0.0.1:8080/code", body)
      .then((res) => {
        console.log(res);
        setdisplayOutput(res.data.fileOutput);
      })
      .catch((e) => {
        setdisplayOutput("Error Happened please check your code!!!");
        setIsError(true);
      });
  };

  useEffect(() => {
    if (language === "c") {
      toast.success("C language selected successfully", {
        duration: 2000,
      });
    }

    if (language === "c++") {
      toast.success("C++ language selected successfully", {
        duration: 2000,
      });
    }

    if (language === "java") {
      toast.success("Java language selected successfully", {
        duration: 2000,
      });
    }

    if (language === "javascript") {
      toast.success("Javascript language selected successfully", {
        duration: 2000,
      });
    }

    if (language === "python") {
      toast.success("Python language selected successdully", {
        duration: 3000,
      });
    }
  }, [language]);
  console.log(displayOutput);

  return (
    <>
      <div className="online_compiler_div">
        <div className="compiler-nav">
          <div className="logo">
            <span className="icon">
              <ion-icon name="play-outline"></ion-icon>
            </span>
            Semantic Online IDE
          </div>

          <div className="dropdown_and_run_btn">
            {/* choose language */}
            <div className="dropdown">
              <button className="dropbtn">{language}</button>
              <div className="dropdown-content">
                <a href="#" onClick={() => setLanguage("c")}>
                  C
                </a>
                <a href="#" onClick={() => setLanguage("c++")}>
                  C++
                </a>
                <a href="#" onClick={() => setLanguage("java")}>
                  Java
                </a>
                <a href="#" onClick={() => setLanguage("javascript")}>
                  Javascript
                </a>
                <a href="#" onClick={() => setLanguage("python")}>
                  Python
                </a>
              </div>
            </div>

            <button className="runBtn" onClick={handleClick}>
              <span className="runText">RUN</span>
              <ion-icon className="run-icon" name="play-circle"></ion-icon>
            </button>
            <button className="signInBtn">
              <span className="runText">
                <NavLink className="signinlink" to="/signin">
                  SIGN IN
                </NavLink>
              </span>
            </button>
          </div>
        </div>

        <div className="code_editor_and_output">
          <div className="code_editor">
            <Editor
              language={language || "Javascript"}
              defaultValue=""
              onChange={(e) => setOutputDetails(e)}
            />
          </div>

          <div
            className="code_output"
            style={{ color: "#fff", fontSize: "3rem" }}
          >
            {isError ? (
              <p style={{ color: "red" }}>{displayOutput}</p>
            ) : (
              <p style={{ color: "#fff" }}>{displayOutput}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Compiler;
