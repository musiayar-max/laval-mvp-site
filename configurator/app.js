import { LAVAL_PREVIEW_CONFIGURATOR_REGISTRY as REGISTRY } from "./data/preview-configurator-registry.js";

const ENABLED_STEPS = [
  {
    id: "family",
    label: "Family",
    eyebrow: "Step 01",
    title: "Mantel Family",
    helper: "Choose the architectural family. This sets the overall design language and representative profile for the mantel preview."
  },
  {
    id: "profile",
    label: "Profile",
    eyebrow: "Step 02",
    title: "Representative Profile",
    helper: "The MVP shows one complete representative mantel profile per family. Detailed profile refinements are handled in consultation."
  },
  {
    id: "finish",
    label: "Finish",
    eyebrow: "Step 03",
    title: "Stone Direction",
    helper: "Select the finish direction for the chosen family. Final stone selection, veining, and sourcing are refined through the inquiry process."
  }
];

const DISABLED_STEPS = REGISTRY.disabledControls.map((item) => ({
  ...item,
  enabled: false
}));

const state = {
  step: "family",
  familyId: REGISTRY.families[0]?.id ?? null,
  finishId: REGISTRY.families[0]?.defaultFinish ?? null
};

const $ = (selector) => document.querySelector(selector);

const els = {
  shell: $("#laval-shell"),
  stageFigure: $("#laval-stage-figure"),
  mount: $("#laval-mantel-mount"),
  caption: $("#laval-stage-caption-text"),
  paneEyebrow: $("#laval-pane-eyebrow"),
  paneTitle: $("#laval-pane-title"),
  paneHelper: $("#laval-pane-helper"),
  stepRail: $("#laval-step-rail-list"),
  browserTitle: $("#laval-browser-title"),
  browserGrid: $("#laval-browser-grid"),
  dockStepText: $("#laval-dock-step-text"),
  dockWidgets: $("#laval-dock-widgets"),
  reviewSummaryList: $("#laval-review-summary-list"),
  reviewForm: $("#laval-review-form"),
  reviewConfirm: $("#laval-review-confirm")
};

function getFamily(familyId = state.familyId) {
  return REGISTRY.families.find((family) => family.id === familyId) ?? REGISTRY.families[0];
}

function getFinish(family = getFamily(), finishId = state.finishId) {
  return family.finishes.find((finish) => finish.id === finishId) ?? family.finishes[0];
}

function setFamily(familyId) {
  const family = getFamily(familyId);
  state.familyId = family.id;
  state.finishId = family.defaultFinish || family.finishes[0]?.id || null;
  render();
}

function setFinish(finishId) {
  state.finishId = finishId;
  render();
}

function setStep(stepId) {
  if (!ENABLED_STEPS.some((step) => step.id === stepId)) return;
  state.step = stepId;
  render();
}

function stepIndex(stepId) {
  return ENABLED_STEPS.findIndex((step) => step.id === stepId);
}

function activeStep() {
  return ENABLED_STEPS.find((step) => step.id === state.step) || ENABLED_STEPS[0];
}

function safeIcon(src) {
  return src || "/configurator/assets/disabled-icons/profile-disabled.svg";
}

function renderStage() {
  const family = getFamily();
  const finish = getFinish(family);

  els.stageFigure?.setAttribute("data-family", family.id);
  els.stageFigure?.setAttribute("data-profile", family.profileId);
  els.stageFigure?.setAttribute("data-finish", finish?.id || "");

  if (!els.mount) return;

  els.mount.innerHTML = `
    <img
      class="laval-preview-mantel-image"
      src="${finish.image}"
      alt="${family.displayName} mantel in ${finish.label}"
      loading="eager"
      decoding="async"
    />
  `;

  if (els.caption) {
    els.caption.textContent = `${family.displayName} · ${finish.label}`;
  }
}

