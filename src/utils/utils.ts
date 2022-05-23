// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function doubleRaf(callback: any) {
    requestAnimationFrame(() => {
        requestAnimationFrame(callback);
    });
}
