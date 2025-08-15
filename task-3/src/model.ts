export type Result = {
    "state-province": null | string;
    alpha_two_code: string;
    country: string;
    domains: string[];
    name: string;
    web_pages: string[];
};

type State = {
    searchCountry: string;
    searchResult: Result[] | null;
};

const state: State = {
    searchCountry: "",
    searchResult: null,
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

export { state, getUniversitiesByCountry };