function renderStepRail() {
  if (!els.stepRail) return;
  const enabledMarkup = ENABLED_STEPS.map((step, index) => {
    const selected = state.step === step.id;
    return `
      <li class="laval-step-rail-item">
        <button
          class="laval-step-orb ${selected ? "is-active" : ""}"
          type="button"
          data-step-id="${step.id}"
          aria-current="${selected ? "step" : "false"}"
          aria-label="${step.label}"
        >
          <span class="laval-step-orb-num">${String(index + 1).padStart(2, "0")}</span>
          <span class="laval-step-orb-label">${step.label}</span>
        </button>
      </li>
    `;
  }).join("");

  const disabledMarkup = DISABLED_STEPS.map((step) => `
    <li class="laval-step-rail-item">
      <button
        class="laval-step-orb is-disabled"
        type="button"
        disabled
        aria-disabled="true"
        aria-label="${step.label} — ${step.note}"
        title="${step.label}: ${step.note}"
      >
        <span class="laval-step-orb-num">—</span>
        <span class="laval-step-orb-label">${step.label}</span>
      </button>
    </li>
  `).join("");

  els.stepRail.innerHTML = enabledMarkup + disabledMarkup;
  els.stepRail.querySelectorAll("[data-step-id]").forEach((button) => {
    button.addEventListener("click", () => setStep(button.dataset.stepId));
  });
}

function renderPane() {
  const step = activeStep();
  const family = getFamily();
  const finish = getFinish(family);

  if (els.paneEyebrow) els.paneEyebrow.textContent = step.eyebrow;
  if (els.paneTitle) els.paneTitle.textContent = step.title;
  if (els.paneHelper) els.paneHelper.textContent = step.helper;

  document.querySelectorAll(".laval-pane-summary-item").forEach((item) => item.classList.add("is-empty"));
  const summaryValues = [
    ["Family", family.displayName],
    ["Profile", family.profileLabel],
    ["Leg", "Refined in consultation"],
    ["Shelf", "Refined in consultation"],
    ["Finish", finish?.label || "—"]
  ];

  const summaryItems = document.querySelectorAll(".laval-pane-summary-item");
  summaryItems.forEach((item, index) => {
    const [key, value] = summaryValues[index] || ["", ""];
    const keyNode = item.querySelector(".laval-pane-summary-key");
    const valueNode = item.querySelector(".laval-pane-summary-val");
    if (keyNode) keyNode.textContent = key;
    if (valueNode) valueNode.textContent = value;
    item.classList.toggle("is-empty", !value || value === "—");
  });
}

function optionCard({ id, title, subtitle, image, icon, selected, disabled, onClickLabel }) {
  const mediaSrc = image || icon;
  return `
    <button
      class="laval-preview-option-card ${selected ? "is-selected" : ""} ${disabled ? "is-disabled" : ""}"
      type="button"
      ${disabled ? "disabled aria-disabled=\"true\"" : ""}
      data-option-id="${id}"
      aria-label="${onClickLabel || title}"
      aria-selected="${selected ? "true" : "false"}"
    >
      <span class="laval-preview-option-media">
        <img src="${mediaSrc}" alt="" loading="lazy" decoding="async" />
      </span>
      <span class="laval-preview-option-copy">
        <span class="laval-preview-option-title">${title}</span>
        <span class="laval-preview-option-subtitle">${subtitle || ""}</span>
      </span>
    </button>
  `;
}

