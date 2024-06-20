import { Fragment, ReactNode } from "react";

interface Props<T> {
    items: Array<T>;
    renderItem: (item: T) => ReactNode;
}

export default function ListRenderer<T>({ items, renderItem }: Props<T>) {
    return (
        <>
            {items.map((item, index) => (
                <Fragment key={index}>{renderItem(item)}</Fragment>
            ))}
        </>
    );
}
