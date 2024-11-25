const data = [
    // Danh sách dữ liệu mẫu
    { id: 1, name: "Áo thun nam cổ tròn", price: "220,000", type: "Tees", description: "Áo thun đơn giản, phù hợp mọi hoàn cảnh", category: "Office Wear", size: "M" },
    // Thêm dữ liệu khác ở đây...
];

const rowsPerPage = 10;
let currentPage = 1;

function renderTable(page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ""; // Xóa dữ liệu cũ

    data.slice(start, end).forEach(item => {
        const row = `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.type}</td>
                <td>${item.description}</td>
                <td>${item.category}</td>
                <td>${item.size}</td>
                <td class="action-buttons">
                    <button class="btn-edit">Edit</button>
                    <button class="btn-delete">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
    updatePaginationInfo(page);
}

function updatePaginationInfo(page) {
    const paginationInfo = document.querySelector(".paginationInfo");
    const start = (page - 1) * rowsPerPage + 1;
    const end = Math.min(page * rowsPerPage, data.length);
    paginationInfo.textContent = `Showing ${start} to ${end} of ${data.length} entries`;
}

document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderTable(currentPage);
    }
});

document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage * rowsPerPage < data.length) {
        currentPage++;
        renderTable(currentPage);
    }
});

// Render trang đầu tiên
renderTable(currentPage);