function renderBrowser() {
  if (!els.browserGrid) return;
  const family = getFamily();
  const finish = getFinish(family);
  const step = activeStep();
  if (els.browserTitle) els.browserTitle.textContent = step.title;

  if (state.step === "family") {
    els.browserGrid.innerHTML = REGISTRY.families.map((candidate) => {
      const candidateFinish = getFinish(candidate, candidate.defaultFinish);
      return optionCard({
        id: candidate.id,
        title: candidate.displayName,
        subtitle: candidate.description,
        image: candidateFinish.image,
        selected: candidate.id === family.id,
        onClickLabel: `Select ${candidate.displayName}`
      });
    }).join("");

    els.browserGrid.querySelectorAll("[data-option-id]").forEach((button) => {
      button.addEventListener("click", () => setFamily(button.dataset.optionId));
    });
    return;
  }

  if (state.step === "profile") {
    els.browserGrid.innerHTML = optionCard({
      id: family.profileId,
      title: family.profileLabel,
      subtitle: "One representative profile is active for this MVP. Details are refined in consultation.",
      image: finish.image,
      selected: true,
      onClickLabel: `${family.profileLabel} selected`
    });
    return;
  }

  if (state.step === "finish") {
    els.browserGrid.innerHTML = family.finishes.map((candidate) => optionCard({
      id: candidate.id,
      title: candidate.label,
      subtitle: candidate.note,
      image: candidate.icon || candidate.image,
      selected: candidate.id === finish.id,
      onClickLabel: `Select ${candidate.label}`
    })).join("");

    els.browserGrid.querySelectorAll("[data-option-id]").forEach((button) => {
      button.addEventListener("click", () => setFinish(button.dataset.optionId));
    });
  }
}

function renderDock() {
  const family = getFamily();
  const finish = getFinish(family);
  if (els.dockStepText) {
    els.dockStepText.textContent = `${family.displayName} · ${finish?.label || "Finish"}`;
  }
  if (els.dockWidgets) {
    els.dockWidgets.innerHTML = ENABLED_STEPS.map((step) => `
      <button
        class="laval-dock-widget ${state.step === step.id ? "is-active" : ""}"
        type="button"
        data-dock-step="${step.id}"
        aria-label="Go to ${step.label}"
      >${step.label}</button>
    `).join("");
    els.dockWidgets.querySelectorAll("[data-dock-step]").forEach((button) => {
      button.addEventListener("click", () => setStep(button.dataset.dockStep));
    });
  }
}

function renderReviewSummary() {
  const family = getFamily();
  const finish = getFinish(family);
  if (els.reviewSummaryList) {
    els.reviewSummaryList.innerHTML = `
      <li><span>Family</span><strong>${family.displayName}</strong></li>
      <li><span>Profile</span><strong>${family.profileLabel}</strong></li>
      <li><span>Finish</span><strong>${finish?.label || "—"}</strong></li>
      <li><span>Details</span><strong>Refined in consultation</strong></li>
    `;
  }
}

function renderDisabledControlPanel() {
  const slot = $("#laval-editor-slot");
  if (!slot) return;
  slot.innerHTML = `
    <div class="laval-disabled-control-panel" aria-label="Consultation-only controls">
      ${REGISTRY.disabledControls.map((item) => `
        <div class="laval-disabled-control-card" aria-disabled="true">
          <img src="${item.icon}" alt="" loading="lazy" decoding="async" onerror="this.style.display='none'" />
          <div>
            <strong>${item.label}</strong>
            <span>${item.note}</span>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function bindForm() {
  if (!els.reviewForm) return;
  els.reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const family = getFamily();
    const finish = getFinish(family);
    const message = $("#laval-field-message");
    if (message && !message.dataset.selectionInjected) {
      const existing = message.value.trim();
      const selectionNote = `Selected LAVAL preview: ${family.displayName} / ${family.profileLabel} / ${finish?.label || "No finish selected"}`;
      message.value = existing ? `${existing}\n\n${selectionNote}` : selectionNote;
      message.dataset.selectionInjected = "true";
    }
    if (els.reviewConfirm) els.reviewConfirm.hidden = false;
  }, { once: false });
}

function render() {
  const step = activeStep();
  els.shell?.setAttribute("data-preview-selector", "true");
  els.shell?.setAttribute("data-active-step", state.step);
  els.shell?.setAttribute("data-shell-state", state.step === "finish" ? "detail" : "wide");

  renderStage();
  renderStepRail();
  renderPane();
  renderBrowser();
  renderDock();
  renderReviewSummary();
  renderDisabledControlPanel();
}

bindForm();
render();
