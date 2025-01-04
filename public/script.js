function addDonut() {
  console.log("addDonut");
  modalModule.openModal();
  // modalModule.popModalInventory();
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
  const inventory = window.appData.inventory;
  const elements = window.appData.elements;

  const bg_modal = document.getElementById("bg-modal");
  const donutName = document.getElementById("donut_name");
  const donutQuantity = document.getElementById("donut_quantity");
  const donutDescription = document.getElementById("donut_description");
  const donutElementsContainer = document.getElementById("donut_elements_cont");

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

    const originalDonutElements = document.getElementById(
      `${donut_id}_elements`
    );

    const donut = inventory.find((donut) => donut.id === Number(donut_id));

    donutName.value = donut.name;
    donutQuantity.value = donut.quantity;
    donutDescription.textContent = donut.description;

    // donut elements
    donutElementsContainer.replaceChildren();

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
    popModalInventory,
  };
})();
