const verbose = !!import.meta.env.VITE_APP_VERBOSE;

export abstract class Logger {
  static log = (...things: any[]) => console.log(things);
  static error = (err: Error) => console.error(err.message, err.stack);
  static debug = (...things: any[]) => (verbose ? console.info(things) : undefined);
}
