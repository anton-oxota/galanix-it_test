export type University = {
    "state-province": null | string;
    alpha_two_code: string;
    country: string;
    domains: string[];
    name: string;
    web_pages: string[];
    isChecked?: boolean;
};

type State = {
    searchCountry: string;
    searchResult: University[] | null;
    myUniversities: University[];
};

const state: State = {
    searchCountry: "",
    searchResult: null,
    myUniversities: [],
};

async function getUniversitiesByCountry(country: string) {
    try {
        const response = await fetch(
            `http://universities.hipolabs.com/search?country=${country}`
        );

        if (!response.ok) throw new Error("Can not get universities");
        state.searchResult = await response.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function addUniversity(unirersityName: string) {
    const unirersity = state.searchResult?.find(
        (data) => data.name === unirersityName
    );

    if (unirersity) {
        state.myUniversities.push({ ...unirersity, isChecked: true });
    }
}

function removeUniversity(unirersityName: string) {
    const existingUniversityIndex = state.myUniversities.findIndex(
        (data) => data.name === unirersityName
    );

    if (existingUniversityIndex === -1) return;

    state.myUniversities.splice(existingUniversityIndex, 1);
}

function setLocalUniversities(data: University[]) {
    localStorage.setItem("university", JSON.stringify(data));
}

function getLocalUniversities(): University[] | null {
    const universities = localStorage.getItem("university");
    if (!universities) return null;

    return JSON.parse(universities);
}

function setLocalSearch(search: string) {
    localStorage.setItem("search", search);
}

function getLocalSearch() {
    return localStorage.getItem("search") || "";
}

export {
    state,
    getUniversitiesByCountry,
    addUniversity,
    removeUniversity,
    setLocalSearch,
    getLocalSearch,
    setLocalUniversities,
    getLocalUniversities,
};
