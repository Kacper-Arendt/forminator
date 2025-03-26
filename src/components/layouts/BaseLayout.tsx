import type {ReactNode} from "react";

export const BaseLayout = ({height, children}: {height: number, children: ReactNode}) =>
    (
        <div style={{height}}>
            {children}
        </div>
    )