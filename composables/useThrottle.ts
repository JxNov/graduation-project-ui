import {toast} from "vue-sonner";

export const useThrottle = (fn: Function, delay: number, key: string) => {
    const throttleKey = 'throttle';

    return function (...args: any[]) {
        if (typeof window !== "undefined" && window.localStorage) {
            const lastCallTimes = JSON.parse(localStorage.getItem(throttleKey) || '{}');
            const lastCall = lastCallTimes[key] || 0;
            const now = new Date().getTime();

            if (now - lastCall < delay) {
                const remaining = delay - (now - lastCall);
                const seconds = Math.floor(remaining / 1000);

                if (seconds < 60) {
                    toast.info(`Please wait ${seconds} seconds before reloading data`, {
                        action: {
                            label: 'Close',
                        },
                    });
                } else {
                    const minutes = Math.floor(seconds / 60);
                    const remainingSeconds = seconds % 60;
                    toast.info(`Please wait ${minutes} minutes and ${remainingSeconds} seconds before reloading data`, {
                        action: {
                            label: 'Close',
                        },
                    });
                }
                return;
            }

            lastCallTimes[key] = now;
            localStorage.setItem(throttleKey, JSON.stringify(lastCallTimes));
        }
        return fn(...args);
    }
}
