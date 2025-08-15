import "./style.css";

import { getUniversitiesByCountry } from "./model";
import View from "./view.ts";

const data = await getUniversitiesByCountry("turkey");
View.renderTable(data);
