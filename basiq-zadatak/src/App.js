import "./App.css";
import Connect from "./components/Connect";
import Transactions from "./components/Transactions";
import { Routes, Route } from "react-router-dom";

function App() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVyaWQiOiJlYmVhYmFkNy0zNTUxLTQzZTktODY1OC1hZWQ0YjQxZmZlMGIiLCJhcHBsaWNhdGlvbmlkIjoiOGE2OTAyMzktZjExZi00ODZkLTk3Y2QtMzVkYzBjNmY5MTcyIiwic2NvcGUiOiJTRVJWRVJfQUNDRVNTIiwic2FuZGJveF9hY2NvdW50Ijp0cnVlLCJjb25uZWN0X3N0YXRlbWVudHMiOmZhbHNlLCJlbnJpY2giOiJkaXNhYmxlZCIsImVucmljaF9lbnRpdHkiOmZhbHNlLCJlbnJpY2hfbG9jYXRpb24iOmZhbHNlLCJlbnJpY2hfY2F0ZWdvcnkiOmZhbHNlLCJhZmZvcmRhYmlsaXR5Ijoic2FuZGJveCIsImluY29tZSI6InNhbmRib3giLCJleHBlbnNlcyI6InNhbmRib3giLCJleHAiOjE2ODczNDc4MTYsImlhdCI6MTY4NzM0NDIxNiwidmVyc2lvbiI6IjIuMSIsImRlbmllZF9wZXJtaXNzaW9ucyI6W119.i3hygdE1H9fsPdLcpNrNiPVY9sjrh7u_AC7f1X4SfcU";
  return (
    <div>
      <Routes>
        <Route path="/" element={<Connect token={token} />} />
        <Route path="/transactions" element={<Transactions token={token} />} />
      </Routes>
    </div>
  );
}

export default App;
