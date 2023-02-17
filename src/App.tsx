import { BrowserRouter } from "react-router-dom";
import RouterRender from "@app/router"

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <RouterRender />
    </BrowserRouter>
  );

}
