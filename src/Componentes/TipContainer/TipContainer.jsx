import React, { useState, useCallback } from "react";
import { useEffect } from "react";
import tipStayle from "./TipContainer.module.css";

function TipContainer() {
  // Declaro mis constantes de estado
  const [bill, setBill] = useState();
  const [tip, setTip] = useState(0);
  const [person, setPerson] = useState();
  const [totalTip, setTotalTip] = useState("0.00");
  const [tipPerson, setTipPerson] = useState("0.00");

  //declaro un initial state seguido de su constate de estado
  var initialStateActives = [
    {
      border: "none",
    },
    {
      border: "none",
    },
    {
      border: "none",
    },
    {
      border: "none",
    },
    {
      border: "none",
    },
    {
      border: "none",
    },
  ];
  const [selectBtn, setSelectBtn] = useState(initialStateActives);
  // array y funcion switch para controlar el boton de propina activo
  var actives = [
    {
      border: "none",
    },
    {
      border: "none",
    },
    {
      border: "none",
    },
    {
      border: "none",
    },
    {
      border: "none",
    },
    {
      border: "none",
    },
  ];
  // Funcion que evalua el btn activo
  const btnActive = (e) => {
    switch (e.target.value) {
      case "5":
        actives = [...initialStateActives];
        actives[0] = {
          backgroundColor: "hsl(172, 67%, 45%)",
        };
        setSelectBtn(actives);
        break;
      case "10":
        actives = [...initialStateActives];
        actives[1] = {
          backgroundColor: "hsl(172, 67%, 45%)",
        };
        setSelectBtn(actives);
        break;
      case "15":
        actives = [...initialStateActives];
        actives[2] = {
          backgroundColor: "hsl(172, 67%, 45%)",
        };
        setSelectBtn(actives);
        break;
      case "25":
        actives = [...initialStateActives];
        actives[3] = {
          backgroundColor: "hsl(172, 67%, 45%)",
        };
        setSelectBtn(actives);
        break;
      case "50":
        actives = [...initialStateActives];
        actives[4] = {
          backgroundColor: "hsl(172, 67%, 45%)",
        };
        setSelectBtn(actives);
        break;
      default:
        actives = [...initialStateActives];
        actives[5] = {
          border: "2px solid #26c0ab",
        };
        setSelectBtn(actives);
    }
  };

  const totalTipCalculate = useCallback(() => {
    var tip1 = tip;
    var person1 = person;
    var bill1 = bill;
    if (!tip1 || !bill1 || !person1) {
      tip1 = tip;
      bill1 = bill;
      person1 = person;
    }
    let result = ((tip1 * bill1) / 100).toFixed(2);
    if (isNaN(result)) {
      setTotalTip("0.00");
      setTipPerson("0.00");
      return;
    }
    setTotalTip(result);
    let resultPorPerson = (result / person1).toFixed(2);
    if (!isFinite(resultPorPerson)) {
      setTipPerson("0.00");
      return;
    }
    setTipPerson(resultPorPerson);
  }, [tip, bill, person]);
  // funcion que resetea los valores y los inputs
  const reset = () => {
    setSelectBtn(initialStateActives);
    setPerson(0);
    setTipPerson("0.00");
    setBill();
    setTip(0);
    setTotalTip("0.00");
  };
  // actualizamos todos los estados con cualquier cambio de input
  useEffect(() => {
    totalTipCalculate();
  }, [totalTipCalculate]);

  const maxLengthCheck = (e) => {
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
  };

  return (
    <div className={tipStayle.tipContainer}>
      {/* SECCION DE INPUTS */}
      <div className={tipStayle.inputsContainer}>
        <div className={tipStayle.billContainer}>
          <span> Bill </span>
          <input
            maxLength="7"
            value={bill || ""}
            type="number"
            placeholder="0"
            min="0"
            onChange={(e) => {
              maxLengthCheck(e);
              setBill(e.target.value);
              totalTipCalculate();
            }}
          />
        </div>
        <div className={tipStayle.btnsContainer}>
          <span>Select Tip %</span>
          <div className={tipStayle.divBtn1}>
            <button
              className={tipStayle.btnTip}
              style={selectBtn[0]}
              value="5"
              onClick={(e) => {
                btnActive(e);
                setTip(e.target.value);
                totalTipCalculate();
              }}
            >
              5%
            </button>
            <button
              className={tipStayle.btnTip}
              style={selectBtn[1]}
              value="10"
              onClick={(e) => {
                btnActive(e);
                setTip(e.target.value);
                totalTipCalculate();
              }}
            >
              10%
            </button>
            <button
              className={tipStayle.btnTip}
              style={selectBtn[2]}
              value="15"
              onClick={(e) => {
                btnActive(e);
                setTip(e.target.value);
                totalTipCalculate();
              }}
            >
              15%
            </button>
          </div>
          <div className={tipStayle.divBtn2}>
            <button
              className={tipStayle.btnTip}
              value="25"
              style={selectBtn[3]}
              onClick={(e) => {
                btnActive(e);
                setTip(e.target.value);
                totalTipCalculate();
              }}
            >
              25%
            </button>
            <button
              className={tipStayle.btnTip}
              style={selectBtn[4]}
              value="50"
              onClick={(e) => {
                btnActive(e);
                setTip(e.target.value);
                totalTipCalculate();
              }}
            >
              50%
            </button>
            <input
              type="number"
              placeholder="Custom"
              style={selectBtn[5]}
              min="0"
              className={tipStayle.customTip}
              onChange={(e) => {
                btnActive(e);
                setTip(e.target.value);
                totalTipCalculate();
              }}
            />
          </div>
        </div>
        <div className={tipStayle.peopleContainer}>
          <span className={tipStayle.peopleSpan}>Number of People</span>
          <input
            value={person || ""}
            type="number"
            placeholder="0"
            style={selectBtn[6]}
            min="0"
            className={tipStayle.peopleBtn}
            onChange={(e) => {
              setPerson(e.target.value);
              totalTipCalculate();
            }}
          />
        </div>
      </div>
      {/* ---------------------------------------------------- */}
      {/* Seccion Results */}
      <div className={tipStayle.resultsContainer}>
        <div>
          <span className={tipStayle.spanTotal}>Total Tip</span>
          <span className={tipStayle.spanMoney}> ${totalTip} </span>
        </div>
        <div>
          <span className={tipStayle.spanTotal}>/Person</span>
          <span className={tipStayle.spanMoney}> ${tipPerson} </span>
        </div>
        <button className={tipStayle.btn} onClick={(e) => reset()}>
          RESET
        </button>
      </div>
    </div>
  );
}

export default TipContainer;
