import { TTX_CONSTANTS } from '../assets/TtxConstants.js';
import {
  i18n, capitalize, MODULE_NAME, log,
} from '../foundry-integration/TtxFoundryUtils.js';

const TtxUseGeneralTooltipEditor = ({ computed, ref }, store) => {
  const { TOOLTIP_EDITOR_SETTINGS } = TTX_CONSTANTS.SETTING;
  const {
    ACTOR_TYPES, DISPOSITIONS, DEFAULT_ACTOR_TYPE, DEFAULT_DISPOSITION, USER_TYPES,
  } = TOOLTIP_EDITOR_SETTINGS;

  const isUserGM = computed(() => store.getters['TtxStore/isUserGM']);
  const formattedFoundryArray = (values, i18nPrefix) => values.reduce((prev, value) => {
    const translatedValue = i18n(`${i18nPrefix}.${value}`);
    const formattedValue = {
      value,
      name: translatedValue.includes(MODULE_NAME) ? capitalize(value) : translatedValue,
    };

    return [...prev, formattedValue];
  }, []);

  /* === ACTOR TYPE === */
  const actorTypes = computed(() => store.getters['TtxStore/actorTypes']);
  const formattedActorTypes = computed(() => formattedFoundryArray(actorTypes.value, 'actorTypes'));
  const actorTypeSetting = {
    id: ACTOR_TYPES.ID,
    name: ACTOR_TYPES.NAME(),
    hint: ACTOR_TYPES.HINT(),
    options: formattedActorTypes.value,
  };
  const selectedActorValue = ref(DEFAULT_ACTOR_TYPE);
  const selectedActorName = computed(() => formattedActorTypes.value.find(
    (actorType) => actorType.value === selectedActorValue.value,
  ).name);
  /* === ACTOR TYPE === */

  /* === DISPOSITION === */
  const dispositions = computed(() => store.getters['TtxStore/dispositions']);
  const formattedDispositions = computed(() => formattedFoundryArray(dispositions.value, 'dispositions'));
  const dispositionSetting = {
    id: DISPOSITIONS.ID,
    name: DISPOSITIONS.NAME(),
    hint: DISPOSITIONS.HINT(),
    options: formattedDispositions.value,
  };
  const selectedDispositionValue = ref(DEFAULT_DISPOSITION);
  const selectedDispositionName = computed(() => formattedDispositions.value.find(
    (disposition) => disposition.value === selectedDispositionValue.value,
  ).name);
  /* === DISPOSITION === */

  /* === USER_TYPE === */
  const userTypeSettings = {
    id: USER_TYPES.ID,
    name: USER_TYPES.NAME(),
    hint: USER_TYPES.HINT(),
    options: USER_TYPES.OPTIONS.map((option) => ({ ...option, name: option.name() })),
  };

  const selectedUserTypeValue = ref(userTypeSettings.options[isUserGM ? 0 : 1].value);
  const selectedUserTypeName = computed(() => userTypeSettings.options.find(
    (userType) => userType.value === selectedUserTypeValue.value,
  ).name);
  /* === USER_TYPE === */

  return {
    actorTypeSetting,
    selectedActorValue,
    selectedActorName,

    dispositionSetting,
    selectedDispositionValue,
    selectedDispositionName,

    userTypeSettings,
    selectedUserTypeValue,
    selectedUserTypeName,
  };
};

export default TtxUseGeneralTooltipEditor;
