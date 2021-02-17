import React from 'react';
export default function JsxIf({ cond, ...props }) {
    const { children } = props;
    let el = null;
    if (cond) {
        el = <>{children}</>;
    }
    return el;
}
