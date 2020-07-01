import moment from "moment";

export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function () {
        const last = +new Date() - timestamp

        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null

            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }

    return function (...args) {
        context = this
        timestamp = +new Date()
        const callNow = immediate && !timeout
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }

        return result
    }
}

export function convertirFecha(unix_timestamp, formato) {
    moment.locale('es', {
        longDateFormat: {
            LT: "DD/MM/YYYY[\n]h:mm:ss A",
            L: "MM/DD/YYYY",
            l: "M/D/YYYY",
            LL: "MMMM Do YYYY",
            ll: "MMM D YYYY",
            LLL: "MMMM Do YYYY LT",
            lll: "MMM D YYYY LT",
            LLLL: "dddd, MMMM Do YYYY LT",
            llll: "ddd, MMM D YYYY LT"
        }
    });
    return moment(unix_timestamp).format(formato);
}