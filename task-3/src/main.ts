import "./style.css";

import {
    addUniversity,
    getUniversitiesByCountry,
    removeUniversity,
    state,
    type University,
} from "./model";
import View from "./view.ts";

function renderResultsController(data: University[]) {
    const { myUniversities } = state;

    const updatedUniversityData = data.map((university) => {
        return {
            ...university,
            isChecked: myUniversities.some(
                (myUniversity) => myUniversity.name === university.name
            ),
        };
    });

    View.renderResults(updatedUniversityData);
}

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
        if (!searchResult.length) {
            View.renderError(
                `Sorry, can not find unirersities in ${state.searchCountry}`
            );
        }

        // Render table
        if (searchResult.length) renderResultsController(searchResult);
    } catch (error) {
        // Render error
        if (error instanceof Error) {
            View.renderError(error.message);
        }
    }
}

function resetController() {
    state.searchCountry = "";
    state.searchResult = null;
}

function myUniversitiesController(checkbox: HTMLInputElement) {
    const { myUniversities, searchResult } = state;

    // Get university name
    const row = checkbox.closest("tr[data-name]") as HTMLTableRowElement | null;
    const unirersityName = row?.dataset?.name;
    if (!unirersityName) return;

    // Add university
    if (checkbox.checked) {
        addUniversity(unirersityName);

        // Update total universities
        View.renderTolalUniversities(myUniversities.length);
    }

    // Remove university
    if (!checkbox.checked) {
        removeUniversity(unirersityName);

        // Update total universities
        View.renderTolalUniversities(myUniversities.length);

        // Update results
        if (searchResult) renderResultsController(searchResult);
    }

    // Render my universities
    View.renderMyUniversities(myUniversities);

    console.log(state.myUniversities);
}

function init() {
    View.addFormSubmitHandler(searchUniversitiesController);
    View.addResetButtonHandler(resetController);
    View.addCheckboxHandler(myUniversitiesController);
}

init();
