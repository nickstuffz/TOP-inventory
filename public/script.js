function addDonut() {
  console.log("addDonut");
  modalModule.openModal();
  modalModule.populateModal();
}

function editDonut(donut_id) {
  console.log(`editDonut: ${donut_id}`);
  modalModule.openModal();
  modalModule.populateModal(donut_id);
}

function editElement(element_category) {
  console.log(`editElement: ${element_category}`);
  modalModule.openModal();
}

const modalModule = (function () {
  const inventory = window.appData.inventory;
  const elements = window.appData.elements;

  const bgModal = document.getElementById("bg-modal");
  const formModal = document.getElementById("form-modal");
  const titleModal = document.getElementById("title-form");
  const donutName = document.getElementById("name-donut");
  const donutQuantity = document.getElementById("quantity-donut");
  const donutDescription = document.getElementById("description-donut");
  const donutElementsContainer = document.getElementById("elements-cont-donut");

  function openModal() {
    console.log("openModal");
    bgModal.style.display = "block";
    bgModal.addEventListener("click", modalClick);
  }

  function modalClick(event) {
    console.log("modalClick");
    if (event.target === bgModal) {
      closeModal();
    }
  }

  function closeModal() {
    console.log("closeModal");
    bgModal.style.display = "";
    bgModal.removeEventListener("click", modalClick);
  }

  function populateModal(donut_id = 0) {
    console.log("populateModal");

    // add donut flow
    if (donut_id === 0) {
      formModal.action = "/inventory/add";
      titleModal.textContent = "New Donut";
      donutName.value = "";
      donutQuantity.value = 1;
      donutDescription.value = "";
      donutElementsContainer.replaceChildren(
        donutElementsContainer.firstElementChild
      );
      return;
    }

    // edit donut flow
    formModal.action = "/inventory/update";
    titleModal.textContent = "Edit Donut";

    const donut = inventory.find((donut) => donut.id === Number(donut_id));

    donutName.value = donut.name;
    donutQuantity.value = donut.quantity;
    donutDescription.value = donut.description;

    // - donut elements
    donutElementsContainer.replaceChildren(
      donutElementsContainer.firstElementChild
    );

    const typeSpan = document.createElement("span");
    typeSpan.classList.add("type");
    typeSpan.textContent = donut.type;
    donutElementsContainer.appendChild(typeSpan);

    const shapeSpan = document.createElement("span");
    shapeSpan.classList.add("shape");
    shapeSpan.textContent = donut.shape;
    donutElementsContainer.appendChild(shapeSpan);

    if (donut.filling !== null) {
      const fillingSpan = document.createElement("span");
      fillingSpan.classList.add("filling");
      fillingSpan.textContent = donut.filling;
      donutElementsContainer.appendChild(fillingSpan);
    }

    if (donut.toppings !== null) {
      donut.toppings.forEach((topping) => {
        const toppingSpan = document.createElement("span");
        toppingSpan.classList.add("topping");
        toppingSpan.textContent = topping;
        donutElementsContainer.appendChild(toppingSpan);
      });
    }
  }

  return {
    openModal,
    modalClick,
    closeModal,
    populateModal,
  };
})();
