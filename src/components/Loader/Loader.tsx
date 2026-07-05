import { PuffLoader } from "react-spinners";
import { useState } from "react";
import type { CSSProperties } from "react";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

interface LoaderProps {
    isLoading: boolean;
}

const Loader = ({ isLoading }: LoaderProps) => {
    const [color] = useState("#0b6efd");
    return (
        <>
            <PuffLoader
                color={color}
                loading={isLoading}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </>
    );
};

export default Loader;