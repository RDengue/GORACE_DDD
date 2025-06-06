import { Translator } from "@ddd/shared";
import messages from "./messages";

export default class DefaultTranslator implements Translator {
  translate(key: string): string {
    const browserLanguage = navigator.language.split("-")[0]; // pt, en
    return messages[browserLanguage]?.[key] ?? messages["pt"][key] ?? key;
  }
}
