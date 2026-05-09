export const LAVAL_PREVIEW_CONFIGURATOR_REGISTRY = {
  "version": "0.3.0",
  "mode": "mvp-full-pre-rendered-family-finish-preview-selector",
  "enabledControls": [
    "family",
    "profile",
    "finish"
  ],
  "disabledControls": [
    {
      "id": "legs",
      "label": "Legs",
      "note": "Refined in consultation",
      "icon": "/configurator/assets/disabled-icons/legs-disabled.svg"
    },
    {
      "id": "shelf",
      "label": "Shelf / Crown",
      "note": "Refined in consultation",
      "icon": "/configurator/assets/disabled-icons/shelf-disabled.svg"
    },
    {
      "id": "relief",
      "label": "Relief",
      "note": "Optional custom detail",
      "icon": "/configurator/assets/disabled-icons/relief-disabled.svg"
    },
    {
      "id": "door",
      "label": "Door / Firebox",
      "note": "Confirmed during design review",
      "icon": "/configurator/assets/disabled-icons/door-disabled.svg"
    }
  ],
  "families": [
    {
      "id": "soft-sculpted",
      "displayName": "Soft Sculpted",
      "profileId": "soft-sculpted-representative-a",
      "profileLabel": "Soft Sculpted Representative Mantel",
      "description": "A softened architectural stone surround with rounded massing and restrained sculptural movement.",
      "defaultFinish": "cordova-limestone",
      "packageRoot": "/configurator/assets/preview-families/soft-sculpted",
      "finishes": [
        {
          "id": "cordova-limestone",
          "label": "Cordova Limestone",
          "note": "Warm cream limestone direction",
          "image": "/configurator/assets/preview-families/soft-sculpted/images/laval__soft-sculpted__finish__cordova-limestone.png",
          "icon": "/configurator/assets/preview-families/soft-sculpted/icons/laval__soft-sculpted__finish__cordova-limestone__icon.png"
        },
        {
          "id": "alabama-marble",
          "label": "Alabama Marble",
          "note": "Soft white Sylacauga marble direction",
          "image": "/configurator/assets/preview-families/soft-sculpted/images/laval__soft-sculpted__finish__alabama-marble.png",
          "icon": "/configurator/assets/preview-families/soft-sculpted/icons/laval__soft-sculpted__finish__alabama-marble__icon.png"
        },
        {
          "id": "lincoln-calacatta",
          "label": "Lincoln Calacatta",
          "note": "High-movement white-and-grey marble direction",
          "image": "/configurator/assets/preview-families/soft-sculpted/images/laval__soft-sculpted__finish__lincoln-calacatta.png",
          "icon": "/configurator/assets/preview-families/soft-sculpted/icons/laval__soft-sculpted__finish__lincoln-calacatta__icon.png"
        }
      ]
    },
    {
      "id": "french-orantal",
      "displayName": "French Orantal",
      "profileId": "french-orantal-representative-a",
      "profileLabel": "French Orantal Representative Mantel",
      "description": "An ornate French-inspired mantel with carved shell movement, vertical refinement, and classical ornament.",
      "defaultFinish": "alabama-marble",
      "packageRoot": "/configurator/assets/preview-families/french-orantal",
      "finishes": [
        {
          "id": "cordova-limestone",
          "label": "Cordova Limestone",
          "note": "Warm cream limestone direction",
          "image": "/configurator/assets/preview-families/french-orantal/images/laval__french-orantal__finish__cordova-limestone.png",
          "icon": "/configurator/assets/preview-families/french-orantal/icons/laval__french-orantal__finish__cordova-limestone__icon.png"
        },
        {
          "id": "alabama-marble",
          "label": "Alabama Marble",
          "note": "Soft white Sylacauga marble direction",
          "image": "/configurator/assets/preview-families/french-orantal/images/laval__french-orantal__finish__alabama-marble.png",
          "icon": "/configurator/assets/preview-families/french-orantal/icons/laval__french-orantal__finish__alabama-marble__icon.png"
        },
        {
          "id": "lincoln-calacatta",
          "label": "Lincoln Calacatta",
          "note": "High-movement white-and-grey marble direction",
          "image": "/configurator/assets/preview-families/french-orantal/images/laval__french-orantal__finish__lincoln-calacatta.png",
          "icon": "/configurator/assets/preview-families/french-orantal/icons/laval__french-orantal__finish__lincoln-calacatta__icon.png"
        }
      ]
    },
    {
      "id": "tailored-classical",
      "displayName": "Tailored Classical",
      "profileId": "tailored-classical-representative-a",
      "profileLabel": "Tailored Classical Representative Mantel",
      "description": "A balanced arched classical mantel with restrained ornament and a black inset for architectural contrast.",
      "defaultFinish": "cordova-limestone",
      "packageRoot": "/configurator/assets/preview-families/tailored-classical",
      "finishes": [
        {
          "id": "cordova-limestone",
          "label": "Cordova Limestone",
          "note": "Warm cream limestone direction",
          "image": "/configurator/assets/preview-families/tailored-classical/images/laval__tailored-classical__finish__cordova-limestone.png",
          "icon": "/configurator/assets/preview-families/tailored-classical/icons/laval__tailored-classical__finish__cordova-limestone__icon.png"
        },
        {
          "id": "alabama-marble",
          "label": "Alabama Marble",
          "note": "Soft white Sylacauga marble direction",
          "image": "/configurator/assets/preview-families/tailored-classical/images/laval__tailored-classical__finish__alabama-marble.png",
          "icon": "/configurator/assets/preview-families/tailored-classical/icons/laval__tailored-classical__finish__alabama-marble__icon.png"
        },
        {
          "id": "lincoln-calacatta",
          "label": "Lincoln Calacatta",
          "note": "High-movement white-and-grey marble direction",
          "image": "/configurator/assets/preview-families/tailored-classical/images/laval__tailored-classical__finish__lincoln-calacatta.png",
          "icon": "/configurator/assets/preview-families/tailored-classical/icons/laval__tailored-classical__finish__lincoln-calacatta__icon.png"
        }
      ]
    }
  ]
};
