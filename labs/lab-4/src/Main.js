// src/Main.js
import React from 'react'
import './Main.css';

export default () =>{
  return (
    <main className="App-main" css={styles.main}>
      <div css={styles.channels}>
      <ul>
        {channels.map((value, index) => {
          return  <button css={styles.channelBtn} onClick={() => setChannel(index)}><li key={index}>{value}</li></button>
        })}
      </ul>
      </div>
      <div css={styles.channel}>
        <div css={styles.messages}>
           <h1>Messages for {channels[chan]}</h1>
          <ul>
            { messages.map( (message, i) => (
              <li key={i} css={styles.message}>
                <p>
                  <span>{message.author}</span>
                  {' '}
                  <span>{(new Date(message.creation)).toString()}</span>
                </p>
                <div>
                  {
                    message.content
                    .split(/(\n +\n)/)
                    .filter( el => el.trim() )
                    .map( el => <p>{el}</p>)
                  }
                </div>
              </li>
            ))}
          </ul>
        </div>
        <MessageForm addMessage={addMessage} />
      </div>
    </main>
  )
}
