
export function debounce(cb: Function, ms: number = 500) {
    let timeoutId: NodeJS.Timeout | string | number | undefined;

    return function (...args: any[]) {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => cb(...args), ms)
    }
}