import DemosSection from "./site-components/DemosSection.js";
import GuidesSection from "./site-components/GuidesSection.js";
import Header from "./site-components/Header.js";
import PrinnyDiv from "./site-components/PrinnyDiv.js";
import ToolsSection from "./site-components/ToolsSection.js";

const App = () => {
  const header = new Header();
  const prinny = new PrinnyDiv();
  const guides = new GuidesSection();
  const demos = new DemosSection();
  const tools = new ToolsSection();

  document.body.insertAdjacentHTML('afterbegin', header.render());
  document.body.insertAdjacentHTML('beforeend', prinny.render());
  document.body.insertAdjacentHTML('beforeend', guides.render());
  document.body.insertAdjacentHTML('beforeend', demos.render());
  document.body.insertAdjacentHTML('beforeend', tools.render());
};

export default App;

