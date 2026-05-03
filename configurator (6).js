/* =========================================================================
   LAVAL — State
   Single source of truth for the configurator. Emits 'change' events the
   controller subscribes to. Plain JS, no framework. Intentionally minimal.
   ========================================================================= */

const createStore = (initial) => {
  let state = { ...initial };
  const listeners = new Set();

  return {
    get: () => state,
    set: (patch) => {
      const prev = state;
      state = { ...state, ...patch, selection: { ...state.selection, ...(patch.selection || {}) } };
      listeners.forEach(fn => fn(state, prev));
    },
    setSelection: (kind, value) => {
      const prev = state;
      state = { ...state, selection: { ...state.selection, [kind]: value } };
      listeners.forEach(fn => fn(state, prev));
    },
    subscribe: (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
};

export const store = createStore({
  step: 'family',
  selection: {
    family:  null,
    profile: null,
    leg:     null,
    shelf:   null,
    finish:  null,
  },
  sheet: null,          // 'request-pricing' | null
  clientType: 'homeowner',
});

/* When a user changes family, downstream selections that may become invalid
   are cleared. This prevents the stage from getting into a hybrid state. */
export function setFamily(familyId) {
  store.set({
    selection: {
      family: familyId,
      profile: null,
      leg: null,
      shelf: null,
      finish: null,
    }
  });
}

export function setStep(stepId) {
  store.set({ step: stepId });
}

export function openSheet(name) { store.set({ sheet: name }); }
export function closeSheet()     { store.set({ sheet: null }); }
