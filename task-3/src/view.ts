import type { Result } from "./model";

class View {
    private table = document.querySelector(
        "#table-container table"
    ) as HTMLTableElement;

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

    private createDomains(domains: Result["domains"]) {
        return domains.map((domain) => `<p>${domain}</p>`).join("");
    }

    private createWebPages(webPages: Result["web_pages"]) {
        return webPages.map((link) => `<a href='${link}'>${link}</a>`).join("");
    }

    private createTableBodyElement(data: Result[]) {
        const element = data
            .map(
                (universityInfo, index) => `
                    <tr>    
                        <td>${index + 1}</td>
                        <td>${universityInfo.name}</td>
                        <td>${this.createDomains(universityInfo.domains)}</td>
                        <td class="web-page">${this.createWebPages(
                            universityInfo.web_pages
                        )}</td>
                        <td>${universityInfo.country}</td>
                        <td>${universityInfo.alpha_two_code}</td>
                        <td>${universityInfo["state-province"]}</td>
                    </tr>      
                `
            )
            .join("");

        return `<tbody>${element}</tbody>`;
    }

    public renderTable(data: Result[]) {
        // Clear prev table
        this.table.innerHTML = "";

        // Create Table
        const tableElement = `${this.createTableHead()}${this.createTableBodyElement(
            data
        )}`;

        // Render
        this.table.innerHTML = tableElement;
    }
}

export default new View();
