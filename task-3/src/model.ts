export type Result = {
    "state-province": null | string;
    alpha_two_code: string;
    country: string;
    domains: string[];
    name: string;
    web_pages: string[];
};

type State = {
    searchResult: Result[] | null;
};

const state: State = {
    searchResult: null,
};

async function getUniversitiesByCountry(country: string): Promise<Result[]> {
    const response = await fetch(
        `http://universities.hipolabs.com/search?country=${country}`
    );

    try {
        if (!response.ok) throw new Error("Can not get universities");
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export { state, getUniversitiesByCountry };
