import moment from "moment";
import { randomUUID } from "crypto";
import chalk from 'chalk';

export class Common {
  /**
   * Muestra una traza en el log con tiempo
   */
  public showLogMessage(...[text, error, type]: ConfigLog) {

    // Si envian un error el determina el tipo
    type ??= error ? 'error' : 'log';

    // Si no hay error lo deja en null para que sea ignorado por el console
    error ??= '(Sin info)';

    // Si es error
    if (type == 'error') console.trace(`${chalk.green(moment(moment.now()).format('YYYY-MM-DD hh:mm:ss'))} :: ${chalk.red(text)}`, error);
    else console.log(chalk.green(moment(moment.now()).format('YYYY-MM-DD hh:mm:ss')) + ` :: ${chalk.blue(text)}`, error);
  }


  
}

/** Logger of application */
export class Logger {

  public traceId: string;

  constructor(traceId?: string) {
    this.traceId = traceId ?? randomUUID();
  }

  /**
  * Show message into log
  * @param {string} text message to print
  * @param {any} args (optional) extra information
  */
  public log(text: string, ...args: any): void {
    const currentDate = moment(moment.now()).format('YYYY-MM-DD hh:mm:ss');
    const msg = `${currentDate} :: ${this.traceId} :: ${text}`;
    console.log(chalk.blue(msg), ...args);
  }

  /**
  * Show error message into log
  * @param {string} text message to print
  * @param {any} error (optional) extra information
  */
  public error(text: string, error: any): void {
    const currentDate = moment(moment.now()).format('YYYY-MM-DD hh:mm:ss');
    const msg = `${currentDate} :: ${this.traceId} :: ${text}`;
    console.trace(chalk.red(msg), error);
  }
}

/**
 * Configuración para la función de mensaje
 */
type ConfigLog =
  | [text: string, type?: 'error' | 'log']
  | [text: string, error: unknown, type?: 'error' | 'log']

