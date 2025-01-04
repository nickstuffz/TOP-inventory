function addDonut() {
  console.log("addDonut");
  modalModule.openModal();
  modalModule.popModalInventory();
}

function editDonut(donut_id) {
  console.log(`editDonut: ${donut_id}`);
  modalModule.openModal();
  modalModule.popModalInventory(donut_id);
}

function editElement(element_category) {
  console.log(`editElement: ${element_category}`);
  modalModule.openModal();
}

const modalModule = (function () {
  // const inventory = <%- JSON.stringify(locals.inventory) %>;
  // const elements = <%- JSON.stringify(locals.elements) %>;
  const bg_modal = document.getElementById("bg-modal");
  console.log(inventory);
  console.log(elements);

  function openModal() {
    console.log("openModal");
    bg_modal.style.display = "block";
    bg_modal.addEventListener("click", modalClick);
  }

  function modalClick(event) {
    console.log("modalClick");
    if (event.target === bg_modal) {
      closeModal();
    }
  }

  function closeModal() {
    console.log("closeModal");
    bg_modal.style.display = "";
    bg_modal.removeEventListener("click", modalClick);
  }

  function popModalInventory(donut_id = 0) {
    console.log("popModalInventory");
    if (donut_id === 0) {
      return;
    }
    const donut = inventory.find((donut) => donut.id === Number(donut_id));
    const donutName = document.getElementById("donut_name");
    const donutQuantity = document.getElementById("donut_quantity");
    const donutDescription = document.getElementById("donut_description");
    const originalDonutElements = document.getElementById(
      `${donut_id}_elements`
    );
    donutName.value = donut.name;
    donutQuantity.value = donut.quantity;
    donutDescription.textContent = donut.description;
    donutElements = originalDonutElements.cloneNode(true);
    donutDescription.after(donutElements);
  }

  return {
    openModal,
    modalClick,
    closeModal,
  };
})();

function popModalInventory(donut_id = 0) {
  console.log("popModalInventory");
  if (donut_id === 0) {
    return;
  }
  const donut = inventory.find((donut) => donut.id === Number(donut_id));
  const donutName = document.getElementById("donut_name");
  const donutQuantity = document.getElementById("donut_quantity");
  const donutDescription = document.getElementById("donut_description");
  const originalDonutElements = document.getElementById(`${donut_id}_elements`);
  donutName.value = donut.name;
  donutQuantity.value = donut.quantity;
  donutDescription.textContent = donut.description;
  donutElements = originalDonutElements.cloneNode(true);
  donutDescription.after(donutElements);

  console.log(donut);
}

function popModalElements() {}
