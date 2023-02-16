import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Wrapper } from "../layouts"
import { WelcomePage, SearchPage, SchedulePage, HomePage, ClassPage, NotFound } from "../pages"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Wrapper />}>
          <Route index element={<WelcomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/class/:classId" element={<ClassPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}