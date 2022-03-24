/** @jsxImportSource @emotion/react */
// Layout
import {useTheme} from "@mui/styles";

import Context from "./Context";
import {useContext} from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import "./popup.css";

import {useNavigate} from "react-router-dom";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import {Grid} from "@mui/material";
import Gravatar from "react-gravatar";

const useStyles = theme => ({
  root: {
    height: "100%",
    flex: "1 1 auto",
    display: "flex"
    // background: 'rgba(0,0,0,.2)',
  },
  bio: {
    border: "1px solid #cfcece",
    width: "100%",
    margin: "10%",
    padding: "20%"
  },
  iconAvatar: {
    "&:active": {
      transform: "scale(0.5)"
    }
  }
});

export default function Settings() {
  const styles = useStyles(useTheme());
  const navigate = useNavigate();
  const {oauth, currentAccount} = useContext(Context);
  const chooseAvatar = parameter => e => {
    document.getElementById(
      "outlined-textarea accountAvatar"
    ).value = parameter;
  };
  const updateAccount = async () => {
    try {
      var accountName = document.getElementById("outlined-textarea accountName")
        .value;
      var accountBio = document.getElementById("outlined-textarea accountBio")
        .value;
      var id_avatar = document.getElementById("outlined-textarea accountAvatar")
        .value;

      if (id_avatar === "null") id_avatar = currentAccount.avatar;
      if (accountName === "") accountName = currentAccount.username;
      if (accountBio === "") accountBio = currentAccount.bio;
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
    } catch (err) {
      navigate("/oups");
    }
  };
  return (
    <div css={styles.root}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={2}>
          <h1>Settings</h1>
          <span>You can update your informations here</span>
        </Grid>
        <Grid item xs={2}>
          <div css={styles.element}>
            <TextField
              name="Username"
              id="outlined-textarea accountName"
              label={currentAccount.username}
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
            <Grid container spacing={1} direction="row">
              <div id="outlined-textarea accountAvatar" value="null"></div>
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
        <Grid item xs={2}>
          <div css={styles.bio}><span>Actual biography : </span>{currentAccount.bio}</div>
          <TextField
            name="Bio"
            id="outlined-textarea accountBio"
            label="Update Bio"
            placeholder=""
            multiline
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<SaveAltIcon />}
            onClick={updateAccount}
            size="large"
          >
            UPDATE
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
