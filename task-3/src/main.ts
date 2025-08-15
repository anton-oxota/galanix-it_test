import "./style.css";

import {
    addUniversity,
    getLocalSearch,
    getLocalUniversities,
    getUniversitiesByCountry,
    removeUniversity,
    setLocalSearch,
    setLocalUniversities,
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
    state.searchCountry = search;
    console.log(state.searchCountry);

    // Set local search
    setLocalSearch(search);

    // Fetch data
    await fetchUniversitiesController(search);
}

async function fetchUniversitiesController(search: string) {
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

        // Update local universities
        setLocalUniversities(state.myUniversities);

        // Update total universities
        View.renderTolalUniversities(myUniversities.length);
    }

    // Remove university
    if (!checkbox.checked) {
        removeUniversity(unirersityName);

        // Update local universities
        setLocalUniversities(state.myUniversities);

        // Update total universities
        View.renderTolalUniversities(myUniversities.length);

        // Update results
        if (searchResult) renderResultsController(searchResult);
    }

    // Render my universities
    View.renderMyUniversities(myUniversities);

    console.log(state.myUniversities);
}

function pageInitController() {
    // Get local data
    state.searchCountry = getLocalSearch();
    state.myUniversities = getLocalUniversities() || [];

    View.renderMyUniversities(state.myUniversities);
    fetchUniversitiesController(state.searchCountry);
}

function init() {
    pageInitController();
    View.addFormSubmitHandler(searchUniversitiesController);
    View.addResetButtonHandler(resetController);
    View.addCheckboxHandler(myUniversitiesController);
}

init();
