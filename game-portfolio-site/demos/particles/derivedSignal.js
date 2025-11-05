export function derivedSignal(sources, computeFn) {
    const result = { value: computeFn(), subscribers: new Set() };

    const update = () => {
        result.value = computeFn();
        result.subscribers.forEach(fn => fn(result.value));
    };

    const unsubscribes = sources.map(s => s.subscribe(update));

    result.subscribe = fn => {
        result.subscribers.add(fn);
        fn(result.value);
        return () => result.subscribers.delete(fn);
    };

    result.cleanup = () => unsubscribes.forEach(u => u());

    return result;
}
