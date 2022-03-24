import {useContext,} from "react";
import axios from "axios";
import "../App.css";
import Context from "../Context";
// import Icon from "@mui/core/Icon"
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import {useTheme} from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import "../popup.css";
// import Popup from "@reactjs-popup"
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const useStyles = theme => ({
  modal: {
    fontSize: "2em",
    backgroundColor: "rgb(60, 125, 194)",
    borderRadius: "15px",
    width: "100%",
    padding: "3%"
  },
  close: {
    position: "absolute",
    cursor: "pointer",
    display: "block",
    padding: " 2px 5px",
    lineHeight: "20px",
    right: "-10px",
    top: " -10px",
    fontSize: "24px",
    background: "#ffffff",
    borderRadius: "18px",
    border: "1px solid #cfcece"
  }
});

export default ({messageCreation, addMessage, channel}) => {
  const [content, setContent] = useState('');
  const styles = useStyles(useTheme());
  const {oauth} = useContext(Context);
  const navigate = useNavigate();

  const classes = useStyles();

  const editMessage = async () => {
    const {data: message} = await axios.put(
      `http://localhost:3001/channels/${channel.id}/messages`,
      {
        content: document.getElementById("filled-basic edit").value,
        author: oauth.email,
        creation: messageCreation
      }
    );
    navigate(`/channels/`);
  };
  const deleteMessage = async () => {
    const {data: message} = await axios.post(
      `http://localhost:3001/channels/${channel.id}/messages`,
      {
        content: content,
        author: oauth.email
      }
    );
    addMessage(message);
    setContent("");
  };
  return (
    <div>
      <Popup
        trigger={
          <Button variant="outlined" startIcon={<CreateIcon />}>
            Modify
          </Button>
        }
        modal
        nested
      >
        {close => (
          <div css={styles.modal}>
            <button css={styles.close} onClick={close}>
              &times;
            </button>
            <h2>Edit your message:</h2>
            <div >
              <form className={classes.root} noValidate autoComplete="off">
                <TextField
                  id="filled-basic edit"
                  label="Modify message"
                  variant="filled"
                  required
                />
                <div className={classes.root}>
                  <Button onClick={editMessage} href="#">
                    Modify
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Popup>
      <Popup
        trigger={
          <Button variant="outlined" startIcon={<DeleteIcon />}>
            Delete
          </Button>
        }
        modal
        nested
      >
        {close => (
          <div css={styles.modal}>
            <button css={styles.close} onClick={close}>
              &times;
            </button>
            <h2>Are you sure ?</h2>
            <div >
              <form className={classes.root} noValidate autoComplete="off">
                <div className={classes.root}>
                  <Button onClick={deleteMessage} href="#">
                    Confirm
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Popup>

    </div>
  );
};
