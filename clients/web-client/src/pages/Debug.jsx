// src/pages/Debug.jsx
export default function Debug() {
  return (
    <div style={{ padding: 20 }}>
      <h1>🔍 Debug Vite env</h1>

      <h2>import.meta.env</h2>
      <pre style={{
        background: '#222',
        color: 'white',
        padding: 20,
        borderRadius: 10
      }}>
        {JSON.stringify(import.meta.env, null, 2)}
      </pre>
    </div>
  );
}
