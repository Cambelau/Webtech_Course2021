/** @jsxImportSource @emotion/react */
import {useContext} from "react";
import Gravatar from "react-gravatar";
// Layout
import {useTheme} from "@mui/styles";
import {IconButton} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Context from "./Context";
import {useNavigate} from "react-router-dom";

const useStyles = theme => ({
  header: {
    padding: theme.spacing(1),
    backgroundColor: "rgba(1, 71, 145,.8)",
    borderRadius: "30px",
    marginBottom: "1%",
    paddingLeft: "20px",
    flexShrink: 0
  },
  smallIcon: {
    float: "right"
  },
  settingsIcon: {
    "&:hover": {
      transform: "scale(0.8)"
    }
  },
  exitIcon: {
    "&:hover": {
      transform: "scale(0.8)"
    }
  },
  userInfo: {
    padding: "7%",
    fontSize: "1.5em"
  },
  menu: {
    [theme.breakpoints.up("sm")]: {
      display: "none !important"
    }
  }
});

export default function Header({drawerToggleListener}) {
  const styles = useStyles(useTheme());
  const navigate = useNavigate();
  const {
    oauth,
    setOauth,
    drawerVisible,
    setDrawerVisible,
    currentChannel,
    currentAccount
  } = useContext(Context);
  const drawerToggle = e => {
    setDrawerVisible(!drawerVisible);
  };
  const onClickLogout = e => {
    e.stopPropagation();
    setOauth(null);
  };
  const onClickSettings = e => {
    navigate(`/channels/settings`);
  };
  const onClickChannel = e => {
    navigate(`/channels`);
  };
  return (
    <header css={styles.header}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={drawerToggle}
        css={styles.menu}
      >
        <MenuIcon />
      </IconButton>
      {oauth ? (
        <div>
          <span css={styles.userInfo}>
            {currentChannel ? (
              currentChannel.name
            ) : (
              <span>
                <Gravatar
                  onClick={onClickChannel}
                  email={oauth.email}
                  size={70}
                  default={currentAccount.avatar}
                />
               <span>   Welcome !   </span>
                {currentAccount.username ? (
                  currentAccount.username
                ) : (
                  <span> Complete your profile </span>
                )}
              </span>
            )}
          </span>
          <span css={styles.smallIcon}>
            <div css={styles.settingsIcon}>
              <SettingsIcon
                onClick={onClickSettings}
                fontSize="large"
                color="primary"
              ></SettingsIcon>
            </div>
            <div css={styles.exitIcon}>
              <ExitToAppIcon
                onClick={onClickLogout}
                fontSize="large"
                color="primary"
              ></ExitToAppIcon>
            </div>
          </span>
        </div>
      ) : (
        <span>
          <center>Welcome !</center>
        </span>
      )}
    </header>
  );
}
