import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Divider,
  DialogActions,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IToolType } from "../page_builder_tools/page_builder_tools";
import { v4 as uuidv4 } from "uuid";
import styles from "./custom_dialog.module.scss";

function CustomDialog({
  tool,
  isOpen,
  onClose,
  onSuccess,
}: {
  tool: IToolType;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: IToolType) => void;
}) {
  const [currentTool, setCurrentTool] = useState<IToolType>(tool);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleToolChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const data = {
      ...currentTool,
      [field]: e.target.value,
    };
    setCurrentTool(data);
  };

  useEffect(() => {
    setCurrentTool(tool);
  }, [tool]);

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth={"sm"}>
      <>
        <DialogTitle> {`Edit ${currentTool.type}`}</DialogTitle>
        <Divider
          style={{
            margin: "0",
          }}
        />
        <DialogContent className={styles.dialogContent}>
          <h4>Text</h4>
          <TextField
            value={currentTool.text ?? ""}
            onChange={(e) => handleToolChange(e, "text")}
            fullWidth
          />
          <h4>X</h4>
          <TextField
            value={currentTool.xPosition ?? ""}
            onChange={(e) => handleToolChange(e, "xPosition")}
            fullWidth
          />
          <h4>Y</h4>
          <TextField
            value={currentTool.yPosition ?? ""}
            onChange={(e) => handleToolChange(e, "yPosition")}
            fullWidth
          />
          {currentTool.type !== "Input" && (
            <>
              <h4>Font Size</h4>
              <TextField
                value={currentTool.fontSize ?? ""}
                onChange={(e) => handleToolChange(e, "fontSize")}
                fullWidth
              />
            </>
          )}
          {currentTool.type !== "Input" && (
            <>
              <h4>Font Weight</h4>
              <TextField
                value={currentTool.fontWeight ?? ""}
                onChange={(e) => handleToolChange(e, "fontWeight")}
                fullWidth
              />
            </>
          )}
          {/* {currentTool.type === "Button" && (
            <>
              <h6>OnClick Handler</h6>
              <TextField
                value={currentTool.onClick ?? ""}
                onChange={(e) => handleToolChange(e, "onClick")}
                fullWidth
              />
            </>
          )} */}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              const data: IToolType = {
                ...currentTool,
                xPosition: Number(currentTool.xPosition),
                yPosition: Number(currentTool.yPosition),
                id: currentTool.id !== "" ? currentTool.id : uuidv4(),
              };
              onSuccess(data);
              onClose();
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </>
    </Dialog>
  );
}

export default CustomDialog;
