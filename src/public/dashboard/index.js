const initDashboard = async () => {
  const response = await fetch("/api/general/tables");
  const tables = await response.json();
  const filteredTables = tables.filter(
    (table) => table.name !== "sqlite_sequence"
  );

  const navigation = document.querySelector("nav");
  let selectedTable;
  for (let filteredTable of filteredTables) {
    if (!selectedTable) selectedTable = filteredTable.name;
    const button = document.createElement("button");
    button.innerText = filteredTable.name;
    navigation.appendChild(button);
  }
  return selectedTable;
};

const renderTable = async () => {};

(async () => {
  const selectedTable = await initDashboard();

  let items;
  if (selectedTable === "concerts") {
    const response = await fetch("/api/concerts");
    items = await response.json();
  }
  const columns = Object.keys(items[0]);
  if (!columns) return;

  const thead = document.querySelector("thead");
  const theadRow = document.createElement("tr");
  for (let column of columns) {
    const th = document.createElement("th");
    th.innerText = column;
    theadRow.appendChild(th);
  }
  thead.appendChild(theadRow);

  const tbody = document.querySelector("tbody");
  for (let item of items) {
    const tr = document.createElement("tr");
    for (let value of Object.values(item)) {
      const td = document.createElement("td");
      td.innerText = value;
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
})();
