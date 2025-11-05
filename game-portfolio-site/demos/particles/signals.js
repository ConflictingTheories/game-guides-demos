export function signal(initialValue) {
    let value = initialValue;
    const subscribers = new Set();

    return {
        get value() { return value; },
        set value(v) {
            value = v;
            subscribers.forEach(fn => fn(v));
        },
        subscribe(fn) {
            subscribers.add(fn);
            fn(value);
            return () => subscribers.delete(fn);
        }
    };
}
