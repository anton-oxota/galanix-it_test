import type { University } from "./model";

class View {
    private resultsContainer = document.getElementById(
        "search-results"
    ) as HTMLDivElement;

    private myUniversitiesContainer = document.getElementById(
        "my-uviresities"
    ) as HTMLDivElement;

    private totalUniversities = document.querySelector(
        ".total-universities"
    ) as HTMLDivElement;

    public form = document.querySelector("form") as HTMLFormElement;
    private resetButton = this.form.querySelector("button[type=button]");

    // Create element functions
    private createTableHead() {
        return `
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Domains</th>
                    <th>Web Page</th>
                    <th>Country</th>
                    <th>Alpha Code</th>
                    <th>State Province</th>
                </tr>
            </thead>
        `;
    }

    private createDomains(domains: University["domains"]) {
        return domains.map((domain) => `<p>${domain}</p>`).join("");
    }

    private createWebPages(webPages: University["web_pages"]) {
        return webPages.map((link) => `<a href='${link}'>${link}</a>`).join("");
    }

    private createTableBodyElement(data: University[]) {
        const element = data
            .map(
                (universityInfo, index) => `
                    <tr data-name="${universityInfo.name}">    
                        <td>${index + 1}</td>
                        <td>${universityInfo.name}</td>
                        <td>${this.createDomains(universityInfo.domains)}</td>
                        <td class="web-page">${this.createWebPages(
                            universityInfo.web_pages
                        )}</td>
                        <td>${universityInfo.country}</td>
                        <td>${universityInfo.alpha_two_code}</td>
                        <td>${universityInfo["state-province"]}</td>
                        <td><input type="checkbox" ${
                            universityInfo.isChecked ? "checked" : ""
                        }/></td>
                    </tr>      
                `
            )
            .join("");

        return `<tbody>${element}</tbody>`;
    }

    private createTableElement(data: University[]) {
        return `
            <table>
                ${this.createTableHead()}
                ${this.createTableBodyElement(data)}
            </table>
        `;
    }

    // Render functions
    public renderResults(data: University[]) {
        this.resultsContainer.innerHTML = this.createTableElement(data);
    }

    public renderMyUniversities(data: University[]) {
        this.myUniversitiesContainer.innerHTML = data.length
            ? this.createTableElement(data)
            : "";
    }

    public renderTolalUniversities(number: number) {
        this.totalUniversities.textContent = `Total: ${number}`;
    }

    public renderLoading() {
        this.resultsContainer.innerHTML = "Loading...";
    }

    public renderError(errorText: string) {
        this.resultsContainer.innerHTML = errorText;
    }

    // Handlers
    public addFormSubmitHandler(handler: Function) {
        this.form?.addEventListener("submit", (event) => {
            event.preventDefault();

            handler();
        });
    }

    public addResetButtonHandler(handler: Function) {
        this.resetButton?.addEventListener("click", () => {
            console.log("reset");
            this.form.reset();

            this.resultsContainer.innerHTML =
                "<p>Start search universities by country</p>";

            handler();
        });
    }

    public addCheckboxHandler(handler: Function) {
        document.addEventListener("click", (event) => {
            const target = event.target as Element;
            const checkbox = target.closest('input[type="checkbox"]');

            if (!checkbox) return;

            handler(checkbox as HTMLInputElement);
        });
    }
}

export default new View();
