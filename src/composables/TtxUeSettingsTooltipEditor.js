import { TTX_CONSTANTS } from '../assets/TtxConstants.js';

const TtxUeSettingsTooltipEditor = (
  { computed, ref },
  store, {
    isUserGM,
    selectionValues,
    isGamemasterSelected,
  },
) => {
  const { TOOLTIP_EDITOR_SETTINGS } = TTX_CONSTANTS.SETTING;
  const {
    USE_GAMEMASTER_SETTINGS,
    TOOLTIP_EDITOR_LAYOUT,
    USE_DEFAULT,
    DARK_THEME,
    TOOLTIP_POSITION,
    DATA_SOURCE,
    TOOLTIP_POSITION_DEFAULT,
    DEFAULT_ACTOR_TYPE,
  } = TOOLTIP_EDITOR_SETTINGS;

  /* TOOLTIP_EDITOR_LAYOUT */
  const tooltipEditorLayout = computed(() => store.getters['TtxStore/tooltipEditorLayout']);
  const tooltipEditorLayoutIcon = computed(() => `fas fa-${tooltipEditorLayout.value ? 'grip-lines' : 'grip-lines-vertical'}`);
  const tooltipEditorLayoutClass = computed(() => (tooltipEditorLayout.value ? 'vertical' : 'horizontal'));
  const tooltipEditorLayoutSettings = computed(() => ({
    id: TOOLTIP_EDITOR_LAYOUT.ID,
    type: TOOLTIP_EDITOR_LAYOUT.TYPE,
    value: tooltipEditorLayout.value,
    onChange() {
      store.dispatch('TtxStore/setTooltipEditorLayout', !tooltipEditorLayout.value);
    },
  }));
  /* TOOLTIP_EDITOR_LAYOUT */

  // TODO: REWRITE EVERYTHING HERE, IT IS GARBAGE!!!
  /* GENERAL_SETTINGS */
  const globalTooltipSettings = computed(() => store.getters['TtxStore/globalTooltipSettings']);
  const ownedTooltipSettings = computed(() => store.getters['TtxStore/ownedTooltipSettings']);

  const getCurrentTooltipSettings = computed(() => {
    const settings = isUserGM.value ? globalTooltipSettings.value : ownedTooltipSettings.value;

    const {
      selectedUserTypeValue,
      selectedActorValue,
      selectedDispositionValue,
    } = selectionValues.value;

    const userSettings = isUserGM.value ? settings[selectedUserTypeValue] : settings;

    return userSettings?.[selectedActorValue]?.[selectedDispositionValue];
  });
  const setTooltipSettings = (settingName, settingValue) => {
    const settings = isUserGM.value
      ? globalTooltipSettings.value
      : ownedTooltipSettings.value;

    const {
      selectedUserTypeValue, selectedActorValue, selectedDispositionValue,
    } = selectionValues.value;

    const userSettings = isUserGM.value ? settings[selectedUserTypeValue] : settings;

    userSettings[selectedActorValue] = {
      ...(userSettings[selectedActorValue] || {}),
      [selectedDispositionValue]: {
        ...(userSettings[selectedActorValue]?.[selectedDispositionValue] || {}),
        [settingName]: settingValue,
      },
    };

    store.dispatch(`TtxStore/${isUserGM.value ? 'setGlobalTooltipSettings' : 'setOwnedTooltipSettings'}`, settings);
  };

  const isUseDefaultSettingsSet = computed(() => {
    const useDefault = getCurrentTooltipSettings.value?.[USE_DEFAULT.ID];
    if (useDefault !== undefined) return useDefault;

    const { selectedActorValue } = selectionValues.value;
    setTooltipSettings(
      USE_DEFAULT.ID,
      selectedActorValue === DEFAULT_ACTOR_TYPE ? false : USE_DEFAULT.DEFAULT,
    );
    return getCurrentTooltipSettings.value[USE_DEFAULT.ID];
  });
  const isUseGamemasterSettingsSet = computed(() => {
    const useGamemasterSettings = getCurrentTooltipSettings.value?.[USE_GAMEMASTER_SETTINGS.ID];
    if (useGamemasterSettings !== undefined) return useGamemasterSettings;

    setTooltipSettings(
      USE_GAMEMASTER_SETTINGS.ID,
      isUserGM.value ? false : USE_GAMEMASTER_SETTINGS.DEFAULT,
    );
    return getCurrentTooltipSettings.value[USE_GAMEMASTER_SETTINGS.ID];
  });

  const getSettingSource = computed(() => {
    const useDefault = isUseDefaultSettingsSet.value;
    const useGamemaster = isUseGamemasterSettingsSet.value;

    if (!useDefault && !useGamemaster) return getCurrentTooltipSettings.value;

    const settings = useGamemaster ? globalTooltipSettings.value : ownedTooltipSettings.value;
    const {
      selectedUserTypeValue,
      selectedActorValue,
      selectedDispositionValue,
    } = selectionValues.value;

    const actorValue = useDefault ? DEFAULT_ACTOR_TYPE : selectedActorValue;
    const userSettings = useGamemaster ? settings[selectedUserTypeValue] : settings;

    return userSettings?.[actorValue]?.[selectedDispositionValue];
  });

  const getSettingValue = (SETTING, fromCurrentSource = false) => {
    const source = fromCurrentSource ? getCurrentTooltipSettings : getSettingSource;
    const value = source.value?.[SETTING.ID];
    if (value !== undefined) return value;

    if (SETTING.DEFAULT !== undefined) {
      setTooltipSettings(SETTING.ID, SETTING.DEFAULT);
      return SETTING.DEFAULT;
    }
    return undefined;
  };

  const tooltipPositionModel = ref(getSettingValue(TOOLTIP_POSITION));
  const generalSettings = computed(() => {
    const settingsList = [{ type: 'separator' }];
    const { selectedActorValue } = selectionValues.value;
    const isUseDefault = isUseDefaultSettingsSet.value;
    const isUseGamemaster = isUseGamemasterSettingsSet.value;

    const useGamemasterSettings = {
      id: USE_GAMEMASTER_SETTINGS.ID,
      type: USE_GAMEMASTER_SETTINGS.TYPE,
      name: USE_GAMEMASTER_SETTINGS.NAME(),
      hint: USE_GAMEMASTER_SETTINGS.HINT(),
      value: getSettingValue(USE_GAMEMASTER_SETTINGS, true),
      onChange(event) {
        const value = event?.target?.checked;
        if (value === undefined) return;

        setTooltipSettings(USE_GAMEMASTER_SETTINGS.ID, value);
      },
    };
    const useDefault = {
      id: USE_DEFAULT.ID,
      type: USE_DEFAULT.TYPE,
      name: USE_DEFAULT.NAME(),
      hint: USE_DEFAULT.HINT(),
      value: getSettingValue(USE_DEFAULT),
      disabled: isUseGamemaster,
      onChange(event) {
        const value = event?.target?.checked;
        if (value === undefined) return;

        setTooltipSettings(USE_DEFAULT.ID, value);
      },
    };
    const tooltipPosition = {
      id: TOOLTIP_POSITION.ID,
      type: TOOLTIP_POSITION.TYPE,
      name: TOOLTIP_POSITION.NAME(),
      hint: TOOLTIP_POSITION.HINT(),
      options: TOOLTIP_POSITION.OPTIONS.map((position) => ({
        name: position.name(),
        value: position.value,
      })),
      model: tooltipPositionModel,
      disabled: isUseDefault || isUseGamemaster,
      onChange() {
        setTooltipSettings(TOOLTIP_POSITION.ID, tooltipPositionModel.value);
      },
    };
    const darkTheme = {
      id: DARK_THEME.ID,
      type: DARK_THEME.TYPE,
      name: DARK_THEME.NAME(),
      hint: DARK_THEME.HINT(),
      value: getSettingValue(DARK_THEME),
      disabled: isUseDefault || isUseGamemaster,
      onChange(event) {
        const value = event?.target?.checked;
        if (value === undefined) return;

        setTooltipSettings(DARK_THEME.ID, value);
      },
    };
    const dataSource = {
      id: DATA_SOURCE.ID,
      type: DATA_SOURCE.TYPE,
      name: DATA_SOURCE.NAME(),
      hint: DATA_SOURCE.HINT(),
      value: getSettingValue(DATA_SOURCE),
      disabled: isUseDefault || isUseGamemaster,
      onChange(event) {
        const value = event?.target?.value;
        if (value === undefined) return;

        setTooltipSettings(DATA_SOURCE.ID, value);
      },
    };

    const shouldAddGamemasterSettings = !isUserGM.value;
    const shouldAddUseDefault = !isUseGamemaster && selectedActorValue !== DEFAULT_ACTOR_TYPE;

    if (shouldAddGamemasterSettings) settingsList.push(useGamemasterSettings);
    if (shouldAddUseDefault) settingsList.push(useDefault);
    if (shouldAddGamemasterSettings || shouldAddUseDefault) settingsList.push({ type: 'separator' });

    return [...settingsList, tooltipPosition, darkTheme, dataSource];
  });
  /* GENERAL_SETTINGS */

  return {
    tooltipEditorLayout,
    tooltipEditorLayoutSettings,
    tooltipEditorLayoutIcon,
    tooltipEditorLayoutClass,

    generalSettings,
  };
};

export default TtxUeSettingsTooltipEditor;
