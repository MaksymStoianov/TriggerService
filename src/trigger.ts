/**
 * @class               TriggerService
 * @namespace           TriggerService
 * @version             1.0.0
 * @author              Maksym Stoianov <stoianov.maksym@gmail.com>
 * @license             MIT
 * @tutorial            https://maksymstoianov.com/
 * @see                 [GitHub](https://github.com/MaksymStoianov/TriggerService)
 */
class TriggerService {

  /**
   * Начинает процесс создания устанавливаемого триггера, который при срабатывании вызывает заданную функцию.
   * @param {string} functionName Функция, вызываемая при срабатывании триггера. Вы можете использовать функции из включенных библиотек, например `Library.libFunction1`.
   * @return {GoogleAppsScript.Script.TriggerBuilder}
   */
  public static newTrigger(functionName: string): GoogleAppsScript.Script.TriggerBuilder {
    return ScriptApp.newTrigger(functionName);
  }



  /**
   * Создать триггер на основе времени.
   * @param {Date} time Объект Date, указывающий, когда должен сработать триггер.
   * @param {string} functionName Функция, вызываемая при срабатывании триггера.
   * @return {GoogleAppsScript.Script.Trigger}
   */
  public static createTimeTrigger(time: Date, functionName: string): GoogleAppsScript.Script.Trigger;



  /**
   * Создать триггер на основе времени.
   * @param {string} timeString Строка, представляющая дату, когда должен сработать триггер.
   * @param {string} functionName Функция, вызываемая при срабатывании триггера.
   * @return {GoogleAppsScript.Script.Trigger}
   */
  public static createTimeTrigger(timeString: string, functionName: string): GoogleAppsScript.Script.Trigger;



  /**
   * Реализация метода createTimeTrigger.
   * Это версия метода, которая обрабатывает оба типа входных данных (Date и string).
   */
  public static createTimeTrigger(time: Date | string, functionName: string): GoogleAppsScript.Script.Trigger {

    // Преобразование строки в дату
    if (typeof time === "string") {
      time = new Date(time);
    }

    if (isNaN(time.getTime())) {
      throw new Error("Invalid date string format.");
    }

    return ScriptApp.newTrigger(functionName)
      .timeBased()
      .at(time)
      .create();
  }



  /**
   * Возвращает триггер по его уникальному идентификатору.
   * @param {string} triggerId Уникальный идентификатор триггера.
   * @return {GoogleAppsScript.Script.Trigger}
   */
  public static getTriggerById(triggerId: string): GoogleAppsScript.Script.Trigger {
    const triggers = this.getAllTriggers();

    for (const trigger of triggers) {
      if (trigger.getUniqueId() === triggerId) {
        return trigger;
      }
    }

    return null;
  }



  /**
   * Возвращает коллекцию триггеров по имени функции.
   * @param {string} functionName Имя функции.
   * @return {GoogleAppsScript.Script.Trigger[]}
   */
  public static getTriggersByFunctionName(functionName: string): GoogleAppsScript.Script.Trigger[] {
    const result = [];
    const triggers = this.getAllTriggers();

    for (const trigger of triggers) {
      if (trigger.getHandlerFunction() === functionName) {
        result.push(trigger);
      }
    }

    return Array.from(result) as GoogleAppsScript.Script.Trigger[];
  }



  /**
   * Возвращает коллекцию триггеров по типу события.
   * @param {GoogleAppsScript.Script.EventType} eventType Тип события.
   * @return {GoogleAppsScript.Script.Trigger[]}
   */
  public static getTriggersByEventType(eventType: GoogleAppsScript.Script.EventType): GoogleAppsScript.Script.Trigger[] {
    const result = [];
    const triggers = this.getAllTriggers();

    for (const trigger of triggers) {
      if (trigger.getEventType() === eventType) {
        result.push(trigger);
      }
    }

    return Array.from(result) as GoogleAppsScript.Script.Trigger[];
  }



  /**
   * Возвращает коллекцию триггеров по источнику события.
   * @param {GoogleAppsScript.Script.TriggerSource} triggerSource Источник события.
   * @return {GoogleAppsScript.Script.Trigger[]}
   */
  public static getTriggersBySource(triggerSource: GoogleAppsScript.Script.TriggerSource): GoogleAppsScript.Script.Trigger[] {
    const result = [];
    const triggers = this.getAllTriggers();

    for (const trigger of triggers) {
      if (trigger.getTriggerSource() === triggerSource) {
        result.push(trigger);
      }
    }

    return Array.from(result) as GoogleAppsScript.Script.Trigger[];
  }



  /**
   * Возвращает коллекцию всех триггеров.
   * @return {GoogleAppsScript.Script.Trigger[]}
   */
  public static getAllTriggers(): GoogleAppsScript.Script.Trigger[] {
    const triggers = ScriptApp.getProjectTriggers();

    return Array.from(triggers) as GoogleAppsScript.Script.Trigger[];
  }



  /**
   * Удалить триггер по его уникальному идентификатору.
   * @param {string} triggerId Уникальный идентификатор триггера.
   */
  public static deleteTriggerById(triggerId: string): void {
    const triggers = this.getAllTriggers();

    for (const trigger of triggers) {
      if (trigger.getUniqueId() === triggerId) {
        ScriptApp.deleteTrigger(trigger);
        break;
      }
    }
  }



  /**
   * Удалить все триггеры по имени функции.
   * @param {string} functionName Имя функции.
   */
  public static deleteTriggersByFunctionName(functionName: string): void {
    const triggers = this.getAllTriggers();

    for (const trigger of triggers) {
      if (trigger.getHandlerFunction() === functionName) {
        ScriptApp.deleteTrigger(trigger);
      }
    }
  }



  /**
   * Удалить все триггеры по типу события.
   * @param {GoogleAppsScript.Script.EventType} eventType Тип события.
   */
  public static deleteTriggersByEventType(eventType: GoogleAppsScript.Script.EventType): void {
    const triggers = this.getAllTriggers();

    for (const trigger of triggers) {
      if (trigger.getEventType() === eventType) {
        ScriptApp.deleteTrigger(trigger);
      }
    }
  }



  /**
   * Удалить все триггеры по источнику события.
   * @param {GoogleAppsScript.Script.TriggerSource} triggerSource Источник события.
   */
  public static deleteTriggersBySource(triggerSource: GoogleAppsScript.Script.TriggerSource): void {
    const triggers = this.getAllTriggers();

    for (const trigger of triggers) {
      if (trigger.getTriggerSource() === triggerSource) {
        ScriptApp.deleteTrigger(trigger);
      }
    }
  }



  /**
   * Удалить все триггеры.
   */
  public static deleteAllTriggers(): void {
    const triggers = this.getAllTriggers();

    for (const trigger of triggers) {
      ScriptApp.deleteTrigger(trigger);
    }
  }

}
