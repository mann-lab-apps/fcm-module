const initDashboard = async () => {
  const response = await fetch("/api/general/tables");
  const tables = await response.json();
  const filteredTables = tables.filter(
    (table) => table.name !== "sqlite_sequence"
  );

  const navigation = document.querySelector("nav");
  navigation.innerHTML = "";
  let selectedTable;
  for (let filteredTable of filteredTables) {
    if (!selectedTable) selectedTable = filteredTable.name;
    const $button = document.createElement("button");
    $button.addEventListener("click", () => renderTable(filteredTable.name));
    $button.innerText = filteredTable.name;
    navigation.appendChild($button);
  }
  renderTable("concerts");
};

const handleItemSubmit = async (event, keys) => {
  event.preventDefault();
  const $inputs = event.target.children;
  const body = {};
  const submitterName = event.submitter.name;

  for (let key of keys) {
    body[key] = $inputs[key].value;
  }

  if (submitterName) {
    body.id = submitterName;
    const response = await fetch("/api/concerts", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    const response = await fetch("/api/concerts", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  await renderTable();
};

const handleUpdateItemSubmit = async (event, keys, id) => {
  event.preventDefault();
  console.log("handleUpdateItemSubmit", event, keys, id);
};

const handleClickDelete = async (id) => {
  const response = await fetch(`/api/concerts?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  await renderTable();
};

const renderTable = async (selectedTable) => {
  console.log("selectedTable", selectedTable);
  let items;
  const response = await fetch(`/api/general/items?tableName=${selectedTable}`);
  items = await response.json();

  const $thead = document.querySelector("thead");
  $thead.innerHTML = "";
  const $tr = document.createElement("tr");

  const $form = document.querySelector("form");
  $form.innerHTML = "";

  const $tbody = document.querySelector("tbody");
  $tbody.innerHTML = "";

  if (!items[0]) return;
  const columns = Object.keys(items[0]);
  if (!columns) return;
  const keys = columns.filter(
    (column) => column !== "id" && column !== "created_at"
  );

  $form.addEventListener("submit", (event) => handleItemSubmit(event, keys));

  for (let column of columns) {
    const $th = document.createElement("th");
    $th.innerText = column;
    $tr.appendChild($th);

    if (column === "id" || column === "created_at") continue;

    const $input = document.createElement("input");
    $input.setAttribute("name", column);
    $input.setAttribute("placeholder", column);
    $form.appendChild($input);
  }
  const $actionTh = document.createElement("th");
  $actionTh.innerText = "action";
  $tr.appendChild($actionTh);
  $thead.appendChild($tr);

  const $submitButton = document.createElement("button");
  $submitButton.innerHTML = "등록";
  $submitButton.setAttribute("type", "submit");
  $form.appendChild($submitButton);

  for (let item of items) {
    const $tr = document.createElement("tr");
    for (let value of Object.values(item)) {
      const $td = document.createElement("td");
      $td.innerText = value;
      $tr.appendChild($td);
    }
    const $actionTd = document.createElement("td");

    const $updateButton = document.createElement("button");
    $updateButton.innerText = "수정";
    $updateButton.setAttribute("name", item.id);
    $updateButton.setAttribute("type", "submit");
    $updateButton.setAttribute("form", "item");
    $actionTd.appendChild($updateButton);

    const $deleteButton = document.createElement("button");
    $deleteButton.innerText = "제거";
    $deleteButton.addEventListener("click", () => handleClickDelete(item.id));
    $actionTd.appendChild($deleteButton);

    $tr.appendChild($actionTd);
    $tbody.appendChild($tr);
  }
};
(async () => {
  await initDashboard();
})();
