
/** @jsxImportSource @emotion/react */
import {useContext, useEffect} from 'react'
// Layout
import { useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Drawer } from '@mui/material';
import axios from "axios";
// Local
import Context from './Context'
import Channels from './Channels'
import Channel from './Channel'
import Welcome from './Welcome'
import Settings from './Settings'
import {
  Route,
  Routes,
} from 'react-router-dom'

const useStyles = (theme) => ({
  root: {
    backgroundColor: 'rgb(0, 24, 48)',
    overflow: 'hidden',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    borderRadius: "15px"
  },
  drawer: {
    width: '200px',
    display: 'none',
  },
  drawerVisible: {
    display: 'block',
  },
})

export default function Main() {
  const {
    oauth,
    currentChannel,
    drawerVisible,
    allAccounts,
    setAllAccounts,
    setCurrentAccount
  } = useContext(Context)
  useEffect( () => {
    const fetch = async () => {
      try {
        const {data: users} = await axios.get('http://localhost:3001/users')
        setAllAccounts(users);
        if(allAccounts!==undefined)
        for (const account of allAccounts) {
          if(account.email===oauth.email)
            setCurrentAccount(account)
      }
    }catch(err){
      console.log(err)
    }
  }
  fetch()
},[setAllAccounts,allAccounts,oauth,setCurrentAccount,currentChannel])

  const theme = useTheme()
  const styles = useStyles(theme)
  const alwaysOpen = useMediaQuery(theme.breakpoints.up('sm'))
  const isDrawerVisible = alwaysOpen || drawerVisible
  return (
    <main css={styles.root}>
      <Drawer
        PaperProps={{ style: { position: 'relative' } }}
        BackdropProps={{ style: { position: 'relative' } }}
        ModalProps={{
          style: { position: 'relative' }
        }}
        variant="persistent"
        open={isDrawerVisible}
        css={[styles.drawer, isDrawerVisible && styles.drawerVisible]}
      >
        <Channels />
      </Drawer>
      <Routes>
        <Route path=":id" element={<Channel />}/>
        <Route path="*" element={<Welcome />}/>
        <Route path="settings" element={<Settings />}/>
      </Routes>
    </main>
  );
}
