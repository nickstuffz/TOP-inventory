function addDonutClick() {
  console.log("addDonutClick");
  modalModule.openModal();
  modalModule.populateModal();
}

function editDonutClick(donut_id) {
  console.log(`editDonutClick: ${donut_id}`);
  modalModule.openModal();
  modalModule.populateModal(donut_id);
}

function editElementClick(element_category) {
  console.log(`editElementClick: ${element_category}`);
  modalModule.openModal();
}

function addDonutElementClick(donut_id) {
  console.log(`addDonutElementClick: ${donut_id}`);
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
    const donut = inventory.find((donut) => donut.id === Number(donut_id));

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
    } else {
      // edit donut flow
      formModal.action = "/inventory/update";
      titleModal.textContent = "Edit Donut";

      donutName.value = donut.name;
      donutQuantity.value = donut.quantity;
      donutDescription.value = donut.description;

      // - donut elements
      donutElementsContainer.replaceChildren(
        donutElementsContainer.firstElementChild
      );

      const donutElements = elements.map((element) => {
        return {
          category: element.category,
          names: donut[element.category.toLowerCase()],
        };
      });
      console.log(donutElements);

      // REPLACE BLOCK START
      const typeSpan = document.createElement("span");
      typeSpan.classList.add("type");
      typeSpan.textContent = donut.types;
      donutElementsContainer.appendChild(typeSpan);

      const shapeSpan = document.createElement("span");
      shapeSpan.classList.add("shape");
      shapeSpan.textContent = donut.shapes;
      donutElementsContainer.appendChild(shapeSpan);

      if (donut.fillings !== null) {
        const fillingSpan = document.createElement("span");
        fillingSpan.classList.add("filling");
        fillingSpan.textContent = donut.fillings;
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
      // REPLACE BLOCK END

      // other available donut elements

      const missingElements = elements.map((element) => {
        let missingElementNames;

        if (Array.isArray(donut[element.category.toLowerCase()])) {
          missingElementNames = element.names.filter(
            (name) => !donut[element.category.toLowerCase()].includes(name)
          );
        } else {
          missingElementNames = element.names.filter(
            (name) => name !== donut[element.category.toLowerCase()]
          );
        }
        return {
          category: element.category,
          names: missingElementNames,
        };
      });

      // TODO populate using missingElements
      console.log(missingElements);
    }
  }

  return {
    openModal,
    modalClick,
    closeModal,
    populateModal,
  };
})();
