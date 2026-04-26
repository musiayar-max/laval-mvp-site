
(function () {
  const data = window.LAVAL.brand;
  const state = Object.assign({
    familyCode: data.families[0].code,
    profileCode: data.families[0].profileCodes[0],
    legCode: data.families[0].allowedLegs[0],
    shelfCode: data.families[0].allowedShelves[0],
    finishCode: data.families[0].allowedFinishes[0]
  }, window.LAVAL.getSavedConfig());

  const familyGrid = document.querySelector('[data-family-grid]');
  const profileGrid = document.querySelector('[data-profile-grid]');
  const legGrid = document.querySelector('[data-leg-grid]');
  const shelfGrid = document.querySelector('[data-shelf-grid]');
  const finishGrid = document.querySelector('[data-finish-grid]');
  const previewStage = document.querySelector('[data-preview-stage]');
  const summaryList = document.querySelector('[data-summary-list]');
  const reviewLink = document.querySelector('[data-review-link]');
  const stepChips = Array.from(document.querySelectorAll('.step-chip'));

  function ensureFamilyIntegrity() {
    const family = data.families.find(item => item.code === state.familyCode) || data.families[0];
    if (!family.profileCodes.includes(state.profileCode)) state.profileCode = family.profileCodes[0];
    if (!family.allowedLegs.includes(state.legCode)) state.legCode = family.allowedLegs[0];
    if (!family.allowedShelves.includes(state.shelfCode)) state.shelfCode = family.allowedShelves[0];
    if (!family.allowedFinishes.includes(state.finishCode)) state.finishCode = family.allowedFinishes[0];
  }

  function familyCard(family) {
    const meta = `<span class="pill">3 profiles</span><span class="pill">${family.allowedLegs.length} leg paths</span>`;
    return `
      <button type="button" class="card family-tile ${state.familyCode === family.code ? 'is-selected' : ''}" data-family="${family.code}">
        <div class="card-visual">${window.LAVAL.renderAssetImage(family.heroImage, family.name, 'card-image')}</div>
        <div class="card-copy">
          <div>
            <h3>${family.name}</h3>
            <p>${family.description}</p>
          </div>
          <div class="pill-row">${meta}</div>
        </div>
      </button>`;
  }

  function renderFamilies() {
    familyGrid.innerHTML = data.families.map(familyCard).join('');
    familyGrid.querySelectorAll('[data-family]').forEach(button => {
      button.addEventListener('click', () => {
        state.familyCode = button.dataset.family;
        ensureFamilyIntegrity();
        persistAndRender();
      });
    });
  }

  function renderProfiles() {
    const family = data.families.find(item => item.code === state.familyCode);
    const profiles = data.profiles.filter(item => family.profileCodes.includes(item.code));
    profileGrid.innerHTML = profiles.map(profile => `
      <button type="button" class="card option-card ${state.profileCode === profile.code ? 'is-selected' : ''}" data-profile="${profile.code}">
        <div class="card-visual">${window.LAVAL.renderAssetImage(profile.image, profile.name, 'card-image')}</div>
        <div class="card-copy">
          <div>
            <h3>${profile.name}</h3>
            <p>${profile.description}</p>
          </div>
          <div class="pill-row"><span class="pill">${profile.op}</span><span class="pill">${profile.fr}</span></div>
        </div>
      </button>`).join('');

    profileGrid.querySelectorAll('[data-profile]').forEach(button => {
      button.addEventListener('click', () => {
        state.profileCode = button.dataset.profile;
        persistAndRender();
      });
    });
  }

  function renderLegs() {
    const family = data.families.find(item => item.code === state.familyCode);
    const legs = data.legs.filter(item => family.allowedLegs.includes(item.code));
    legGrid.innerHTML = legs.map(leg => `
      <button type="button" class="card option-card ${state.legCode === leg.code ? 'is-selected' : ''}" data-leg="${leg.code}">
        <div class="card-visual">${window.LAVAL.renderAssetImage(leg.image, leg.name, 'card-image')}</div>
        <div class="card-copy"><div><h3>${leg.name}</h3><p>${leg.description}</p></div></div>
      </button>`).join('');

    legGrid.querySelectorAll('[data-leg]').forEach(button => {
      button.addEventListener('click', () => {
        state.legCode = button.dataset.leg;
        persistAndRender();
      });
    });
  }

  function renderShelves() {
    const family = data.families.find(item => item.code === state.familyCode);
    const shelves = data.shelves.filter(item => family.allowedShelves.includes(item.code));
    shelfGrid.innerHTML = shelves.map(shelf => `
      <button type="button" class="card option-card ${state.shelfCode === shelf.code ? 'is-selected' : ''}" data-shelf="${shelf.code}">
        <div class="card-visual">${window.LAVAL.renderAssetImage(shelf.image, shelf.name, 'card-image')}</div>
        <div class="card-copy"><div><h3>${shelf.name}</h3><p>${shelf.description}</p></div></div>
      </button>`).join('');

    shelfGrid.querySelectorAll('[data-shelf]').forEach(button => {
      button.addEventListener('click', () => {
        state.shelfCode = button.dataset.shelf;
        persistAndRender();
      });
    });
  }

  function renderFinishes() {
    const family = data.families.find(item => item.code === state.familyCode);
    const finishes = data.finishes.filter(item => family.allowedFinishes.includes(item.code));
    finishGrid.innerHTML = finishes.map(finish => `
      <button type="button" class="card finish-card ${state.finishCode === finish.code ? 'is-selected' : ''}" data-finish="${finish.code}">
        <div class="card-visual">${window.LAVAL.renderAssetImage(finish.image, finish.name, 'swatch-image')}</div>
        <div class="card-copy"><div><h3>${finish.name}</h3><p>${finish.description}</p></div></div>
      </button>`).join('');

    finishGrid.querySelectorAll('[data-finish]').forEach(button => {
      button.addEventListener('click', () => {
        state.finishCode = button.dataset.finish;
        persistAndRender();
      });
    });
  }

  function renderPreview() {
    previewStage.innerHTML = window.LAVAL.renderReferencePreview(state);
    const summary = window.LAVAL.formatSelectionSummary(state);
    summaryList.innerHTML = Object.entries(summary).map(([label, value]) => `
      <div class="summary-item">
        <span>${label[0].toUpperCase() + label.slice(1)}</span>
        <strong>${value}</strong>
      </div>`).join('');
    const params = new URLSearchParams({
      family: summary.family,
      profile: summary.profile,
      leg: summary.leg,
      shelf: summary.shelf,
      finish: summary.finish,
      familyCode: state.familyCode,
      profileCode: state.profileCode,
      legCode: state.legCode,
      shelfCode: state.shelfCode,
      finishCode: state.finishCode
    });
    reviewLink.href = `contact.html?${params.toString()}`;
  }

  function renderStepState() {
    const values = [state.familyCode, state.profileCode, state.legCode, state.shelfCode, state.finishCode];
    stepChips.forEach((chip, index) => {
      chip.classList.toggle('is-active', index === 4);
      chip.classList.toggle('is-complete', Boolean(values[index]));
    });
  }

  function persistAndRender() {
    window.LAVAL.saveConfig(state);
    renderFamilies();
    renderProfiles();
    renderLegs();
    renderShelves();
    renderFinishes();
    renderPreview();
    renderStepState();
  }

  ensureFamilyIntegrity();
  persistAndRender();
})();
