
export const regexCode: {[field: string]: RegExp} = {
    EMAIL: /^(?=.{1,64}@)[a-zA-Z0-9_-]+(\.[a-zA-Z0-9]+)*@[a-z]+(\.[a-zA-Z]+)+[a-zA-Z]$/g,
    PWD: /(?=.*[0-9]{1,})(?=.*[a-z]{1,})(?=.*[A-Z]{1,})(?=.*\W{1,}).{8,}/g
}

/**
 * @ref
 * https://github.com/olvrMns/TP3CollecteEtInterpretation/blob/dev/src/utils/regexUtils.ts
 */
export const verify = (value: string, code: RegExp): boolean => {
    return new RegExp(code).test(value);
}