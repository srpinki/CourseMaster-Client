export default function Footer() {
  return (
    <footer style={{
      padding: "20px",
      background: "#0F172A",
      color: "#fff",
      marginTop: "40px",
      textAlign: "center"
    }}>
      <p>© {new Date().getFullYear()} CourseMaster. All Rights Reserved.</p>
    </footer>
  );
}
