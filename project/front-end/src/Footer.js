
/** @jsxImportSource @emotion/react */

const styles = {
  footer: {
    padding: "8px",
    height: "30px",
    backgroundColor: 'rgba(255,255,255,.3)',
    marginTop: "1%",
    borderRadius: "30px",
    flexShrink: 0,
  },
}

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <center>Authors : Matthieu SAJOT & Louis ARTAUD</center>
    </footer>
  );
}
