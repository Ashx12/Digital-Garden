import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import PostView from "./pages/PostView";
import WritePost from "./pages/WritePost";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostView />} />
        <Route path="/write" element={<WritePost />} />
        <Route path="/edit/:id" element={<WritePost />} />
      </Routes>
    </BrowserRouter>
  );
}
