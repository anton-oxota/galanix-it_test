import "./style.css";

import { getUniversitiesByCountry, state } from "./model";
import View from "./view.ts";

async function searchUniversitiesController() {
    // Get search input value
    const form = View.form;
    const search = form.search.value;

    try {
        // Get data
        View.renderLoading();
        await getUniversitiesByCountry(search);

        const { searchResult } = state;
        if (!searchResult) return;

        // Check results
        if (searchResult.length) {
            View.renderError(
                `Sorry, can not find unirersities in ${state.searchCountry}`
            );
        }

        // Render table
        if (searchResult.length) View.renderTable(searchResult);
    } catch (error) {
        // Render error
        if (error instanceof Error) {
            View.renderError(error.message);
        }
    }
}

function init() {
    View.addFormSubmitHandler(searchUniversitiesController);
}

init();
