const standingsSelect = document.querySelector("[data-standings-select]");

if (standingsSelect) {
  const panels = document.querySelectorAll("[data-standings-panel]");

  const showSelectedStandings = () => {
    const selected = standingsSelect.value;

    panels.forEach((panel) => {
      const isSelected = panel.dataset.standingsPanel === selected;
      panel.hidden = !isSelected;
      panel.classList.toggle("is-active", isSelected);
    });
  };

  standingsSelect.addEventListener("change", showSelectedStandings);
  showSelectedStandings();
}
