/** @jsxImportSource @emotion/react */
import {forwardRef, useImperativeHandle, useLayoutEffect, useRef} from "react";
import Gravatar from "react-gravatar";
// Layout
import {useTheme} from "@mui/styles";
// Markdown
import {unified} from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
import axios from "axios";

import Context from "../Context";
import {useContext} from "react";
import Edit from "./Edit";
import "../popup.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

// Time
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(calendar);
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  calendar: {
    sameElse: "DD/MM/YYYY hh:mm A"
  }
});

const useStyles = theme => ({
  root: {
    position: "relative",
    flex: "1 1 auto",
    overflow: "auto",
    "& ul": {
      margin: 0,
      padding: 0,
      textIndent: 0,
      listStyleType: 0
    }
  },
  message: {
    padding: ".2rem .5rem",
    ":hover": {
      backgroundColor: "rgba(9, 31, 54,.5)"
    }
  },
  fabWrapper: {
    position: "absolute",
    right: 0,
    top: 0,
    width: "50px"
  },
  fab: {
    position: "fixed !important",
    top: 0,
    width: "50px"
  },
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

export default forwardRef(({channel, messages, onScrollDown}, ref) => {
  const addMember = async () => {
    var chan = channel;
    var newMember = document.getElementById("filled-basic add").value;
    if (newMember !== null)
      chan.members.push(newMember);
    try {
      const { data: channels } = await axios.put(
        `//localhost:3001/channels/${chan.id}`,
        {
          name: chan.name,
          owner: chan.owner,
          members: chan.members
        }
      );
      navigate(`/channels/${chan.id}`);
    } catch (error) {}
  };
  const renameChann = async () => {
    var chan = channel;
    var renameChannel = document.getElementById("filled-basic rename").value;
    if (renameChannel !== null) {
      chan.name = renameChannel;
    }
    try {
      const {data: channels} = await axios.put(
        `//localhost:3001/channels/${chan.id}`,
        {
          name: chan.name,
          owner: chan.owner
          // members: chan.members
        }
      );
      navigate(`/channels/${chan.id}`);
    } catch (error) {}
  };
  const styles = useStyles(useTheme());
  // Expose the `scroll` action
  useImperativeHandle(ref, () => ({
    scroll: scroll
  }));
  const rootEl = useRef(null);
  const scrollEl = useRef(null);
  const navigate = useNavigate();
  const {currentAccount} = useContext(Context);
  const scroll = () => {
    scrollEl.current.scrollIntoView();
  };
  // See https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
  const throttleTimeout = useRef(null); // react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    const rootNode = rootEl.current; // react-hooks/exhaustive-deps
    const handleScroll = () => {
      if (throttleTimeout.current === null) {
        throttleTimeout.current = setTimeout(() => {
          throttleTimeout.current = null;
          const {scrollTop, offsetHeight, scrollHeight} = rootNode; // react-hooks/exhaustive-deps
          onScrollDown(scrollTop + offsetHeight < scrollHeight);
        }, 200);
      }
    };
    handleScroll();
    rootNode.addEventListener("scroll", handleScroll);
    return () => rootNode.removeEventListener("scroll", handleScroll);
  });
  return (
    <div css={styles.root} ref={rootEl}>
      <h1>Messages for {channel.name}</h1>
      <ul>
        {messages.map((message, i) => {
          const {value} = unified()
            .use(markdown)
            .use(remark2rehype)
            .use(html)
            .processSync(message.content);
          return (
            <li key={i} css={styles.message}>
              <p>
                {currentAccount.username ? (
                  <span>
                    <Gravatar
                      email={currentAccount.email}
                      size={55}
                      default={currentAccount.avatar}
                    />{" "}
                  </span>
                ) : (
                  <span> </span>
                )}

                <span>{message.author}</span>
                {" - "}
                <span>{dayjs().calendar(message.creation)}</span>
              </p>
              <Edit messageCreation={message.creation} channel={channel} />
              <Popup
                trigger={
                  <Button
                    variant="outlined"
                    startIcon={<AdminPanelSettingsIcon />}
                  >
                    Update Channel
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
                    <form noValidate autoComplete="off">
                      <TextField
                        id="filled-basic rename"
                        label="Rename channel"
                        variant="filled"
                      />
                      <div>
                        <Button onClick={renameChann} href="#">
                          RENAME
                        </Button>
                      </div>
                    </form>
                    <form noValidate autoComplete="off">
                      <TextField
                        id="filled-basic add"
                        label="Member name"
                        variant="filled"
                      />
                      <div>
                        <Button onClick={addMember} href="#">
                          ADD
                        </Button>
                      </div>
                    </form>
                    <div>
                    <span>Owner of this channel :   </span>
                    {channel.owner}
                    <br></br>
                    <span>Members of this channel :   </span>
                    {channel.members}
                    </div>
                  </div>
                )}
              </Popup>
              <div dangerouslySetInnerHTML={{__html: value}}></div>
            </li>
          );
        })}
      </ul>
      <div ref={scrollEl} />
    </div>
  );
});
