document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("addingIngredientBtn");
    addButton.addEventListener("click", addInputFormWidget);
})

function addInputFormWidget() {
    const ingredientList = document.querySelector(".ingredientList");
    const ingredientWidget = document.querySelectorAll(".ingredientWidget")[0];

    const newWidget = ingredientWidget.cloneNode(true);
    let input = newWidget.getElementsByTagName("input")[0];
    input.value = ""
    ingredientList.appendChild(newWidget);
}
