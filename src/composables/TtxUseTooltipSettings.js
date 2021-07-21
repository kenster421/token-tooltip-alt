import { TTX_CONSTANTS } from '../assets/TtxConstants.js';
import { log } from '../foundry-integration/TtxFoundryUtils.js';

const TtxUseTooltipSettings = ({ computed }, store, { selectionValues, userTypeSettings }) => {
  const { TOOLTIP_EDITOR_SETTINGS } = TTX_CONSTANTS.SETTING;
  const {
    OWNED_DISPOSITION,
    USE_GAMEMASTER_SETTINGS,
    USE_DEFAULT,
    DARK_THEME,
    TOOLTIP_POSITION,
    DATA_SOURCE,
    ITEMS,
  } = TOOLTIP_EDITOR_SETTINGS;

  const isUserGM = computed(() => store.getters['TtxStore/isUserGM']);
  const global = computed(() => store.getters['TtxStore/globalTooltipSettings']);
  const owned = computed(() => store.getters['TtxStore/ownedTooltipSettings']);

  const initializeGlobal = () => {
    if (!isUserGM.value || global.value.initialized) return;

    const userTypes = computed(() => userTypeSettings.value.options.map((type) => type.value));
    const actorTypes = computed(() => store.getters['TtxStore/actorTypes']);
    const gmDispositions = computed(() => store.getters['TtxStore/dispositions']);
    const playerDispositions = computed(() => [OWNED_DISPOSITION, ...gmDispositions.value]);
    const settingsList = [
      DARK_THEME,
      TOOLTIP_POSITION,
      DATA_SOURCE,
      ITEMS,
    ];

    const createInitialObject = (obj, objValue) => obj.reduce((prevValues, value) => ({
      ...prevValues,
      [value]: { ...objValue },
    }), {});
    const settings = settingsList.reduce((prevSettings, setting) => ({
      ...prevSettings,
      [setting.ID]: setting.DEFAULT,
    }), {});
    const initialValues = userTypes.value.reduce((prev, userType) => {
      const userDispositions = userType === 'gamemaster' ? gmDispositions.value : playerDispositions.value;
      const disp = createInitialObject(userDispositions, settings);
      const actors = createInitialObject(actorTypes.value, disp);

      return {
        ...prev,
        [userType]: { ...actors },
      };
    }, {});

    log('First time initialized gm settings');
    store.dispatch('TtxStore/setGlobalTooltipSettings', { ...initialValues, initialized: true });
  }; initializeGlobal();

  const currentSettings = computed(() => {
    const settings = isUserGM.value ? global.value : owned.value;
    const {
      selectedUserTypeValue: user,
      selectedActorValue: actor,
      selectedDispositionValue: disposition,
    } = selectionValues.value;

    // the GM has a different structure being allowed to edit multiple userTypes
    // so we need to take the currently edited one
    const nestedSettings = isUserGM.value ? settings[user] : settings;
    return nestedSettings?.[actor]?.[disposition];
  });
  const setSetting = (settingName, settingValue) => {
    const settings = isUserGM.value ? global.value : owned.value;
    const {
      selectedUserTypeValue: user,
      selectedActorValue: actor,
      selectedDispositionValue: disposition,
    } = selectionValues.value;

    // the GM has a different structure being allowed to edit multiple userTypes
    // so we need to take the currently edited one
    const nestedSettings = isUserGM.value ? settings[user] : settings;
    nestedSettings[actor] = {
      ...(nestedSettings[actor] || {}),
      [disposition]: {
        ...(nestedSettings[actor]?.[disposition] || {}),
        [settingName]: settingValue,
      },
    };

    const storeAction = `TtxStore/${isUserGM.value ? 'setGlobalTooltipSettings' : 'setOwnedTooltipSettings'}`;
    store.dispatch(storeAction, settings);
  };

  const useGM = computed(() => {
    if (isUserGM.value) return false;

    const useGMSettings = currentSettings.value?.[USE_GAMEMASTER_SETTINGS.ID];
    if (useGMSettings !== undefined) return useGMSettings;

    setSetting(USE_GAMEMASTER_SETTINGS.ID, USE_GAMEMASTER_SETTINGS.DEFAULT);
    return currentSettings.value[USE_GAMEMASTER_SETTINGS.ID];
  });

  const isDefault = computed(() => {
    const useDefault = currentSettings.value?.[USE_DEFAULT.ID];
    if (useDefault !== undefined) return useDefault;
  });

  return {
    currentSettings,
    setSetting,
  };
};

export default TtxUseTooltipSettings;
