import { createRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Draggable from "react-draggable";
import { CHANGE_SELECTION } from "../reducer/crudReducer";
import "./index.css";

const Card = () => {
  const [selectText, setSelectText] = useState({
      start: 0,
      end: 0,
      endText: 0,
      text: "",
    }),
    dispatch = useDispatch()

  const clickDocument = (e) => {
    let $documents = document.getElementById("documents"),
      selection = window.getSelection(),
      textSelect = selection.toString(),
      rangeSelect = selection.anchorNode,
      rangeSelectOff = selection.focusNode,
      numberNodesParent = rangeSelect.parentNode.childNodes.length,
      text = $documents.textContent,
      textHtml = $documents.innerHTML,
      sumaNodes = 0,
      rangeNew = " ",
      auxRangeSelect = 0,
      arrTextSelect = textSelect.split("\n"),
      numTextSelect = arrTextSelect[0].length,
      rangeSelectNumAux = rangeSelect.textContent.slice(-numTextSelect),
      directionSelect = 0;

      console.log('////////////////////////////////////');

    if (rangeSelect !== rangeSelectOff) {
      if (textSelect.includes("\n")) {
        if (arrTextSelect[0] !== rangeSelectNumAux) {
          auxRangeSelect = rangeSelectOff;
          directionSelect = 1;
        } else {
          auxRangeSelect = rangeSelect;
          directionSelect = 0;
        }
      } else {
        auxRangeSelect = rangeSelect;
      }
    } else {
      auxRangeSelect = rangeSelect;
    }

    let parentSelect = auxRangeSelect.parentElement,
      numberNodesParentSpan = parentSelect.parentNode.childNodes.length;

    // Getting css properties
    let elementStyle = window.getComputedStyle(
        document.getElementById(parentSelect.id)
      ),
      fontFamilySelect = elementStyle.getPropertyValue("font-family"),
      fontSizeSelect = elementStyle.getPropertyValue("font-size"),
      colorSelect = elementStyle.getPropertyValue("color"),
      backgroundSelect = elementStyle.getPropertyValue("background-color"),
      textAlignSelect = elementStyle.getPropertyValue("text-align");

    if (parentSelect.nodeName == "SPAN") {
      console.log('padreSpan');
      for (let index = 0; index < numberNodesParentSpan; index++) {
        if (rangeNew == " ") {
          if (parentSelect.previousSibling == null) {
          } else {
            rangeNew = parentSelect.previousSibling;
            if (rangeNew.length > 0) {
              sumaNodes = sumaNodes + rangeNew.length - 1;
            }
            if (rangeNew.tagName == "BR") {
              sumaNodes = sumaNodes + 4;
            }
            if (rangeNew.nodeName == "SPAN") {
              sumaNodes = sumaNodes + rangeNew.textContent.length;
              console.log("span", rangeNew.textContent.length);
            }
          }
        } else {
          if (rangeNew.previousSibling == null) {
          } else {
            rangeNew = rangeNew.previousSibling;
            if (rangeNew.length > 0) {
              sumaNodes = sumaNodes + rangeNew.length;
            }
            if (rangeNew.tagName == "BR") {
              sumaNodes = sumaNodes + 4;
            }
            if (rangeNew.nodeName == "SPAN") {
              sumaNodes = sumaNodes + rangeNew.textContent.length;
              console.log("span", rangeNew.textContent.length);
            }
          }
        }
        console.log(rangeNew);
      }
    } else {
      for (let index = 0; index < numberNodesParent; index++) {
        if (rangeNew == " ") {
          if (auxRangeSelect.previousSibling == null) {
          } else {
            rangeNew = auxRangeSelect.previousSibling;
            if (rangeNew.length > 0) {
              sumaNodes = sumaNodes + rangeNew.length;
            }
            if (rangeNew.tagName == "BR") {
              sumaNodes = sumaNodes + 4;
            }
            if (rangeNew.nodeName == "SPAN") {
              sumaNodes = sumaNodes + rangeNew.textContent.length;
              console.log("span", rangeNew.textContent.length);
            }
          }
        } else {
          if (rangeNew.previousSibling == null) {
            rangeNew = rangeNew.parentElement
          } else {
            rangeNew = rangeNew.previousSibling;
            if (rangeNew.length > 0) {
              sumaNodes = sumaNodes + rangeNew.length;
            }
            if (rangeNew.tagName == "BR") {
              sumaNodes = sumaNodes + 4;
            }
            if (rangeNew.tagName == "SPAN") {
              sumaNodes = sumaNodes + rangeNew.textContent.length;
              console.log("span", rangeNew.textContent.length);
            }
          }
        }
        console.log(rangeNew);
      }
    }

    console.log(sumaNodes,  " suma");
    console.log(rangeSelect);
    console.log(textSelect);

    if (rangeSelect !== rangeSelectOff) {
      if (directionSelect == 1) {
        dispatch(
          CHANGE_SELECTION({
            start: selection.focusOffset + sumaNodes +rangeSelect.length,
            end:
              selection.focusOffset +
              sumaNodes + rangeSelect.length +
              textSelect.length +
              (arrTextSelect.length - 1) * 3,
            endText: text.length + 4,
            node: rangeSelect.tagName,
            fontFamily: fontFamilySelect,
            fontSize: fontSizeSelect,
            color: colorSelect,
            background: backgroundSelect,
            textAlign: textAlignSelect,
          })
        );
      } else {
        dispatch(
          CHANGE_SELECTION({
            start: selection.anchorOffset + sumaNodes,
            end:
              selection.anchorOffset +
              sumaNodes +
              textSelect.length +
              (arrTextSelect.length - 1) * 3,
            endText: text.length + 4,
            node: rangeSelect.tagName,
            fontFamily: fontFamilySelect,
            fontSize: fontSizeSelect,
            color: colorSelect,
            background: backgroundSelect,
            textAlign: textAlignSelect,
          })
        );
      }
    } else {
      if (selection.anchorOffset > selection.focusOffset) {
        dispatch(
          CHANGE_SELECTION({
            end: selection.anchorOffset + sumaNodes,
            start: selection.focusOffset + sumaNodes,
            endText: text.length + 4,
            node: rangeSelect.tagName,
            fontFamily: fontFamilySelect,
            fontSize: fontSizeSelect,
            color: colorSelect,
            background: backgroundSelect,
            textAlign: textAlignSelect,
          })
        );
      } else {
        dispatch(
          CHANGE_SELECTION({
            start: selection.anchorOffset + sumaNodes,
            end: selection.focusOffset + sumaNodes,
            endText: text.length + 4,
            node: parentSelect.tagName,
            fontFamily: fontFamilySelect,
            fontSize: fontSizeSelect,
            color: colorSelect,
            background: backgroundSelect,
            textAlign: textAlignSelect,
          })
        );
      }
    }
  };

  const [target, setTarget] = useState();
  const [frame, setFrame] = useState({
    translate: [0, 0],
    scale: [1, 1],
  });

  useEffect(() => {
    setTarget(document.querySelector(".target"));
  }, []);

  return (
    <>
      <div id="documentss" className="card">
        <p
          id="documents"
          onClick={clickDocument}
          contentEditable
          className="cardPage"
          autoFocus
        ></p>
      </div>
    </>
  );
};

export default Card;
