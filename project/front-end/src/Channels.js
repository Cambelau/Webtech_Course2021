/** @jsxImportSource @emotion/react */
import {useContext, useEffect} from "react";
import axios from "axios";
// Layout
import {Link} from "@mui/material";
// Local
import Context from "./Context";
import {useNavigate} from "react-router-dom";


const styles = {
  root: {
    "& a": {
      padding: ".2rem .5rem",
      whiteSpace: "nowrap"
    }
  }
};

export default function Channels() {
  const {oauth, channels, setChannels, setCurrentChannel} = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const {data: channels} = await axios.get(
          "http://localhost:3001/channels",
          {
            headers: {
              Authorization: `Bearer ${oauth.access_token}`
            }
          }
        );
        setChannels(channels);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [oauth, setChannels]);
  return (
    <ul css={styles.root}>
      <li css={styles.channel}>
        <Link
          href={`/channels/`}
          onClick={e => {
            e.preventDefault();
            setCurrentChannel(null);
            navigate(`/channels/`);
          }}
        >
          Welcome
        </Link>
      </li>
      {channels.map((channel, i) => (
        <li key={i} css={styles.channel}>
          <Link
            href={`/channels/${channel.id}`}
            onClick={e => {
              e.preventDefault();
              setCurrentChannel(channel.id);
              navigate(`/channels/${channel.id}`);
            }}
          >
            {channel.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
