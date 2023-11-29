import styles from "./page_builder_tools.module.scss";
import dragIcon from "../assets/images/grip-vertical.png";
import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";

import CustomDialog from "../custom_dialog/custom_dialog";

const toolsLabel = ["Label", "Input", "Button"];
export interface IToolType {
  id?: string;
  xPosition?: number;
  yPosition?: number;
  text?: string;
  fontSize?: string;
  fontWeight?: string;
  type?: string;
  onClick?: string;
}

const initialData: IToolType = {
  id: "",
  xPosition: 0,
  yPosition: 0,
  text: "",
  fontSize: "",
  fontWeight: "",
  type: "",
  onClick: "",
};

function PageBuilderTools() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clickedElement, setClickedElement] = useState<number | null>(null);
  const [currentTool, setCurrentTool] = useState<IToolType>(initialData);
  const [selectedTools, setSelectedTools] = useState<IToolType[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("builderTools");
    if (data) {
      setSelectedTools(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    if (clickedElement !== null) {
      addKeyPressListener();
    } else {
      window.removeEventListener("keydown", addKeyPressListener);
    }

    return () => {
      window.removeEventListener("keydown", addKeyPressListener);
    };
  }, [clickedElement]);

  const updateToolsPosition = (
    e: { clientX: number; clientY: number },
    ele: IToolType,
    idx: number
  ) => {
    const data: IToolType = {
      ...ele,
      xPosition: e.clientX,
      yPosition: e.clientY,
    };
    setCurrentTool(data);
    const builderTools = selectedTools;
    (builderTools[idx].xPosition = e.clientX),
      (builderTools[idx].yPosition = e.clientY),
      setSelectedTools(builderTools);
    updateLocalStorageData(builderTools);
  };

  const getElementBasedOnType = (ele: IToolType, idx: number) => {
    switch (ele.type) {
      case "Label":
        return (
          <label
            draggable
            className={clickedElement === idx ? styles.addRedBorder : ""}
            onClick={(e) => {
              setClickedElement(idx);
              e.stopPropagation();
            }}
            onDragStart={() => {
              setCurrentTool(ele);
              setClickedElement(idx);
            }}
            style={{
              color: "#000",
              fontSize: `${ele.fontSize}px`,
              fontWeight: ele.fontWeight,
              position: "absolute",
              top: ele.yPosition,
              left: ele.xPosition,
              cursor: "grab",
            }}
          >
            {ele.text}
          </label>
        );

      case "Input":
        return (
          <div
            draggable
            onDragStart={() => {
              setCurrentTool(ele);
              setClickedElement(idx);
            }}
            className={clickedElement === idx ? styles.addRedBorder : ""}
            onClick={(e) => {
              setClickedElement(idx);
              e.stopPropagation();
            }}
            style={{
              cursor: "grab",
              position: "absolute",
              fontSize: `${ele.fontSize}px`,

              fontWeight: ele.fontWeight,
              top: ele.yPosition,
              left: ele.xPosition,
            }}
          >
            <TextField placeholder={ele.text} />
          </div>
        );

      case "Button":
        return (
          <div
            draggable
            onDragStart={() => {
              setCurrentTool(ele);
              setClickedElement(idx);
            }}
            className={clickedElement === idx ? styles.addRedBorder : ""}
            onClick={(e) => {        
              setClickedElement(idx);      
              e.stopPropagation();
            }}
            style={{
              cursor: "grab",
              position: "absolute",
              top: ele.yPosition,
              left: ele.xPosition,
            }}
          >
            <Button              
              style={{
                fontSize: `${ele.fontSize}px`,
                fontWeight: ele.fontWeight,
                padding: "5px 15px",
              }}
              variant="contained"
            >
              {ele.text}
            </Button>
          </div>
        );

      default:
        return <h5>hey</h5>;
    }
  };

  const setBuilderTools = (data: IToolType) => {
    const idx = selectedTools.findIndex((ele) => ele.id === data.id);
    const updatedData = [...selectedTools];
    if (idx >= 0) {
      console.log("data", data);
      updatedData[idx] = data;
    } else {
      updatedData.push(data);
    }
    setSelectedTools(updatedData);
    updateLocalStorageData(updatedData);
  };
  const updateLocalStorageData = (data: IToolType[]) => {
    localStorage.setItem("builderTools", JSON.stringify(data));
  };

  const addKeyPressListener = () => {
    window.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && clickedElement !== null) {
        setCurrentTool(selectedTools[clickedElement]);
        setIsMenuOpen(true);
      } else if (event.key === "Delete" && clickedElement !== null) {
        const data = [...selectedTools];
        data.splice(clickedElement, 1);
        setClickedElement(null);
        setSelectedTools(data);
        updateLocalStorageData(data);
      }
    });
  };
  return (
    <>
      <CustomDialog
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        tool={currentTool}
        onSuccess={(data) => setBuilderTools(data)}
      />
      <div
        onClick={() => setClickedElement(null)}
        className={styles.pageBuilderToolsContainer}
      >
        <h4>Blocks</h4>
        <div className={styles.toolsContainer}>
          {toolsLabel.map((label) => {
            return (
              <div
                className={styles.tools}
                draggable
                onDragStart={() => setClickedElement(null)}
                onDragEnd={(e) => {
                  setCurrentTool({
                    ...initialData,
                    xPosition: e.clientX,
                    yPosition: e.clientY,
                    type: label,
                  });
                }}
              >
                <img height={12} width={8} src={dragIcon} alt="" />
                <h6>{label}</h6>
              </div>
            );
          })}
        </div>
      </div>
      <div
        onClick={() => setClickedElement(null)}
        id="targetDiv"
        className={styles.canvasContainer}
        onDrop={(e) => {
          e.preventDefault();
          if (e.target.id === "targetDiv") {
            if (currentTool.id === "") {
              setIsMenuOpen(true);
            } else {
              updateToolsPosition(
                { clientX: e.clientX, clientY: e.clientY },
                currentTool,
                clickedElement!
              );
            }
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        {selectedTools.map((tool, idx) => {
          return <>{getElementBasedOnType(tool, idx)}</>;
        })}
      </div>
    </>
  );
}

export default PageBuilderTools;
