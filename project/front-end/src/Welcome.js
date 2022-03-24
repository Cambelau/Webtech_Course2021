/** @jsxImportSource @emotion/react */
// Layout
import {useTheme} from "@mui/styles";
import {Grid, Typography} from "@mui/material";
import {ReactComponent as ChannelIcon} from "./icons/channel.svg";
import {ReactComponent as FriendsIcon} from "./icons/friends.svg";
import {ReactComponent as SettingsIcon} from "./icons/settings.svg";

import Context from "./Context";
import {useContext} from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
//Popup made thanks to :  https://react-popup.elazizi.com/react-modal
import "./popup.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import {useNavigate} from "react-router-dom";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Gravatar from "react-gravatar";

const useStyles = theme => ({
  root: {
    height: "100%",
    flex: "1 1 auto",
    display: "flex"
    // background: 'rgba(0,0,0,.2)',
  },
  card: {
    textAlign: "center"
  },
  icon: {
    width: "30%",
    fill: "#fff"
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
  },
  iconAvatar: {
    "&:active": {
      transform: "scale(0.5)"
    }
  }
});

export default function Welcome() {
  const styles = useStyles(useTheme());
  const navigate = useNavigate();
  const {oauth, currentAccount} = useContext(Context);
  const createChannel = async () => {
    var nameChannel = document.getElementById("filled-basic create").value;
    const {data: channels} = await axios.post(
      `http://localhost:3001/channels`,
      {
        name: nameChannel,
        owner: oauth.email,
        members: [oauth.email]
      }
    );
    window.location.reload("http://localhost:3000/channels");
  };
  const onClickSettings = e => {
    navigate(`/channels/settings`);
  };
  const chooseAvatar = (parameter) => e => {
    document.getElementById("outlined-textarea accountAvatar")
      .value=parameter;
  };
  const createAccount = async () => {
    var accountName = document.getElementById("outlined-textarea accountName")
      .value;
    var accountBio = document.getElementById("outlined-textarea accountBio")
      .value;
    var id_avatar = document.getElementById("outlined-textarea accountAvatar")
        .value;
    const {data: users} = await axios.put(
      `http://localhost:3001/users/${oauth.email}`,
      {
        username: accountName,
        email: oauth.email,
        bio: accountBio,
        avatar: id_avatar
      }
    );
    navigate("/");
  };
  return (
    <div css={styles.root}>
      {currentAccount.username !== undefined ? (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={5}
        >
          <Grid item xs>
            <div css={styles.card}>
              <ChannelIcon css={styles.icon} />
              <Typography color="textPrimary"></Typography>
              <Popup
                trigger={
                  <Button variant="contained" color="primary" disableElevation>
                    Add channel
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
                    <div> Create your channel: </div>
                    <br></br>
                    <div>
                      <form noValidate autoComplete="off">
                        <TextField
                          id="filled-basic create"
                          label="Channel name"
                          variant="filled"
                        />
                        <Button type="submit" onClick={createChannel}>
                          CREATE
                        </Button>
                      </form>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </Grid>
          <Grid item xs>
            <div css={styles.card}>
              <FriendsIcon css={styles.icon} />
              <Typography color="textPrimary">Invite friends</Typography>
            </div>
          </Grid>
          <Grid item xs>
            <div css={styles.card}>
              <SettingsIcon css={styles.icon} />
              <Typography color="textPrimary"></Typography>
              <Button
                onClick={onClickSettings}
                variant="contained"
                color="primary"
                disableElevation
              >
                Settings
              </Button>
            </div>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={0}
        >
          <Grid item xs>
            <span>
              <h2>Welcome to our chatweb !</h2>
            </span>
          </Grid>
          <Grid item xs>
            <div css={styles.element}>
            <h4>Choose a username</h4>
              <TextField
                name="name"
                id="outlined-textarea accountName"
                label="name"
                placeholder=""
                multiline
                variant="outlined"
                required
              />
            </div>
          </Grid>

          <Grid item xs>
            <div css={styles.element}>
            <h4>Complete your bio</h4>
              <TextField
                name="bio"
                id="outlined-textarea accountBio"
                label="Bio"
                placeholder=""
                multiline
                variant="outlined"
                required
              />
            </div>
          </Grid>
          <Grid item xs>
            <div>
              <center>
                <h4>Choose an avatar</h4>
              </center>
              <Grid container spacing={4} direction="row">
                <Grid item xs={3}>
                  <div css={styles.iconAvatar}>
                    <Gravatar
                      onClick={chooseAvatar("mp")}
                      email={oauth.email}
                      size={60}
                      default="mp"
                    />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div css={styles.iconAvatar}>
                    <Gravatar
                      onClick={chooseAvatar("retro")}
                      email={oauth.email}
                      size={60}
                      default="retro"
                    />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div css={styles.iconAvatar}>
                    <Gravatar
                      onClick={chooseAvatar("robohash")}
                      email={oauth.email}
                      size={60}
                      default="robohash"
                    />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div css={styles.iconAvatar}>
                    <Gravatar
                      onClick={chooseAvatar("wavatar")}
                      email={oauth.email}
                      size={60}
                      default="wavatar"
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs>
            <div id="outlined-textarea accountAvatar" value="null"></div>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<SaveAltIcon />}
              onClick={createAccount}
              size="large"
            >
              CREATE
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
