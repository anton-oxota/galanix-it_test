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
    state.searchCountry = country;

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

export { state, getUniversitiesByCountry, addUniversity, removeUniversity };
