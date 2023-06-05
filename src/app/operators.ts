import { Observable, tap } from "rxjs"

export enum LogLevel {
  NONE,
  ERROR,
  INFO
}

export const debug = (logLevel: LogLevel = LogLevel.INFO) => {
  return (sourceValue: Observable<any>) => sourceValue.pipe(
    tap(val => {
      if((window as any).logLevel && (window as any).logLevel === LogLevel.ERROR &&  logLevel === LogLevel.ERROR) {
        console.log('ERROR: ', val)
      } else if((window as any).logLevel && (window as any).logLevel === LogLevel.INFO) {
        console.log('INFO: ', val)
      }
    })
  )
}
