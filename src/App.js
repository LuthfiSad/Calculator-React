import React, { useState, useEffect } from "react";
import Display from "./components/Display";
import Keyboard from "./components/Keyboard";
import { operators, numbers } from "./data";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("0");
  const [output, setOutput] = useState("");
  const [calculatorData, setCalculatorData] = useState("");
  const [OutputCalculatorData, setOutputCalculatorData] = useState("");
  const [backupInput, setBackupInput] = useState("");
  const [inputFinish, setInputFinish] = useState("");
  const [finish, setFinish] = useState(false);

  const handleSubmit = () => {
    // jika memiliki --
    let check = calculatorData.replace(/--/g, "-");
    // jika di belakang = operator
    for (let i = 0; i < check.length; i++) {
      const lastChar = check.charAt(check.length - 1);
      const isLastCharOperator = operators.includes(lastChar);
      if (lastChar === "*" || isLastCharOperator) {
        check = check.substring(0, check.length - 1);
      } else {
        break;
      }
    }
    if (!check) {
      check = 0;
    }
    const total = eval(check);
    setInput(`${total}`);
    setOutputCalculatorData(`${check} = ${total}`);
    setCalculatorData(`${total}`);
    setFinish(true);
    setInputFinish(`${total}`)
  };

  const handleClear = () => {
    setInput("0");
    setCalculatorData("");
    setFinish(false);
    setBackupInput("")
    setInputFinish("")
  };

  const handleBack = () => {
    if(calculatorData !== inputFinish){
      let i = calculatorData.length - 2;
      const lastChar = calculatorData.charAt(i);
      const number = numbers.find((num) => num === lastChar);
      if (number || lastChar === '.') {
        let digits = '';
        while (i >= 0 && /[.\d]/.test(calculatorData[i])) {
          digits = calculatorData[i] + digits;
          i--;
        }
        setInput(`${digits}`)
      } else {
        setInput(`${lastChar}`)
      }
      setCalculatorData(
        `${calculatorData.substring(
          0,
          calculatorData.length - 1
        )}`
      );
    }
  }

  const handleNumbers = (value) => {
    if (input.length < 22) {
      if (
        finish ||
        !calculatorData.length ||
        (input.charAt(0) === "0" && input.charAt(1) !== ".")
      ) {
        setInput(`${value}`);
        setCalculatorData(`${value}`);
        setFinish(false);
      } else {
        if (value === 0 && (calculatorData === "0" || input === "0")) {
          setCalculatorData(`${calculatorData}`);
        } else {
          const lastChar = calculatorData.charAt(calculatorData.length - 1);
          const islastCharOperator =
            lastChar === "*" || operators.includes(lastChar);

          setInput(islastCharOperator ? `${value}` : `${input}${value}`);
          setCalculatorData(`${calculatorData}${value}`);
        }
      }
    } else {
      setBackupInput("DIGIT LIMIT BRO")
      setTimeout(()=>{
        setBackupInput("")
      }, 1000)
    }
  };

  const dotOperator = () => {
    const lastChar = calculatorData.charAt(calculatorData.length - 1);
    if (!calculatorData.length) {
      setInput("0.");
      setCalculatorData("0.");
    } else {
      if (lastChar === "*" || operators.includes(lastChar)) {
        setInput("0.");
        setCalculatorData(`${calculatorData} 0.`);
      } else {
        setInput(
          lastChar === "." || input.includes(".") ? `${input}` : `${input}.`
        );
        const formattedValue =
          lastChar === "." || input.includes(".")
            ? `${calculatorData}`
            : `${calculatorData}.`;
        setCalculatorData(formattedValue);
      }
    }
  };

  const handleOperators = (value) => {
    const lastChar = calculatorData.charAt(calculatorData.length - 1);
    if ((calculatorData.length || value === "-") && lastChar !== ".") {
      setFinish(false);
      const firstChat = calculatorData.charAt(0);
      if (firstChat !== "-" || calculatorData.length !== 1) {
        setInput(`${value}`);
        const beforelastChar = calculatorData.charAt(calculatorData.length - 2);
        const beforelastCharIsOperator =
          operators.includes(beforelastChar) || beforelastChar === "*";

        const lastCharIsOperator =
          operators.includes(lastChar) || lastChar === "*";

        const validOp = value === "x" ? "*" : value;
        if (
          (lastCharIsOperator && value !== "-") ||
          (beforelastCharIsOperator && lastCharIsOperator)
        ) {
          if (beforelastCharIsOperator && value !== "-") {
            const updatedValue = `${calculatorData.substring(
              0,
              calculatorData.length - 2
            )}${validOp}`;
            setCalculatorData(updatedValue);
          } else {
            setCalculatorData(
              `${calculatorData.substring(
                0,
                calculatorData.length - 1
              )}${validOp}`
            );
          }
        } else {
          setCalculatorData(`${calculatorData}${validOp}`);
        }
      }
    }
  };

  const handleInput = (value) => {
    setOutputCalculatorData("");
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);

    switch (value) {
      case "=":
        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case "⬅️":
        handleBack();
        break;
      case number:
        handleNumbers(value);
        break;
      case ".":
        dotOperator(value);
        break;
      case operator:
        handleOperators(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setOutput(calculatorData);
  }, [calculatorData]);

  useEffect(() => {
    if (!input) {
      setInput('0')
    }
  }, [input]);

  return (
    <div className="container">
      <div className="calculator">
        <Display input={backupInput||input} output={OutputCalculatorData || output} />
        <Keyboard handleInput={handleInput} />
      </div>
    </div>
  );
};

export default App;
