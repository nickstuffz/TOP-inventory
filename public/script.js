function addDonutClick() {
  console.log("addDonutClick");
  modalModule.openModal();
  modalModule.populateModal("add");
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
  const elementCategories = window.appData.elementCategories;

  const bgModal = document.getElementById("bg-modal");
  const formModal = document.getElementById("form-modal");
  const titleModal = document.getElementById("title-form");
  const donutName = document.getElementById("name-donut");
  const donutQuantity = document.getElementById("quantity-donut");
  const donutDescription = document.getElementById("description-donut");
  const donutElementsContainer = document.getElementById("elements-cont-donut");
  const missingElementsContainer = document.getElementById(
    "menu-elements-cont-donut"
  );

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

  function renderElements(set, container) {
    set.forEach((elementCat) => {
      if (elementCat.names.length) {
        elementCat.names.forEach((element) => {
          const span = document.createElement("span");
          span.classList.add(elementCat.category.slice(0, -1));
          span.textContent = element;
          container.appendChild(span);
        });
      }
    });
  }

  function populateModal(donut_id) {
    console.log("populateModal");

    // add donut flow
    if (donut_id === "add") {
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
      const donut = inventory.find((donut) => donut.id === Number(donut_id));

      // donut details
      formModal.action = "/inventory/update";
      titleModal.textContent = "Edit Donut";
      donutName.value = donut.name;
      donutQuantity.value = donut.quantity;
      donutDescription.value = donut.description;

      // - donut elements
      donutElementsContainer.replaceChildren(
        donutElementsContainer.firstElementChild
      );

      const donutElements = elementCategories.map((category) => {
        return {
          category: category,
          names: donut[category],
        };
      });

      renderElements(donutElements, donutElementsContainer);

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
      renderElements(missingElements, missingElementsContainer);
    }
  }

  return {
    openModal,
    modalClick,
    closeModal,
    populateModal,
  };
})();
