import { TTX_CONSTANTS } from '../assets/TtxConstants.js';
import {
  i18n, capitalize, MODULE_NAME,
} from '../foundry-integration/TtxFoundryUtils.js';

const TtxUseGeneralTooltipEditor = ({ computed, ref }, store) => {
  const { TOOLTIP_EDITOR_SETTINGS } = TTX_CONSTANTS.SETTING;
  const { ACTOR_TYPES, DEFAULT_ACTOR_TYPE } = TOOLTIP_EDITOR_SETTINGS;

  /* === ACTOR TYPE === */
  const actorTypes = computed(() => store.getters['TtxStore/actorTypes']);
  const formattedActorTypes = computed(() => actorTypes.value.reduce((prev, actorType) => {
    const translatedValue = i18n(`actorTypes.${actorType}`);
    const formattedValue = {
      value: actorType,
      name: translatedValue.includes(MODULE_NAME) ? capitalize(actorType) : translatedValue,
    };

    return [...prev, formattedValue];
  }, []));
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

  return {
    actorTypeSetting,
    selectedActorValue,
    selectedActorName,
  };
};

export default TtxUseGeneralTooltipEditor;
